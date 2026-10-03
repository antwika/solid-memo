import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Instance } from "@solid-memo/domain/instance";
import type { UpdateOutcome, UpdateProgress } from "@solid-memo/domain/instanceUpdate";
import { isPlanEmpty } from "@solid-memo/domain/migration";
import type { Session } from "@solid-memo/domain/session";
import { ErrorMessage } from "./ErrorMessage";
import { useI18n } from "./i18n";
import { InstanceUpdateConfirm, InstanceUpdateFailure, InstanceUpdateProgress } from "./InstanceUpdate";
import { MigrationNotice } from "./MigrationNotice";
import { usePanelFocus } from "./panelFocus";

/**
 * Checks an instance for documents in an older format and, when there
 * are any, offers the update (docs/migrations.md): a confirmation of how
 * it keeps the data safe, then its progress, then either the new
 * instance or what went wrong. The check reads every document once per
 * session; a failed check shows nothing, since the app works on the old
 * format and the deck list reports pod trouble on its own. An update
 * left half-done by a closed tab is offered for cleanup. Each step takes
 * the focus from the one it replaces; Cancel gives it back to the notice.
 */
export function MigrationContainer({
  useCases,
  session,
  instance,
  onUpdated,
}: {
  useCases: UseCases;
  /** Whose pod it is: the publisher of a catalogue the update writes. */
  session: Session;
  instance: Instance;
  /** The update switched over: the instance now lives at a new address. */
  onUpdated: (instance: Instance) => void;
}) {
  const { t, errorText } = useI18n();
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = useState(false);
  /** The user came back to the notice, from the confirmation or a failure: it takes the focus. */
  const [returned, setReturned] = useState(false);
  const [progress, setProgress] = useState<UpdateProgress | null>(null);
  const [failure, setFailure] = useState<Extract<UpdateOutcome, { ok: false }> | null>(null);

  const planQuery = useQuery({
    queryKey: ["migration", instance.url],
    queryFn: () => useCases.planMigration(instance.url),
    staleTime: Infinity,
  });

  const interruptedQuery = useQuery({
    queryKey: ["interruptedUpdate", instance.url],
    queryFn: () => useCases.findInterruptedUpdate(instance),
    staleTime: Infinity,
  });

  const updateMutation = useMutation({
    mutationFn: () => useCases.updateInstance(session, instance, setProgress),
    onSuccess: async (outcome) => {
      setProgress(null);
      if (!outcome.ok) {
        setFailure(outcome);
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ["instances"] });
      onUpdated({ url: outcome.instanceUrl, name: instance.name });
    },
    onError: () => setProgress(null),
  });

  const cleanupMutation = useMutation({
    mutationFn: () => useCases.removeInterruptedUpdate(instance),
    onSuccess: async () => {
      setFailure(null);
      await queryClient.invalidateQueries({ queryKey: ["interruptedUpdate", instance.url] });
    },
  });

  const interrupted = interruptedQuery.data ?? null;
  const plan = planQuery.data;

  if (progress !== null) return <InstanceUpdateProgress progress={progress} />;
  if (failure !== null) {
    return (
      <InstanceUpdateFailure
        outcome={failure}
        busy={cleanupMutation.isPending}
        onRemoveLeftover={() => cleanupMutation.mutate()}
        onDismiss={() => {
          setFailure(null);
          setReturned(true);
        }}
      />
    );
  }
  if (interrupted !== null) {
    return (
      <InterruptedUpdate
        message={t("migration.interrupted", { name: instance.name, url: interrupted })}
        busy={cleanupMutation.isPending}
        onRemove={() => cleanupMutation.mutate()}
      >
        <ErrorMessage error={errorText(cleanupMutation.error)} />
      </InterruptedUpdate>
    );
  }
  if (plan === undefined || isPlanEmpty(plan)) return null;
  if (confirming) {
    return (
      <InstanceUpdateConfirm
        instanceName={instance.name}
        onStart={() => {
          setConfirming(false);
          setProgress({ step: "stage", done: 0, total: 0 });
          updateMutation.mutate();
        }}
        onCancel={() => {
          setConfirming(false);
          setReturned(true);
        }}
      />
    );
  }
  return (
    <MigrationNotice
      plan={plan}
      busy={updateMutation.isPending}
      error={errorText(updateMutation.error)}
      focus={returned}
      onMigrate={() => setConfirming(true)}
    />
  );
}

/**
 * An update a closed tab left half-done, and the button that removes what
 * it left. Once removed, the panel goes and the focus moves to the
 * screen; while it works, the button keeps the focus (aria-disabled).
 */
function InterruptedUpdate({
  message,
  busy,
  onRemove,
  children,
}: {
  message: string;
  busy: boolean;
  onRemove: () => void;
  /** The cleanup's error, if any. */
  children: ComponentChildren;
}) {
  const { t } = useI18n();
  const ref = usePanelFocus<HTMLDivElement>(false);
  return (
    <div ref={ref} class="warning migration" role="region" aria-label={t("migration.interruptedRegion")} tabIndex={-1}>
      <p>{message}</p>
      <button
        onClick={() => {
          if (!busy) onRemove();
        }}
        aria-disabled={busy}
      >
        {busy ? t("migration.removing") : t("migration.removeIt")}
      </button>
      {children}
    </div>
  );
}
