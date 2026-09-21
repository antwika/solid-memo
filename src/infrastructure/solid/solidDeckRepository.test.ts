import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildThing,
  createThing,
  deleteSolidDataset,
  getStringNoLocale,
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

const deck: Deck = {
  id: "deck-1",
  url: `${CATALOG}#deck-1`,
  name: "Kanji N5",
  cardsDocumentUrl: `${INSTANCE}decks/deck-1.ttl`,
  reviewsDocumentUrl: `${INSTANCE}reviews/deck-1.ttl`,
  createdAt: "2026-09-21T10:00:00.000Z",
};

const card: Card = {
  id: "card-1",
  url: `${deck.cardsDocumentUrl}#card-1`,
  front: "水",
  back: "water",
  createdAt: "2026-09-21T10:00:00.000Z",
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
      createdAt: "2026-09-21T10:00:00.000Z",
    });
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(CATALOG);
    const thing = getThing(saved as SolidDataset, created.url)!;
    expect(getStringNoLocale(thing, DCTERMS.title)).toBe("Kanji N5");
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

describe("renameDeck", () => {
  it("replaces the title in place and returns the renamed deck", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(catalogWithDeck());

    const renamed = await makeRepository().renameDeck(deck, "Kanji N4");

    expect(renamed).toEqual({ ...deck, name: "Kanji N4" });
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(CATALOG);
    const thing = getThing(saved as SolidDataset, deck.url)!;
    expect(getStringNoLocale(thing, DCTERMS.title)).toBe("Kanji N4");
    // The links to the deck's documents survive the rename.
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

    const created = await makeRepository().addCard(deck, "火", "fire");

    expect(created.id).toBe("card-fixed");
    expect(created.url).toBe(`${deck.cardsDocumentUrl}#card-fixed`);
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(deck.cardsDocumentUrl);
    const thing = getThing(saved as SolidDataset, created.url)!;
    expect(getStringNoLocale(thing, SM.front)).toBe("火");
    expect(getStringNoLocale(thing, SM.back)).toBe("fire");
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
        .build(),
    );
  }

  it("replaces front and back in place and returns the updated card", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(cardsDoc());

    const updated = await makeRepository().updateCard(
      deck,
      card,
      "수영하다",
      "to swim",
    );

    expect(updated).toEqual({ ...card, front: "수영하다", back: "to swim" });
    const [saveUrl, saved] = vi.mocked(saveSolidDatasetAt).mock.calls[0];
    expect(saveUrl).toBe(deck.cardsDocumentUrl);
    const thing = getThing(saved as SolidDataset, card.url)!;
    expect(getStringNoLocale(thing, SM.front)).toBe("수영하다");
    expect(getStringNoLocale(thing, SM.back)).toBe("to swim");
  });

  it("rejects when the cards document no longer exists", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await expect(
      makeRepository().updateCard(deck, card, "x", "y"),
    ).rejects.toThrow("no longer exists");
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });

  it("rejects when the card no longer exists", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(
      mockSolidDatasetFrom(deck.cardsDocumentUrl),
    );
    await expect(
      makeRepository().updateCard(deck, card, "x", "y"),
    ).rejects.toThrow("no longer exists");
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
    const reviewsDoc = setThing(
      mockSolidDatasetFrom(deck.reviewsDocumentUrl),
      buildThing(
        createThing({ url: `${deck.reviewsDocumentUrl}#card-1` }),
      )
        .addIri(RDF.type, SM.ReviewState)
        .build(),
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
  });

  it("does nothing when neither document exists", async () => {
    vi.mocked(getSolidDatasetOrNull).mockResolvedValue(null);
    await makeRepository().removeCard(deck, card);
    expect(saveSolidDatasetAt).not.toHaveBeenCalled();
  });
});
