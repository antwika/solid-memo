import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { BrowserScreen } from "./BrowserScreen";
import type { Card, Deck } from "../domain/deck";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  name: "Kanji N5",
  cardsDocumentUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl",
  reviewsDocumentUrl: "https://pod.example/solid-memo/a/reviews/deck-1.ttl",
  createdAt: "2026-09-21T10:00:00.000Z",
};

const card: Card = {
  id: "card-1",
  url: `${deck.cardsDocumentUrl}#card-1`,
  front: "水",
  back: "water",
  createdAt: "2026-09-21T10:00:00.000Z",
};

function renderScreen(
  overrides: Partial<Parameters<typeof BrowserScreen>[0]> = {},
) {
  const props = {
    deck,
    deckHref: "#/deck?deck=d",
    cards: [card],
    busy: false,
    error: null,
    onRenameDeck: vi.fn(),
    onRemoveDeck: vi.fn(),
    onAddCard: vi.fn(),
    cardHref: (c: Card) => `#/card?card=${c.id}`,
    onRemoveCard: vi.fn(),
    ...overrides,
  };
  const view = render(<BrowserScreen {...props} />);
  return { ...view, props };
}

describe("BrowserScreen deck editing", () => {
  it("renames the deck, trimmed, and closes the form", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Rename deck" }));

    const field = screen.getByLabelText("Deck name");
    expect(field).toHaveValue("Kanji N5");
    fireEvent.input(field, { target: { value: "  Kanji N4 " } });
    fireEvent.click(screen.getByRole("button", { name: "Save name" }));

    expect(props.onRenameDeck).toHaveBeenCalledWith("Kanji N4");
    expect(screen.queryByLabelText("Deck name")).toBeNull();
  });

  it("cancels renaming without saving", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Rename deck" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel renaming" }));

    expect(props.onRenameDeck).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: "Rename deck" }),
    ).toBeInTheDocument();
  });

  it("removes the deck after confirmation", () => {
    const confirm = vi.fn(() => true);
    vi.stubGlobal("confirm", confirm);
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Remove deck" }));

    expect(confirm).toHaveBeenCalledWith(
      'Remove the deck "Kanji N5" and all its cards? This cannot be undone.',
    );
    expect(props.onRemoveDeck).toHaveBeenCalledOnce();
  });

  it("keeps the deck when the confirmation is declined", () => {
    vi.stubGlobal("confirm", vi.fn(() => false));
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Remove deck" }));
    expect(props.onRemoveDeck).not.toHaveBeenCalled();
  });

  it("disables deck editing while busy", () => {
    renderScreen({ busy: true });
    expect(screen.getByRole("button", { name: "Rename deck" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Remove deck" })).toBeDisabled();
  });
});

describe("BrowserScreen", () => {
  it("links the deck's name to the deck's page", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "Kanji N5" })).toHaveAttribute(
      "href",
      "#/deck?deck=d",
    );
  });

  it("lists the deck's cards under a Browser heading", () => {
    renderScreen();
    expect(
      screen.getByRole("heading", { name: "Browser: Kanji N5" }),
    ).toBeInTheDocument();
    expect(screen.getByText("水")).toBeInTheDocument();
    expect(screen.getByText("water")).toBeInTheDocument();
  });

  it("shows an empty state without cards", () => {
    renderScreen({ cards: [] });
    expect(
      screen.getByText("No cards in this deck yet."),
    ).toBeInTheDocument();
  });

  it("links back to the deck", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "Back to deck" })).toHaveAttribute(
      "href",
      "#/deck?deck=d",
    );
  });

  it("removes a card after confirmation", () => {
    const confirm = vi.fn(() => true);
    vi.stubGlobal("confirm", confirm);
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(confirm).toHaveBeenCalledWith(
      'Remove the card "水"? This cannot be undone.',
    );
    expect(props.onRemoveCard).toHaveBeenCalledWith(card);
  });

  it("does not remove a card when the confirmation is declined", () => {
    vi.stubGlobal("confirm", vi.fn(() => false));
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(props.onRemoveCard).not.toHaveBeenCalled();
  });

  it("links each row to the card's own page", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "水" })).toHaveAttribute(
      "href",
      "#/card?card=card-1",
    );
    // The back cell goes to the same place, without a second announced link.
    const back = screen.getByText("water").closest("a")!;
    expect(back).toHaveAttribute("href", "#/card?card=card-1");
    expect(back).toHaveAttribute("aria-hidden", "true");
    // The card is announced once: its back-cell link is not in the list.
    expect(
      screen.getAllByRole("link").map((link) => link.textContent?.trim()),
    ).toEqual(["Kanji N5", "Back to deck", "水"]);
  });

  it("no longer edits cards in place", () => {
    renderScreen();
    expect(screen.queryByRole("button", { name: "Edit" })).toBeNull();
    expect(screen.queryByLabelText("Front")).toBeNull();
  });

  it("shows errors", () => {
    renderScreen({ error: "card failure" });
    expect(screen.getByText("card failure")).toBeInTheDocument();
  });

  it("navigates to the card creator", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Add card" }));
    expect(props.onAddCard).toHaveBeenCalledOnce();
  });
});
