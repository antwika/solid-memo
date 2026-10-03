import { useI18n, type I18n } from "./i18n";
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
  /** Front of the route's library card; read for a library card's page. */
  libraryCard?: string;
}

/**
 * The trail from the top of the app down to a route. Every screen has
 * one — a top-level screen's is a single crumb — so t("breadcrumbs.decks") (the list of
 * all decks) is on hand wherever the user is inside an instance.
 */
export function breadcrumbsFor(route: RouteRef, names: CrumbNames, t: I18n["t"]): Crumb[] {
  const instances: Crumb = {
    label: t("breadcrumbs.instances"),
    route: { screen: "instancePicker" },
  };
  switch (route.screen) {
    case "instancePicker":
      return [instances];
    case "storagePicker":
      return [instances, { label: t("breadcrumbs.storagePicker"), route }];
    case "instanceCreator":
      return [instances, { label: t("breadcrumbs.instanceCreator"), route }];
  }

  const decks: Crumb = {
    label: t("breadcrumbs.decks"),
    route: { screen: "home", instanceUrl: route.instanceUrl },
  };
  if (route.screen === "home") return [decks];
  if (route.screen === "deckCreator") {
    return [decks, { label: t("breadcrumbs.deckCreator"), route }];
  }
  const library: Crumb = {
    label: t("breadcrumbs.library"),
    route: { screen: "library", instanceUrl: route.instanceUrl },
  };
  if (route.screen === "library") return [decks, library];
  if (
    route.screen === "libraryDeck" ||
    route.screen === "libraryBrowser" ||
    route.screen === "libraryCard" ||
    route.screen === "libraryPreview"
  ) {
    const libraryDeck: Crumb = {
      label: names.libraryDeck,
      route: {
        screen: "libraryDeck",
        instanceUrl: route.instanceUrl,
        libraryDeckUrl: route.libraryDeckUrl,
      },
    };
    if (route.screen === "libraryDeck") return [decks, library, libraryDeck];
    if (route.screen === "libraryCard") {
      const cards: Crumb = {
        label: t("breadcrumbs.cards"),
        route: {
          screen: "libraryBrowser",
          instanceUrl: route.instanceUrl,
          libraryDeckUrl: route.libraryDeckUrl,
        },
      };
      return [decks, library, libraryDeck, cards, { label: names.libraryCard ?? "", route }];
    }
    return [
      decks,
      library,
      libraryDeck,
      { label: route.screen === "libraryBrowser" ? t("breadcrumbs.cards") : t("breadcrumbs.preview"), route },
    ];
  }
  if (route.screen === "preferences") {
    return [decks, { label: t("breadcrumbs.preferences"), route }];
  }
  if (route.screen === "statistics") {
    return [decks, { label: t("breadcrumbs.statistics"), route }];
  }
  if (route.screen === "validation") {
    return [decks, { label: t("breadcrumbs.validation"), route }];
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
    label: t("breadcrumbs.browser"),
    route: {
      screen: "browser",
      instanceUrl: route.instanceUrl,
      deckUrl: route.deckUrl,
    },
  };
  switch (route.screen) {
    case "deckDetail":
      return [decks, deck];
    case "deckPreferences":
      return [decks, deck, { label: t("breadcrumbs.preferences"), route }];
    case "browser":
      return [decks, deck, browser];
    case "cardCreator":
      return [decks, deck, browser, { label: t("breadcrumbs.cardCreator"), route }];
    case "card":
      return [decks, deck, browser, { label: names.card, route }];
    case "study":
      return [decks, deck, { label: t("breadcrumbs.study"), route }];
  }
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const { t } = useI18n();
  return (
    <nav class="breadcrumbs" aria-label={t("breadcrumbs.label")}>
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
