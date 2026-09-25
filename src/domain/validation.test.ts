import { describe, expect, it } from "vitest";
import { summarize, type DocumentReport } from "./validation";

const INSTANCE = "https://pod.example/solid-memo/a/";

describe("summarize", () => {
  it("counts violations across documents, ignoring warnings, newer and untyped subjects", () => {
    const documents: DocumentReport[] = [
      { url: `${INSTANCE}meta.ttl`, status: "missing", subjects: [] },
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
              { message: "no title", severity: "violation", constraint: "MinCount" },
              { message: "odd", severity: "warning", constraint: "Pattern" },
            ],
          },
          { url: `${INSTANCE}catalog.ttl#deck-2`, status: "newer", shape: "deck", version: 3, latest: 2 },
          { url: `${INSTANCE}catalog.ttl#note`, status: "untyped" },
        ],
      },
      {
        url: `${INSTANCE}decks/deck-1.ttl`,
        status: "checked",
        subjects: [
          {
            url: `${INSTANCE}decks/deck-1.ttl#se`,
            status: "checked",
            shape: "card",
            version: 2,
            violations: [{ message: "literal", severity: "violation", constraint: "NodeKind" }],
          },
        ],
      },
    ];
    expect(summarize(INSTANCE, documents)).toEqual({
      instanceUrl: INSTANCE,
      documents,
      violationCount: 2,
      conforms: false,
    });
  });

  it("conforms when nothing is violated", () => {
    expect(summarize(INSTANCE, [])).toEqual({
      instanceUrl: INSTANCE,
      documents: [],
      violationCount: 0,
      conforms: true,
    });
  });
});
