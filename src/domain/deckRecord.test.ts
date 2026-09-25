import { describe, expect, it } from "vitest";
import type { Deck } from "./deck";
import {
  cardContentFromRecord,
  cardFromRecord,
  cardToRecord,
  deckFromRecord,
  deckToRecord,
  libraryDeckFromRecord,
} from "./deckRecord";

const CATALOG = "https://pod.example/solid-memo/a/catalog.ttl";
const CARDS = "https://pod.example/solid-memo/a/decks/deck-1.ttl";
const REVIEWS = "https://pod.example/solid-memo/a/reviews/deck-1.ttl";
const FLAG = "https://flagcdn.com/se.svg";

const deck: Deck = {
  id: "deck-1",
  url: `${CATALOG}#deck-1`,
  name: "Capitals",
  cardsDocumentUrl: CARDS,
  reviewsDocumentUrl: REVIEWS,
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 2,
  direction: "bidirectional",
  authors: ["Anton Wiklund"],
  license: "https://creativecommons.org/publicdomain/zero/1.0/",
  description: "From Wikipedia.",
  sourceUrl: "https://solid-memo.com/decks/capitals.ttl",
};

describe("deck records", () => {
  it("round-trip a deck with every field", () => {
    const record = deckToRecord(deck);
    expect(record).toEqual({
      title: "Capitals",
      created: deck.createdAt,
      creator: ["Anton Wiklund"],
      license: deck.license,
      description: deck.description,
      direction: "bidirectional",
      cardsDocument: CARDS,
      reviewsDocument: REVIEWS,
      source: deck.sourceUrl,
    });
    expect(deckFromRecord(deck.url, 2, record)).toEqual(deck);
  });

  it("leave out what a deck does not have, and keep the stored version", () => {
    const bare: Deck = {
      id: "deck-1",
      url: `${CATALOG}#deck-1`,
      name: "Own",
      cardsDocumentUrl: CARDS,
      reviewsDocumentUrl: REVIEWS,
      createdAt: "",
      formatVersion: 1,
      direction: "front-to-back",
      authors: [],
    };
    const record = deckToRecord(bare);
    expect(record).toEqual({
      title: "Own",
      creator: [],
      direction: "front-to-back",
      cardsDocument: CARDS,
      reviewsDocument: REVIEWS,
    });
    expect(deckFromRecord(bare.url, 1, record)).toEqual(bare);
  });
});

describe("card records", () => {
  it("round-trip text, pictures and the creation time", () => {
    const record = cardToRecord(
      { front: "Flag", back: "Sweden", frontImageUrl: FLAG, backImageUrl: FLAG },
      "2026-09-21T10:00:00.000Z",
    );
    expect(record).toEqual({
      front: "Flag",
      back: "Sweden",
      frontImage: FLAG,
      backImage: FLAG,
      created: "2026-09-21T10:00:00.000Z",
    });
    expect(cardFromRecord(`${CARDS}#se`, 2, record)).toEqual({
      id: "se",
      url: `${CARDS}#se`,
      front: "Flag",
      back: "Sweden",
      frontImageUrl: FLAG,
      backImageUrl: FLAG,
      createdAt: "2026-09-21T10:00:00.000Z",
      formatVersion: 2,
    });
  });

  it("leave out empty text, missing pictures and an unknown creation time", () => {
    expect(cardToRecord({ front: "", back: "Sweden", frontImageUrl: FLAG }, "")).toEqual({
      back: "Sweden",
      frontImage: FLAG,
    });
    expect(cardFromRecord(`${CARDS}#se`, 1, { back: "Sweden", frontImage: FLAG })).toEqual({
      id: "se",
      url: `${CARDS}#se`,
      front: "",
      back: "Sweden",
      frontImageUrl: FLAG,
      createdAt: "",
      formatVersion: 1,
    });
  });

  it("have no content when a side has neither text nor a picture", () => {
    expect(cardContentFromRecord({ back: "Sweden" })).toBeNull();
    expect(cardContentFromRecord({ front: "Sweden" })).toBeNull();
    expect(cardFromRecord(`${CARDS}#se`, 2, { front: "x" })).toBeNull();
  });
});

describe("library deck records", () => {
  it("build the deck's content around its cards", () => {
    const cards = [{ id: "se", front: "Sweden", back: "Stockholm", formatVersion: 1 }];
    expect(
      libraryDeckFromRecord(
        "https://solid-memo.com/decks/capitals.ttl",
        1,
        { title: "Capitals", creator: ["Anton"], direction: "front-to-back", source: [] },
        cards,
      ),
    ).toEqual({
      url: "https://solid-memo.com/decks/capitals.ttl",
      name: "Capitals",
      formatVersion: 1,
      authors: ["Anton"],
      direction: "front-to-back",
      cards,
    });
    expect(
      libraryDeckFromRecord(
        "https://solid-memo.com/decks/capitals.ttl",
        2,
        {
          title: "Capitals",
          creator: [],
          license: "https://creativecommons.org/publicdomain/zero/1.0/",
          description: "From Wikipedia.",
          direction: "bidirectional",
          source: ["https://en.wikipedia.org/"],
        },
        [],
      ),
    ).toMatchObject({
      license: "https://creativecommons.org/publicdomain/zero/1.0/",
      description: "From Wikipedia.",
      direction: "bidirectional",
    });
  });
});
