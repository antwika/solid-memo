import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { summaryOf, ValidationScreen } from "./ValidationScreen";
import type { ValidationReport } from "../domain/validation";

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
              message: "Less than 1 values",
              severity: "violation",
              constraint: "MinCount",
            },
            {
              message: "Value does not match pattern",
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
    expect(summaryOf(report)).toBe("2 violations in 1 document.");
    expect(summaryOf({ ...report, violationCount: 1 })).toBe("1 violation in 1 document.");
    const another = { ...report.documents[2], url: `${INSTANCE}decks/deck-1.ttl` };
    expect(
      summaryOf({ ...report, violationCount: 4, documents: [...report.documents, another] }),
    ).toBe("4 violations in 2 documents.");
    expect(
      summaryOf({ instanceUrl: INSTANCE, violationCount: 0, conforms: true, documents: report.documents }),
    ).toBe("All 2 documents conform.");
    expect(
      summaryOf({ instanceUrl: INSTANCE, violationCount: 0, conforms: true, documents: [report.documents[1]] }),
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

  it("says so when everything conforms", () => {
    render(
      <ValidationScreen
        report={{ instanceUrl: INSTANCE, violationCount: 0, conforms: true, documents: [report.documents[1]] }}
      />,
    );
    expect(screen.getByRole("status")).toHaveTextContent("The 1 document conforms.");
    expect(screen.getByRole("status")).toHaveClass("hint");
  });
});
