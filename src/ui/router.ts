import { useEffect, useState } from "preact/hooks";
import type { StorageSource } from "../domain/storage";

/**
 * Serializable description of a Workspace view. Unlike the resolved
 * screen state, it carries only identifiers (instance/deck URLs), so it
 * can round-trip through the browser's URL hash.
 *
 * Hash routing (rather than pathname routing) keeps deep links working
 * on any static host and stays clear of the Solid OIDC redirect
 * parameters, which live in the query string.
 */
export type RouteRef =
  | { screen: "storagePicker" }
  | { screen: "instancePicker" }
  | { screen: "instanceCreator"; storageUrl: string; source: StorageSource }
  | { screen: "home"; instanceUrl: string }
  | { screen: "deckCreator"; instanceUrl: string }
  | { screen: "library"; instanceUrl: string }
  /** One library deck's page. Named `libraryDeckUrl`, not `deckUrl`: the
      deck is in the library, not the instance, so it must not be
      resolved (and redirected) like a pod deck. */
  | { screen: "libraryDeck"; instanceUrl: string; libraryDeckUrl: string }
  /** A library deck's cards, read-only; paged like the Browser. */
  | {
    screen: "libraryBrowser";
    instanceUrl: string;
    libraryDeckUrl: string;
    page?: number;
  }
  | { screen: "deckDetail"; instanceUrl: string; deckUrl: string }
  /** `page` is 1-based; absent means the first page. */
  | { screen: "browser"; instanceUrl: string; deckUrl: string; page?: number }
  | { screen: "cardCreator"; instanceUrl: string; deckUrl: string }
  | { screen: "card"; instanceUrl: string; deckUrl: string; cardUrl: string }
  /** A study session over the deck's due and new prompts. */
  | { screen: "study"; instanceUrl: string; deckUrl: string }
  | { screen: "preferences"; instanceUrl: string }
  /** Developer tool: the instance's documents checked against the shapes. */
  | { screen: "validation"; instanceUrl: string };

const STORAGE_SOURCES: StorageSource[] = ["profile", "linkHeader", "manual"];

function params(pairs: Record<string, string>): string {
  return `?${new URLSearchParams(pairs).toString()}`;
}

export function routeToHash(ref: RouteRef): string {
  switch (ref.screen) {
    case "storagePicker":
      return "#/storages";
    case "instancePicker":
      return "#/instances";
    case "instanceCreator":
      return `#/new-instance${params({
        storage: ref.storageUrl,
        source: ref.source,
      })}`;
    case "home":
      return `#/decks${params({ instance: ref.instanceUrl })}`;
    case "deckCreator":
      return `#/new-deck${params({ instance: ref.instanceUrl })}`;
    case "library":
      return `#/library${params({ instance: ref.instanceUrl })}`;
    case "libraryDeck":
      return `#/library-deck${params({
        instance: ref.instanceUrl,
        deck: ref.libraryDeckUrl,
      })}`;
    case "libraryBrowser":
      return `#/library-browse${params({
        instance: ref.instanceUrl,
        deck: ref.libraryDeckUrl,
        ...(ref.page !== undefined && ref.page > 1
          ? { page: String(ref.page) }
          : {}),
      })}`;
    case "deckDetail":
      return `#/deck${params({ instance: ref.instanceUrl, deck: ref.deckUrl })}`;
    case "browser":
      return `#/browse${params({
        instance: ref.instanceUrl,
        deck: ref.deckUrl,
        ...(ref.page !== undefined && ref.page > 1
          ? { page: String(ref.page) }
          : {}),
      })}`;
    case "cardCreator":
      return `#/new-card${params({
        instance: ref.instanceUrl,
        deck: ref.deckUrl,
      })}`;
    case "card":
      return `#/card${params({
        instance: ref.instanceUrl,
        deck: ref.deckUrl,
        card: ref.cardUrl,
      })}`;
    case "study":
      return `#/study${params({
        instance: ref.instanceUrl,
        deck: ref.deckUrl,
      })}`;
    case "preferences":
      return `#/preferences${params({ instance: ref.instanceUrl })}`;
    case "validation":
      return `#/validate${params({ instance: ref.instanceUrl })}`;
  }
}

/** Hash URL of the developer tool that checks an instance against the shapes. */
export function validationHref(instanceUrl: string): string {
  return routeToHash({ screen: "validation", instanceUrl });
}

/**
 * Hash URL of an instance's deck list: what every "Decks" in the UI —
 * heading, breadcrumb, "Back to decks" — links to.
 */
export function decksHref(instanceUrl: string): string {
  return routeToHash({ screen: "home", instanceUrl });
}

/** Hash URL of the deck library, where ready-made decks are imported. */
export function libraryHref(instanceUrl: string): string {
  return routeToHash({ screen: "library", instanceUrl });
}

/**
 * Hash URL of a library deck's page: what its name links to in the
 * library list, where it is read about and imported on its own.
 */
export function libraryDeckHref(
  instanceUrl: string,
  libraryDeckUrl: string,
): string {
  return routeToHash({ screen: "libraryDeck", instanceUrl, libraryDeckUrl });
}

/**
 * Hash URL of a deck's page: what a deck's name links to wherever the UI
 * shows it — deck list, headings, breadcrumb.
 */
export function deckHref(instanceUrl: string, deckUrl: string): string {
  return routeToHash({ screen: "deckDetail", instanceUrl, deckUrl });
}

/** Parse a location hash; null for anything that isn't a valid route. */
export function parseHash(hash: string): RouteRef | null {
  const [path, search] = hash.replace(/^#/, "").split("?");
  const query = new URLSearchParams(search);
  const instanceUrl = query.get("instance");
  const deckUrl = query.get("deck");

  switch (path) {
    case "/storages":
      return { screen: "storagePicker" };
    case "/instances":
      return { screen: "instancePicker" };
    case "/new-instance": {
      const storageUrl = query.get("storage");
      const source = query.get("source") as StorageSource | null;
      if (storageUrl === null || source === null) return null;
      if (!STORAGE_SOURCES.includes(source)) return null;
      return { screen: "instanceCreator", storageUrl, source };
    }
    case "/decks":
      return instanceUrl === null ? null : { screen: "home", instanceUrl };
    case "/new-deck":
      return instanceUrl === null
        ? null
        : { screen: "deckCreator", instanceUrl };
    case "/library":
      return instanceUrl === null ? null : { screen: "library", instanceUrl };
    case "/library-deck":
      return instanceUrl === null || deckUrl === null
        ? null
        : { screen: "libraryDeck", instanceUrl, libraryDeckUrl: deckUrl };
    case "/library-browse": {
      if (instanceUrl === null || deckUrl === null) return null;
      const page = parsePage(query.get("page"));
      const ref = {
        screen: "libraryBrowser",
        instanceUrl,
        libraryDeckUrl: deckUrl,
      } as const;
      return page === null ? ref : { ...ref, page };
    }
    case "/deck":
      return instanceUrl === null || deckUrl === null
        ? null
        : { screen: "deckDetail", instanceUrl, deckUrl };
    case "/browse": {
      if (instanceUrl === null || deckUrl === null) return null;
      const page = parsePage(query.get("page"));
      return page === null
        ? { screen: "browser", instanceUrl, deckUrl }
        : { screen: "browser", instanceUrl, deckUrl, page };
    }
    case "/new-card":
      return instanceUrl === null || deckUrl === null
        ? null
        : { screen: "cardCreator", instanceUrl, deckUrl };
    case "/card": {
      const cardUrl = query.get("card");
      return instanceUrl === null || deckUrl === null || cardUrl === null
        ? null
        : { screen: "card", instanceUrl, deckUrl, cardUrl };
    }
    case "/study":
      return instanceUrl === null || deckUrl === null
        ? null
        : { screen: "study", instanceUrl, deckUrl };
    case "/preferences":
      return instanceUrl === null
        ? null
        : { screen: "preferences", instanceUrl };
    case "/validate":
      return instanceUrl === null ? null : { screen: "validation", instanceUrl };
    default:
      return null;
  }
}

/** A page number beyond the first, or null for anything else. */
function parsePage(value: string | null): number | null {
  if (value === null || !/^\d+$/.test(value)) return null;
  const page = Number(value);
  return page > 1 ? page : null;
}

/**
 * The URL hash as route state. `navigate` pushes a history entry (so
 * Back walks the app's screens); `replace` swaps the current entry
 * (redirects and defaults, which should not be Back stops).
 * External changes — Back/Forward, a hand-edited hash — arrive via the
 * hashchange event.
 */
export function useHashRoute(): {
  route: RouteRef | null;
  navigate: (ref: RouteRef) => void;
  replace: (ref: RouteRef) => void;
} {
  const [route, setRoute] = useState<RouteRef | null>(() =>
    parseHash(window.location.hash),
  );

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function navigate(ref: RouteRef) {
    window.history.pushState(null, "", routeToHash(ref));
    setRoute(ref);
  }

  function replace(ref: RouteRef) {
    window.history.replaceState(null, "", routeToHash(ref));
    setRoute(ref);
  }

  return { route, navigate, replace };
}
