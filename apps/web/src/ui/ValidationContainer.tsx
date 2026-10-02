import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Instance } from "@solid-memo/domain/instance";
import { useI18n } from "./i18n";
import { Loading } from "./Loading";
import { ValidationScreen } from "./ValidationScreen";

/**
 * Developer tool: the instance's documents checked against Solid Memo's
 * shapes (docs/validation.md). Reads every document once; "Validate
 * again" reads them afresh.
 */
export function ValidationContainer({
  useCases,
  instance,
}: {
  useCases: UseCases;
  instance: Instance;
}) {
  const { t, errorText } = useI18n();
  const reportQuery = useQuery({
    queryKey: ["validation", instance.url],
    queryFn: () => useCases.validateInstance(instance.url),
    staleTime: Infinity,
  });

  return (
    <>
      <h2>{t("validation.heading", { name: instance.name })}</h2>
      <p>
        <button
          onClick={() => reportQuery.refetch()}
          disabled={reportQuery.isFetching}
        >
          {reportQuery.isFetching ? t("validation.validating") : t("validation.validateAgain")}
        </button>
      </p>
      {reportQuery.isPending && <Loading label={t("validation.validating")} />}
      {reportQuery.error && (
        <p class="error">{errorText(reportQuery.error)}</p>
      )}
      {reportQuery.data && <ValidationScreen report={reportQuery.data} />}
    </>
  );
}
