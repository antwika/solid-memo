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
    cardCount: 3,
    onBack: vi.fn(),
    onAddCard: vi.fn(),
    onStudy: vi.fn(),
    onPractice: vi.fn(),
    onBrowse: vi.fn(),
    ...overrides,
  };
  const view = render(<DeckDetailScreen {...props} />);
  return { ...view, props };
}

describe("DeckDetailScreen", () => {
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
    expect(screen.getByRole("button", { name: "Add card" })).not.toHaveClass(
      "primary",
    );
  });

  it("goes back to the deck list", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Back to decks" }));
    expect(props.onBack).toHaveBeenCalledOnce();
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

  it("navigates to the card creator", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Add card" }));
    expect(props.onAddCard).toHaveBeenCalledOnce();
  });
});
