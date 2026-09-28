import type { Deck } from "./deck";
import type { ShapeName } from "./shapes/generated";

/**
 * What checking an instance's documents against Solid Memo's shapes and
 * the DCAT-AP profile found (see docs/validation.md). The app checks an
 * instance whenever it opens it and acts on what it finds according to
 * the user's invalid data policy.
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
  /** The published profile the result comes from, when not Solid Memo's own shapes. */
  profile?: "dcat-ap";
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
  | { url: string; status: "untyped" }
  /** Not a Solid Memo subject, but one the DCAT-AP profile checks (a licence, say). */
  | { url: string; status: "profiled"; violations: Violation[] };

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
    .flatMap((subject) =>
      subject.status === "checked" || subject.status === "profiled" ? subject.violations : [],
    )
    .filter((violation) => violation.severity === "violation").length;
  return { instanceUrl, documents, violationCount, conforms: violationCount === 0 };
}

function failing(subject: SubjectReport): boolean {
  return (
    (subject.status === "checked" || subject.status === "profiled") &&
    subject.violations.some((violation) => violation.severity === "violation")
  );
}

/** The subjects with a violation, by URL. */
export function failingSubjectUrls(report: ValidationReport): Set<string> {
  return new Set(
    report.documents.flatMap((document) => document.subjects.filter(failing).map((s) => s.url)),
  );
}

/** The documents with a violation, by URL. */
export function failingDocumentUrls(report: ValidationReport): Set<string> {
  return new Set(
    report.documents.filter((document) => document.subjects.some(failing)).map((d) => d.url),
  );
}

/**
 * The decks with invalid data — their catalog entry, or anything in
 * their cards or reviews document — which the "set invalid data aside"
 * policy leaves out until they are repaired. By deck URL.
 */
export function setAsideDecks(report: ValidationReport, decks: readonly Deck[]): Set<string> {
  const subjects = failingSubjectUrls(report);
  const documents = failingDocumentUrls(report);
  return new Set(
    decks
      .filter(
        (deck) =>
          subjects.has(deck.url) ||
          documents.has(deck.cardsDocumentUrl) ||
          documents.has(deck.reviewsDocumentUrl),
      )
      .map((deck) => deck.url),
  );
}
