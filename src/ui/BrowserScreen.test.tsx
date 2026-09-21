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
    cards: [card],
    busy: false,
    error: null,
    onBack: vi.fn(),
    onAddCard: vi.fn(),
    onUpdateCard: vi.fn(),
    onRemoveCard: vi.fn(),
    ...overrides,
  };
  const view = render(<BrowserScreen {...props} />);
  return { ...view, props };
}

describe("BrowserScreen", () => {
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

  it("navigates back to the deck", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Back to deck" }));
    expect(props.onBack).toHaveBeenCalledOnce();
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

  it("removes a card from the editor after confirmation and closes it", () => {
    const confirm = vi.fn(() => true);
    vi.stubGlobal("confirm", confirm);
    const { props, container } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));

    expect(confirm).toHaveBeenCalledWith(
      'Remove the card "水"? This cannot be undone.',
    );
    expect(props.onRemoveCard).toHaveBeenCalledWith(card);
    expect(container.querySelector("form.card-edit")).toBeNull();
  });

  it("keeps the editor open when removal is declined from the editor", () => {
    vi.stubGlobal("confirm", vi.fn(() => false));
    const { props, container } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));

    expect(props.onRemoveCard).not.toHaveBeenCalled();
    expect(container.querySelector("form.card-edit")).not.toBeNull();
  });

  it("opens an editor prefilled with the card when clicked", () => {
    renderScreen();
    fireEvent.click(screen.getByText("水"));
    expect(document.querySelector("#edit-front-card-1")).toHaveValue("水");
    expect(document.querySelector("#edit-back-card-1")).toHaveValue("water");
  });

  it("opens the editor via the row's Edit button", () => {
    renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    expect(document.querySelector("#edit-front-card-1")).toHaveValue("水");
    expect(document.querySelector("#edit-back-card-1")).toHaveValue("water");
  });

  it("opens the editor from the back cell too", () => {
    renderScreen();
    fireEvent.click(screen.getByText("water"));
    expect(document.querySelector("#edit-front-card-1")).toBeInTheDocument();
  });

  it("saves an edited card with trimmed values and closes the editor", () => {
    const { props, container } = renderScreen();
    fireEvent.click(screen.getByText("水"));
    fireEvent.input(container.querySelector("#edit-front-card-1")!, {
      target: { value: " 수영하다 " },
    });
    fireEvent.input(container.querySelector("#edit-back-card-1")!, {
      target: { value: " to swim " },
    });
    fireEvent.submit(container.querySelector("form.card-edit")!);

    expect(props.onUpdateCard).toHaveBeenCalledWith(
      card,
      "수영하다",
      "to swim",
    );
    expect(container.querySelector("form.card-edit")).toBeNull();
  });

  it("cancels editing without saving", () => {
    const { props, container } = renderScreen();
    fireEvent.click(screen.getByText("水"));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(container.querySelector("form.card-edit")).toBeNull();
    expect(props.onUpdateCard).not.toHaveBeenCalled();
    expect(screen.getByText("水")).toBeInTheDocument();
  });

  it("does not open the editor while busy", () => {
    const { container } = renderScreen({ busy: true });
    fireEvent.click(screen.getByText("水"));
    expect(container.querySelector("form.card-edit")).toBeNull();
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
