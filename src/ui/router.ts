import { useEffect, useState } from "preact/hooks";
import type { StorageSource } from "../domain/storage";
import type { PracticeMode } from "./PracticeScreen";

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
  | { screen: "deckDetail"; instanceUrl: string; deckUrl: string }
  | { screen: "browser"; instanceUrl: string; deckUrl: string }
  | { screen: "cardCreator"; instanceUrl: string; deckUrl: string }
  | { screen: "card"; instanceUrl: string; deckUrl: string; cardUrl: string }
  | {
      screen: "practice";
      instanceUrl: string;
      deckUrl: string;
      mode: PracticeMode;
    }
  | { screen: "preferences"; instanceUrl: string };

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
    case "deckDetail":
      return `#/deck${params({ instance: ref.instanceUrl, deck: ref.deckUrl })}`;
    case "browser":
      return `#/browse${params({ instance: ref.instanceUrl, deck: ref.deckUrl })}`;
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
    case "practice":
      return `#/practice${params({
        instance: ref.instanceUrl,
        deck: ref.deckUrl,
        mode: ref.mode,
      })}`;
    case "preferences":
      return `#/preferences${params({ instance: ref.instanceUrl })}`;
  }
}

/**
 * Hash URL of an instance's deck list: what every "Decks" in the UI —
 * heading, breadcrumb, "Back to decks" — links to.
 */
export function decksHref(instanceUrl: string): string {
  return routeToHash({ screen: "home", instanceUrl });
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
    case "/deck":
      return instanceUrl === null || deckUrl === null
        ? null
        : { screen: "deckDetail", instanceUrl, deckUrl };
    case "/browse":
      return instanceUrl === null || deckUrl === null
        ? null
        : { screen: "browser", instanceUrl, deckUrl };
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
    case "/practice": {
      const mode = query.get("mode");
      if (instanceUrl === null || deckUrl === null) return null;
      if (mode !== "study" && mode !== "practice") return null;
      return { screen: "practice", instanceUrl, deckUrl, mode };
    }
    case "/preferences":
      return instanceUrl === null
        ? null
        : { screen: "preferences", instanceUrl };
    default:
      return null;
  }
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
