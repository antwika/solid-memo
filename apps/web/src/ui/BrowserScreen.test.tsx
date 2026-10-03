import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { BrowserScreen, CARDS_PER_PAGE } from "./BrowserScreen";
import type { Card, Deck } from "@solid-memo/domain/deck";
import { I18nProvider } from "./i18n";
import { statusTexts } from "../test/liveRegions";

const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-1",
  title: { en: "Kanji N5" },
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
  front: { "": "水" },
  back: { "": "water" },
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
    onDescribeDeck: vi.fn(),
    onChangeDirection: vi.fn(),
    addCardHref: "#/new-card?deck=d",
    cardHref: (c: Card) => `#/card?card=${c.id}`,
    onRemoveCard: vi.fn(),
    onPageChange: vi.fn(),
    ...overrides,
  };
  const view = render(<BrowserScreen {...props} />);
  return { ...view, props };
}

describe("BrowserScreen deck editing", () => {
  it("shows what the deck says about itself, and describes it anew", () => {
    const { props } = renderScreen({
      deck: {
        ...deck,
        description: { en: "Kanji of the N5 level." },
        themes: ["https://solid-memo.com/vocab/topics#languages"],
        keywords: ["kanji", "JLPT"],
      },
    });
    const about = screen.getByRole("region", { name: "About this deck" });
    expect(about).toHaveTextContent("Kanji of the N5 level.");
    expect(about).toHaveTextContent("Topics: Languages · Keywords: kanji, JLPT");

    fireEvent.click(screen.getByRole("button", { name: "Describe deck" }));
    expect(screen.getByLabelText("Description")).toHaveValue("Kanji of the N5 level.");
    expect(screen.getByLabelText("Description")).not.toHaveAttribute("lang");
    expect(screen.getByLabelText("Description")).not.toHaveAttribute("aria-describedby");
    expect(screen.getByLabelText("Keywords (optional)")).toHaveValue("kanji, JLPT");
    expect(screen.getByLabelText("Keywords (optional)")).toHaveAccessibleDescription("Separate keywords with commas.");
    expect(screen.getByRole("checkbox", { name: "Languages" })).toBeChecked();
    fireEvent.input(screen.getByLabelText("Description"), { target: { value: "The N5 kanji." } });
    fireEvent.click(screen.getByRole("checkbox", { name: "Languages" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Science" }));
    fireEvent.input(screen.getByLabelText("Keywords (optional)"), { target: { value: "kanji, , N5" } });
    fireEvent.click(screen.getByRole("button", { name: "Save description" }));

    expect(props.onDescribeDeck).toHaveBeenCalledWith({
      description: "The N5 kanji.",
      topics: ["https://solid-memo.com/vocab/topics#science"],
      keywords: ["kanji", "N5"],
    });
    expect(screen.getByRole("button", { name: "Describe deck" })).toBeInTheDocument();
  });

  it("shows only what a deck states, and cancels describing", () => {
    renderScreen({ deck: { ...deck, keywords: ["kanji"] } });
    const about = screen.getByRole("region", { name: "About this deck" });
    expect(about).toHaveTextContent(/^Keywords: kanjiDescribe deck$/);
    fireEvent.click(screen.getByRole("button", { name: "Describe deck" }));
    expect(screen.getByLabelText("Description")).toHaveValue("");
    fireEvent.click(screen.getByRole("button", { name: "Cancel describing" }));
    expect(screen.queryByLabelText("Description")).toBeNull();
  });

  it("shows topics alone, and nothing more for a deck that says nothing", () => {
    renderScreen({ deck: { ...deck, themes: ["https://solid-memo.com/vocab/topics#geography"] } });
    expect(screen.getByRole("region", { name: "About this deck" })).toHaveTextContent(/^Topics: GeographyDescribe deck$/);
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
    expect(screen.getByRole("group", { name: "Study direction" })).toHaveAccessibleDescription(
      "Change it any time; what you have learnt each way is kept.",
    );

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

});

describe("BrowserScreen", () => {
  it("names the actions column for screen readers", () => {
    renderScreen();
    expect(
      screen.getAllByRole("columnheader").map((header) => header.textContent),
    ).toEqual(["Front", "Back", "Actions"]);
  });

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
    expect(
      screen.getByText(/The Browser lists every card in this deck/),
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

  it("hides retired cards until asked, then lists them marked", () => {
    const retired: Card = { ...card, id: "card-2", url: `${deck.cardsDocumentUrl}#card-2`, front: { "": "火" }, retired: true };
    const { container } = renderScreen({ cards: [card, retired] });
    expect(screen.queryByText("火")).toBeNull();
    expect(screen.getByRole("checkbox", { name: "Show retired cards" })).toHaveAccessibleDescription(
      "1 card is retired: kept, with its review history, but no longer studied.",
    );
    fireEvent.click(screen.getByRole("checkbox", { name: "Show retired cards" }));
    expect(screen.getByText("火")).toBeInTheDocument();
    expect(container.querySelector("tr.retired")).toHaveTextContent("火Retired");
  });

  it("offers no retired cards to show when there are none, and says so when every card is retired", () => {
    renderScreen();
    expect(screen.queryByRole("checkbox", { name: "Show retired cards" })).toBeNull();
    renderScreen({ cards: [{ ...card, retired: true }, { ...card, id: "card-2", url: `${deck.cardsDocumentUrl}#card-2`, retired: true }] });
    expect(screen.getByText("Every card in this deck is retired.")).toBeInTheDocument();
    expect(screen.getByText(/2 cards are retired: kept, with their review history/)).toBeInTheDocument();
  });

  it("removes a card after confirmation", () => {
    const confirm = vi.fn(() => true);
    vi.stubGlobal("confirm", confirm);
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Remove card 水" }));
    expect(confirm).toHaveBeenCalledWith(
      'Remove the card "水"? This cannot be undone.',
    );
    expect(props.onRemoveCard).toHaveBeenCalledWith(card);
  });

  it("does not remove a card when the confirmation is declined", () => {
    vi.stubGlobal("confirm", vi.fn(() => false));
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Remove card 水" }));
    expect(props.onRemoveCard).not.toHaveBeenCalled();
  });

  it("links each row to the card's own page", () => {
    renderScreen();
    expect(screen.getByRole("link", { name: "水" })).toHaveAttribute(
      "href",
      "#/card?card=card-1",
    );
    const cell = screen.getByText("water").closest("td")!;
    expect(cell.closest('[aria-hidden="true"]')).toBeNull();
    const overlay = cell.querySelector("a")!;
    expect(overlay).toHaveAttribute("href", "#/card?card=card-1");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
    expect(overlay).toHaveAttribute("tabindex", "-1");
    expect(
      screen.getAllByRole("link").map((link) => link.textContent?.trim()),
    ).toEqual(["Kanji N5", "Add card", "水"]);
  });

  it("reads a picture-only back by its description, outside the row's link", () => {
    const { container } = renderScreen({
      cards: [{ ...card, back: {}, backImageUrl: "https://example.org/map.png", backImageDescription: { en: "A map" } }],
    });
    const picture = screen.getByRole("img", { name: "A map" });
    expect(container.querySelector(".back-cell")).toContainElement(picture);
    expect(picture.closest('[aria-hidden="true"]')).toBeNull();
  });

  it("shows a card's pictures beside its text, and names a picture card by its back", () => {
    const confirm = vi.fn(() => false);
    vi.stubGlobal("confirm", confirm);
    const flag = "https://flagcdn.com/af.svg";
    const { props, container } = renderScreen({
      cards: [{ ...card, front: {}, frontImageUrl: flag, back: { "": "Afghanistan" } }],
    });
    const thumbnail = container.querySelector("td a img.card-thumbnail")!;
    expect(thumbnail).toHaveAttribute("src", flag);
    expect(screen.getByText("Afghanistan")).toBeInTheDocument();
    // The back cell's link is hidden from screen readers, so the picture
    // names the row's link after the back.
    expect(
      screen.getByRole("link", { name: "Picture for: Afghanistan" }),
    ).toHaveAttribute("href", `#/card?card=${card.id}`);
    fireEvent.click(screen.getByRole("button", { name: "Remove card Afghanistan" }));
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
    expect(screen.getByRole("alert")).toHaveTextContent("card failure");
  });

  it("links to the card creator, even while busy", () => {
    renderScreen({ busy: true });
    expect(screen.getByRole("link", { name: "Add card" })).toHaveAttribute("href", "#/new-card?deck=d");
  });
});

describe("BrowserScreen pagination", () => {
  /** `count` cards named "Card 1" … "Card N". */
  function manyCards(count: number): Card[] {
    return Array.from({ length: count }, (_, i) => ({
      ...card,
      id: `card-${i + 1}`,
      url: `${deck.cardsDocumentUrl}#card-${i + 1}`,
      front: { "": `Card ${i + 1}` },
      back: { "": `Back ${i + 1}` },
    }));
  }

  it("keeps the remove button focused while it removes, and ignores it meanwhile", () => {
    const confirm = vi.fn(() => true);
    vi.stubGlobal("confirm", confirm);
    const { props, rerender } = renderScreen({ cards: manyCards(3) });
    const remove = screen.getByRole("button", { name: "Remove card Card 2" });
    remove.focus();
    fireEvent.click(remove);
    rerender(<BrowserScreen {...props} busy />);
    expect(remove).toHaveAttribute("aria-disabled", "true");
    expect(remove).toHaveFocus();
    fireEvent.click(remove);
    expect(confirm).toHaveBeenCalledOnce();
    expect(props.onRemoveCard).toHaveBeenCalledOnce();
  });

  it("once a card is removed, focuses the card now in its row and says it is gone", () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const cards = manyCards(3);
    const { props, rerender } = renderScreen({ cards });
    fireEvent.click(screen.getByRole("button", { name: "Remove card Card 2" }));
    rerender(<BrowserScreen {...props} busy />);
    // Gone from the list before the mutation settles: the focus waits for it.
    rerender(<BrowserScreen {...props} cards={[cards[0], cards[2]]} busy />);
    expect(statusTexts()).toEqual([]);
    rerender(<BrowserScreen {...props} cards={[cards[0], cards[2]]} />);
    expect(screen.getByRole("link", { name: "Card 3" })).toHaveFocus();
    expect(statusTexts()).toEqual(['Removed the card "Card 2".']);

    // The next removal clears what was said.
    fireEvent.click(screen.getByRole("button", { name: "Remove card Card 3" }));
    expect(statusTexts()).toEqual([]);
  });

  it("focuses the last row when the last card goes, the page before's once a page empties, and Add card at the end", () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const cards = manyCards(CARDS_PER_PAGE + 1);
    const { props, rerender } = renderScreen({ cards, page: 2 });
    fireEvent.click(screen.getByRole("button", { name: `Remove card Card ${CARDS_PER_PAGE + 1}` }));
    rerender(<BrowserScreen {...props} cards={cards.slice(0, CARDS_PER_PAGE)} />);
    expect(screen.getByRole("link", { name: `Card ${CARDS_PER_PAGE}` })).toHaveFocus();

    rerender(<BrowserScreen {...props} cards={[cards[0]]} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove card Card 1" }));
    rerender(<BrowserScreen {...props} cards={[]} />);
    expect(screen.getByRole("link", { name: "Add card" })).toHaveFocus();
  });

  it("leaves the focus be when a removal fails", () => {
    vi.stubGlobal("confirm", vi.fn(() => true));
    const { props, rerender } = renderScreen({ cards: manyCards(2) });
    const remove = screen.getByRole("button", { name: "Remove card Card 1" });
    remove.focus();
    fireEvent.click(remove);
    rerender(<BrowserScreen {...props} busy />);
    rerender(<BrowserScreen {...props} error="refused" />);
    expect(remove).toHaveFocus();
    expect(statusTexts()).toEqual([]);
  });

  it("shows no pager when everything fits on one page", () => {
    renderScreen({ cards: manyCards(CARDS_PER_PAGE) });
    expect(screen.queryByRole("navigation", { name: "Card pages" })).toBeNull();
    expect(screen.getAllByRole("row")).toHaveLength(CARDS_PER_PAGE + 1);
    expect(screen.getByText("Open a card to edit it.")).toBeInTheDocument();
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
        `Cards ${CARDS_PER_PAGE + 1}–${CARDS_PER_PAGE * 2} of ${cards.length}. Open a card to edit it.`,
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
    expect(screen.getByRole("button", { name: "Previous" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "false");
    first.unmount();

    renderScreen({ cards, page: 2 });
    expect(screen.getByRole("button", { name: "Previous" })).toHaveAttribute("aria-disabled", "false");
    expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "true");
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

describe("BrowserScreen in Swedish", () => {
  it("speaks Swedish, the retired cards and their toggle too", () => {
    const retired: Card = { ...card, id: "card-2", url: `${deck.cardsDocumentUrl}#card-2`, retired: true };
    render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <BrowserScreen
          deck={deck}
          deckHref="#/deck?deck=d"
          cards={[card, retired]}
          page={1}
          busy={false}
          error={null}
          onDescribeDeck={vi.fn()}
          onChangeDirection={vi.fn()}
          addCardHref="#/new-card?deck=d"
          cardHref={(c) => `#/card?card=${c.id}`}
          onRemoveCard={vi.fn()}
          onPageChange={vi.fn()}
        />
      </I18nProvider>,
    );
    expect(screen.getByRole("heading", { name: "Bläddra: Kanji N5" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Lägg till kort" })).toBeInTheDocument();
    expect(screen.getByText("Framsida → baksida")).toBeInTheDocument();
    expect(screen.getByText(/1 kort är ur bruk: det sparas/)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Framsida" })).toBeInTheDocument();
  });

  it("marks deck and card text in another language than Swedish with its language", () => {
    const translated = { ...deck, description: { en: "Kanji of the N5 level.", sv: "Kanji på nivå N5." } };
    const english: Card = { ...card, front: { ja: "水" }, back: { en: "water", sv: "vatten" } };
    const { container } = render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <BrowserScreen
          deck={translated}
          deckHref="#/deck?deck=d"
          cards={[english]}
          page={1}
          busy={false}
          error={null}
          onDescribeDeck={vi.fn()}
          onChangeDirection={vi.fn()}
          addCardHref="#/new-card?deck=d"
          cardHref={(c) => `#/card?card=${c.id}`}
          onRemoveCard={vi.fn()}
          onPageChange={vi.fn()}
        />
      </I18nProvider>,
    );
    expect(screen.getByText("Kanji N5")).toHaveAttribute("lang", "en");
    expect(screen.getByText("Kanji på nivå N5.")).not.toHaveAttribute("lang");
    expect(screen.getByText("水")).toHaveAttribute("lang", "ja");
    expect(container.querySelector(".back-cell")).toHaveTextContent("vatten");
    expect(container.querySelector(".back-cell [lang]")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Beskriv kortleken" }));
    const description = screen.getByLabelText("Beskrivning");
    // The user's own text is edited in the page's language.
    expect(description).toHaveValue("Kanji på nivå N5.");
    expect(description).not.toHaveAttribute("lang");
    expect(description).not.toHaveAttribute("aria-describedby");
  });

  it("says which language the description field edits when the reader sees another", () => {
    // A reader who prefers German sees the German; a Swedish page edits the English.
    const languages = vi.spyOn(navigator, "languages", "get").mockReturnValue(["de"]);
    render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <BrowserScreen
          deck={{ ...deck, description: { en: "Kanji of the N5 level.", de: "Kanji der Stufe N5." } }}
          deckHref="#/deck?deck=d"
          cards={[]}
          page={1}
          busy={false}
          error={null}
          onDescribeDeck={vi.fn()}
          onChangeDirection={vi.fn()}
          addCardHref="#/new-card?deck=d"
          cardHref={(c) => `#/card?card=${c.id}`}
          onRemoveCard={vi.fn()}
          onPageChange={vi.fn()}
        />
      </I18nProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Beskriv kortleken" }));
    const description = screen.getByLabelText("Beskrivning");
    expect(description).toHaveValue("Kanji of the N5 level.");
    expect(description).toHaveAttribute("lang", "en");
    expect(description).toHaveAccessibleDescription("Du redigerar texten på engelska. Översättningarna ändras inte.");
    languages.mockRestore();
  });
});
