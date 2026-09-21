import { beforeEach, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/preact";
import {
  deckHref,
  decksHref,
  parseHash,
  routeToHash,
  type RouteRef,
  useHashRoute,
} from "./router";

const roundTrips: RouteRef[] = [
  { screen: "storagePicker" },
  { screen: "instancePicker" },
  {
    screen: "instanceCreator",
    storageUrl: "https://pod.example/",
    source: "profile",
  },
  { screen: "home", instanceUrl: "https://pod.example/solid-memo/a/" },
  { screen: "deckCreator", instanceUrl: "https://pod.example/solid-memo/a/" },
  {
    screen: "deckDetail",
    instanceUrl: "https://pod.example/solid-memo/a/",
    deckUrl: "https://pod.example/solid-memo/a/decks.ttl#deck-1",
  },
  {
    screen: "browser",
    instanceUrl: "https://pod.example/solid-memo/a/",
    deckUrl: "https://pod.example/solid-memo/a/decks.ttl#deck-1",
  },
  {
    screen: "cardCreator",
    instanceUrl: "https://pod.example/solid-memo/a/",
    deckUrl: "https://pod.example/solid-memo/a/decks.ttl#deck-1",
  },
  {
    screen: "card",
    instanceUrl: "https://pod.example/solid-memo/a/",
    deckUrl: "https://pod.example/solid-memo/a/decks.ttl#deck-1",
    cardUrl: "https://pod.example/solid-memo/a/decks/deck-1.ttl#card-1",
  },
  {
    screen: "practice",
    instanceUrl: "https://pod.example/solid-memo/a/",
    deckUrl: "https://pod.example/solid-memo/a/decks.ttl#deck-1",
    mode: "study",
  },
  { screen: "preferences", instanceUrl: "https://pod.example/solid-memo/a/" },
];

describe("routeToHash / parseHash", () => {
  it.each(roundTrips)("round-trips $screen", (ref) => {
    expect(parseHash(routeToHash(ref))).toEqual(ref);
  });

  it("parses identifiers containing URL metacharacters", () => {
    const ref: RouteRef = {
      screen: "deckDetail",
      instanceUrl: "https://pod.example/a b/?x=1&y=2",
      deckUrl: "https://pod.example/a b/decks.ttl#deck-1",
    };
    expect(parseHash(routeToHash(ref))).toEqual(ref);
  });

  it.each([
    "",
    // The brand link: an empty route that falls back to the default.
    "#/",
    "#/nope",
    "#/new-instance",
    "#/new-instance?storage=https%3A%2F%2Fpod.example%2F",
    "#/new-instance?storage=https%3A%2F%2Fpod.example%2F&source=guess",
    "#/new-instance?source=profile",
    "#/decks",
    "#/new-deck",
    "#/deck",
    "#/deck?instance=https%3A%2F%2Fpod.example%2F",
    "#/browse?deck=https%3A%2F%2Fpod.example%2Fd%23deck-1",
    "#/new-card?instance=a",
    "#/new-card?deck=b",
    "#/card?instance=a&deck=b",
    "#/card?instance=a&card=c",
    "#/card?deck=b&card=c",
    "#/practice?instance=a&deck=b",
    "#/practice?instance=a&deck=b&mode=cram",
    "#/practice?mode=study",
    "#/preferences",
  ])("rejects invalid hash %j", (hash) => {
    expect(parseHash(hash)).toBeNull();
  });
});

describe("deckHref", () => {
  it("is the hash URL of the deck's page", () => {
    const href = deckHref("https://pod.example/a/", "https://pod.example/a/c#d");
    expect(parseHash(href)).toEqual({
      screen: "deckDetail",
      instanceUrl: "https://pod.example/a/",
      deckUrl: "https://pod.example/a/c#d",
    });
  });
});

describe("decksHref", () => {
  it("is the hash URL of the instance's deck list", () => {
    const href = decksHref("https://pod.example/solid-memo/a/");
    expect(parseHash(href)).toEqual({
      screen: "home",
      instanceUrl: "https://pod.example/solid-memo/a/",
    });
  });
});

describe("parseHash legacy links", () => {
  it("ignores the retired return parameter of card-creator links", () => {
    expect(parseHash("#/new-card?instance=a&deck=b&return=deckDetail")).toEqual(
      { screen: "cardCreator", instanceUrl: "a", deckUrl: "b" },
    );
  });
});

describe("useHashRoute", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", window.location.pathname);
  });

  it("reads the initial route from the URL", () => {
    window.history.replaceState(null, "", "#/instances");
    const { result } = renderHook(() => useHashRoute());
    expect(result.current.route).toEqual({ screen: "instancePicker" });
  });

  it("is null for a URL without a route", () => {
    const { result } = renderHook(() => useHashRoute());
    expect(result.current.route).toBeNull();
  });

  it("navigate updates the URL and the route", () => {
    const { result } = renderHook(() => useHashRoute());
    act(() => result.current.navigate({ screen: "storagePicker" }));
    expect(window.location.hash).toBe("#/storages");
    expect(result.current.route).toEqual({ screen: "storagePicker" });
  });

  it("replace updates the URL and the route", () => {
    const { result } = renderHook(() => useHashRoute());
    act(() => result.current.replace({ screen: "instancePicker" }));
    expect(window.location.hash).toBe("#/instances");
    expect(result.current.route).toEqual({ screen: "instancePicker" });
  });

  it("follows external hash changes (Back/Forward, hand-edited URL)", () => {
    const { result } = renderHook(() => useHashRoute());
    act(() => {
      window.history.replaceState(null, "", "#/storages");
      window.dispatchEvent(new Event("hashchange"));
    });
    expect(result.current.route).toEqual({ screen: "storagePicker" });
  });

  it("stops listening after unmount", () => {
    const { result, unmount } = renderHook(() => useHashRoute());
    unmount();
    window.history.replaceState(null, "", "#/storages");
    window.dispatchEvent(new Event("hashchange"));
    expect(result.current.route).toBeNull();
  });
});
