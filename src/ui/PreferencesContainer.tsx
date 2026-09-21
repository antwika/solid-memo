import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Instance } from "../domain/instance";
import type { StudyPreferences } from "../domain/preferences";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";
import { PreferencesScreen } from "./PreferencesScreen";

/** Owns the preferences query/mutation for one instance. */
export function PreferencesContainer({
  useCases,
  instance,
  onBack,
}: {
  useCases: UseCases;
  instance: Instance;
  onBack: () => void;
}) {
  const queryClient = useQueryClient();

  const preferencesQuery = useQuery({
    queryKey: ["preferences", instance.url],
    queryFn: () => useCases.getPreferences(instance.url),
  });

  const saveMutation = useMutation({
    mutationFn: (preferences: StudyPreferences) =>
      useCases.savePreferences(instance.url, preferences),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["preferences", instance.url],
      });
      // A successful save returns the user to the deck list.
      onBack();
    },
  });

  if (preferencesQuery.error) {
    return <p class="error">{errorMessage(preferencesQuery.error)}</p>;
  }
  if (preferencesQuery.data === undefined) {
    return <Loading label="Loading preferences…" />;
  }

  return (
    <PreferencesScreen
      preferences={preferencesQuery.data}
      busy={saveMutation.isPending}
      error={errorMessage(saveMutation.error)}
      onSave={(preferences) => saveMutation.mutate(preferences)}
    />
  );
}
