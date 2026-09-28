import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Instance } from "@solid-memo/domain/instance";
import { describeRepair, type Unrepairable } from "@solid-memo/domain/repair";
import type { ValidationReport } from "@solid-memo/domain/validation";
import { errorMessage } from "./errorMessage";
import { ExternalLink } from "./ExternalLink";
import { summaryOf, ValidationScreen } from "./ValidationScreen";

/**
 * What an instance check found, and the way out (see docs/validation.md):
 * one button repairs every problem with a safe answer; each problem left
 * is named, with its document linked, and can be removed — the user's
 * call, confirmed first. The full report is a click away.
 */
export function RepairContainer({
  useCases,
  instance,
  report,
}: {
  useCases: UseCases;
  instance: Instance;
  report: ValidationReport;
}) {
  const queryClient = useQueryClient();
  const plan = useCases.planRepair(report);

  const repairMutation = useMutation({
    mutationFn: (repairs: Parameters<UseCases["applyRepairs"]>[0]) => useCases.applyRepairs(repairs),
    onSuccess: async () => {
      for (const key of ["decks", "cards", "reviews", "preferences", "migration"]) {
        await queryClient.invalidateQueries({ queryKey: [key] });
      }
      await queryClient.invalidateQueries({ queryKey: ["validation", instance.url] });
    },
  });

  function remove(problem: Unrepairable) {
    if (window.confirm(`Remove <${problem.subjectUrl}> from your pod? This cannot be undone.`)) {
      repairMutation.mutate([
        { kind: "remove-subject", documentUrl: problem.documentUrl, subjectUrl: problem.subjectUrl, version: 1 },
      ]);
    }
  }

  const busy = repairMutation.isPending;
  return (
    <div class="repair">
      <p>{summaryOf(report)}</p>
      {plan.repairs.length > 0 && (
        <>
          <p>Solid Memo can repair these:</p>
          <ul>
            {plan.repairs.map((repair) => (
              <li key={`${repair.kind} ${repair.subjectUrl}`}>
                {describeRepair(repair)}: <ExternalLink url={repair.subjectUrl} />
              </li>
            ))}
          </ul>
          <button class="primary" onClick={() => repairMutation.mutate(plan.repairs)} disabled={busy}>
            {busy
              ? "Repairing…"
              : plan.repairs.length === 1
                ? "Repair 1 problem"
                : `Repair ${plan.repairs.length} problems`}
          </button>
        </>
      )}
      {plan.unrepairable.length > 0 && (
        <>
          <p>These need your decision: fix them in the document, or remove them.</p>
          <ul>
            {plan.unrepairable.map((problem) => (
              <li key={problem.subjectUrl}>
                <ExternalLink url={problem.subjectUrl} /> in <ExternalLink url={problem.documentUrl} />:{" "}
                {problem.messages.join(" ")}{" "}
                <button class="danger" onClick={() => remove(problem)} disabled={busy}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {repairMutation.error && <p class="error">{errorMessage(repairMutation.error)}</p>}
      <details>
        <summary>The full report</summary>
        <ValidationScreen report={report} />
      </details>
    </div>
  );
}
