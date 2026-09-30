import { describe, expect, it } from "vitest";
import type { Card, Deck } from "./deck";
import type { LibraryCard, LibraryDeckContent } from "./library";
import { applyLibraryUpgrade, planLibraryUpgrade } from "./libraryUpgrade";

const DECKS = "https://solid-memo.com/decks/";
const CARDS = "https://pod.example/solid-memo/a/decks/deck-1.ttl";

const libraryCard = (id: string, back: string, formatVersion = 1): LibraryCard => ({ id, front: id, back, formatVersion });
const podCard = (id: string, back: string): Card => ({ id, url: `${CARDS}#${id}`, front: id, back, createdAt: "", formatVersion: 2 });

function release(version: number, cards: LibraryCard[], direction: Deck["direction"] = "front-to-back"): LibraryDeckContent {
  return {
    url: `${DECKS}capitals/${version}.ttl`,
    title: { en: "Capitals" },
    formatVersion: 3,
    authors: [],
    direction,
    version: String(version),
    seriesUrl: `${DECKS}index.ttl#capitals`,
    themes: [],
    keywords: [],
    cards,
  };
}

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  title: { en: "Capitals" },
  cardsDocumentUrl: CARDS,
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  createdAt: "",
  formatVersion: 3,
  direction: "front-to-back",
  authors: [],
  sourceUrl: `${DECKS}capitals/1.ttl`,
};

const releases = [
  { url: `${DECKS}capitals/1.ttl`, version: "1", notes: "First." },
  { url: `${DECKS}capitals/2.ttl`, version: "2" },
  { url: `${DECKS}capitals/3.ttl`, version: "3", notes: "Norway, and Sweden fixed." },
];

describe("planLibraryUpgrade", () => {
  const from = release(1, [
    libraryCard("se", "Stockholm?"),
    libraryCard("dk", "Copenhagen"),
    libraryCard("fi", "Helsinki"),
    libraryCard("is", "Reykjavik"),
    libraryCard("ee", "Tallinn"),
    libraryCard("lv", "Riga"),
  ]);
  const to = release(3, [
    libraryCard("se", "Stockholm"),
    libraryCard("dk", "Copenhagen"),
    libraryCard("fi", "Helsingfors"),
    libraryCard("ee", "Tallinn!"),
    libraryCard("no", "Oslo"),
    libraryCard("mine", "Mine"),
  ]);
  const cards = [
    podCard("se", "Stockholm?"),
    podCard("dk", "Copenhagen"),
    podCard("fi", "Helsinki, my note"),
    podCard("is", "Reykjavik"),
    podCard("mine", "Mine"),
    podCard("lv", "Riga, mine"),
  ];

  it("applies the library's changes to the cards the user left alone, keeping the others, with every release's notes", () => {
    expect(planLibraryUpgrade({ deck, cards, from, to, releases })).toEqual({
      fromVersion: "1",
      toVersion: "3",
      releaseUrl: `${DECKS}capitals/3.ttl`,
      notes: [{ version: "3", notes: "Norway, and Sweden fixed." }],
      add: [libraryCard("no", "Oslo")],
      change: [libraryCard("se", "Stockholm")],
      remove: [podCard("is", "Reykjavik")],
      kept: [podCard("fi", "Helsinki, my note"), podCard("lv", "Riga, mine")],
    });
  });

  it("takes up the library's new direction while the copy is still studied the old way", () => {
    const both = release(2, from.cards, "bidirectional");
    expect(planLibraryUpgrade({ deck, cards, from, to: both, releases })).toMatchObject({
      direction: "bidirectional",
      add: [],
      change: [],
      remove: [],
    });
    expect(planLibraryUpgrade({ deck: { ...deck, direction: "back-to-front" }, cards, from, to: both, releases })).toBeNull();
  });

  it("offers nothing for a release that is not newer, uses an unknown card format, or changes nothing", () => {
    expect(planLibraryUpgrade({ deck, cards, from: to, to: from, releases })).toBeNull();
    expect(planLibraryUpgrade({ deck, cards, from, to: release(3, [libraryCard("x", "y", 9)]), releases })).toBeNull();
    expect(planLibraryUpgrade({ deck, cards, from, to: release(2, from.cards), releases })).toBeNull();
  });
});

describe("applyLibraryUpgrade", () => {
  it("moves the copy to the newer release, and to its direction when that changes", () => {
    const plan = { fromVersion: "1", toVersion: "3", releaseUrl: `${DECKS}capitals/3.ttl`, notes: [], add: [], change: [], remove: [], kept: [] };
    expect(applyLibraryUpgrade(deck, plan)).toEqual({ ...deck, sourceUrl: `${DECKS}capitals/3.ttl` });
    expect(applyLibraryUpgrade(deck, { ...plan, direction: "bidirectional" })).toEqual({
      ...deck,
      sourceUrl: `${DECKS}capitals/3.ttl`,
      direction: "bidirectional",
    });
  });
});
