import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Instance } from "../domain/instance";
import { isPlanEmpty } from "../domain/migration";
import { errorMessage } from "./errorMessage";
import { describeMigrated, MigrationNotice } from "./MigrationNotice";

/**
 * Checks an instance for documents in an older format and, when there
 * are any, shows the notice that lets the user update them. The check
 * reads every document once per session (the plan is kept until a
 * migration runs); a failed check shows nothing, since the app works on
 * the old format and the deck list reports pod trouble on its own.
 */
export function MigrationContainer({
  useCases,
  instance,
}: {
  useCases: UseCases;
  instance: Instance;
}) {
  const queryClient = useQueryClient();

  const planQuery = useQuery({
    queryKey: ["migration", instance.url],
    queryFn: () => useCases.planMigration(instance.url),
    staleTime: Infinity,
  });

  const migrateMutation = useMutation({
    mutationFn: () => useCases.migrateInstance(instance.url),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["decks"] });
      await queryClient.invalidateQueries({ queryKey: ["cards"] });
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      await queryClient.invalidateQueries({
        queryKey: ["preferences", instance.url],
      });
      await queryClient.invalidateQueries({
        queryKey: ["migration", instance.url],
      });
    },
    onError: () =>
      queryClient.invalidateQueries({ queryKey: ["migration", instance.url] }),
  });

  const plan = planQuery.data;
  if (plan === undefined) return null;
  if (isPlanEmpty(plan)) {
    return migrateMutation.isSuccess ? (
      <p class="hint" role="status">
        Updated {describeMigrated(migrateMutation.data)} to the current
        format.
      </p>
    ) : null;
  }
  return (
    <MigrationNotice
      plan={plan}
      busy={migrateMutation.isPending}
      error={errorMessage(migrateMutation.error)}
      onMigrate={() => migrateMutation.mutate()}
    />
  );
}
