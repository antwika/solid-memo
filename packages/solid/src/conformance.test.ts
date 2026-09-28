import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { recordThing } from "./records";
import { LATEST_VERSION, type ShapeName } from "@solid-memo/vocab/types.generated";
import { MIGRATIONS } from "@solid-memo/domain/shapes/migrations";
import { toRdfJsDataset, mockSolidDatasetFrom, setThing, buildThing, createThing } from "@inrupt/solid-client";
import { createEngine, mergeDatasets } from "@solid-memo/shacl/engine";
import { coreOnly, PROFILES, REFERENCE_DATA } from "@solid-memo/shacl/profiles";
import { datasetFromTurtle } from "@solid-memo/shacl/testing/turtle";
import { withCatalog, withDeck } from "./mappers/deckMapper";
import type { Deck } from "@solid-memo/domain/deck";
import { createShapeLoader } from "@solid-memo/shacl/shapeLoader";
import { SHAPES } from "@solid-memo/vocab/descriptors.generated";
import { RDF, SM, SM_NS } from "./vocab";
import { VOCAB_ROOT } from "@solid-memo/vocab/tooling/root";

const EDUC = "http://publications.europa.eu/resource/authority/data-theme/EDUC";

/**
 * The shapes, the descriptors and the migrations agree: for every shape
 * version, a record written through its descriptor conforms to the
 * shape, and every migration step's output conforms to the shape it
 * moves to. Shape documents are read from the repository the way the
 * browser reads them from the site.
 */

const ROOT = VOCAB_ROOT;
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
  instance: {
    1: { title: "Main", created: "2026-09-21T10:00:00.000Z" },
    2: { title: "Main", created: "2026-09-21T10:00:00.000Z", replaces: "https://pod.example/solid-memo/main/", modified: "2026-09-28T10:00:00.000Z" },
  },
  deck: {
    1: { title: "Own", creator: [], cardsDocument: "https://pod.example/d.ttl", reviewsDocument: "https://pod.example/r.ttl" },
    2: { title: "Own", creator: ["Anton"], direction: "bidirectional", cardsDocument: "https://pod.example/d.ttl", reviewsDocument: "https://pod.example/r.ttl", source: "https://solid-memo.com/decks/x.ttl" },
    3: { title: "Own", description: "Mine.", creator: ["https://pod.example/c.ttl#agent-anton"], studyDirection: `${SM_NS}bidirectional`, theme: ["https://solid-memo.com/vocab/topics#geography"], keyword: ["capitals"], distribution: ["https://pod.example/c.ttl#deck-1-cards"], cardsDocument: "https://pod.example/d.ttl", reviewsDocument: "https://pod.example/r.ttl", source: "https://solid-memo.com/decks/x/1.ttl" },
  },
  libraryDeck: {
    1: { title: "Capitals", creator: [], source: [] },
    2: { title: "Capitals", creator: [], direction: "front-to-back", source: ["https://en.wikipedia.org/"] },
    3: { title: "Capitals", description: "Capitals.", creator: [], publisher: "https://solid-memo.com/decks/index.ttl#solid-memo", studyDirection: `${SM_NS}frontToBack`, theme: [EDUC], keyword: [], language: [], version: "2", versionNotes: "Added Norway.", inSeries: "https://solid-memo.com/decks/index.ttl#x", isVersionOf: "https://solid-memo.com/decks/index.ttl#x", prev: "https://solid-memo.com/decks/x/1.ttl", previousVersion: "https://solid-memo.com/decks/x/1.ttl", distribution: ["https://solid-memo.com/decks/x/2.ttl#turtle"], wasDerivedFrom: ["https://en.wikipedia.org/"] },
  },
  libraryDeckSeries: {
    1: { title: "Capitals", description: "Capitals.", publisher: "https://solid-memo.com/decks/index.ttl#solid-memo", theme: [EDUC], keyword: [], first: "https://solid-memo.com/decks/x/1.ttl", last: "https://solid-memo.com/decks/x/2.ttl", hasVersion: ["https://solid-memo.com/decks/x/1.ttl", "https://solid-memo.com/decks/x/2.ttl"], hasCurrentVersion: "https://solid-memo.com/decks/x/2.ttl" },
  },
  catalog: {
    1: { title: "Main", description: "My decks.", publisher: "https://pod.example/profile/card#me", themeTaxonomy: ["https://solid-memo.com/vocab/topics"], dataset: ["https://pod.example/c.ttl#deck-1"] },
  },
  agent: {
    1: { name: "Anton", mbox: "mailto:anton@example.com" },
  },
  distribution: {
    1: { accessUrl: "https://pod.example/d.ttl", mediaType: "https://www.iana.org/assignments/media-types/text/turtle" },
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
    3: { newCardsPerDay: 20, maxReviewsPerDay: 200, dayBoundaryHour: 4, answerScale: "sm2", developerMode: false, invalidDataPolicy: `${SM_NS}warnOnly` },
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
      const migrated = step.up(FIXTURES[step.shape][step.from], { subject: "https://pod.example/x.ttl#it" }) as object;
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

/** A site file (vendored profile, reference data) as an RDF/JS dataset. */
async function siteDataset(path: string) {
  return datasetFromTurtle(await readFile(`${ROOT}${path}`, "utf8"), `https://solid-memo.com/${path}`);
}

describe("what the app writes, under DCAT-AP", () => {
  it("conforms: a catalog document with its catalogue, a deck, its creators and its distribution", async () => {
    const shapes = await Promise.all(PROFILES["dcat-ap"].map(siteDataset));
    const engine = createEngine(mergeDatasets(coreOnly(shapes.flatMap((d) => [...d]))));
    const CATALOG = "https://pod.example/solid-memo/a/catalog.ttl";
    const deck: Deck = {
      id: "deck-1",
      url: `${CATALOG}#deck-1`,
      name: "Capitals",
      cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
      reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
      createdAt: "2026-09-21T10:00:00.000Z",
      formatVersion: 3,
      direction: "bidirectional",
      authors: ["Anton Wiklund <anton@example.com>", "A friend"],
      license: "https://creativecommons.org/publicdomain/zero/1.0/",
      sourceUrl: "https://solid-memo.com/decks/capitals/1.ttl",
      themes: ["https://solid-memo.com/vocab/topics#geography"],
      keywords: ["capitals"],
    };
    const written = toRdfJsDataset(
      withCatalog(withDeck(mockSolidDatasetFrom(CATALOG), deck), CATALOG, {
        title: "Main",
        description: "Flashcard decks of the Solid Memo instance Main.",
        publisher: { webId: "https://alice.example/profile/card#me", name: "Alice" },
      }),
    );
    const reference = await Promise.all(REFERENCE_DATA.map(siteDataset));
    const licence = await datasetFromTurtle(
      "<https://creativecommons.org/publicdomain/zero/1.0/> a <http://purl.org/dc/terms/LicenseDocument> .",
      CATALOG,
    );
    const data = mergeDatasets(written, ...reference, licence);
    const violations = (await engine.validate(data)).filter((v) => v.severity === "violation");
    expect(violations).toEqual([]);
  });
});
