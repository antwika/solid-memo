import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Instance } from "@solid-memo/domain/instance";
import type { StudyPreferences } from "@solid-memo/domain/preferences";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";
import { PreferencesScreen } from "./PreferencesScreen";
import { useI18n } from "./i18n";

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
  const { t } = useI18n();
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
      queryClient.removeQueries({ queryKey: ["studyQueue"] });
      onBack();
    },
  });

  if (preferencesQuery.error) {
    return <p class="error">{errorMessage(preferencesQuery.error)}</p>;
  }
  if (preferencesQuery.data === undefined) {
    return <Loading label={t("preferences.loading")} />;
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
