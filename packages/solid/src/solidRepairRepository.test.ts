import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildThing,
  createThing,
  getDecimal,
  getStringNoLocale,
  getStringWithLocale,
  getThing,
  getUrl,
  mockSolidDatasetFrom,
  saveSolidDatasetAt,
  setThing,
  type SolidDataset,
  type ThingPersisted,
} from "@inrupt/solid-client";
import type { Repair } from "@solid-memo/domain/repair";
import { getSolidDatasetOrNull } from "./datasets";
import { createSolidRepairRepository } from "./solidRepairRepository";
import { DCTERMS, RDF, SM } from "./vocab";

vi.mock("@inrupt/solid-client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@inrupt/solid-client")>();
  return { ...actual, saveSolidDatasetAt: vi.fn() };
});
vi.mock("./datasets", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./datasets")>()),
  getSolidDatasetOrNull: vi.fn(),
}));

const CATALOG = "https://pod.example/solid-memo/a/catalog.ttl";
const REVIEWS = "https://pod.example/solid-memo/a/reviews/deck-1.ttl";
const FOAF_NAME = "http://xmlns.com/foaf/0.1/name";

function documentOf(url: string, ...things: ThingPersisted[]): never {
  return things.reduce<SolidDataset>((dataset, thing) => setThing(dataset, thing), mockSolidDatasetFrom(url)) as never;
}

function repository() {
  return createSolidRepairRepository({ fetch: vi.fn() as unknown as typeof fetch });
}

function repair(kind: Repair["kind"], subjectUrl: string, version = 3, documentUrl = CATALOG): Repair {
  return { kind, documentUrl, subjectUrl, version };
}

function saved(index = 0): SolidDataset {
  return vi.mocked(saveSolidDatasetAt).mock.calls[index][1] as SolidDataset;
}

beforeEach(() => {
  vi.mocked(getSolidDatasetOrNull).mockReset();
  vi.mocked(saveSolidDatasetAt).mockReset();
});

describe("applyRepairs", () => {
  it("fills in a deck's description and direction, in the deck's own format, with one write per document", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      documentOf(
        CATALOG,
        buildThing(createThing({ url: `${CATALOG}#deck-1` })).addIri(RDF.type, SM.Deck).addStringNoLocale(DCTERMS.title, "Capitals").addStringNoLocale(SM.direction, "odd").build(),
        buildThing(createThing({ url: `${CATALOG}#deck-2` })).addIri(RDF.type, SM.Deck).build(),
      ),
    );
    await repository().applyRepairs([
      repair("describe-deck", `${CATALOG}#deck-1`),
      repair("direct-deck", `${CATALOG}#deck-1`),
      repair("describe-deck", `${CATALOG}#deck-2`, 2),
      repair("direct-deck", `${CATALOG}#deck-2`, 2),
    ]);
    expect(saveSolidDatasetAt).toHaveBeenCalledOnce();
    const one = getThing(saved(), `${CATALOG}#deck-1`)!;
    expect(getStringNoLocale(one, DCTERMS.description)).toBe("Flashcards: Capitals.");
    expect(getUrl(one, SM.studyDirection)).toBe(SM.frontToBack);
    expect(getStringNoLocale(one, SM.direction)).toBeNull();
    const two = getThing(saved(), `${CATALOG}#deck-2`)!;
    expect(getStringNoLocale(two, DCTERMS.description)).toBe("Flashcards: a deck.");
    expect(getStringNoLocale(two, SM.direction)).toBe("front-to-back");
  });

  it("describes a format-4 deck in English, from its English title", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      documentOf(
        CATALOG,
        buildThing(createThing({ url: `${CATALOG}#deck-1` }))
          .addIri(RDF.type, SM.Deck)
          .addStringWithLocale(DCTERMS.title, "Huvudstäder", "sv")
          .addStringWithLocale(DCTERMS.title, "Capitals", "en")
          .build(),
        buildThing(createThing({ url: `${CATALOG}#deck-2` })).addIri(RDF.type, SM.Deck).build(),
      ),
    );
    await repository().applyRepairs([
      repair("describe-deck", `${CATALOG}#deck-1`, 4),
      repair("describe-deck", `${CATALOG}#deck-2`, 4),
    ]);
    const one = getThing(saved(), `${CATALOG}#deck-1`)!;
    expect(getStringWithLocale(one, DCTERMS.description, "en")).toBe("Flashcards: Capitals.");
    expect(getStringWithLocale(one, DCTERMS.description, "sv")).toBe("Kortlek: Huvudstäder.");
    expect(getStringWithLocale(one, DCTERMS.title, "sv")).toBe("Huvudstäder");
    const two = getThing(saved(), `${CATALOG}#deck-2`)!;
    expect(getStringWithLocale(two, DCTERMS.description, "en")).toBe("Flashcards: a deck.");
    expect(getStringWithLocale(two, DCTERMS.description, "sv")).toBe("Kortlek: a deck.");
  });

  it("drops a half-written snapshot and recomputes a due day, leaving a state without the facts as it is", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      documentOf(
        REVIEWS,
        buildThing(createThing({ url: `${REVIEWS}#a` }))
          .addIri(RDF.type, SM.ReviewState)
          .addStringNoLocale(SM.due, "soon")
          .addDatetime(SM.lastReviewedAt, new Date("2026-09-21T10:00:00Z"))
          .addInteger(SM.intervalDays, 6)
          .addStringNoLocale(SM.previousDue, "2026-09-20")
          .build(),
        buildThing(createThing({ url: `${REVIEWS}#b` })).addIri(RDF.type, SM.ReviewState).addStringNoLocale(SM.due, "soon").build(),
      ),
    );
    await repository().applyRepairs([
      repair("drop-snapshot", `${REVIEWS}#a`, 2, REVIEWS),
      repair("recompute-due", `${REVIEWS}#a`, 2, REVIEWS),
      repair("recompute-due", `${REVIEWS}#b`, 2, REVIEWS),
    ]);
    const a = getThing(saved(), `${REVIEWS}#a`)!;
    expect(getStringNoLocale(a, SM.previousDue)).toBeNull();
    expect(getStringNoLocale(a, SM.due)).toBe("2026-09-27");
    expect(getStringNoLocale(getThing(saved(), `${REVIEWS}#b`)!, SM.due)).toBe("soon");
  });

  it("drops only what is half-written of a format-3 state: the memory, the snapshot's memory, or the snapshot", async () => {
    const state = (fragment: string) =>
      buildThing(createThing({ url: `${REVIEWS}#${fragment}` })).addIri(RDF.type, SM.ReviewState);
    const snapshot = (b: ReturnType<typeof state>) =>
      b
        .addDecimal(SM.previousEaseFactor, 2.5)
        .addInteger(SM.previousIntervalDays, 1)
        .addInteger(SM.previousRepetitions, 1)
        .addStringNoLocale(SM.previousDue, "2026-09-20")
        .addDatetime(SM.previousLastReviewedAt, new Date("2026-09-19T10:00:00Z"));
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      documentOf(
        REVIEWS,
        // A half-written memory beside a whole snapshot: the memory goes.
        snapshot(state("memory")).addDecimal(SM.stability, 3).build(),
        // A snapshot's memory without the snapshot: it goes.
        state("orphan").addDecimal(SM.stability, 3).addDecimal(SM.stabilityFast, 2.4).addDecimal(SM.difficulty, 5)
          .addDecimal(SM.previousStability, 1).addDecimal(SM.previousStabilityFast, 0.8).addDecimal(SM.previousDifficulty, 5).build(),
        // A half-written snapshot's memory: the whole snapshot goes, the memory stays.
        snapshot(state("partial")).addDecimal(SM.stability, 3).addDecimal(SM.stabilityFast, 2.4).addDecimal(SM.difficulty, 5)
          .addDecimal(SM.previousStability, 1).build(),
      ),
    );
    await repository().applyRepairs(["memory", "orphan", "partial"].map((f) => repair("drop-snapshot", `${REVIEWS}#${f}`, 3, REVIEWS)));
    const memory = getThing(saved(), `${REVIEWS}#memory`)!;
    expect(getDecimal(memory, SM.stability)).toBeNull();
    expect(getStringNoLocale(memory, SM.previousDue)).toBe("2026-09-20");
    const orphan = getThing(saved(), `${REVIEWS}#orphan`)!;
    expect(getDecimal(orphan, SM.previousStability)).toBeNull();
    expect(getDecimal(orphan, SM.stability)).toBe(3);
    const partial = getThing(saved(), `${REVIEWS}#partial`)!;
    expect(getStringNoLocale(partial, SM.previousDue)).toBeNull();
    expect(getDecimal(partial, SM.previousStability)).toBeNull();
    expect(getDecimal(partial, SM.difficulty)).toBe(5);
  });

  it("names an agent after its address, and removes a subject the user gave up on", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      documentOf(
        CATALOG,
        buildThing(createThing({ url: `${CATALOG}#agent-x` })).addIri(RDF.type, "http://xmlns.com/foaf/0.1/Agent").build(),
        buildThing(createThing({ url: "https://alice.example/profile/card" })).addIri(RDF.type, "http://xmlns.com/foaf/0.1/Agent").build(),
        buildThing(createThing({ url: `${CATALOG}#broken` })).addIri(RDF.type, SM.Deck).build(),
      ),
    );
    await repository().applyRepairs([
      repair("name-agent", `${CATALOG}#agent-x`, 1),
      repair("name-agent", "https://alice.example/profile/card", 1),
      repair("remove-subject", `${CATALOG}#broken`),
      repair("describe-deck", `${CATALOG}#gone`),
    ]);
    expect(getStringNoLocale(getThing(saved(), `${CATALOG}#agent-x`)!, FOAF_NAME)).toBe("agent-x");
    expect(getStringNoLocale(getThing(saved(), "https://alice.example/profile/card")!, FOAF_NAME)).toBe(
      "https://alice.example/profile/card",
    );
    expect(getThing(saved(), `${CATALOG}#broken`)).toBeNull();
  });

  it("skips a document that is gone", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await repository().applyRepairs([repair("describe-deck", `${CATALOG}#deck-1`)]);
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });
});
