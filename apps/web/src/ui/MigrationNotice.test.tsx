import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import {
  describeFormats,
  describeOutdated,
  MigrationNotice,
} from "./MigrationNotice";
import type { Deck } from "@solid-memo/domain/deck";
import type { MigrationPlan } from "@solid-memo/domain/migration";

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
const capitals: Deck = { ...deck, id: "deck-2", url: `${deck.url}2`, name: "Capitals" };
const verbs: Deck = { ...deck, id: "deck-3", url: `${deck.url}3`, name: "Verbs" };

const nothing = { preferencesOutdated: false, instanceOutdated: false, catalogMissing: false };

const plan: MigrationPlan = {
  decks: [
    { deck, deckOutdated: true, cardCount: 12, reviewCount: 0 },
    { deck: capitals, deckOutdated: false, cardCount: 243, reviewCount: 30 },
    { deck: verbs, deckOutdated: true, cardCount: 0, reviewCount: 0 },
  ],
  deckCount: 2,
  cardCount: 255,
  reviewCount: 30,
  ...nothing,
};

function renderNotice(
  overrides: Partial<Parameters<typeof MigrationNotice>[0]> = {},
) {
  const props = {
    plan,
    busy: false,
    error: null,
    onMigrate: vi.fn(),
    ...overrides,
  };
  const view = render(<MigrationNotice {...props} />);
  return { ...view, props };
}

describe("describeOutdated", () => {
  it("names everything outdated, whichever there is", () => {
    expect(describeOutdated(plan)).toBe(
      "2 deck entries, 255 cards in 2 decks and 1 review state in one deck".replace(
        "1 review state",
        "30 review states",
      ),
    );
    expect(
      describeOutdated({
        decks: [{ deck, deckOutdated: true, cardCount: 0, reviewCount: 0 }],
        deckCount: 1,
        cardCount: 0,
        reviewCount: 0,
        ...nothing,
      }),
    ).toBe("1 deck entry");
    expect(
      describeOutdated({
        decks: [{ deck, deckOutdated: false, cardCount: 1, reviewCount: 1 }],
        deckCount: 0,
        cardCount: 1,
        reviewCount: 1,
        preferencesOutdated: true,
        instanceOutdated: true,
        catalogMissing: false,
      }),
    ).toBe(
      "the instance record, your preferences, 1 card in one deck and 1 review state in one deck",
    );
  });
});

describe("a missing catalogue", () => {
  const catalogOnly: MigrationPlan = {
    decks: [],
    deckCount: 0,
    cardCount: 0,
    reviewCount: 0,
    preferencesOutdated: false,
    instanceOutdated: false,
    catalogMissing: true,
  };

  it("is named in what is outdated, in the formats, on the list and on the button", () => {
    expect(describeOutdated(catalogOnly)).toBe("the instance's catalogue");
    expect(describeFormats(catalogOnly)).toBe(
      "a catalogue of each instance's decks, which other apps read as a DCAT catalogue",
    );
    renderNotice({ plan: catalogOnly });
    expect(screen.getByRole("region")).toHaveTextContent("the instance's catalogue is stored in an older format.");
    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual(["Catalogue of the decks"]);
    expect(screen.getByRole("button", { name: "Update the catalogue" })).toBeEnabled();
  });
});

describe("describeFormats", () => {
  it("names the formats the plan touches, with what each added", () => {
    expect(describeFormats(plan)).toBe(
      "deck format 3, which describes decks with the DCAT and SKOS standards and gives every deck a description, card format 2, which adds pictures on cards and review-state format 2, which keeps each study direction's state and the day's undo snapshot",
    );
    expect(
      describeFormats({
        decks: [],
        deckCount: 0,
        cardCount: 0,
        reviewCount: 0,
        preferencesOutdated: true,
        instanceOutdated: true,
        catalogMissing: false,
      }),
    ).toBe(
      "instance format 2 and preferences format 3, which records the answer scale, developer mode and what to do with invalid data",
    );
  });
});

describe("MigrationNotice", () => {
  it("says what will be updated, deck by deck, and waits for the user", () => {
    const { props } = renderNotice();
    const region = screen.getByRole("region", { name: "Format update" });
    expect(region).toHaveTextContent(
      "2 deck entries, 255 cards in 2 decks and 30 review states in one deck are stored in an older format.",
    );
    expect(region).toHaveTextContent("Solid Memo now writes deck format 3");
    expect(region).toHaveTextContent("card format 2");
    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent),
    ).toEqual([
      "Kanji N5 — deck entry, 12 cards",
      "Capitals — 243 cards, 30 review states",
      "Verbs — deck entry",
    ]);
    expect(props.onMigrate).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Update 3 decks" }));
    expect(props.onMigrate).toHaveBeenCalledOnce();
  });

  it("phrases a single card in a single deck", () => {
    renderNotice({
      plan: {
        decks: [{ deck, deckOutdated: false, cardCount: 1, reviewCount: 0 }],
        deckCount: 0,
        cardCount: 1,
        reviewCount: 0,
        ...nothing,
      },
    });
    expect(screen.getByRole("region")).toHaveTextContent(
      "1 card in one deck is stored in an older format.",
    );
    expect(screen.getByRole("button", { name: "Update 1 deck" })).toBeEnabled();
  });

  it("lists the preferences and the instance record, and names them on the button", () => {
    renderNotice({
      plan: {
        decks: [{ deck, deckOutdated: false, cardCount: 0, reviewCount: 2 }],
        deckCount: 0,
        cardCount: 0,
        reviewCount: 2,
        preferencesOutdated: true,
        instanceOutdated: true,
        catalogMissing: false,
      },
    });
    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent),
    ).toEqual(["Instance record", "Preferences", "Kanji N5 — 2 review states"]);
    expect(
      screen.getByRole("button", { name: "Update 1 deck, preferences and the instance record" }),
    ).toBeEnabled();
  });

  it("names only the preferences on the button when no deck is outdated", () => {
    renderNotice({
      plan: {
        decks: [],
        deckCount: 0,
        cardCount: 0,
        reviewCount: 0,
        preferencesOutdated: true,
        instanceOutdated: false,
        catalogMissing: false,
      },
    });
    expect(screen.getByRole("region")).toHaveTextContent(
      "your preferences is stored in an older format.",
    );
    expect(screen.getByRole("button", { name: "Update preferences" })).toBeEnabled();
  });

  it("shows progress and errors", () => {
    renderNotice({ busy: true, error: "write refused" });
    expect(screen.getByRole("button", { name: "Updating…" })).toBeDisabled();
    expect(screen.getByText("write refused")).toBeInTheDocument();
  });
});
