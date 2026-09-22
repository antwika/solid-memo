import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { MigrationNotice } from "./MigrationNotice";
import type { Deck } from "../domain/deck";

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
const capitals: Deck = { ...deck, id: "deck-2", url: `${deck.url}2`, name: "Capitals" };

function renderNotice(
  overrides: Partial<Parameters<typeof MigrationNotice>[0]> = {},
) {
  const props = {
    plan: {
      decks: [
        { deck, cardCount: 12 },
        { deck: capitals, cardCount: 243 },
      ],
      cardCount: 255,
    },
    busy: false,
    error: null,
    onMigrate: vi.fn(),
    ...overrides,
  };
  const view = render(<MigrationNotice {...props} />);
  return { ...view, props };
}

describe("MigrationNotice", () => {
  it("says what will be updated, deck by deck, and waits for the user", () => {
    const { props } = renderNotice();
    const region = screen.getByRole("region", { name: "Format update" });
    expect(region).toHaveTextContent(
      "255 cards in 2 decks are stored in an older card format.",
    );
    expect(region).toHaveTextContent("Solid Memo now writes format 2");
    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent),
    ).toEqual(["Kanji N5 — 12 cards", "Capitals — 243 cards"]);
    expect(props.onMigrate).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Update 255 cards" }));
    expect(props.onMigrate).toHaveBeenCalledOnce();
  });

  it("phrases a single card in a single deck", () => {
    renderNotice({ plan: { decks: [{ deck, cardCount: 1 }], cardCount: 1 } });
    expect(screen.getByRole("region")).toHaveTextContent(
      "1 card in one deck is stored in an older card format.",
    );
    expect(screen.getByRole("button", { name: "Update 1 card" })).toBeEnabled();
  });

  it("shows progress and errors", () => {
    renderNotice({ busy: true, error: "write refused" });
    expect(screen.getByRole("button", { name: "Updating…" })).toBeDisabled();
    expect(screen.getByText("write refused")).toBeInTheDocument();
  });
});
