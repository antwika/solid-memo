import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { DeckDetailScreen } from "./DeckDetailScreen";
import type { Deck } from "../domain/deck";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  name: "Kanji N5",
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  createdAt: "2026-09-21T10:00:00.000Z",
};

function renderScreen(
  overrides: Partial<Parameters<typeof DeckDetailScreen>[0]> = {},
) {
  const props = {
    deck,
    deckHref: "#/deck?deck=d",
    cardCount: 3,
    dueCount: 2,
    newCount: 1,
    decksHref: "#/decks?instance=a",
    onStudy: vi.fn(),
    onPractice: vi.fn(),
    onBrowse: vi.fn(),
    ...overrides,
  };
  const view = render(<DeckDetailScreen {...props} />);
  return { ...view, props };
}

describe("DeckDetailScreen", () => {
  it("links the deck's name to the deck's page", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "Kanji N5" })).toHaveAttribute(
      "href",
      "#/deck?deck=d",
    );
  });

  it("shows the deck name and card count", () => {
    renderScreen();
    expect(
      screen.getByRole("heading", { name: "Kanji N5" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/3 cards in this deck/)).toBeInTheDocument();
  });

  it("uses the singular for one card", () => {
    renderScreen({ cardCount: 1 });
    expect(screen.getByText(/1 card in this deck/)).toBeInTheDocument();
  });

  it("presents Study as the primary action", () => {
    renderScreen();
    expect(screen.getByRole("button", { name: "Study" })).toHaveClass(
      "primary",
    );
    expect(screen.getByRole("button", { name: "Practice" })).not.toHaveClass(
      "primary",
    );
  });

  it("says so, without offering a session, when everything is studied", () => {
    renderScreen({ dueCount: 0, newCount: 0 });
    expect(
      screen.getByText(
        "All cards have been studied — nothing more to study today.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Study" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Practice" }),
    ).not.toBeInTheDocument();
  });

  it("does not claim an empty deck has been studied", () => {
    renderScreen({ cardCount: 0, dueCount: 0, newCount: 0 });
    expect(
      screen.getByText("This deck has no cards yet. Add some in the Browser."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/All cards have been studied/)).toBeNull();
  });

  it("offers only Practice, as the primary action, when nothing is due but new cards remain", () => {
    renderScreen({ dueCount: 0, newCount: 2 });
    expect(
      screen.queryByRole("button", { name: "Study" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Practice" })).toHaveClass(
      "primary",
    );
    expect(screen.getByText(/No cards are due today/)).toBeInTheDocument();
    expect(screen.queryByText(/All cards have been studied/)).toBeNull();
  });

  it("shows no status message while cards are due", () => {
    renderScreen();
    expect(screen.queryByText(/All cards have been studied/)).toBeNull();
    expect(screen.queryByText(/No cards are due today/)).toBeNull();
  });

  it("links back to the deck list", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "Back to decks" })).toHaveAttribute(
      "href",
      "#/decks?instance=a",
    );
  });

  it("starts a practice session", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Practice" }));
    expect(props.onPractice).toHaveBeenCalledOnce();
  });

  it("starts a study session", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Study" }));
    expect(props.onStudy).toHaveBeenCalledOnce();
  });

  it("opens the browser", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Browser" }));
    expect(props.onBrowse).toHaveBeenCalledOnce();
  });

  it("offers no editing: cards are added and edited in the Browser", () => {
    renderScreen();
    expect(screen.queryByRole("button", { name: "Add card" })).toBeNull();
    expect(
      screen.getByText(/Add, edit or remove cards in the Browser/),
    ).toBeInTheDocument();
  });
});
