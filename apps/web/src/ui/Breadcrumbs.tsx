import { routeToHash, type RouteRef } from "./router";

/** One step of the trail. The last crumb is the current page. */
export interface Crumb {
  label: string;
  route: RouteRef;
}

/** Display names the route itself (URLs only) cannot supply. */
export interface CrumbNames {
  /** Name of the route's deck; read for routes inside a deck. */
  deck: string;
  /** Front of the route's card; read for the card page. */
  card: string;
  /** Name of the route's library deck; read for a library deck's page. */
  libraryDeck: string;
}

/**
 * The trail from the top of the app down to a route. Every screen has
 * one — a top-level screen's is a single crumb — so "Decks" (the list of
 * all decks) is on hand wherever the user is inside an instance.
 */
export function breadcrumbsFor(route: RouteRef, names: CrumbNames): Crumb[] {
  const instances: Crumb = {
    label: "Instances",
    route: { screen: "instancePicker" },
  };
  switch (route.screen) {
    case "instancePicker":
      return [instances];
    case "storagePicker":
      return [instances, { label: "Choose a storage", route }];
    case "instanceCreator":
      return [instances, { label: "New instance", route }];
  }

  const decks: Crumb = {
    label: "Decks",
    route: { screen: "home", instanceUrl: route.instanceUrl },
  };
  if (route.screen === "home") return [decks];
  if (route.screen === "deckCreator") {
    return [decks, { label: "New deck", route }];
  }
  const library: Crumb = {
    label: "Deck library",
    route: { screen: "library", instanceUrl: route.instanceUrl },
  };
  if (route.screen === "library") return [decks, library];
  if (route.screen === "libraryDeck" || route.screen === "libraryBrowser") {
    const libraryDeck: Crumb = {
      label: names.libraryDeck,
      route: {
        screen: "libraryDeck",
        instanceUrl: route.instanceUrl,
        libraryDeckUrl: route.libraryDeckUrl,
      },
    };
    return route.screen === "libraryDeck"
      ? [decks, library, libraryDeck]
      : [decks, library, libraryDeck, { label: "Cards", route }];
  }
  if (route.screen === "preferences") {
    return [decks, { label: "Preferences", route }];
  }
  if (route.screen === "validation") {
    return [decks, { label: "Validation", route }];
  }

  const deck: Crumb = {
    label: names.deck,
    route: {
      screen: "deckDetail",
      instanceUrl: route.instanceUrl,
      deckUrl: route.deckUrl,
    },
  };
  const browser: Crumb = {
    label: "Browser",
    route: {
      screen: "browser",
      instanceUrl: route.instanceUrl,
      deckUrl: route.deckUrl,
    },
  };
  switch (route.screen) {
    case "deckDetail":
      return [decks, deck];
    case "browser":
      return [decks, deck, browser];
    case "cardCreator":
      return [decks, deck, browser, { label: "New card", route }];
    case "card":
      return [decks, deck, browser, { label: names.card, route }];
    case "study":
      return [decks, deck, { label: "Study", route }];
  }
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, index) => (
          <li key={index}>
            <a
              href={routeToHash(crumb.route)}
              aria-current={index === crumbs.length - 1 ? "page" : undefined}
            >
              {crumb.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
