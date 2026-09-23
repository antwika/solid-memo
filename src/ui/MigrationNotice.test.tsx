import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import {
  describeMigrated,
  describeOutdated,
  MigrationNotice,
} from "./MigrationNotice";
import type { Deck } from "../domain/deck";
import type { MigrationPlan } from "../domain/migration";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  name: "Kanji N5",
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: [],
};
const capitals: Deck = { ...deck, id: "deck-2", url: `${deck.url}2`, name: "Capitals" };
const verbs: Deck = { ...deck, id: "deck-3", url: `${deck.url}3`, name: "Verbs" };

const plan: MigrationPlan = {
  decks: [
    { deck, deckOutdated: true, cardCount: 12 },
    { deck: capitals, deckOutdated: false, cardCount: 243 },
    { deck: verbs, deckOutdated: true, cardCount: 0 },
  ],
  deckCount: 2,
  cardCount: 255,
};

function renderNotice(
  overrides: Partial<Parameters<typeof MigrationNotice>[0]> = {},
) {
  const props = {
    plan,
    busy: false,
    error: null,
    onMigrate: vi.fn(),
    ...overrides,
  };
  const view = render(<MigrationNotice {...props} />);
  return { ...view, props };
}

describe("describeOutdated", () => {
  it("names the deck entries and the cards, whichever there are", () => {
    expect(describeOutdated(plan)).toBe(
      "2 deck entries and 255 cards in 2 decks",
    );
    expect(
      describeOutdated({
        decks: [{ deck, deckOutdated: true, cardCount: 0 }],
        deckCount: 1,
        cardCount: 0,
      }),
    ).toBe("1 deck entry");
    expect(
      describeOutdated({
        decks: [{ deck, deckOutdated: false, cardCount: 1 }],
        deckCount: 0,
        cardCount: 1,
      }),
    ).toBe("1 card in one deck");
  });
});

describe("describeMigrated", () => {
  it("names what was rewritten", () => {
    expect(describeMigrated({ deckCount: 2, cardCount: 12 })).toBe(
      "2 deck entries and 12 cards",
    );
    expect(describeMigrated({ deckCount: 1, cardCount: 0 })).toBe("1 deck entry");
    expect(describeMigrated({ deckCount: 0, cardCount: 3 })).toBe("3 cards");
  });
});

describe("MigrationNotice", () => {
  it("says what will be updated, deck by deck, and waits for the user", () => {
    const { props } = renderNotice();
    const region = screen.getByRole("region", { name: "Format update" });
    expect(region).toHaveTextContent(
      "2 deck entries and 255 cards in 2 decks are stored in an older format.",
    );
    expect(region).toHaveTextContent("Solid Memo now writes deck format 2");
    expect(region).toHaveTextContent("card format 2");
    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent),
    ).toEqual([
      "Kanji N5 — deck entry, 12 cards",
      "Capitals — 243 cards",
      "Verbs — deck entry",
    ]);
    expect(props.onMigrate).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Update 3 decks" }));
    expect(props.onMigrate).toHaveBeenCalledOnce();
  });

  it("phrases a single card in a single deck", () => {
    renderNotice({
      plan: {
        decks: [{ deck, deckOutdated: false, cardCount: 1 }],
        deckCount: 0,
        cardCount: 1,
      },
    });
    expect(screen.getByRole("region")).toHaveTextContent(
      "1 card in one deck is stored in an older format.",
    );
    expect(screen.getByRole("button", { name: "Update 1 deck" })).toBeEnabled();
  });

  it("shows progress and errors", () => {
    renderNotice({ busy: true, error: "write refused" });
    expect(screen.getByRole("button", { name: "Updating…" })).toBeDisabled();
    expect(screen.getByText("write refused")).toBeInTheDocument();
  });
});
