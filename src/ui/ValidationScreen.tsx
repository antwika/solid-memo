import type {
  DocumentReport,
  SubjectReport,
  ValidationReport,
} from "../domain/validation";
import { ExternalLink } from "./ExternalLink";

function documentsOf(count: number): string {
  return count === 1 ? "1 document" : `${count} documents`;
}

/** The summary line: "All 9 documents conform" or "3 violations in 2 documents". */
export function summaryOf(report: ValidationReport): string {
  const checked = report.documents.filter((d) => d.status === "checked");
  if (report.conforms) {
    return checked.length === 1
      ? "The 1 document conforms."
      : `All ${checked.length} documents conform.`;
  }
  const failing = checked.filter((d) =>
    d.subjects.some(
      (s) =>
        s.status === "checked" &&
        s.violations.some((v) => v.severity === "violation"),
    ),
  ).length;
  return `${report.violationCount === 1 ? "1 violation" : `${report.violationCount} violations`} in ${documentsOf(failing)}.`;
}

export function ValidationScreen({ report }: { report: ValidationReport }) {
  return (
    <div class="validation">
      <p class={report.conforms ? "hint" : "warning"} role="status">
        {summaryOf(report)}
      </p>
      {report.documents.map((document) => (
        <DocumentView key={document.url} document={document} />
      ))}
    </div>
  );
}

function DocumentView({ document }: { document: DocumentReport }) {
  return (
    <section class="thing">
      <h3>
        <ExternalLink url={document.url} />
      </h3>
      {document.status === "missing" ? (
        <p class="hint">Not created yet.</p>
      ) : document.subjects.length === 0 ? (
        <p class="hint">No subjects.</p>
      ) : (
        <ul>
          {document.subjects.map((subject) => (
            <li key={subject.url}>
              <SubjectView subject={subject} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function SubjectView({ subject }: { subject: SubjectReport }) {
  const name = <ExternalLink url={subject.url} />;
  switch (subject.status) {
    case "untyped":
      return <>{name} — not a Solid Memo subject.</>;
    case "newer":
      return (
        <>
          {name} — {subject.shape} format {subject.version} is newer than
          this app knows (up to {subject.latest}); skipped.
        </>
      );
    case "checked":
      if (subject.violations.length === 0) {
        return (
          <>
            {name} — conforms to {subject.shape} format {subject.version}.
          </>
        );
      }
      return (
        <>
          {name} — {subject.shape} format {subject.version}:
          <table>
            <thead>
              <tr>
                <th scope="col">Severity</th>
                <th scope="col">Property</th>
                <th scope="col">Message</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {subject.violations.map((violation, index) => (
                <tr key={index}>
                  <td>{violation.severity}</td>
                  <td>
                    {violation.path === undefined ? (
                      "(the subject)"
                    ) : (
                      <ExternalLink url={violation.path} />
                    )}
                  </td>
                  <td>{violation.message}</td>
                  <td>{violation.value ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
  }
}
