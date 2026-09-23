import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { CARDS_PER_PAGE } from "./BrowserScreen";
import { LibraryBrowserScreen } from "./LibraryBrowserScreen";
import type { LibraryCard, LibraryDeck } from "../domain/library";

const capitals: LibraryDeck = {
  url: "https://solid-memo.com/decks/capitals.ttl",
  name: "Capitals",
  cardCount: 2,
  authors: [],
  direction: "front-to-back",
  sources: [],
};

const FLAG = "https://flagcdn.com/se.svg";

function card(n: number): LibraryCard {
  return { id: `card-${n}`, front: `Front ${n}`, back: `Back ${n}`, formatVersion: 1 };
}

function renderScreen(
  overrides: Partial<Parameters<typeof LibraryBrowserScreen>[0]> = {},
) {
  const props = {
    deck: capitals,
    deckHref: "#/library-deck?deck=capitals",
    cards: [card(1), card(2)],
    page: 1,
    onPageChange: vi.fn(),
    ...overrides,
  };
  const view = render(<LibraryBrowserScreen {...props} />);
  return { ...view, props };
}

describe("LibraryBrowserScreen", () => {
  it("lists the cards under a heading that links to the deck", () => {
    renderScreen();
    expect(
      screen.getByRole("heading", { name: "Cards: Capitals" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Capitals" })).toHaveAttribute(
      "href",
      "#/library-deck?deck=capitals",
    );
    expect(screen.getByText("Front 1")).toBeInTheDocument();
    expect(screen.getByText("Back 2")).toBeInTheDocument();
    expect(
      screen.getByText("2 cards. Import the deck to study or edit them."),
    ).toBeInTheDocument();
    // Nothing to click or edit: the deck is not the user's.
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("shows a card's pictures", () => {
    const { container } = renderScreen({
      cards: [{ ...card(1), front: "", frontImageUrl: FLAG }],
    });
    expect(container.querySelector("img.card-thumbnail")).toHaveAttribute(
      "src",
      FLAG,
    );
  });

  it("says so when the deck is empty", () => {
    renderScreen({ cards: [] });
    expect(screen.getByText("This deck has no cards.")).toBeInTheDocument();
    expect(screen.queryByRole("table")).toBeNull();
  });

  it("pages long decks, reporting the range shown", () => {
    const cards = Array.from({ length: CARDS_PER_PAGE * 2 + 1 }, (_, i) =>
      card(i + 1),
    );
    const { props } = renderScreen({ cards, page: 2 });
    expect(
      screen.getByText(/Cards 11–20 of 21\./),
    ).toBeInTheDocument();
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
    expect(screen.queryByText("Front 1")).toBeNull();
    expect(screen.getByText("Front 11")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(props.onPageChange).toHaveBeenCalledWith(3);
  });
});
