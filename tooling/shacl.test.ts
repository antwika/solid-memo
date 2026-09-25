import { describe, expect, it } from "vitest";
import { loadEngine, loadShapesGraph, validateTurtleDocument } from "./shacl.ts";
import { parseTurtle, readTurtleTree } from "./rdf.ts";
import { readDeckFiles } from "./deckLibrary";

const ROOT = `${process.cwd()}/`;
const SM = "https://solid-memo.com/vocab/v1#";
const DC = "http://purl.org/dc/terms/";

/** What each invalid fixture must be rejected for. */
const EXPECTED: Record<string, { path?: string; message: string }> = {
  "card/v1/invalid/missing-back.ttl": { path: `${SM}back`, message: "A format-1 card has text on its back." },
  "card/v2/invalid/image-as-literal.ttl": { path: `${SM}frontImage`, message: "A picture is an IRI" },
  "card/v2/invalid/side-without-content.ttl": { message: "Each side of a card needs text or a picture." },
  "card/v2/invalid/untyped-version.ttl": { path: `${SM}formatVersion`, message: "Card format 2 states its format version, 2." },
  "deck/v1/invalid/missing-title.ttl": { path: `${DC}title`, message: "Less than 1 values" },
  "deck/v2/invalid/bad-direction.ttl": { path: `${SM}direction`, message: "A format-2 deck states its direction" },
  "deck/v2/invalid/missing-direction.ttl": { path: `${SM}direction`, message: "A format-2 deck states its direction" },
  "deck/v2/invalid/pod-without-cards-document.ttl": { path: `${SM}cardsDocument`, message: "Less than 1 values" },
  "deck/v2/invalid/library-with-cards-document.ttl": { path: `${SM}cardsDocument`, message: "A library deck has no cards document" },
  "instance/v1/invalid/missing-created.ttl": { path: `${DC}created`, message: "Less than 1 values" },
  "review-state/v1/invalid/missing-due.ttl": { path: `${SM}due`, message: "The due day is a plain" },
  "review-state/v2/invalid/partial-snapshot.ttl": { message: "A review state is named #<cardId> or #<cardId>@back-to-front, and its previous* snapshot is all five triples or none." },
  "review-state/v2/invalid/bad-subject-suffix.ttl": { message: "A review state is named #<cardId>" },
  "review-state/v2/invalid/due-not-a-day.ttl": { path: `${SM}due`, message: 'The due day is a plain "YYYY-MM-DD" string.' },
  "preferences/v1/invalid/bad-answer-scale.ttl": { path: `${SM}answerScale`, message: "The answer scale is sm2 or minimal." },
  "preferences/v2/invalid/missing-developer-mode.ttl": { path: `${SM}developerMode`, message: "Less than 1 values" },
  "preferences/v2/invalid/hour-out-of-range.ttl": { path: `${SM}dayBoundaryHour`, message: "The day boundary is an hour of the day, 0 to 23." },
};

const contextOf = (path: string) =>
  path.includes("/library-") ? ("library" as const) : ("pod" as const);

describe("the shapes over the fixtures", async () => {
  const engine = await loadEngine(ROOT);
  const fixtures = await readTurtleTree(`${ROOT}tooling/fixtures`);
  const base = (path: string) => `https://pod.example/${path}`;

  it("accept every valid fixture", async () => {
    const valid = fixtures.filter((f) => f.path.includes("/valid/"));
    expect(valid.length).toBeGreaterThan(10);
    for (const { path, turtle } of valid) {
      await expect(
        validateTurtleDocument(path, parseTurtle(turtle, base(path)), engine, contextOf(path)),
        path,
      ).resolves.toBeUndefined();
    }
  });

  it("reject every invalid fixture for the expected reason", async () => {
    const invalid = fixtures.filter((f) => f.path.includes("/invalid/"));
    expect(invalid.map((f) => f.path).sort()).toEqual(Object.keys(EXPECTED).sort());
    for (const { path, turtle } of invalid) {
      const expected = EXPECTED[path];
      const where = expected.path === undefined ? ">: " : ` (${expected.path}): `;
      await expect(
        validateTurtleDocument(path, parseTurtle(turtle, base(path)), engine, contextOf(path)),
        path,
      ).rejects.toThrow(`${path}:\n  <`);
      await expect(
        validateTurtleDocument(path, parseTurtle(turtle, base(path)), engine, contextOf(path)),
        path,
      ).rejects.toThrow(`${where}${expected.message}`);
    }
  });

  it("report a format this app does not know", async () => {
    const { turtle } = fixtures.find((f) => f.path === "card/unknown-version.ttl")!;
    await expect(
      validateTurtleDocument("x.ttl", parseTurtle(turtle, base("x.ttl")), engine, "pod"),
    ).rejects.toThrow(
      "x.ttl:\n  <https://pod.example/x.ttl#se> is card format 3; this app knows formats 1–2.",
    );
  });

  it("reject a subject typed with a Solid Memo term that is no class", async () => {
    const quads = parseTurtle(`<#x> a <https://solid-memo.com/vocab/v1#front> .`, base("x.ttl"));
    await expect(validateTurtleDocument("x.ttl", quads, engine, "pod")).rejects.toThrow(
      "x.ttl:\n  <https://pod.example/x.ttl#x> is typed with a Solid Memo term that names no class.",
    );
  });

  it("skip subjects without a Solid Memo type", async () => {
    const quads = parseTurtle(
      `<https://en.wikipedia.org/> <http://purl.org/dc/terms/title> "Wikipedia" .`,
      base("x.ttl"),
    );
    await expect(validateTurtleDocument("x.ttl", quads, engine, "library")).resolves.toBeUndefined();
  });
});

describe("the shapes over the deck library", async () => {
  const engine = await loadEngine(ROOT);

  it("accept every published deck", async () => {
    const decks = await readDeckFiles(`${ROOT}decks`);
    expect(decks.length).toBeGreaterThan(0);
    for (const { file, turtle } of decks) {
      await expect(
        validateTurtleDocument(file, parseTurtle(turtle, `https://solid-memo.com/decks/${file}`), engine, "library"),
        file,
      ).resolves.toBeUndefined();
    }
  }, 60_000);
});

describe("loadShapesGraph", () => {
  it("merges every shape file into one graph", async () => {
    const graph = await loadShapesGraph(ROOT);
    expect(graph.size).toBeGreaterThan(500);
  });
});
