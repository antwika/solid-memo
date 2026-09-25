import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Instance } from "../domain/instance";
import { errorMessage } from "./errorMessage";
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
  const reportQuery = useQuery({
    queryKey: ["validation", instance.url],
    queryFn: () => useCases.validateInstance(instance.url),
    staleTime: Infinity,
  });

  return (
    <>
      <h2>Validation of {instance.name}</h2>
      <p>
        <button
          onClick={() => reportQuery.refetch()}
          disabled={reportQuery.isFetching}
        >
          {reportQuery.isFetching ? "Validating…" : "Validate again"}
        </button>
      </p>
      {reportQuery.isPending && <Loading label="Validating…" />}
      {reportQuery.error && (
        <p class="error">{errorMessage(reportQuery.error)}</p>
      )}
      {reportQuery.data && <ValidationScreen report={reportQuery.data} />}
    </>
  );
}
