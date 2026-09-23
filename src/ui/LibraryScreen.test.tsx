import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { LibraryScreen } from "./LibraryScreen";
import type { LibraryDeck } from "../domain/library";

const capitals: LibraryDeck = {
  url: "https://solid-memo.com/decks/capitals.ttl",
  name: "Capitals of the world",
  cardCount: 243,
  authors: ["Anton Wiklund"],
  license: "https://creativecommons.org/publicdomain/zero/1.0/",
  description: "Every country and its capital, from Wikipedia.",
  direction: "front-to-back",
  sources: [],
};
const rivers: LibraryDeck = {
  url: "https://solid-memo.com/decks/rivers.ttl",
  name: "Rivers",
  cardCount: 1,
  authors: [],
  direction: "front-to-back",
  sources: [],
};

function renderScreen(
  overrides: Partial<Parameters<typeof LibraryScreen>[0]> = {},
) {
  const props = {
    decks: [capitals, rivers],
    libraryHref: "#/library?instance=a",
    deckHref: (deck: LibraryDeck) => `#/library-deck?deck=${deck.url}`,
    isImported: () => false,
    busy: false,
    error: null,
    onImport: vi.fn(),
    ...overrides,
  };
  const view = render(<LibraryScreen {...props} />);
  return { ...view, props };
}

function importButton() {
  return screen.getByRole("button", { name: /Import/ });
}

describe("LibraryScreen", () => {
  it("lists every deck with its card count under a linked heading", () => {
    renderScreen();
    expect(
      screen.getByRole("heading", { name: "Deck library" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Deck library" })).toHaveAttribute(
      "href",
      "#/library?instance=a",
    );
    expect(screen.getByText("2 decks")).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Capitals of the world" }),
    ).toBeInTheDocument();
    expect(screen.getByText("243 cards")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Rivers" })).toBeInTheDocument();
    expect(screen.getByText("1 card")).toBeInTheDocument();
  });

  it("links each deck's name to its own page and says nothing more about it", () => {
    renderScreen();
    expect(
      screen.getByRole("link", { name: "Capitals of the world" }),
    ).toHaveAttribute("href", `#/library-deck?deck=${capitals.url}`);
    expect(screen.getByRole("link", { name: "Rivers" })).toHaveAttribute(
      "href",
      `#/library-deck?deck=${rivers.url}`,
    );
    // The blurb, authors and licence are for the deck's page.
    expect(screen.queryByText(/Anton Wiklund/)).toBeNull();
    expect(screen.queryByText(/from Wikipedia/)).toBeNull();
    expect(screen.queryByRole("link", { name: "CC0 1.0" })).toBeNull();
  });

  it("uses the singular for one deck", () => {
    renderScreen({ decks: [capitals] });
    expect(screen.getByText("1 deck")).toBeInTheDocument();
  });

  it("shows an empty state without decks", () => {
    renderScreen({ decks: [] });
    expect(screen.getByText("The library has no decks yet.")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("marks decks the instance already holds", () => {
    renderScreen({ isImported: (deck) => deck === rivers });
    expect(screen.getAllByText("Already imported")).toHaveLength(1);
    // Still importable: a second copy may be wanted.
    expect(screen.getByRole("checkbox", { name: "Rivers" })).toBeEnabled();
  });

  it("imports the ticked decks, counting them on the button", () => {
    const { props } = renderScreen();
    expect(importButton()).toHaveTextContent("Import selected");
    expect(importButton()).toBeDisabled();

    fireEvent.click(screen.getByRole("checkbox", { name: "Rivers" }));
    expect(importButton()).toHaveTextContent("Import 1 deck");
    fireEvent.click(
      screen.getByRole("checkbox", { name: "Capitals of the world" }),
    );
    expect(importButton()).toHaveTextContent("Import 2 decks");
    fireEvent.click(screen.getByRole("checkbox", { name: "Rivers" }));
    expect(importButton()).toHaveTextContent("Import 1 deck");

    fireEvent.submit(importButton().closest("form")!);
    expect(props.onImport).toHaveBeenCalledWith([capitals]);
  });

  it("locks the form while importing", () => {
    renderScreen({ busy: true });
    expect(importButton()).toHaveTextContent("Importing…");
    expect(importButton()).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: "Rivers" })).toBeDisabled();
  });

  it("shows an import error", () => {
    renderScreen({ error: "pod refused" });
    expect(screen.getByText("pod refused")).toHaveClass("error");
  });
});
