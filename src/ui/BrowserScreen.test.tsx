import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { BrowserScreen, CARDS_PER_PAGE } from "./BrowserScreen";
import type { Card, Deck } from "../domain/deck";

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

const card: Card = {
  id: "card-1",
  url: `${deck.cardsDocumentUrl}#card-1`,
  front: "水",
  back: "water",
  createdAt: "2026-09-21T10:00:00.000Z",
  formatVersion: 1,
};

function renderScreen(
  overrides: Partial<Parameters<typeof BrowserScreen>[0]> = {},
) {
  const props = {
    deck,
    deckHref: "#/deck?deck=d",
    cards: [card],
    page: 1,
    busy: false,
    error: null,
    onRenameDeck: vi.fn(),
    onChangeDirection: vi.fn(),
    onRemoveDeck: vi.fn(),
    onAddCard: vi.fn(),
    cardHref: (c: Card) => `#/card?card=${c.id}`,
    onRemoveCard: vi.fn(),
    onPageChange: vi.fn(),
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

  it("offers the three study directions, showing the deck's own", () => {
    const { props } = renderScreen();
    expect(
      screen.getByRole("group", { name: "Study direction" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("radio").map((radio) => radio.getAttribute("value")),
    ).toEqual(["front-to-back", "back-to-front", "bidirectional"]);
    expect(screen.getByRole("radio", { name: "Front → back" })).toBeChecked();
    expect(
      screen.getByText("Change it any time; what you have learnt each way is kept."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Both ways"));
    expect(props.onChangeDirection).toHaveBeenCalledWith("bidirectional");
  });

  it("explains a bidirectional deck, and locks the choice while busy", () => {
    renderScreen({ deck: { ...deck, direction: "bidirectional" }, busy: true });
    const both = screen.getByRole("radio", { name: "Both ways" });
    expect(both).toBeChecked();
    expect(both).toBeDisabled();
    expect(
      screen.getByText("Every card is asked both ways, each way scheduled on its own."),
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
  it("marks the title with a decorative icon", () => {
    const { container } = renderScreen();
    expect(container.querySelector("h2 svg.icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

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
    const back = screen.getByText("water").closest("a")!;
    expect(back).toHaveAttribute("href", "#/card?card=card-1");
    expect(back).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.getAllByRole("link").map((link) => link.textContent?.trim()),
    ).toEqual(["Kanji N5", "水"]);
  });

  it("shows a card's pictures beside its text, and names a picture card by its back", () => {
    const confirm = vi.fn(() => false);
    vi.stubGlobal("confirm", confirm);
    const flag = "https://flagcdn.com/af.svg";
    const { props, container } = renderScreen({
      cards: [{ ...card, front: "", frontImageUrl: flag, back: "Afghanistan" }],
    });
    const thumbnail = container.querySelector("td a img.card-thumbnail")!;
    expect(thumbnail).toHaveAttribute("src", flag);
    expect(screen.getByText("Afghanistan")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(confirm).toHaveBeenCalledWith(
      'Remove the card "Afghanistan"? This cannot be undone.',
    );
    expect(props.onRemoveCard).not.toHaveBeenCalled();
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

describe("BrowserScreen pagination", () => {
  /** `count` cards named "Card 1" … "Card N". */
  function manyCards(count: number): Card[] {
    return Array.from({ length: count }, (_, i) => ({
      ...card,
      id: `card-${i + 1}`,
      url: `${deck.cardsDocumentUrl}#card-${i + 1}`,
      front: `Card ${i + 1}`,
      back: `Back ${i + 1}`,
    }));
  }

  it("shows no pager when everything fits on one page", () => {
    renderScreen({ cards: manyCards(CARDS_PER_PAGE) });
    expect(screen.queryByRole("navigation", { name: "Card pages" })).toBeNull();
    expect(screen.getAllByRole("row")).toHaveLength(CARDS_PER_PAGE + 1);
    expect(screen.getByText("Click a card to open it.")).toBeInTheDocument();
  });

  it("shows only the current page and where it sits in the deck", () => {
    const cards = manyCards(CARDS_PER_PAGE * 2 + 3);
    renderScreen({ cards, page: 2 });

    const rows = screen.getAllByRole("row").slice(1);
    expect(rows).toHaveLength(CARDS_PER_PAGE);
    expect(rows[0]).toHaveTextContent(`Card ${CARDS_PER_PAGE + 1}`);
    expect(rows[rows.length - 1]).toHaveTextContent(`Card ${CARDS_PER_PAGE * 2}`);
    expect(
      screen.getByText(
        `Cards ${CARDS_PER_PAGE + 1}–${CARDS_PER_PAGE * 2} of ${cards.length}. Click a card to open it.`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
  });

  it("moves to the previous and next page", () => {
    const { props } = renderScreen({ cards: manyCards(CARDS_PER_PAGE * 3), page: 2 });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(props.onPageChange).toHaveBeenLastCalledWith(3);
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(props.onPageChange).toHaveBeenLastCalledWith(1);
  });

  it("disables Previous on the first page and Next on the last", () => {
    const cards = manyCards(CARDS_PER_PAGE + 1);
    const first = renderScreen({ cards, page: 1 });
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
    first.unmount();

    renderScreen({ cards, page: 2 });
    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    expect(screen.getAllByRole("row").slice(1)).toHaveLength(1);
  });

  it("clamps an out-of-range page to the nearest one", () => {
    const cards = manyCards(CARDS_PER_PAGE + 1);
    const high = renderScreen({ cards, page: 99 });
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    high.unmount();

    renderScreen({ cards, page: 0 });
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });
});
