import { describe, expect, it } from "vitest";
import type { Deck } from "./deck";
import {
  failingDocumentUrls,
  failingSubjectUrls,
  setAsideDecks,
  summarize,
  type DocumentReport,
} from "./validation";

const INSTANCE = "https://pod.example/solid-memo/a/";

describe("summarize", () => {
  it("counts violations across documents, DCAT-AP ones included, ignoring warnings, newer and untyped subjects", () => {
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
          {
            url: "https://creativecommons.org/publicdomain/zero/1.0/",
            status: "profiled",
            violations: [{ message: "class", severity: "violation", constraint: "Class", profile: "dcat-ap" }],
          },
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
      violationCount: 3,
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

describe("what fails, and the decks set aside for it", () => {
  const report = summarize(INSTANCE, [
    {
      url: `${INSTANCE}catalog.ttl`,
      status: "checked",
      subjects: [
        { url: `${INSTANCE}catalog.ttl#deck-1`, status: "checked", shape: "deck", version: 3, violations: [{ message: "x", severity: "violation", constraint: "MinCount" }] },
        { url: `${INSTANCE}catalog.ttl#deck-2`, status: "checked", shape: "deck", version: 3, violations: [{ message: "x", severity: "warning", constraint: "MinCount" }] },
        { url: `${INSTANCE}catalog.ttl#note`, status: "untyped" },
      ],
    },
    {
      url: `${INSTANCE}reviews/deck-3.ttl`,
      status: "checked",
      subjects: [{ url: `${INSTANCE}reviews/deck-3.ttl#a`, status: "profiled", violations: [{ message: "x", severity: "violation", constraint: "Class", profile: "dcat-ap" }] }],
    },
    { url: `${INSTANCE}decks/deck-4.ttl`, status: "missing", subjects: [] },
  ]);
  const deck = (id: string): Deck => ({
    id,
    url: `${INSTANCE}catalog.ttl#${id}`,
    name: id,
    cardsDocumentUrl: `${INSTANCE}decks/${id}.ttl`,
    reviewsDocumentUrl: `${INSTANCE}reviews/${id}.ttl`,
    createdAt: "",
    formatVersion: 3,
    direction: "front-to-back",
    authors: [],
  });

  it("names the failing subjects and documents, warnings aside", () => {
    expect([...failingSubjectUrls(report)]).toEqual([`${INSTANCE}catalog.ttl#deck-1`, `${INSTANCE}reviews/deck-3.ttl#a`]);
    expect([...failingDocumentUrls(report)]).toEqual([`${INSTANCE}catalog.ttl`, `${INSTANCE}reviews/deck-3.ttl`]);
  });

  it("sets aside a deck whose entry, cards or review states fail", () => {
    const cardsFail = summarize(INSTANCE, [
      { url: `${INSTANCE}decks/deck-4.ttl`, status: "checked", subjects: [{ url: `${INSTANCE}decks/deck-4.ttl#x`, status: "checked", shape: "card", version: 2, violations: [{ message: "x", severity: "violation", constraint: "Or" }] }] },
    ]);
    expect([...setAsideDecks(report, ["deck-1", "deck-2", "deck-3", "deck-4"].map(deck))]).toEqual([
      `${INSTANCE}catalog.ttl#deck-1`,
      `${INSTANCE}catalog.ttl#deck-3`,
    ]);
    expect([...setAsideDecks(cardsFail, ["deck-4"].map(deck))]).toEqual([`${INSTANCE}catalog.ttl#deck-4`]);
  });
});
