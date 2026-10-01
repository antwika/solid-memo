import type { UpdateOutcome, UpdateProgress, UpdateStep } from "@solid-memo/domain/instanceUpdate";
import { useI18n, type I18n } from "./i18n";

/** What each step of the update does, as the progress line names it. */
function stepLabels(t: I18n["t"]): Record<UpdateStep, string> {
  return {
    stage: t("instanceUpdate.step.stage"),
    access: t("instanceUpdate.step.access"),
    copy: t("instanceUpdate.step.copy"),
    upgrade: t("instanceUpdate.step.upgrade"),
    validate: t("instanceUpdate.step.validate"),
    verify: t("instanceUpdate.step.verify"),
    switch: t("instanceUpdate.step.switch"),
  };
}

/**
 * Before the update starts: how it keeps the user's data safe, and what
 * changes for them. Nothing happens until they start it.
 */
export function InstanceUpdateConfirm({
  instanceName,
  onStart,
  onCancel,
}: {
  instanceName: string;
  onStart: () => void;
  onCancel: () => void;
}) {
  const { t } = useI18n();
  return (
    <div class="warning migration" role="region" aria-label={t("instanceUpdate.confirmRegion")}>
      <p>
        <strong>{t("instanceUpdate.confirmHeading")}</strong>{" "}
        {t("instanceUpdate.confirmBody", { name: instanceName })}
      </p>
      <div class="edit-actions">
        <button class="primary" onClick={onStart}>
          {t("instanceUpdate.start")}
        </button>
        <button onClick={onCancel}>{t("instanceUpdate.notNow")}</button>
      </div>
    </div>
  );
}

/** While the update runs: which step it is on, and how far along it is. It cannot be stopped half-way. */
export function InstanceUpdateProgress({ progress }: { progress: UpdateProgress }) {
  const { t } = useI18n();
  const step = stepLabels(t)[progress.step];
  return (
    <div class="warning migration" role="region" aria-label={t("instanceUpdate.progressRegion")}>
      <p>
        {progress.step === "copy" && progress.total > 0
          ? t("instanceUpdate.runningCount", { step, done: progress.done, total: progress.total })
          : t("instanceUpdate.running", { step })}
      </p>
      <progress
        value={progress.done}
        max={Math.max(progress.total, 1)}
        aria-label={t("instanceUpdate.progressLabel")}
      />
      <p class="hint">{t("instanceUpdate.keepOpen")}</p>
    </div>
  );
}

/** When the update failed: where, why, and that the user's data is as it was. */
export function InstanceUpdateFailure({
  outcome,
  busy,
  onRemoveLeftover,
  onDismiss,
}: {
  outcome: Extract<UpdateOutcome, { ok: false }>;
  busy: boolean;
  onRemoveLeftover: () => void;
  onDismiss: () => void;
}) {
  const { t } = useI18n();
  return (
    <div class="warning migration" role="region" aria-label={t("instanceUpdate.failedRegion")}>
      <p>
        <strong>{t("instanceUpdate.failedWhile", { step: stepLabels(t)[outcome.step].toLowerCase() })}</strong>{" "}
        {outcome.error}
      </p>
      <p>
        {t("instanceUpdate.noChanges")}{" "}
        {outcome.cleanedUp
          ? t("instanceUpdate.copyRemoved")
          : t("instanceUpdate.copyLeft", { url: String(outcome.leftoverUrl) })}
      </p>
      <div class="edit-actions">
        {!outcome.cleanedUp && (
          <button onClick={onRemoveLeftover} disabled={busy}>
            {t("instanceUpdate.tryAgain")}
          </button>
        )}
        <button onClick={onDismiss} disabled={busy}>
          {t("instanceUpdate.close")}
        </button>
      </div>
    </div>
  );
}
