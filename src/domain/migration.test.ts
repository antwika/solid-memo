import { describe, expect, it } from "vitest";
import {
  CARD_FORMAT_VERSION,
  DECK_FORMAT_VERSION,
  type Card,
  type Deck,
} from "./deck";
import {
  isDeckOutdated,
  isOutdated,
  planMigration,
  upgradeCard,
  upgradeDeck,
} from "./migration";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  name: "Kanji N5",
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: DECK_FORMAT_VERSION,
  authors: [],
};
const oldDeck: Deck = { ...deck, formatVersion: 1 };

function card(id: string, formatVersion: number): Card {
  return {
    id,
    url: `${deck.cardsDocumentUrl}#${id}`,
    front: id,
    back: `${id} back`,
    createdAt: "2026-09-21T10:00:00.000Z",
    formatVersion,
  };
}

describe("isOutdated", () => {
  it("is true below the current card format only", () => {
    expect(isOutdated(card("a", 1))).toBe(true);
    expect(isOutdated(card("a", CARD_FORMAT_VERSION))).toBe(false);
    expect(isOutdated(card("a", CARD_FORMAT_VERSION + 1))).toBe(false);
  });
});

describe("upgradeCard", () => {
  it("moves a format-1 card to the current format without touching its content", () => {
    expect(upgradeCard(card("a", 1))).toEqual({
      ...card("a", 1),
      formatVersion: CARD_FORMAT_VERSION,
    });
  });

  it("returns a current or newer card unchanged", () => {
    const current = card("a", CARD_FORMAT_VERSION);
    expect(upgradeCard(current)).toBe(current);
    const newer = card("a", CARD_FORMAT_VERSION + 1);
    expect(upgradeCard(newer)).toBe(newer);
  });
});

describe("isDeckOutdated", () => {
  it("is true below the current deck format only", () => {
    expect(isDeckOutdated(oldDeck)).toBe(true);
    expect(isDeckOutdated(deck)).toBe(false);
    expect(isDeckOutdated({ ...deck, formatVersion: DECK_FORMAT_VERSION + 1 })).toBe(false);
  });
});

describe("upgradeDeck", () => {
  it("moves a format-1 deck to the current format, keeping its direction", () => {
    expect(upgradeDeck(oldDeck)).toEqual({
      ...oldDeck,
      formatVersion: DECK_FORMAT_VERSION,
    });
    expect(upgradeDeck({ ...oldDeck, direction: "bidirectional" }).direction).toBe(
      "bidirectional",
    );
  });

  it("returns a current or newer deck unchanged", () => {
    expect(upgradeDeck(deck)).toBe(deck);
    const newer = { ...deck, formatVersion: DECK_FORMAT_VERSION + 1 };
    expect(upgradeDeck(newer)).toBe(newer);
  });
});

describe("planMigration", () => {
  it("lists the decks with an outdated entry or outdated cards, counting both", () => {
    const other: Deck = { ...deck, id: "deck-2", url: `${deck.url}2` };
    const oldEntry: Deck = { ...oldDeck, id: "deck-3", url: `${deck.url}3` };
    const upToDate: Deck = { ...deck, id: "deck-4", url: `${deck.url}4` };
    expect(
      planMigration([
        { deck, cards: [card("a", 1), card("b", 2), card("c", 1)] },
        { deck: other, cards: [card("d", 1)] },
        { deck: oldEntry, cards: [card("e", 2)] },
        { deck: upToDate, cards: [card("f", 2)] },
      ]),
    ).toEqual({
      decks: [
        { deck, deckOutdated: false, cardCount: 2 },
        { deck: other, deckOutdated: false, cardCount: 1 },
        { deck: oldEntry, deckOutdated: true, cardCount: 0 },
      ],
      deckCount: 1,
      cardCount: 3,
    });
  });

  it("is empty when every deck and card is current", () => {
    expect(planMigration([{ deck, cards: [card("a", 2)] }])).toEqual({
      decks: [],
      deckCount: 0,
      cardCount: 0,
    });
    expect(planMigration([])).toEqual({ decks: [], deckCount: 0, cardCount: 0 });
  });
});
