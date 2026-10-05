import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildThing,
  createThing,
  getSolidDataset,
  mockSolidDatasetFrom,
  setThing,
} from "@inrupt/solid-client";
import { createSolidDeckLibrary } from "./solidDeckLibrary";
import { DCTERMS, LDP, RDF, SCHEMA, SM } from "./vocab";

vi.mock("@inrupt/solid-client", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@inrupt/solid-client")>();
  return { ...actual, getSolidDataset: vi.fn() };
});

const INDEX = "https://solid-memo.com/decks/index.ttl";
const DOC = "https://solid-memo.com/decks/capitals.ttl";
const fetch = vi.fn() as unknown as typeof globalThis.fetch;

function makeLibrary() {
  return createSolidDeckLibrary({ fetch, indexUrl: INDEX });
}

beforeEach(() => {
  vi.mocked(getSolidDataset).mockReset();
});

describe("listLibraryDecks", () => {
  it("reads the decks the index's catalogue lists", async () => {
    const index = setThing(
      mockSolidDatasetFrom(INDEX),
      buildThing(createThing({ url: INDEX }))
        .addIri(RDF.type, "http://www.w3.org/ns/dcat#Catalog")
        .addStringNoLocale(DCTERMS.title, "The library")
        .build(),
    );
    vi.mocked(getSolidDataset).mockResolvedValue(index);

    await expect(makeLibrary().listLibraryDecks()).resolves.toEqual([]);
    expect(getSolidDataset).toHaveBeenCalledWith(INDEX, { fetch });
  });

  it("propagates a failed index read", async () => {
    vi.mocked(getSolidDataset).mockRejectedValue(new Error("offline"));
    await expect(makeLibrary().listLibraryDecks()).rejects.toThrow("offline");
  });
});

describe("fetchLibraryDeck", () => {
  it("fetches the document and maps its content", async () => {
    const document = setThing(
      setThing(
        mockSolidDatasetFrom(DOC),
        buildThing(createThing({ url: DOC }))
          .addIri(RDF.type, SM.Deck)
          .addStringNoLocale(DCTERMS.title, "Capitals")
          .build(),
      ),
      buildThing(createThing({ url: `${DOC}#sweden` }))
        .addIri(RDF.type, SM.Card)
        .addStringNoLocale(SM.front, "Sweden")
        .addStringNoLocale(SM.back, "Stockholm")
        .build(),
    );
    vi.mocked(getSolidDataset).mockResolvedValue(document);

    await expect(makeLibrary().fetchLibraryDeck(DOC)).resolves.toEqual({
      url: DOC,
      title: { en: "Capitals" },
      formatVersion: 1,
      authors: [],
      description: { en: "Flashcards: Capitals.", sv: "Kortlek: Capitals." },
      direction: "front-to-back",
      version: "1",
      seriesUrl: expect.any(String),
      themes: ["http://publications.europa.eu/resource/authority/data-theme/EDUC"],
      keywords: {},
      cards: [
        { id: "sweden", front: { "": "Sweden" }, back: { "": "Stockholm" }, formatVersion: 1 },
      ],
    });
    expect(getSolidDataset).toHaveBeenCalledWith(DOC, { fetch });
  });
});

describe("libraryStats", () => {
  const STATS = "https://pod.solid-memo.com/library/stats.ttl";
  /** The index as the build writes it: the catalogue is the index document itself. */
  const indexNaming = (statsUrl?: string) => {
    const catalog = buildThing(createThing({ url: INDEX })).addIri(RDF.type, "http://www.w3.org/ns/dcat#Catalog");
    return setThing(mockSolidDatasetFrom(INDEX), (statsUrl === undefined ? catalog : catalog.addIri(SM.libraryStats, statsUrl)).build());
  };

  it("reads the statistics document the index's catalogue names", async () => {
    const things = [
      buildThing(createThing({ url: STATS })).addDatetime(DCTERMS.modified, new Date("2026-10-05T06:00:00.000Z")).build(),
      buildThing(createThing({ url: `${INDEX}#capitals` }))
        .addIri(SCHEMA.interactionStatistic, `${STATS}#capitals-likes`)
        .addIri(SCHEMA.interactionStatistic, `${STATS}#capitals-downloads`)
        .build(),
      buildThing(createThing({ url: `${STATS}#capitals-likes` }))
        .addIri(SCHEMA.interactionType, SCHEMA.LikeAction)
        .addInteger(SCHEMA.userInteractionCount, 3)
        .build(),
      buildThing(createThing({ url: `${STATS}#capitals-downloads` }))
        .addIri(SCHEMA.interactionType, SCHEMA.DownloadAction)
        .addInteger(SCHEMA.userInteractionCount, 12)
        .build(),
    ];
    vi.mocked(getSolidDataset)
      .mockResolvedValueOnce(indexNaming(STATS))
      .mockResolvedValueOnce(things.reduce((dataset, thing) => setThing(dataset, thing), mockSolidDatasetFrom(STATS)));
    await expect(makeLibrary().libraryStats()).resolves.toEqual({
      countedAt: "2026-10-05T06:00:00.000Z",
      decks: { [`${INDEX}#capitals`]: { likes: 3, downloads: 12 } },
    });
    expect(vi.mocked(getSolidDataset).mock.calls).toEqual([
      [INDEX, { fetch }],
      [STATS, { fetch }],
    ]);
  });

  it("has none when the index names no statistics, without looking for any", async () => {
    vi.mocked(getSolidDataset).mockResolvedValueOnce(indexNaming());
    await expect(makeLibrary().libraryStats()).resolves.toEqual({ decks: {} });
    vi.mocked(getSolidDataset).mockResolvedValueOnce(mockSolidDatasetFrom(INDEX));
    await expect(makeLibrary().libraryStats()).resolves.toEqual({ decks: {} });
    expect(getSolidDataset).toHaveBeenCalledTimes(2);
  });

  it("has none when they or the index cannot be read", async () => {
    vi.mocked(getSolidDataset).mockResolvedValueOnce(indexNaming(STATS)).mockRejectedValueOnce(new Error("404"));
    await expect(makeLibrary().libraryStats()).resolves.toEqual({ decks: {} });
    vi.mocked(getSolidDataset).mockRejectedValueOnce(new Error("offline"));
    await expect(makeLibrary().libraryStats()).resolves.toEqual({ decks: {} });
  });
});

describe("inboxUrl", () => {
  it("is the inbox the index's catalogue names; null when it names none", async () => {
    const catalog = () => buildThing(createThing({ url: INDEX })).addIri(RDF.type, "http://www.w3.org/ns/dcat#Catalog");
    vi.mocked(getSolidDataset).mockResolvedValueOnce(
      setThing(mockSolidDatasetFrom(INDEX), catalog().addIri(LDP.inbox, "https://library.example/inbox/").build()),
    );
    await expect(makeLibrary().inboxUrl()).resolves.toBe("https://library.example/inbox/");
    vi.mocked(getSolidDataset).mockResolvedValueOnce(setThing(mockSolidDatasetFrom(INDEX), catalog().build()));
    await expect(makeLibrary().inboxUrl()).resolves.toBeNull();
    vi.mocked(getSolidDataset).mockResolvedValueOnce(mockSolidDatasetFrom(INDEX));
    await expect(makeLibrary().inboxUrl()).resolves.toBeNull();
  });
});
