import type { UseCases } from "../application/useCases";
import type { Instance } from "../domain/instance";
import type { InvalidDataPolicy } from "../domain/invalidDataPolicy";
import type { ValidationReport } from "../domain/validation";
import { RepairContainer } from "./RepairContainer";
import { routeToHash } from "./router";

/**
 * Tells the user that data in the instance does not conform, and what
 * the app does about it under their policy, with the repair a click
 * away. Under "block the instance" the notice takes the workspace's
 * place; otherwise it sits above it.
 */
export function DataCheckNotice({
  useCases,
  instance,
  report,
  policy,
  setAside,
}: {
  useCases: UseCases;
  instance: Instance;
  report: ValidationReport;
  policy: InvalidDataPolicy;
  /** Names of the decks set aside, under "set invalid data aside". */
  setAside: string[];
}) {
  const preferences = routeToHash({ screen: "preferences", instanceUrl: instance.url });
  const consequence =
    policy === "block-instance"
      ? "Solid Memo will not use this instance until it is repaired."
      : policy === "block-subject"
        ? setAside.length === 0
          ? "The rest keeps working."
          : `${setAside.join(", ")} ${setAside.length === 1 ? "is" : "are"} set aside until repaired; the rest keeps working.`
        : "Solid Memo keeps working with it.";
  return (
    <div class="warning data-check" role="region" aria-label="Data check">
      <p>
        <strong>Some data in {instance.name} does not conform to Solid Memo's shapes.</strong>{" "}
        {consequence} What happens with invalid data is set in <a href={preferences}>Preferences</a>.
      </p>
      {policy === "block-instance" ? (
        <RepairContainer useCases={useCases} instance={instance} report={report} />
      ) : (
        <details>
          <summary>Repair</summary>
          <RepairContainer useCases={useCases} instance={instance} report={report} />
        </details>
      )}
    </div>
  );
}
