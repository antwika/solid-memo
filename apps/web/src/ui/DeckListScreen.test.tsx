import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { DeckListScreen } from "./DeckListScreen";
import { I18nProvider } from "./i18n";
import type { Deck } from "@solid-memo/domain/deck";

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

const secondDeck: Deck = {
  ...deck,
  id: "deck-2",
  url: "https://pod.example/solid-memo/a/catalog.ttl#deck-2",
  title: { en: "Kana" },
};

function renderScreen(
  overrides: Partial<Parameters<typeof DeckListScreen>[0]> = {},
) {
  const props = {
    decks: [deck, secondDeck],
    libraryHref: "#/library?instance=a",
    deckHref: (d: Deck) => `#/deck?deck=${d.id}`,
    renderStudyAction: (d: Deck) => <span>action for {d.title.en}</span>,
    createDeckHref: "#/new-deck?instance=a",
    ...overrides,
  };
  const view = render(<DeckListScreen {...props} />);
  return { ...view, props };
}

describe("DeckListScreen", () => {
  it("lists every deck under a Decks heading with a count", () => {
    renderScreen();
    expect(screen.getByRole("heading", { name: "Decks" })).toBeInTheDocument();
    // The heading names this page: it is no link to it.
    expect(screen.queryByRole("link", { name: "Decks" })).toBeNull();
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
    expect(screen.getByRole("heading", { name: "Decks" })).toBeInTheDocument();
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

  it("links to the deck creator, styled as the primary button", () => {
    renderScreen();
    const link = screen.getByRole("link", { name: "Create deck" });
    expect(link).toHaveClass("button", "primary");
    expect(link).toHaveAttribute("href", "#/new-deck?instance=a");
  });
});

describe("DeckListScreen in Swedish", () => {
  it("speaks Swedish inside a Swedish provider", () => {
    render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <DeckListScreen
          decks={[deck]}
          libraryHref="#/library?instance=a"
          deckHref={(d) => `#/deck?deck=${d.id}`}
          renderStudyAction={() => null}
          createDeckHref="#/new-deck?instance=a"
        />
      </I18nProvider>,
    );
    expect(screen.getByRole("heading", { name: "Kortlekar" })).toBeInTheDocument();
    expect(screen.getByText("1 kortlek")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skapa kortlek" })).toBeInTheDocument();
  });
});
