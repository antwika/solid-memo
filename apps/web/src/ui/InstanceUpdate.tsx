import { UPDATE_STEP_LABELS, type UpdateOutcome, type UpdateProgress } from "@solid-memo/domain/instanceUpdate";

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
  return (
    <div class="warning migration" role="region" aria-label="Start the update">
      <p>
        <strong>How the update keeps your data safe.</strong> Solid Memo copies {instanceName} into a new
        folder in your pod, updates the copy, and checks it. Only if every check passes does it switch
        over to the copy. Your current data is not changed: it is kept as a backup, which you can restore
        or delete in Preferences. Who you shared it with is copied along. The instance gets a new address,
        so bookmarks to it lead to the instance picker. If anything goes wrong, the copy is removed and
        nothing else changes.
      </p>
      <div class="edit-actions">
        <button class="primary" onClick={onStart}>
          Start the update
        </button>
        <button onClick={onCancel}>Not now</button>
      </div>
    </div>
  );
}

/** While the update runs: which step it is on, and how far along it is. It cannot be stopped half-way. */
export function InstanceUpdateProgress({ progress }: { progress: UpdateProgress }) {
  const label = UPDATE_STEP_LABELS[progress.step];
  return (
    <div class="warning migration" role="region" aria-label="Updating">
      <p>
        {progress.step === "copy" && progress.total > 0
          ? `${label}… (${progress.done} of ${progress.total})`
          : `${label}…`}
      </p>
      <progress value={progress.done} max={Math.max(progress.total, 1)} aria-label="Update progress" />
      <p class="hint">Keep this page open until the update is done.</p>
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
  return (
    <div class="warning migration" role="region" aria-label="Update failed">
      <p>
        <strong>The update failed while {UPDATE_STEP_LABELS[outcome.step].toLowerCase()}:</strong>{" "}
        {outcome.error}
      </p>
      <p>
        No changes were made to your data.{" "}
        {outcome.cleanedUp
          ? "The partial copy was removed."
          : `The partial copy could not be removed; it is at ${outcome.leftoverUrl}.`}
      </p>
      <div class="edit-actions">
        {!outcome.cleanedUp && (
          <button onClick={onRemoveLeftover} disabled={busy}>
            Try removing it again
          </button>
        )}
        <button onClick={onDismiss} disabled={busy}>
          Close
        </button>
      </div>
    </div>
  );
}
