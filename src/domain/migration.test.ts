import { describe, expect, it } from "vitest";
import { CARD_FORMAT_VERSION, type Card, type Deck } from "./deck";
import { isOutdated, planMigration, upgradeCard } from "./migration";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  name: "Kanji N5",
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: [],
};

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

describe("planMigration", () => {
  it("lists the decks with outdated cards and counts them", () => {
    const other: Deck = { ...deck, id: "deck-2", url: `${deck.url}2` };
    const upToDate: Deck = { ...deck, id: "deck-3", url: `${deck.url}3` };
    expect(
      planMigration([
        { deck, cards: [card("a", 1), card("b", 2), card("c", 1)] },
        { deck: other, cards: [card("d", 1)] },
        { deck: upToDate, cards: [card("e", 2)] },
      ]),
    ).toEqual({
      decks: [
        { deck, cardCount: 2 },
        { deck: other, cardCount: 1 },
      ],
      cardCount: 3,
    });
  });

  it("is empty when every card is current", () => {
    expect(planMigration([{ deck, cards: [card("a", 2)] }])).toEqual({
      decks: [],
      cardCount: 0,
    });
    expect(planMigration([])).toEqual({ decks: [], cardCount: 0 });
  });
});
