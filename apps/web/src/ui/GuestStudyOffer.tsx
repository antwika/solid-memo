import { useState } from "preact/hooks";
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
import { useI18n, type I18n } from "./i18n";
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
 * Nothing at all when no guest studied in this browser.
 */
export function GuestStudyOffer({ useCases, session }: { useCases: UseCases; session: Session }) {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [stage, setStage] = useState<Stage>("offer");
  const [progress, setProgress] = useState<GuestTransferProgress | null>(null);
  const [outcome, setOutcome] = useState<GuestTransferOutcome | null>(null);

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
    onSuccess: async (result) => {
      setProgress(null);
      setOutcome(result);
      if (!result.ok) return;
      await queryClient.invalidateQueries({ queryKey: ["instances", session.webId] });
      await queryClient.invalidateQueries({ queryKey: ["guestStudy"] });
      window.location.hash = routeToHash({ screen: "home", instanceUrl: result.instance.url });
    },
  });

  if (progress !== null) {
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
        status={
          progress.part === undefined
            ? t("guestOffer.running", { step })
            : t("guestOffer.runningCount", { step, done: progress.part.done, total: progress.part.total })
        }
        progressLabel={t("guestOffer.progressLabel")}
        hint={t("guestOffer.keepOpen")}
      />
    );
  }

  if (outcome !== null) {
    return <GuestTransferResult outcome={outcome} onClose={() => setOutcome(null)} />;
  }

  const first = studyQuery.data?.instances[0];
  if (stage === "dismissed" || first === undefined) return null;

  if (stage === "form") {
    return (
      <GuestTransferForm
        useCases={useCases}
        session={session}
        busy={move.isPending}
        onMove={(target) => move.mutate({ instance: first.instance, target })}
        onBack={() => setStage("offer")}
      />
    );
  }

  return (
    <div class="warning migration" role="region" aria-label={t("guestOffer.region")}>
      <p>
        <strong>{t("guestOffer.heading")}</strong>{" "}
        {t("guestOffer.body", { name: first.instance.name, count: first.deckCount })}
      </p>
      {stage === "discard" ? (
        <>
          <p>{t("guestOffer.discardConfirm")}</p>
          <div class="edit-actions">
            <button class="danger" onClick={() => discard.mutate()} disabled={discard.isPending}>
              {t("guestOffer.discardYes")}
            </button>
            <button onClick={() => setStage("offer")} disabled={discard.isPending}>
              {t("guestOffer.cancel")}
            </button>
          </div>
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
    </div>
  );
}

/** Where in the user's Pod the study goes, and which type index registers it. */
function GuestTransferForm({
  useCases,
  session,
  busy,
  onMove,
  onBack,
}: {
  useCases: UseCases;
  session: Session;
  busy: boolean;
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

  function handleSubmit(event: Event) {
    event.preventDefault();
    onMove({ containerUrl: location.trim(), registrationTarget: target });
  }

  return (
    <section class="guest-transfer" aria-label={t("guestOffer.formHeading")}>
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
        <div class="edit-actions">
          <button type="submit" class="primary" disabled={busy}>
            {t("guestOffer.start")}
          </button>
          <button type="button" onClick={onBack} disabled={busy}>
            {t("guestOffer.back")}
          </button>
        </div>
      </form>
    </section>
  );
}

/** How the move ended: the study in the Pod, or where it failed and that the study is still here. */
function GuestTransferResult({ outcome, onClose }: { outcome: GuestTransferOutcome; onClose: () => void }) {
  const { t, errorText } = useI18n();
  if (outcome.ok) {
    return (
      <div class="guest-moved" role="status">
        <p>{outcome.tidied ? t("guestOffer.moved") : t("guestOffer.movedNotTidied")}</p>
        <button onClick={onClose}>{t("guestOffer.close")}</button>
      </div>
    );
  }
  return (
    <div class="warning migration" role="region" aria-label={t("guestOffer.failedRegion")}>
      <p>
        <strong>{t("guestOffer.failedWhile", { step: stepLabels(t)[outcome.step].toLowerCase() })}</strong>{" "}
        {errorText(outcome.error)}
      </p>
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
