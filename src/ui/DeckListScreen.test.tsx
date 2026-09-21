import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { DeckListScreen } from "./DeckListScreen";
import type { Deck } from "../domain/deck";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  name: "Kanji N5",
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  createdAt: "2026-09-21T10:00:00.000Z",
};

const secondDeck: Deck = {
  ...deck,
  id: "deck-2",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-2",
  name: "Kana",
};

function renderScreen(
  overrides: Partial<Parameters<typeof DeckListScreen>[0]> = {},
) {
  const props = {
    decks: [deck, secondDeck],
    busy: false,
    error: null,
    onOpen: vi.fn(),
    onStudy: vi.fn(),
    onCreateDeck: vi.fn(),
    onRemove: vi.fn(),
    ...overrides,
  };
  const view = render(<DeckListScreen {...props} />);
  return { ...view, props };
}

describe("DeckListScreen", () => {
  it("lists every deck under a Decks heading with a count", () => {
    renderScreen();
    expect(screen.getByRole("heading", { name: "Decks" })).toBeInTheDocument();
    expect(screen.getByText("2 decks")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Kanji N5" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Kana" })).toBeInTheDocument();
  });

  it("uses the singular for one deck", () => {
    renderScreen({ decks: [deck] });
    expect(screen.getByText("1 deck")).toBeInTheDocument();
  });

  it("shows an empty state without decks", () => {
    renderScreen({ decks: [] });
    expect(screen.getByText(/No decks yet/)).toBeInTheDocument();
  });

  it("opens a deck", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Kanji N5" }));
    expect(props.onOpen).toHaveBeenCalledWith(deck);
  });

  it("starts a study session for a deck", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Study Kanji N5" }));
    expect(props.onStudy).toHaveBeenCalledWith(deck);
    expect(props.onOpen).not.toHaveBeenCalled();
  });

  it("removes a deck after confirmation", () => {
    const confirm = vi.fn(() => true);
    vi.stubGlobal("confirm", confirm);
    const { props } = renderScreen();
    fireEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]);
    expect(confirm).toHaveBeenCalledWith(
      'Remove the deck "Kanji N5" and all its cards? This cannot be undone.',
    );
    expect(props.onRemove).toHaveBeenCalledWith(deck);
  });

  it("does not remove a deck when the confirmation is declined", () => {
    vi.stubGlobal("confirm", vi.fn(() => false));
    const { props } = renderScreen();
    fireEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]);
    expect(props.onRemove).not.toHaveBeenCalled();
  });

  it("navigates to the deck creator via a primary button", () => {
    const { props } = renderScreen();
    const button = screen.getByRole("button", { name: "Create deck" });
    expect(button).toHaveClass("primary");
    fireEvent.click(button);
    expect(props.onCreateDeck).toHaveBeenCalledOnce();
  });

  it("disables controls while busy and shows errors", () => {
    renderScreen({ busy: true, error: "deck failure" });
    expect(screen.getByRole("button", { name: "Kanji N5" })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Study Kanji N5" }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "Create deck" })).toBeDisabled();
    expect(screen.getByText("deck failure")).toBeInTheDocument();
  });
});
