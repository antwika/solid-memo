import type {
  DocumentReport,
  SubjectReport,
  ValidationReport,
  Violation,
} from "@solid-memo/domain/validation";
import { ExternalLink } from "./ExternalLink";
import { useI18n, type I18n } from "./i18n";

/** The summary line: "All 9 documents conform" or "3 violations in 2 documents". */
export function summaryOf(report: ValidationReport, t: I18n["t"]): string {
  const checked = report.documents.filter((d) => d.status === "checked");
  if (report.conforms) return t("validation.allConform", { count: checked.length });
  const failing = checked.filter((d) =>
    d.subjects.some(
      (s) =>
        (s.status === "checked" || s.status === "profiled") &&
        s.violations.some((v) => v.severity === "violation"),
    ),
  ).length;
  return t("validation.violationsIn", {
    violations: t("validation.violationCount", { count: report.violationCount }),
    documents: t("validation.documentCount", { count: failing }),
  });
}

export function ValidationScreen({ report }: { report: ValidationReport }) {
  const { t } = useI18n();
  return (
    <div class="validation">
      <p class={report.conforms ? "hint" : "warning"} role="status">
        {summaryOf(report, t)}
      </p>
      {report.documents.map((document) => (
        <DocumentView key={document.url} document={document} />
      ))}
    </div>
  );
}

function DocumentView({ document }: { document: DocumentReport }) {
  const { t } = useI18n();
  return (
    <section class="thing">
      <h3>
        <ExternalLink url={document.url} />
      </h3>
      {document.status === "missing" ? (
        <p class="hint">{t("validation.notCreated")}</p>
      ) : document.subjects.length === 0 ? (
        <p class="hint">{t("validation.noSubjects")}</p>
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
  const { tx } = useI18n();
  const name = <ExternalLink url={subject.url} />;
  switch (subject.status) {
    case "untyped":
      return <>{tx("validation.untyped", { name })}</>;
    case "newer":
      return (
        <>
          {tx("validation.newer", {
            name,
            shape: subject.shape,
            version: subject.version,
            latest: subject.latest,
          })}
        </>
      );
    case "profiled":
      return (
        <>
          {tx("validation.profiled", { name })}
          <ViolationTable violations={subject.violations} />
        </>
      );
    case "checked":
      if (subject.violations.length === 0) {
        return <>{tx("validation.conforms", { name, shape: subject.shape, version: subject.version })}</>;
      }
      return (
        <>
          {tx("validation.checked", { name, shape: subject.shape, version: subject.version })}
          <ViolationTable violations={subject.violations} />
        </>
      );
  }
}

/** One row per result; a DCAT-AP result says so before its message. */
function ViolationTable({ violations }: { violations: Violation[] }) {
  const { t } = useI18n();
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">{t("validation.severity")}</th>
          <th scope="col">{t("validation.property")}</th>
          <th scope="col">{t("validation.message")}</th>
          <th scope="col">{t("validation.value")}</th>
        </tr>
      </thead>
      <tbody>
        {violations.map((violation, index) => (
          <tr key={index}>
            <td>{violation.severity}</td>
            <td>
              {violation.path === undefined ? (
                t("validation.theSubject")
              ) : (
                <ExternalLink url={violation.path} />
              )}
            </td>
            <td>
              {violation.profile === "dcat-ap" && "DCAT-AP: "}
              {violation.message}
            </td>
            <td>{violation.value ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
