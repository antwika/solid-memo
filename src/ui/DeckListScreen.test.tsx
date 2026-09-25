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
  direction: "front-to-back",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
  authors: [],
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
    decksHref: "#/decks?instance=a",
    libraryHref: "#/library?instance=a",
    deckHref: (d: Deck) => `#/deck?deck=${d.id}`,
    renderStudyAction: (d: Deck) => <span>action for {d.name}</span>,
    onCreateDeck: vi.fn(),
    ...overrides,
  };
  const view = render(<DeckListScreen {...props} />);
  return { ...view, props };
}

describe("DeckListScreen", () => {
  it("lists every deck under a Decks heading with a count", () => {
    renderScreen();
    expect(screen.getByRole("heading", { name: "Decks" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Decks" })).toHaveAttribute(
      "href",
      "#/decks?instance=a",
    );
    expect(screen.getByText("2 decks")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Kanji N5" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Kana" })).toBeInTheDocument();
  });

  it("uses the singular for one deck", () => {
    renderScreen({ decks: [deck] });
    expect(screen.getByText("1 deck")).toBeInTheDocument();
  });

  it("shows an empty state without decks", () => {
    renderScreen({ decks: [] });
    expect(screen.getByText(/No decks yet/)).toBeInTheDocument();
  });

  it("links each deck's name to that deck's page", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "Kanji N5" })).toHaveAttribute(
      "href",
      "#/deck?deck=deck-1",
    );
    expect(screen.getByRole("link", { name: "Kana" })).toHaveAttribute(
      "href",
      "#/deck?deck=deck-2",
    );
  });

  it("leaves each row's study suggestion to the container", () => {
    renderScreen();
    expect(screen.getByText("action for Kanji N5")).toBeInTheDocument();
    expect(screen.getByText("action for Kana")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Study/ })).toBeNull();
  });

  it("marks the title and every deck with a decorative icon", () => {
    const { container } = renderScreen();
    expect(container.querySelector("h2 svg.icon")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll(".deck-open svg.icon")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Decks" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Kanji N5" })).toBeInTheDocument();
  });

  it("offers no editing: decks are renamed and removed in the Browser", () => {
    renderScreen();
    expect(screen.queryByRole("button", { name: /Remove/ })).toBeNull();
    expect(screen.queryByRole("button", { name: /Rename/ })).toBeNull();
  });

  it("links to the deck library", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "Deck library" })).toHaveAttribute(
      "href",
      "#/library?instance=a",
    );
  });

  it("navigates to the deck creator via a primary button", () => {
    const { props } = renderScreen();
    const button = screen.getByRole("button", { name: "Create deck" });
    expect(button).toHaveClass("primary");
    fireEvent.click(button);
    expect(props.onCreateDeck).toHaveBeenCalledOnce();
  });
});
