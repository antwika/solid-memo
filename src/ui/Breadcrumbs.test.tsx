import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/preact";
import { Breadcrumbs, breadcrumbsFor } from "./Breadcrumbs";
import { routeToHash, type RouteRef } from "./router";

const instanceUrl = "https://pod.example/solid-memo/a/";
const deckUrl = `${instanceUrl}catalog.ttl#deck-1`;

const home: RouteRef = { screen: "home", instanceUrl };
const deckDetail: RouteRef = { screen: "deckDetail", instanceUrl, deckUrl };
const browser: RouteRef = { screen: "browser", instanceUrl, deckUrl };
const instancePicker: RouteRef = { screen: "instancePicker" };
const NO_NAMES = { deck: "", card: "", libraryDeck: "" };

describe("breadcrumbsFor", () => {
  it("gives top-level screens a single crumb, so the trail is always there", () => {
    expect(breadcrumbsFor(home, NO_NAMES)).toEqual([{ label: "Decks", route: home }]);
    expect(breadcrumbsFor(instancePicker, NO_NAMES)).toEqual([
      { label: "Instances", route: instancePicker },
    ]);
  });

  it("leads the instance funnel back to the instance picker", () => {
    const storagePicker: RouteRef = { screen: "storagePicker" };
    expect(breadcrumbsFor(storagePicker, NO_NAMES)).toEqual([
      { label: "Instances", route: instancePicker },
      { label: "Choose a storage", route: storagePicker },
    ]);
    const instanceCreator: RouteRef = {
      screen: "instanceCreator",
      storageUrl: "https://pod.example/",
      source: "profile",
    };
    expect(breadcrumbsFor(instanceCreator, NO_NAMES)).toEqual([
      { label: "Instances", route: instancePicker },
      { label: "New instance", route: instanceCreator },
    ]);
  });

  it("puts instance-level screens under Decks", () => {
    const deckCreator: RouteRef = { screen: "deckCreator", instanceUrl };
    expect(breadcrumbsFor(deckCreator, NO_NAMES)).toEqual([
      { label: "Decks", route: home },
      { label: "New deck", route: deckCreator },
    ]);
    const preferences: RouteRef = { screen: "preferences", instanceUrl };
    expect(breadcrumbsFor(preferences, NO_NAMES)).toEqual([
      { label: "Decks", route: home },
      { label: "Preferences", route: preferences },
    ]);
    const library: RouteRef = { screen: "library", instanceUrl };
    expect(breadcrumbsFor(library, NO_NAMES)).toEqual([
      { label: "Decks", route: home },
      { label: "Deck library", route: library },
    ]);
  });

  it("puts a library deck's page under the library, named after the deck", () => {
    const libraryDeck: RouteRef = {
      screen: "libraryDeck",
      instanceUrl,
      libraryDeckUrl: "https://solid-memo.com/decks/capitals.ttl",
    };
    expect(
      breadcrumbsFor(libraryDeck, { ...NO_NAMES, libraryDeck: "Capitals" }),
    ).toEqual([
      { label: "Decks", route: home },
      { label: "Deck library", route: { screen: "library", instanceUrl } },
      { label: "Capitals", route: libraryDeck },
    ]);
    const cards: RouteRef = { ...libraryDeck, screen: "libraryBrowser", page: 2 };
    expect(
      breadcrumbsFor(cards, { ...NO_NAMES, libraryDeck: "Capitals" }),
    ).toEqual([
      { label: "Decks", route: home },
      { label: "Deck library", route: { screen: "library", instanceUrl } },
      { label: "Capitals", route: libraryDeck },
      { label: "Cards", route: cards },
    ]);
  });

  it("ends the deck view's trail with a link to the deck itself", () => {
    expect(breadcrumbsFor(deckDetail, { deck: "Kanji N5", card: "", libraryDeck: "" })).toEqual([
      { label: "Decks", route: home },
      { label: "Kanji N5", route: deckDetail },
    ]);
  });

  it("links the deck from the Browser", () => {
    expect(breadcrumbsFor(browser, { deck: "Kanji N5", card: "", libraryDeck: "" })).toEqual([
      { label: "Decks", route: home },
      { label: "Kanji N5", route: deckDetail },
      { label: "Browser", route: browser },
    ]);
  });

  it("links every level above the card creator", () => {
    const cardCreator: RouteRef = { screen: "cardCreator", instanceUrl, deckUrl };
    expect(breadcrumbsFor(cardCreator, { deck: "Kanji N5", card: "", libraryDeck: "" })).toEqual([
      { label: "Decks", route: home },
      { label: "Kanji N5", route: deckDetail },
      { label: "Browser", route: browser },
      { label: "New card", route: cardCreator },
    ]);
  });

  it("ends a card page's trail with the card itself, under the Browser", () => {
    const cardRoute: RouteRef = {
      screen: "card",
      instanceUrl,
      deckUrl,
      cardUrl: `${instanceUrl}decks/deck-1.ttl#card-1`,
    };
    expect(breadcrumbsFor(cardRoute, { deck: "Kanji N5", card: "水", libraryDeck: "" })).toEqual([
      { label: "Decks", route: home },
      { label: "Kanji N5", route: deckDetail },
      { label: "Browser", route: browser },
      { label: "水", route: cardRoute },
    ]);
  });

  it("ends a study session's trail with Study, under the deck", () => {
    const study: RouteRef = { screen: "study", instanceUrl, deckUrl };
    expect(breadcrumbsFor(study, { deck: "Kanji N5", card: "", libraryDeck: "" })).toEqual([
      { label: "Decks", route: home },
      { label: "Kanji N5", route: deckDetail },
      { label: "Study", route: study },
    ]);
  });
});

describe("Breadcrumbs", () => {
  it("makes every crumb a link, the current page included", () => {
    render(<Breadcrumbs crumbs={breadcrumbsFor(deckDetail, { deck: "Verbs", card: "", libraryDeck: "" })} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });

    const decks = within(nav).getByRole("link", { name: "Decks" });
    expect(decks).toHaveAttribute("href", routeToHash(home));
    expect(decks).not.toHaveAttribute("aria-current");

    const verbs = within(nav).getByRole("link", { name: "Verbs" });
    expect(verbs).toHaveAttribute("href", routeToHash(deckDetail));
    expect(verbs).toHaveAttribute("aria-current", "page");
  });

  it("links ancestors by URL and marks the current page", () => {
    render(<Breadcrumbs crumbs={breadcrumbsFor(browser, { deck: "Kanji N5", card: "", libraryDeck: "" })} />);

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("link", { name: "Decks" })).toHaveAttribute(
      "href",
      routeToHash(home),
    );
    expect(within(nav).getByRole("link", { name: "Kanji N5" })).toHaveAttribute(
      "href",
      routeToHash(deckDetail),
    );
    const current = within(nav).getByRole("link", { name: "Browser" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveAttribute("href", routeToHash(browser));
  });

  it("copes with a deck named like another crumb", () => {
    render(<Breadcrumbs crumbs={breadcrumbsFor(browser, { deck: "Decks", card: "", libraryDeck: "" })} />);
    expect(screen.getAllByRole("link", { name: "Decks" })).toHaveLength(2);
  });
});
