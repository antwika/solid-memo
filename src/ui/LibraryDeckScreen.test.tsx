import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/preact";
import { LibraryDeckScreen } from "./LibraryDeckScreen";
import { licenseLabel } from "../domain/license";
import type { LibraryDeck } from "../domain/library";

const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";
const BY_SA = "https://creativecommons.org/licenses/by-sa/4.0/";
const WIKIPEDIA = "https://en.wikipedia.org/wiki/List_of_national_capitals";
const WIKIDATA = "https://www.wikidata.org/wiki/Property:P36";

const capitals: LibraryDeck = {
  url: "https://solid-memo.com/decks/capitals.ttl",
  name: "Capitals of the world",
  cardCount: 243,
  authors: ["Anton Wiklund"],
  license: CC0,
  description: `Every country and its capital. Compiled from ${WIKIPEDIA}.`,
  createdAt: "2026-09-22T21:00:10.236Z",
  sources: [
    {
      url: WIKIPEDIA,
      title: "List of national capitals",
      authors: ["Wikipedia contributors"],
      license: BY_SA,
    },
    // Listed without a description of its own.
    { url: WIKIDATA, authors: [] },
  ],
};

function renderScreen(
  overrides: Partial<Parameters<typeof LibraryDeckScreen>[0]> = {},
) {
  const props = {
    deck: capitals,
    deckHref: "#/library-deck?deck=capitals",
    imported: false,
    busy: false,
    error: null,
    onBrowse: vi.fn(),
    onImport: vi.fn(),
    ...overrides,
  };
  const view = render(<LibraryDeckScreen {...props} />);
  return { ...view, props };
}

/** The value shown under a term of the facts list. */
function fact(term: string): HTMLElement {
  const dt = screen.getByText(term, { selector: "dt" });
  return dt.nextElementSibling as HTMLElement;
}

describe("LibraryDeckScreen", () => {
  it("shows the deck in full under a linked heading", () => {
    renderScreen();
    expect(
      screen.getByRole("heading", { name: "Capitals of the world" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Capitals of the world" }),
    ).toHaveAttribute("href", "#/library-deck?deck=capitals");
    expect(fact("Size")).toHaveTextContent("243 cards");

    // The blurb, with its URL as a link.
    expect(screen.getByText(/Every country and its capital/)).toHaveClass(
      "deck-description",
    );
    expect(screen.getAllByRole("link", { name: WIKIPEDIA })).toHaveLength(1);

    expect(fact("Author")).toHaveTextContent("Anton Wiklund");
    expect(within(fact("Licence")).getByRole("link", { name: "CC0 1.0" }))
      .toHaveAttribute("href", CC0);
    expect(fact("Created")).toHaveTextContent("September 22, 2026");
  });

  it("lists each source, linked, with its own authors and licence", () => {
    renderScreen();
    const sources = within(fact("Sources")).getAllByRole("listitem");
    expect(sources).toHaveLength(2);
    expect(
      within(sources[0]).getByRole("link", { name: "List of national capitals" }),
    ).toHaveAttribute("href", WIKIPEDIA);
    expect(sources[0]).toHaveTextContent(
      `List of national capitals — Wikipedia contributors · ${licenseLabel(BY_SA)}`,
    );
    expect(
      within(sources[0]).getByRole("link", { name: licenseLabel(BY_SA) }),
    ).toHaveAttribute("href", BY_SA);
    // A bare source is named by its URL and says nothing more.
    expect(within(sources[1]).getByRole("link", { name: WIKIDATA })).toHaveAttribute(
      "href",
      WIKIDATA,
    );
    expect(sources[1]).toHaveTextContent(WIKIDATA);
    expect(sources[1].textContent).not.toContain("—");
  });

  it("uses the plural for several authors and the singular for one source", () => {
    renderScreen({
      deck: {
        ...capitals,
        authors: ["Anton Wiklund", "A friend"],
        sources: [{ url: WIKIDATA, authors: ["Wikidata contributors"] }],
      },
    });
    expect(fact("Authors")).toHaveTextContent("Anton Wiklund, A friend");
    expect(fact("Source")).toHaveTextContent(
      `${WIKIDATA} — Wikidata contributors`,
    );
  });

  it("links authors named with an address, of the deck and of a source", () => {
    renderScreen({
      deck: {
        ...capitals,
        authors: ["Anton Wiklund <anton@example.com>"],
        sources: [{ url: WIKIDATA, authors: ["Wiki <wiki@example.com>"] }],
      },
    });
    expect(
      within(fact("Author")).getByRole("link", { name: "Anton Wiklund" }),
    ).toHaveAttribute("href", "mailto:anton@example.com");
    expect(
      within(fact("Source")).getByRole("link", { name: "Wiki" }),
    ).toHaveAttribute("href", "mailto:wiki@example.com");
  });

  it("leaves out whatever the deck does not state", () => {
    const { container } = renderScreen({
      deck: {
        url: capitals.url,
        name: "Rivers",
        cardCount: 1,
        authors: [],
        sources: [],
      },
    });
    expect(container.querySelector(".deck-description")).toBeNull();
    // Only the size, which every deck has.
    expect(container.querySelectorAll("dt")).toHaveLength(1);
    expect(fact("Size")).toHaveTextContent("1 card");
  });

  it("opens the card list on request", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Browse cards" }));
    expect(props.onBrowse).toHaveBeenCalledOnce();
  });

  it("imports the deck on request", () => {
    const { props } = renderScreen();
    fireEvent.click(screen.getByRole("button", { name: "Import this deck" }));
    expect(props.onImport).toHaveBeenCalledOnce();
  });

  it("locks the button while importing", () => {
    renderScreen({ busy: true });
    expect(screen.getByRole("button", { name: "Importing…" })).toBeDisabled();
  });

  it("marks a deck the instance already holds, still importable", () => {
    renderScreen({ imported: true });
    expect(screen.getByText("Already imported")).toBeInTheDocument();
    // A second copy may be wanted.
    expect(screen.getByRole("button", { name: "Import this deck" })).toBeEnabled();
  });

  it("shows an import error", () => {
    renderScreen({ error: "pod refused" });
    expect(screen.getByText("pod refused")).toHaveClass("error");
  });
});
