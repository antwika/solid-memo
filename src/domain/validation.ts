import type { ShapeName } from "./shapes/generated";

/**
 * What checking an instance's documents against Solid Memo's shapes
 * found (see docs/validation.md). A developer tool: the app reads and
 * writes the same documents leniently; this is the strict view.
 */

export interface Violation {
  /** The predicate the result is about; absent for a rule on the subject itself. */
  path?: string;
  message: string;
  /** The offending value, when the result names one. */
  value?: string;
  severity: "violation" | "warning" | "info";
  /** The SHACL constraint component, e.g. "MinCount", "NodeKind", "Xone". */
  constraint: string;
}

export type SubjectReport =
  /** Checked against the shape of its class and stored version. */
  | {
      url: string;
      status: "checked";
      shape: ShapeName;
      version: number;
      violations: Violation[];
    }
  /** Stored in a format newer than this app knows: left alone. */
  | { url: string; status: "newer"; shape: ShapeName; version: number; latest: number }
  /** Not a Solid Memo subject: listed so strays are visible, not checked. */
  | { url: string; status: "untyped" };

export interface DocumentReport {
  url: string;
  /** "missing" is a document the instance has not created yet: not a problem. */
  status: "missing" | "checked";
  subjects: SubjectReport[];
}

export interface ValidationReport {
  instanceUrl: string;
  documents: DocumentReport[];
  /** Results of severity "violation" across every document. */
  violationCount: number;
  conforms: boolean;
}

export function summarize(instanceUrl: string, documents: DocumentReport[]): ValidationReport {
  const violationCount = documents
    .flatMap((document) => document.subjects)
    .flatMap((subject) => (subject.status === "checked" ? subject.violations : []))
    .filter((violation) => violation.severity === "violation").length;
  return { instanceUrl, documents, violationCount, conforms: violationCount === 0 };
}
