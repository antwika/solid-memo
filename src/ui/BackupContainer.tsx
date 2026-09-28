import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Instance } from "../domain/instance";
import type { Session } from "../domain/session";
import { errorMessage } from "./errorMessage";
import { ExternalLink } from "./ExternalLink";
import { formatDate } from "./formatDate";

/**
 * The previous version of an instance, kept by its last update as a
 * backup (docs/migrations.md): restore it — switch back to it and delete
 * the updated instance — or delete it. Each is confirmed first. Renders
 * nothing when there is no backup (any more).
 */
export function BackupContainer({
  useCases,
  session,
  instance,
  onRestored,
}: {
  useCases: UseCases;
  session: Session;
  instance: Instance;
  /** Switched back: the instance lives at the backup's address again. */
  onRestored: (instance: Instance) => void;
}) {
  const queryClient = useQueryClient();
  const backupQuery = useQuery({
    queryKey: ["backup", instance.url],
    queryFn: () => useCases.readBackup(instance),
  });

  const restoreMutation = useMutation({
    mutationFn: () => useCases.restoreBackup(session, instance),
    onSuccess: async (restored) => {
      await queryClient.invalidateQueries({ queryKey: ["instances"] });
      onRestored(restored);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => useCases.deleteBackup(instance),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["backup", instance.url] }),
  });

  const backup = backupQuery.data;
  if (backup === undefined || backup === null) return null;
  const busy = restoreMutation.isPending || deleteMutation.isPending;
  return (
    <section class="backup" aria-label="Previous version">
      <h3>Previous version</h3>
      <p>
        The last format update kept your data as it was before
        {backup.replacedAt === undefined ? "" : ` (${formatDate(backup.replacedAt)})`} at{" "}
        <ExternalLink url={backup.url} />.
      </p>
      <div class="edit-actions">
        <button
          onClick={() => {
            if (
              window.confirm(
                `Go back to the previous version of ${instance.name}? What you studied since the update is lost with the updated version.`,
              )
            ) {
              restoreMutation.mutate();
            }
          }}
          disabled={busy}
        >
          {restoreMutation.isPending ? "Restoring…" : "Restore previous version"}
        </button>
        <button
          class="danger"
          onClick={() => {
            if (window.confirm("Delete the previous version for good? This cannot be undone.")) {
              deleteMutation.mutate();
            }
          }}
          disabled={busy}
        >
          {deleteMutation.isPending ? "Deleting…" : "Delete backup"}
        </button>
      </div>
      {(restoreMutation.error || deleteMutation.error) && (
        <p class="error">{errorMessage(restoreMutation.error ?? deleteMutation.error)}</p>
      )}
    </section>
  );
}
