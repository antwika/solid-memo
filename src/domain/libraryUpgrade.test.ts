import { describe, expect, it } from "vitest";
import { CARD_FORMAT_VERSION, DECK_FORMAT_VERSION, type Deck } from "./deck";
import type { LibraryDeckContent } from "./library";
import { applyLibraryUpgrade, planLibraryUpgrade } from "./libraryUpgrade";

const LIBRARY_URL = "https://solid-memo.com/decks/capitals.ttl";

/** A copy imported when the library deck was format 1. */
const copy: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  name: "Capitals",
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: ["Anton Wiklund"],
  sourceUrl: LIBRARY_URL,
};

/** The library deck as re-published: format 2, studied both ways. */
const source: LibraryDeckContent = {
  url: LIBRARY_URL,
  name: "Capitals",
  formatVersion: 2,
  authors: ["Anton Wiklund"],
  direction: "bidirectional",
  cards: [{ id: "sweden", front: "Sweden", back: "Stockholm", formatVersion: 1 }],
};

describe("planLibraryUpgrade", () => {
  it("offers the library's direction when the library's format is newer", () => {
    expect(planLibraryUpgrade(copy, source)).toEqual({
      fromVersion: 1,
      toVersion: 2,
      direction: "bidirectional",
    });
  });

  it("offers nothing for a deck not imported from this document", () => {
    expect(planLibraryUpgrade({ ...copy, sourceUrl: undefined }, source)).toBeNull();
    expect(
      planLibraryUpgrade(
        { ...copy, sourceUrl: "https://solid-memo.com/decks/rivers.ttl" },
        source,
      ),
    ).toBeNull();
  });

  it("offers nothing when the copy is already at (or beyond) the library's format", () => {
    expect(planLibraryUpgrade({ ...copy, formatVersion: 2 }, source)).toBeNull();
    expect(planLibraryUpgrade({ ...copy, formatVersion: 3 }, source)).toBeNull();
  });

  it("offers nothing when this app does not know the library's formats", () => {
    expect(
      planLibraryUpgrade(copy, { ...source, formatVersion: DECK_FORMAT_VERSION + 1 }),
    ).toBeNull();
    expect(
      planLibraryUpgrade(copy, {
        ...source,
        cards: [{ ...source.cards[0], formatVersion: CARD_FORMAT_VERSION + 1 }],
      }),
    ).toBeNull();
  });

  it("offers nothing when only the version number would move", () => {
    expect(planLibraryUpgrade({ ...copy, direction: "bidirectional" }, source)).toBeNull();
  });
});

describe("applyLibraryUpgrade", () => {
  it("sets the library's direction and the library's format, keeping the rest", () => {
    expect(
      applyLibraryUpgrade(copy, {
        fromVersion: 1,
        toVersion: 2,
        direction: "bidirectional",
      }),
    ).toEqual({ ...copy, direction: "bidirectional", formatVersion: 2 });
  });
});
