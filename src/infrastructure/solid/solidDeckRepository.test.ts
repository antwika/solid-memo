import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildThing,
  createThing,
  deleteSolidDataset,
  getInteger,
  getStringNoLocale,
  getStringNoLocaleAll,
  getThing,
  getUrl,
  mockSolidDatasetFrom,
  saveSolidDatasetAt,
  setThing,
  type SolidDataset,
} from "@inrupt/solid-client";
import { createSolidDeckRepository } from "./solidDeckRepository";
import { getSolidDatasetOrNull } from "./datasets";
import { DCTERMS, RDF, SM } from "./vocab";
import type { Card, Deck } from "../../domain/deck";
import type { LibraryDeckContent } from "../../domain/library";

vi.mock("@inrupt/solid-client", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@inrupt/solid-client")>();
  return {
    ...actual,
    saveSolidDatasetAt: vi.fn(),
    deleteSolidDataset: vi.fn(),
  };
});
vi.mock("./datasets");

const INSTANCE = "https://pod.example/solid-memo/a/";
const CATALOG = `${INSTANCE}catalog.ttl`;
const FLAG = "https://flagcdn.com/h80/af.png";

const deck: Deck = {
  id: "deck-1",
  url: `${CATALOG}#deck-1`,
  name: "Kanji N5",
  cardsDocumentUrl: `${INSTANCE}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${INSTANCE}reviews/deck-1.ttl`,
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: [],
};

const card: Card = {
  id: "card-1",
  url: `${deck.cardsDocumentUrl}#card-1`,
  front: "水",
  back: "water",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
};

function makeRepository() {
  return createSolidDeckRepository({
    fetch: vi.fn() as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-09-21T10:00:00.000Z"),
    randomId: () => "fixed",
  });
}

function catalogWithDeck() {
  return setThing(
    mockSolidDatasetFrom(CATALOG),
    buildThing(createThing({ url: deck.url }))
      .addIri(RDF.type, SM.Deck)
      .addStringNoLocale(DCTERMS.title, deck.name)
      .addIri(SM.cardsDocument, deck.cardsDocumentUrl)
      .addIri(SM.reviewsDocument, deck.reviewsDocumentUrl)
      .build(),
  );
}

beforeEach(() => {
  vi.mocked(getSolidDatasetOrNull).mockReset();
  vi.mocked(saveSolidDatasetAt).mockReset();
  vi.mocked(deleteSolidDataset).mockReset();
});

describe("listDecks", () => {
  it("returns an empty list when the catalog does not exist", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await expect(makeRepository().listDecks(INSTANCE)).resolves.toEqual([]);
  });

  it("maps catalog subjects to decks", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(catalogWithDeck());
    const decks = await makeRepository().listDecks(INSTANCE);
    expect(decks).toHaveLength(1);
    expect(decks[0].name).toBe("Kanji N5");
  });
});

describe("createDeck", () => {
  it("adds a deck subject to a fresh catalog and returns the deck", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);

    const created = await makeRepository().createDeck(INSTANCE, "Kanji N5");

    expect(created).toEqual({
      id: "deck-fixed",
      url: `${CATALOG}#deck-fixed`,
      name: "Kanji N5",
      cardsDocumentUrl: `${INSTANCE}decks/deck-fixed.ttl`,
      reviewsDocumentUrl: `${INSTANCE}reviews/deck-fixed.ttl`,
      direction: "front-to-back",
      createdAt: "2026-09-21T10:00:00.000Z",
      formatVersion: 2,
      authors: [],
    });
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(CATALOG);
    const thing = getThing(saved as SolidDataset, created.url)!;
    expect(getStringNoLocale(thing, DCTERMS.title)).toBe("Kanji N5");
    expect(getInteger(thing, SM.formatVersion)).toBe(2);
    expect(getStringNoLocale(thing, SM.direction)).toBe("front-to-back");
    expect(getStringNoLocaleAll(thing, DCTERMS.creator)).toEqual([]);
    expect(getUrl(thing, DCTERMS.license)).toBeNull();
  });

  it("appends to an existing catalog", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(catalogWithDeck());

    await makeRepository().createDeck(INSTANCE, "Second deck");

    const [, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(getThing(saved as SolidDataset, deck.url)).not.toBeNull();
    expect(
      getThing(saved as SolidDataset, `${CATALOG}#deck-fixed`),
    ).not.toBeNull();
  });
});

describe("importDeck", () => {
  const content: LibraryDeckContent = {
    url: "https://solid-memo.com/decks/capitals.ttl",
    name: "Capitals",
    formatVersion: 1,
    authors: ["Anton Wiklund", "A friend"],
    license: "https://creativecommons.org/publicdomain/zero/1.0/",
    description: "Capitals, from Wikipedia.",
    direction: "bidirectional",
    cards: [
      { id: "sweden", front: "Sweden", back: "Stockholm", formatVersion: 1 },
      {
        id: "afghanistan",
        front: "",
        back: "Afghanistan",
        frontImageUrl: FLAG,
        formatVersion: 2,
      },
    ],
  };

  it("writes the cards document once, then the catalog entry with its source", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);

    const imported = await makeRepository().importDeck(INSTANCE, content);

    expect(imported).toEqual({
      id: "deck-fixed",
      url: `${CATALOG}#deck-fixed`,
      name: "Capitals",
      cardsDocumentUrl: `${INSTANCE}decks/deck-fixed.ttl`,
      reviewsDocumentUrl: `${INSTANCE}reviews/deck-fixed.ttl`,
      direction: "bidirectional",
      createdAt: "2026-09-21T10:00:00.000Z",
      formatVersion: 2,
      authors: ["Anton Wiklund", "A friend"],
      license: content.license,
      description: content.description,
      sourceUrl: content.url,
    });
    const calls = vi.mocked(saveSolidDatasetAt).mock.calls;
    expect(calls.map((c) => c[0])).toEqual([
      imported.cardsDocumentUrl,
      CATALOG,
    ]);
    const cards = calls[0][1] as SolidDataset;
    const sweden = getThing(cards, `${imported.cardsDocumentUrl}#sweden`)!;
    expect(getStringNoLocale(sweden, SM.front)).toBe("Sweden");
    expect(getStringNoLocale(sweden, SM.back)).toBe("Stockholm");
    expect(getInteger(sweden, SM.formatVersion)).toBe(2);
    const afghanistan = getThing(
      cards,
      `${imported.cardsDocumentUrl}#afghanistan`,
    )!;
    expect(getStringNoLocale(afghanistan, SM.front)).toBeNull();
    expect(getUrl(afghanistan, SM.frontImage)).toBe(FLAG);
    expect(getStringNoLocale(afghanistan, SM.back)).toBe("Afghanistan");
    expect(getSolidDatasetOrNull).toHaveBeenCalledTimes(1);
    const entry = getThing(calls[1][1] as SolidDataset, imported.url)!;
    expect(getStringNoLocale(entry, DCTERMS.title)).toBe("Capitals");
    expect(getUrl(entry, DCTERMS.source)).toBe(content.url);
    expect(getInteger(entry, SM.formatVersion)).toBe(2);
    expect(getStringNoLocale(entry, SM.direction)).toBe("bidirectional");
    expect(getStringNoLocaleAll(entry, DCTERMS.creator)).toEqual([
      "Anton Wiklund",
      "A friend",
    ]);
    expect(getUrl(entry, DCTERMS.license)).toBe(content.license);
    expect(getStringNoLocale(entry, DCTERMS.description)).toBe(
      content.description,
    );
  });

  it("leaves the catalog alone when the cards document fails to save", async () => {
    vi.mocked(saveSolidDatasetAt).mockRejectedValueOnce(new Error("403"));

    await expect(
      makeRepository().importDeck(INSTANCE, content),
    ).rejects.toThrow("403");
    expect(getSolidDatasetOrNull).not.toHaveBeenCalled();
    expect(saveSolidDatasetAt).toHaveBeenCalledTimes(1);
  });
});

describe("renameDeck", () => {
  it("replaces the title in place and returns the renamed deck", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(catalogWithDeck());

    const renamed = await makeRepository().renameDeck(deck, "Kanji N4");

    expect(renamed).toEqual({ ...deck, name: "Kanji N4", formatVersion: 2 });
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(CATALOG);
    const thing = getThing(saved as SolidDataset, deck.url)!;
    expect(getStringNoLocale(thing, DCTERMS.title)).toBe("Kanji N4");
    expect(getInteger(thing, SM.formatVersion)).toBe(2);
    expect(getStringNoLocale(thing, SM.direction)).toBe("front-to-back");
    expect(getUrl(thing, SM.cardsDocument)).toBe(deck.cardsDocumentUrl);
  });

  it("rejects when the catalog no longer exists", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await expect(makeRepository().renameDeck(deck, "x")).rejects.toThrow(
      "no longer exists",
    );
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });

  it("rejects when the deck is no longer in the catalog", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      mockSolidDatasetFrom(CATALOG),
    );
    await expect(makeRepository().renameDeck(deck, "x")).rejects.toThrow(
      "no longer exists",
    );
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });
});

describe("saveDeck", () => {
  it("writes the direction and format version in place, keeping the rest", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(catalogWithDeck());

    const saved = await makeRepository().saveDeck({
      ...deck,
      direction: "bidirectional",
    });

    expect(saved).toEqual({ ...deck, direction: "bidirectional", formatVersion: 2 });
    const [saveUrl, dataset] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(CATALOG);
    const thing = getThing(dataset as SolidDataset, deck.url)!;
    expect(getStringNoLocale(thing, SM.direction)).toBe("bidirectional");
    expect(getInteger(thing, SM.formatVersion)).toBe(2);
    expect(getStringNoLocale(thing, DCTERMS.title)).toBe(deck.name);
    expect(getUrl(thing, SM.reviewsDocument)).toBe(deck.reviewsDocumentUrl);
  });

  it("rejects when the deck is gone", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await expect(makeRepository().saveDeck(deck)).rejects.toThrow(
      "no longer exists",
    );
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });
});

describe("removeDeck", () => {
  it("deletes both documents and the catalog subject", async () => {
    vi.mocked(getSolidDatasetOrNull).mockImplementation((async (
      url: string,
    ) =>
      url === CATALOG ? catalogWithDeck() : mockSolidDatasetFrom(url)) as never);

    await makeRepository().removeDeck(deck);

    expect(deleteSolidDataset).toHaveBeenCalledWith(
      deck.cardsDocumentUrl,
      expect.anything(),
    );
    expect(deleteSolidDataset).toHaveBeenCalledWith(
      deck.reviewsDocumentUrl,
      expect.anything(),
    );
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(CATALOG);
    expect(getThing(saved as SolidDataset, deck.url)).toBeNull();
  });

  it("skips missing documents and a missing catalog", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);

    await makeRepository().removeDeck(deck);

    expect(deleteSolidDataset).not.toHaveBeenCalled();
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });
});

describe("listCards", () => {
  it("returns an empty list when the cards document does not exist", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await expect(makeRepository().listCards(deck)).resolves.toEqual([]);
  });

  it("maps card subjects", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      setThing(
        mockSolidDatasetFrom(deck.cardsDocumentUrl),
        buildThing(createThing({ url: card.url }))
          .addIri(RDF.type, SM.Card)
          .addStringNoLocale(SM.front, card.front)
          .addStringNoLocale(SM.back, card.back)
          .build(),
      ),
    );
    const cards = await makeRepository().listCards(deck);
    expect(cards).toHaveLength(1);
    expect(cards[0].front).toBe("水");
  });
});

describe("addCard", () => {
  it("adds a card subject to a fresh cards document", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);

    const created = await makeRepository().addCard(deck, {
      front: "火",
      back: "fire",
    });

    expect(created).toEqual({
      id: "card-fixed",
      url: `${deck.cardsDocumentUrl}#card-fixed`,
      front: "火",
      back: "fire",
      createdAt: "2026-09-21T10:00:00.000Z",
      formatVersion: 2,
    });
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(deck.cardsDocumentUrl);
    const thing = getThing(saved as SolidDataset, created.url)!;
    expect(getStringNoLocale(thing, SM.front)).toBe("火");
    expect(getStringNoLocale(thing, SM.back)).toBe("fire");
    expect(getUrl(thing, SM.frontImage)).toBeNull();
    expect(getInteger(thing, SM.formatVersion)).toBe(2);
  });

  it("writes a picture as an IRI and no text triple for an empty side", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);

    const created = await makeRepository().addCard(deck, {
      front: "",
      back: "Afghanistan",
      frontImageUrl: FLAG,
    });

    expect(created.frontImageUrl).toBe(FLAG);
    const [, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    const thing = getThing(saved as SolidDataset, created.url)!;
    expect(getStringNoLocale(thing, SM.front)).toBeNull();
    expect(getUrl(thing, SM.frontImage)).toBe(FLAG);
    expect(getStringNoLocale(thing, SM.frontImage)).toBeNull();
    expect(getStringNoLocale(thing, SM.back)).toBe("Afghanistan");
  });

  it("writes a picture-only back the same way", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);

    const created = await makeRepository().addCard(deck, {
      front: "Afghanistan",
      back: "",
      backImageUrl: FLAG,
    });

    const [, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    const thing = getThing(saved as SolidDataset, created.url)!;
    expect(getStringNoLocale(thing, SM.back)).toBeNull();
    expect(getUrl(thing, SM.backImage)).toBe(FLAG);
  });
});

describe("updateCard", () => {
  function cardsDoc() {
    return setThing(
      mockSolidDatasetFrom(deck.cardsDocumentUrl),
      buildThing(createThing({ url: card.url }))
        .addIri(RDF.type, SM.Card)
        .addStringNoLocale(SM.front, card.front)
        .addStringNoLocale(SM.back, card.back)
        .addIri(SM.backImage, "https://img.example/old.png")
        .addInteger(SM.formatVersion, 1)
        .addStringNoLocale("https://other.example/vocab#note", "kept")
        .build(),
    );
  }

  it("replaces the content in place, in the current format, and returns the updated card", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(cardsDoc());

    const updated = await makeRepository().updateCard(deck, card, {
      front: "수영하다",
      back: "to swim",
      frontImageUrl: FLAG,
    });

    expect(updated).toEqual({
      ...card,
      front: "수영하다",
      back: "to swim",
      frontImageUrl: FLAG,
      formatVersion: 2,
    });
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(deck.cardsDocumentUrl);
    const thing = getThing(saved as SolidDataset, card.url)!;
    expect(getStringNoLocale(thing, SM.front)).toBe("수영하다");
    expect(getStringNoLocale(thing, SM.back)).toBe("to swim");
    expect(getUrl(thing, SM.frontImage)).toBe(FLAG);
    expect(getUrl(thing, SM.backImage)).toBeNull();
    expect(getInteger(thing, SM.formatVersion)).toBe(2);
    expect(
      getStringNoLocale(thing, "https://other.example/vocab#note"),
    ).toBe("kept");
  });

  it("rejects when the cards document no longer exists", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await expect(
      makeRepository().updateCard(deck, card, { front: "x", back: "y" }),
    ).rejects.toThrow("no longer exists");
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });

  it("rejects when the card no longer exists", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      mockSolidDatasetFrom(deck.cardsDocumentUrl),
    );
    await expect(
      makeRepository().updateCard(deck, card, { front: "x", back: "y" }),
    ).rejects.toThrow("no longer exists");
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });
});

describe("saveCards", () => {
  const other: Card = {
    ...card,
    id: "card-2",
    url: `${deck.cardsDocumentUrl}#card-2`,
    front: "火",
    back: "fire",
  };

  const formatOne = (c: Card) =>
    buildThing(createThing({ url: c.url }))
      .addIri(RDF.type, SM.Card)
      .addStringNoLocale(SM.front, c.front)
      .addStringNoLocale(SM.back, c.back)
      .addInteger(SM.formatVersion, 1)
      .build();

  function cardsDoc() {
    return setThing(
      setThing(mockSolidDatasetFrom(deck.cardsDocumentUrl), formatOne(card)),
      formatOne(other),
    );
  }

  it("rewrites the given cards in one save, skipping cards that are gone", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(cardsDoc());
    const gone: Card = {
      ...card,
      id: "card-gone",
      url: `${deck.cardsDocumentUrl}#card-gone`,
      formatVersion: 2,
    };

    await makeRepository().saveCards(deck, [
      { ...card, formatVersion: 2 },
      gone,
      { ...other, formatVersion: 2 },
    ]);

    expect(saveSolidDatasetAt).toHaveBeenCalledTimes(1);
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(deck.cardsDocumentUrl);
    for (const c of [card, other]) {
      const thing = getThing(saved as SolidDataset, c.url)!;
      expect(getInteger(thing, SM.formatVersion)).toBe(2);
      expect(getStringNoLocale(thing, SM.front)).toBe(c.front);
      expect(getStringNoLocale(thing, SM.back)).toBe(c.back);
    }
    expect(getThing(saved as SolidDataset, gone.url)).toBeNull();
  });

  it("does nothing when the cards document no longer exists", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await makeRepository().saveCards(deck, [card]);
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });
});

describe("removeCard", () => {
  it("removes the card and its review state", async () => {
    const cardsDoc = setThing(
      mockSolidDatasetFrom(deck.cardsDocumentUrl),
      buildThing(createThing({ url: card.url }))
        .addIri(RDF.type, SM.Card)
        .addStringNoLocale(SM.front, card.front)
        .addStringNoLocale(SM.back, card.back)
        .build(),
    );
    const reviewsDoc = [
      `${deck.reviewsDocumentUrl}#card-1`,
      `${deck.reviewsDocumentUrl}#card-1@back-to-front`,
    ].reduce(
      (dataset, url) =>
        setThing(
          dataset,
          buildThing(createThing({ url }))
            .addIri(RDF.type, SM.ReviewState)
            .build(),
        ),
      mockSolidDatasetFrom(deck.reviewsDocumentUrl),
    );
    vi.mocked(getSolidDatasetOrNull).mockImplementation(async (url) =>
      url === deck.cardsDocumentUrl ? cardsDoc : reviewsDoc,
    );

    await makeRepository().removeCard(deck, card);

    const cardsSave = vi
      .mocked(saveSolidDatasetAt)
      .mock.calls.find(([url]) => url === deck.cardsDocumentUrl)!;
    expect(getThing(cardsSave[1] as SolidDataset, card.url)).toBeNull();
    const reviewsSave = vi
      .mocked(saveSolidDatasetAt)
      .mock.calls.find(([url]) => url === deck.reviewsDocumentUrl)!;
    expect(
      getThing(
        reviewsSave[1] as SolidDataset,
        `${deck.reviewsDocumentUrl}#card-1`,
      ),
    ).toBeNull();
    expect(
      getThing(
        reviewsSave[1] as SolidDataset,
        `${deck.reviewsDocumentUrl}#card-1@back-to-front`,
      ),
    ).toBeNull();
  });

  it("does nothing when neither document exists", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await makeRepository().removeCard(deck, card);
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });
});
