import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { recordThing } from "../solid/records";
import { LATEST_VERSION, type ShapeName } from "../../domain/shapes/generated";
import { MIGRATIONS } from "../../domain/shapes/migrations";
import { toRdfJsDataset, mockSolidDatasetFrom, setThing, buildThing, createThing } from "@inrupt/solid-client";
import { createEngine } from "./engine";
import { createShapeLoader } from "./shapeLoader";
import { SHAPES } from "./shapes.generated";
import { RDF, SM } from "../solid/vocab";

/**
 * The shapes, the descriptors and the migrations agree: for every shape
 * version, a record written through its descriptor conforms to the
 * shape, and every migration step's output conforms to the shape it
 * moves to. Shape documents are read from the repository the way the
 * browser reads them from the site.
 */

const ROOT = `${process.cwd()}/`;
const BASE = "https://solid-memo.com/shapes/";
const URL_ = "https://pod.example/solid-memo/a/doc.ttl#it";

const loader = createShapeLoader({
  fetch: async (input) => {
    const url = String(input);
    const body = await readFile(`${ROOT}shapes/${url.slice(BASE.length)}`, "utf8");
    const response = new Response(body, { status: 200, headers: { "Content-Type": "text/turtle" } });
    Object.defineProperty(response, "url", { value: url });
    return response;
  },
  shapesBaseUrl: BASE,
});

/** A record of each kind and version that is valid for that version. */
const FIXTURES: Record<ShapeName, Record<number, object>> = {
  instance: { 1: { title: "Main", created: "2026-09-21T10:00:00.000Z" } },
  deck: {
    1: { title: "Own", creator: [], cardsDocument: "https://pod.example/d.ttl", reviewsDocument: "https://pod.example/r.ttl" },
    2: { title: "Own", creator: ["Anton"], direction: "bidirectional", cardsDocument: "https://pod.example/d.ttl", reviewsDocument: "https://pod.example/r.ttl", source: "https://solid-memo.com/decks/x.ttl" },
  },
  libraryDeck: {
    1: { title: "Capitals", creator: [], source: [] },
    2: { title: "Capitals", creator: [], direction: "front-to-back", source: ["https://en.wikipedia.org/"] },
  },
  card: {
    1: { front: "Sweden", back: "Stockholm" },
    2: { frontImage: "https://flagcdn.com/se.svg", back: "Sweden" },
  },
  reviewState: {
    1: { easeFactor: 2.5, intervalDays: 1, repetitions: 1, due: "2026-09-22", firstReviewedAt: "2026-09-21T10:00:00.000Z", lastReviewedAt: "2026-09-21T10:00:00.000Z", previousDue: "2026-09-21" },
    2: { easeFactor: 2.5, intervalDays: 1, repetitions: 1, due: "2026-09-22", firstReviewedAt: "2026-09-21T10:00:00.000Z", lastReviewedAt: "2026-09-21T10:00:00.000Z", previousEaseFactor: 2.4, previousIntervalDays: 1, previousRepetitions: 1, previousDue: "2026-09-21", previousLastReviewedAt: "2026-09-20T10:00:00.000Z" },
  },
  preferences: {
    1: { newCardsPerDay: 20 },
    2: { newCardsPerDay: 20, maxReviewsPerDay: 200, dayBoundaryHour: 4, answerScale: "sm2", developerMode: false },
  },
};

async function violationsOf(shape: ShapeName, version: number, record: object) {
  const descriptor = (SHAPES[shape] as Record<number, (typeof SHAPES)["card"][1]>)[version];
  const thing = recordThing(URL_, descriptor, record, null);
  const data = toRdfJsDataset(setThing(mockSolidDatasetFrom("https://pod.example/solid-memo/a/doc.ttl"), thing));
  const engine = createEngine(await loader.load(descriptor));
  return engine.validateNode(data, URL_, descriptor.shapeIri);
}

describe("shapes, descriptors and migrations", () => {
  it("agree: a record written through each descriptor conforms to its shape", async () => {
    for (const shape of Object.keys(LATEST_VERSION) as ShapeName[]) {
      for (let version = 1; version <= LATEST_VERSION[shape]; version += 1) {
        expect(FIXTURES[shape][version], `${shape} v${version} fixture`).toBeDefined();
        await expect(violationsOf(shape, version, FIXTURES[shape][version]), `${shape} v${version}`).resolves.toEqual([]);
      }
    }
  });

  it("agree: every migration step's output conforms to the shape it moves to", async () => {
    for (const step of MIGRATIONS) {
      const migrated = step.up(FIXTURES[step.shape][step.from]) as object;
      await expect(violationsOf(step.shape, step.to, migrated), `${step.shape} ${step.from}→${step.to}`).resolves.toEqual([]);
    }
  });

  it("report a subject that breaks its shape", async () => {
    const thing = buildThing(createThing({ url: URL_ }))
      .addIri(RDF.type, SM.Card)
      .addInteger(SM.formatVersion, 2)
      .addStringNoLocale(SM.frontImage, "https://flagcdn.com/se.svg")
      .build();
    const data = toRdfJsDataset(setThing(mockSolidDatasetFrom("https://pod.example/solid-memo/a/doc.ttl"), thing));
    const engine = createEngine(await loader.load(SHAPES.card[2]));
    const violations = await engine.validateNode(data, URL_, SHAPES.card[2].shapeIri);
    expect(violations.map((v) => v.message)).toEqual([
      "Each side of a card needs text or a picture.",
      "A picture is an IRI (<https://…>), never a string literal.",
    ]);
  });
});
