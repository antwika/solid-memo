import type { DatasetCore } from "@rdfjs/types";
import SHACLValidator from "rdf-validate-shacl";
import type { Violation } from "../../domain/validation";

/**
 * The SHACL engine behind every validation Solid Memo does: one subject
 * checked against one node shape. This is the only module that imports
 * rdf-validate-shacl (see docs/boundaries.md); it is loaded lazily by the
 * app so the library ships in its own chunk.
 */

export type { Violation };

export interface ShapeEngine {
  /** Every result of checking `focusNode` against `shapeIri`; empty when it conforms. */
  validateNode(
    data: DatasetCore,
    focusNode: string,
    shapeIri: string,
  ): Promise<Violation[]>;
}

const SH = "http://www.w3.org/ns/shacl#";

function localName(iri: string): string {
  return iri.slice(iri.lastIndexOf("#") + 1);
}

export function createEngine(shapes: DatasetCore): ShapeEngine {
  const validator = new SHACLValidator(shapes);
  const { namedNode } = validator.factory;
  return {
    async validateNode(data, focusNode, shapeIri) {
      // validateNode keeps adding to one report; start each check afresh.
      validator.validationEngine.initReport();
      const report = await validator.validateNode(
        data,
        namedNode(focusNode),
        namedNode(shapeIri),
      );
      return report.results
        .map((result): Violation => {
          const constraint = localName(result.sourceConstraintComponent.value).replace(
            /ConstraintComponent$/,
            "",
          );
          const path = result.path?.value;
          const value = result.value?.value;
          const message = result.message.map((term) => term.value).join(" ");
          return {
            ...(path === undefined ? {} : { path }),
            message: message === "" ? `${constraint} constraint failed.` : message,
            ...(value === undefined ? {} : { value }),
            severity:
              result.severity.value === `${SH}Warning`
                ? "warning"
                : result.severity.value === `${SH}Info`
                  ? "info"
                  : "violation",
            constraint,
          };
        })
        .sort(
          (a, b) =>
            (a.path ?? "").localeCompare(b.path ?? "") ||
            a.message.localeCompare(b.message),
        );
    },
  };
}
