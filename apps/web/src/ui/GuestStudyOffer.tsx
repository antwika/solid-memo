import type { ComponentChildren } from "preact";
import { useId, useState } from "preact/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import {
  GUEST_TRANSFER_STEPS,
  suggestedGuestLocation,
  type GuestTransferOutcome,
  type GuestTransferProgress,
  type GuestTransferStep,
} from "@solid-memo/domain/guest";
import type { Instance, RegistrationTarget } from "@solid-memo/domain/instance";
import type { Session } from "@solid-memo/domain/session";
import { ErrorMessage } from "./ErrorMessage";
import { useI18n, type I18n, type ErrorText } from "./i18n";
import { usePanelFocus } from "./panelFocus";
import { RegistrationTargetChooser } from "./RegistrationTargetChooser";
import { routeToHash } from "./router";
import { StepProgress } from "./StepProgress";

/** What each step of the move does, as the progress line names it. */
function stepLabels(t: I18n["t"]): Record<GuestTransferStep, string> {
  return {
    stage: t("guestOffer.step.stage"),
    copy: t("guestOffer.step.copy"),
    adopt: t("guestOffer.step.adopt"),
    validate: t("guestOffer.step.validate"),
    verify: t("guestOffer.step.verify"),
    register: t("guestOffer.step.register"),
    tidy: t("guestOffer.step.tidy"),
  };
}

type Stage = "offer" | "discard" | "form" | "dismissed";

/**
 * For a user who logged in where a guest studied before (docs/guest-mode.md):
 * the offer to move the guest's study into their Pod — or to discard it, or
 * to leave it for now — then the move, step by step, and how it ended.
 * Nothing to see when no guest studied in this browser.
 */
export function GuestStudyOffer({ useCases, session }: { useCases: UseCases; session: Session }) {
  const { t } = useI18n();
  const [outcome, setOutcome] = useState<GuestTransferOutcome | null>(null);
  // Mounted throughout, so a screen reader hears that the move succeeded: a
  // live region inserted along with its text often goes unheard. A failure
  // is heard through its panel, which takes the focus, so it is not said twice.
  return (
    <>
      <p class="visually-hidden" role="status">
        {outcome?.ok === true ? (outcome.tidied ? t("guestOffer.moved") : t("guestOffer.movedNotTidied")) : ""}
      </p>
      <GuestStudyOfferStage useCases={useCases} session={session} outcome={outcome} onOutcome={setOutcome} />
    </>
  );
}

/**
 * Where the offer is: the offer itself, the form, the move under way, or
 * how it ended. Each stage takes the focus from the one it replaces, all
 * but the offer as the page loads and a move that succeeded (the instance
 * it opens takes it); Back and Cancel give it to the offer.
 */
function GuestStudyOfferStage({
  useCases,
  session,
  outcome,
  onOutcome,
}: {
  useCases: UseCases;
  session: Session;
  outcome: GuestTransferOutcome | null;
  onOutcome: (outcome: GuestTransferOutcome | null) => void;
}) {
  const { t, errorText } = useI18n();
  const queryClient = useQueryClient();
  const [stage, setStage] = useState<Stage>("offer");
  /** The user came back to the offer, from the form or the discard question: it takes the focus. */
  const [returned, setReturned] = useState(false);
  const [progress, setProgress] = useState<GuestTransferProgress | null>(null);

  const studyQuery = useQuery({
    queryKey: ["guestStudy"],
    queryFn: () => useCases.findGuestStudy(),
  });

  const discard = useMutation({
    mutationFn: () => useCases.discardGuest(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["guestStudy"] }),
  });

  const move = useMutation({
    mutationFn: (args: { instance: Instance; target: { containerUrl: string; registrationTarget: RegistrationTarget } }) =>
      useCases.transferGuestStudy(session, args.instance, args.target, setProgress),
    // A new move starts without the last one's steps.
    onMutate: () => setProgress(null),
    onSuccess: async (result) => {
      setProgress(null);
      onOutcome(result);
      if (!result.ok) return;
      await queryClient.invalidateQueries({ queryKey: ["instances", session.webId] });
      await queryClient.invalidateQueries({ queryKey: ["guestStudy"] });
      window.location.hash = routeToHash({ screen: "home", instanceUrl: result.instance.url });
    },
  });

  // Only while the move runs: one that threw (rather than ending in a failed
  // outcome) goes back to the form in the same render as its error, so the
  // form comes back knowing it has one to show.
  if (progress !== null && move.isPending) {
    const labels = stepLabels(t);
    const step = labels[progress.step];
    return (
      <StepProgress
        region={t("guestOffer.progressRegion")}
        steps={GUEST_TRANSFER_STEPS.map((entry) => ({ step: entry, label: labels[entry] }))}
        current={progress.step}
        done={progress.done}
        total={progress.total}
        part={progress.part}
        status={t("guestOffer.running", { step })}
        progressLabel={t("guestOffer.progressLabel")}
        hint={t("guestOffer.keepOpen")}
      />
    );
  }

  if (outcome !== null) {
    return outcome.ok ? (
      <GuestMoved tidied={outcome.tidied} onClose={() => onOutcome(null)} />
    ) : (
      <GuestTransferFailed outcome={outcome} onClose={() => onOutcome(null)} />
    );
  }

  const first = studyQuery.data?.instances[0];
  if (stage === "dismissed" || first === undefined) return null;

  if (stage === "form") {
    return (
      <GuestTransferForm
        useCases={useCases}
        session={session}
        busy={move.isPending}
        error={errorText(move.error)}
        onMove={(target) => move.mutate({ instance: first.instance, target })}
        onBack={() => {
          move.reset();
          setStage("offer");
          setReturned(true);
        }}
      />
    );
  }

  return (
    // Keyed by stage: the discard question is a panel of its own, taking the focus.
    <GuestOfferRegion key={stage} focus={stage === "discard" || returned}>
      {(bodyId) => (
        <>
          <p id={stage === "discard" ? undefined : bodyId}>
            <strong>{t("guestOffer.heading")}</strong>{" "}
            {t("guestOffer.body", { name: first.instance.name, count: first.deckCount })}
          </p>
          {stage === "discard" ? (
            <>
              <p id={bodyId}>{t("guestOffer.discardConfirm")}</p>
              <div class="edit-actions">
                <button
                  class="danger"
                  onClick={() => {
                    if (!discard.isPending) discard.mutate();
                  }}
                  aria-disabled={discard.isPending}
                >
                  {t("guestOffer.discardYes")}
                </button>
                <button
                  onClick={() => {
                    if (discard.isPending) return;
                    discard.reset();
                    setStage("offer");
                    setReturned(true);
                  }}
                  aria-disabled={discard.isPending}
                >
                  {t("guestOffer.cancel")}
                </button>
              </div>
              <ErrorMessage error={errorText(discard.error)} />
            </>
          ) : (
            <div class="edit-actions">
              <button class="primary" onClick={() => setStage("form")}>
                {t("guestOffer.move")}
              </button>
              <button onClick={() => setStage("discard")}>{t("guestOffer.discard")}</button>
              <button onClick={() => setStage("dismissed")}>{t("guestOffer.notNow")}</button>
            </div>
          )}
        </>
      )}
    </GuestOfferRegion>
  );
}

/**
 * The offer's region, described by what it asks (`bodyId`). It takes the
 * focus when `focus`; shown as the page loads, it leaves it be.
 */
function GuestOfferRegion({
  focus,
  children,
}: {
  focus: boolean;
  children: (bodyId: string) => ComponentChildren;
}) {
  const { t } = useI18n();
  const ref = usePanelFocus<HTMLDivElement>(focus);
  const bodyId = useId();
  return (
    <div
      ref={ref}
      class="warning migration"
      role="region"
      aria-label={t("guestOffer.region")}
      aria-describedby={bodyId}
      tabIndex={-1}
    >
      {children(bodyId)}
    </div>
  );
}

/** Where in the user's Pod the study goes, and which type index registers it. */
function GuestTransferForm({
  useCases,
  session,
  busy,
  error,
  onMove,
  onBack,
}: {
  useCases: UseCases;
  session: Session;
  busy: boolean;
  /** Why the last move could not start, or null. */
  error: ErrorText | null;
  onMove: (target: { containerUrl: string; registrationTarget: RegistrationTarget }) => void;
  onBack: () => void;
}) {
  const { t } = useI18n();
  const storagesQuery = useQuery({
    queryKey: ["storages", session.webId],
    queryFn: () => useCases.listStorages(session),
  });
  const instancesQuery = useQuery({
    queryKey: ["instances", session.webId],
    queryFn: () => useCases.listInstances(session),
  });
  const optionsQuery = useQuery({
    queryKey: ["registrationOptions", session.webId],
    queryFn: () => useCases.getRegistrationOptions(session),
  });
  const storages = storagesQuery.data ?? [];
  const [chosenStorage, setChosenStorage] = useState<string | null>(null);
  const storageUrl = chosenStorage ?? storages[0]?.url ?? null;
  // Suggested from the storage until the user writes their own.
  const [typedLocation, setTypedLocation] = useState<string | null>(null);
  const suggested =
    storageUrl === null
      ? ""
      : suggestedGuestLocation(
          storageUrl,
          (instancesQuery.data ?? []).map((instance) => instance.url),
          new Date().toISOString().slice(0, 10),
        );
  const location = typedLocation ?? suggested;
  const [target, setTarget] = useState<RegistrationTarget>("private");
  // Back after a move that threw once under way: the steps gave way, and the
  // error, not the form's heading, is what takes their focus.
  const [cameWithError] = useState(error !== null);
  const ref = usePanelFocus<HTMLElement>(!cameWithError);

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (busy) return;
    onMove({ containerUrl: location.trim(), registrationTarget: target });
  }

  return (
    <section ref={ref} class="guest-transfer" aria-label={t("guestOffer.formHeading")} tabIndex={-1}>
      <h2>{t("guestOffer.formHeading")}</h2>
      <p>{t("guestOffer.explain")}</p>
      <form onSubmit={handleSubmit}>
        {storagesQuery.isSuccess && storages.length === 0 && <p class="hint">{t("guestOffer.noStorage")}</p>}
        {storages.length > 1 && (
          <fieldset>
            <legend>{t("guestOffer.storage")}</legend>
            {storages.map((storage) => (
              <label key={storage.url}>
                <input
                  type="radio"
                  name="guest-storage"
                  checked={storage.url === storageUrl}
                  onChange={() => {
                    setChosenStorage(storage.url);
                    setTypedLocation(null);
                  }}
                />
                {storage.url}
              </label>
            ))}
          </fieldset>
        )}
        <label for="guest-location">{t("guestOffer.location")}</label>
        <input
          id="guest-location"
          type="url"
          value={location}
          onInput={(e) => setTypedLocation(e.currentTarget.value)}
          required
          disabled={busy}
        />
        <RegistrationTargetChooser options={optionsQuery.data ?? null} value={target} onChange={setTarget} />
        <ErrorMessage error={error} focus={cameWithError} />
        <div class="edit-actions">
          <button type="submit" class="primary" aria-disabled={busy}>
            {t("guestOffer.start")}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!busy) onBack();
            }}
            aria-disabled={busy}
          >
            {t("guestOffer.back")}
          </button>
        </div>
      </form>
    </section>
  );
}

/**
 * The move succeeded. It takes no focus: the status line above says so,
 * and the move opens the new instance, whose screen takes the focus.
 */
function GuestMoved({ tidied, onClose }: { tidied: boolean; onClose: () => void }) {
  const { t } = useI18n();
  return (
    <div class="guest-moved">
      {/* Announced by the status line above; this is what is seen. */}
      <p aria-hidden="true">{tidied ? t("guestOffer.moved") : t("guestOffer.movedNotTidied")}</p>
      <button onClick={onClose}>{t("guestOffer.close")}</button>
    </div>
  );
}

/**
 * Where the move failed and that the study is still here. It takes the
 * progress's place and its focus, read out with why as its description;
 * Close hands the focus to the screen.
 */
function GuestTransferFailed({
  outcome,
  onClose,
}: {
  outcome: Extract<GuestTransferOutcome, { ok: false }>;
  onClose: () => void;
}) {
  const { t, errorText } = useI18n();
  const ref = usePanelFocus<HTMLDivElement>();
  const whyId = useId();
  return (
    <div
      ref={ref}
      class="warning migration"
      role="region"
      aria-label={t("guestOffer.failedRegion")}
      aria-describedby={whyId}
      tabIndex={-1}
    >
      <div id={whyId} class="failure-why">
        <strong>{t("guestOffer.failedWhile", { step: stepLabels(t)[outcome.step].toLowerCase() })}</strong>{" "}
        {errorText(outcome.error)}
      </div>
      <p>
        {t("guestOffer.stillHere")}{" "}
        {outcome.cleanedUp
          ? t("guestOffer.copyRemoved")
          : t("guestOffer.copyLeft", { url: String(outcome.leftoverUrl) })}
      </p>
      <div class="edit-actions">
        <button onClick={onClose}>{t("guestOffer.close")}</button>
      </div>
    </div>
  );
}
