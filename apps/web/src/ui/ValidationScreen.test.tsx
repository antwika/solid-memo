import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { createI18n, I18nProvider } from "./i18n";
import { summaryOf, ValidationScreen } from "./ValidationScreen";
import type { ValidationReport } from "@solid-memo/domain/validation";

const { t } = createI18n("en");

const INSTANCE = "https://pod.example/solid-memo/a/";

const report: ValidationReport = {
  instanceUrl: INSTANCE,
  violationCount: 2,
  conforms: false,
  documents: [
    { url: `${INSTANCE}meta.ttl`, status: "missing", subjects: [] },
    { url: `${INSTANCE}preferences.ttl`, status: "checked", subjects: [] },
    {
      url: `${INSTANCE}catalog.ttl`,
      status: "checked",
      subjects: [
        {
          url: `${INSTANCE}catalog.ttl#deck-1`,
          status: "checked",
          shape: "deck",
          version: 2,
          violations: [
            {
              path: "http://purl.org/dc/terms/title",
              message: { en: "Less than 1 values" },
              severity: "violation",
              constraint: "MinCount",
            },
            {
              message: { en: "Value does not match pattern" },
              value: "odd",
              severity: "violation",
              constraint: "Pattern",
            },
          ],
        },
        { url: `${INSTANCE}catalog.ttl#deck-2`, status: "checked", shape: "deck", version: 1, violations: [] },
        { url: `${INSTANCE}catalog.ttl#deck-3`, status: "newer", shape: "deck", version: 3, latest: 2 },
        { url: `${INSTANCE}catalog.ttl#note`, status: "untyped" },
      ],
    },
  ],
};

describe("summaryOf", () => {
  it("counts violations and the documents they are in, or says everything conforms", () => {
    expect(summaryOf(report, t)).toBe("2 violations in 1 document.");
    expect(summaryOf({ ...report, violationCount: 1 }, t)).toBe("1 violation in 1 document.");
    const another = { ...report.documents[2], url: `${INSTANCE}decks/deck-1.ttl` };
    expect(
      summaryOf({ ...report, violationCount: 4, documents: [...report.documents, another] }, t),
    ).toBe("4 violations in 2 documents.");
    expect(
      summaryOf({ instanceUrl: INSTANCE, violationCount: 0, conforms: true, documents: report.documents }, t),
    ).toBe("All 2 documents conform.");
    expect(
      summaryOf({ instanceUrl: INSTANCE, violationCount: 0, conforms: true, documents: [report.documents[1]] }, t),
    ).toBe("The 1 document conforms.");
  });
});

describe("ValidationScreen", () => {
  it("lists every document with its subjects and their results", () => {
    render(<ValidationScreen report={report} />);
    expect(screen.getByRole("status")).toHaveTextContent("2 violations in 1 document.");
    expect(screen.getByText("Not created yet.")).toBeInTheDocument();
    expect(screen.getByText("No subjects.")).toBeInTheDocument();
    const items = screen.getAllByRole("listitem").map((item) => item.textContent);
    expect(items[0]).toContain("deck format 2:");
    expect(items[1]).toContain("conforms to deck format 1.");
    expect(items[2]).toContain("deck format 3 is newer than this app knows (up to 2); skipped.");
    expect(items[3]).toContain("not a Solid Memo subject.");
    const rows = screen.getAllByRole("row").slice(1).map((row) => row.textContent);
    expect(rows).toEqual([
      "violationhttp://purl.org/dc/terms/titleLess than 1 values",
      "violation(the subject)Value does not match patternodd",
    ]);
  });

  it("shows DCAT-AP results as such, on Solid Memo subjects and others", () => {
    render(
      <ValidationScreen
        report={{
          instanceUrl: INSTANCE,
          violationCount: 1,
          conforms: false,
          documents: [
            {
              url: `${INSTANCE}catalog.ttl`,
              status: "checked",
              subjects: [
                {
                  url: "https://creativecommons.org/publicdomain/zero/1.0/",
                  status: "profiled",
                  violations: [{ message: { en: "Class constraint failed." }, severity: "violation", constraint: "Class", profile: "dcat-ap" }],
                },
              ],
            },
          ],
        }}
      />,
    );
    expect(screen.getByRole("status")).toHaveTextContent("1 violation in 1 document.");
    expect(screen.getByRole("listitem")).toHaveTextContent("not a Solid Memo subject; DCAT-AP says:");
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("DCAT-AP: Class constraint failed.");
  });

  it("says so when everything conforms", () => {
    render(
      <ValidationScreen
        report={{ instanceUrl: INSTANCE, violationCount: 0, conforms: true, documents: [report.documents[1]] }}
      />,
    );
    expect(screen.getByRole("status")).toHaveTextContent("The 1 document conforms.");
    expect(screen.getByRole("status")).toHaveClass("hint");
  });

  it("speaks Swedish", () => {
    render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <ValidationScreen report={report} />
      </I18nProvider>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("2 överträdelser i 1 dokument.");
    expect(screen.getByText("Inte skapat än.")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")[2]).toHaveTextContent("formatet deck 3 är nyare än vad appen känner till");
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent("Allvarlighetsgrad");
  });
});
