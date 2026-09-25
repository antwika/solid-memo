import {
  CARD_FORMAT_VERSION,
  DECK_FORMAT_VERSION,
  type Deck,
  type DeckDirection,
} from "./deck";
import type { LibraryDeckContent } from "./library";

/**
 * Bringing an imported deck up to the format its library source is now
 * published in (see docs/migrations.md). A library deck may be
 * re-published in a newer deck format — format 2 gave the library's
 * decks a study direction — after a user imported it; this is the offer
 * to apply what the newer format adds to their copy, using the values
 * the library states. Cards and review history are never touched.
 */
export interface LibraryUpgradePlan {
  /** The copy's current deck format. */
  fromVersion: number;
  /** The library's deck format, which the copy is brought up to. */
  toVersion: number;
  /** The direction the library now states, which the upgrade sets. */
  direction: DeckDirection;
}

/**
 * Whether the deck's library source is published in a newer format this
 * app can bring the copy up to, and what that would change. Null — no
 * offer — unless every check passes:
 *
 * - the deck was imported from exactly this library document;
 * - the library's deck format is newer than the copy's;
 * - this app writes that deck format (or a newer one) and reads every
 *   card format the library document uses, so the steps between the
 *   two versions are ones it knows;
 * - the upgrade would change something beyond the version number —
 *   otherwise the ordinary format migration covers it.
 */
export function planLibraryUpgrade(
  deck: Deck,
  source: LibraryDeckContent,
): LibraryUpgradePlan | null {
  if (deck.sourceUrl !== source.url) return null;
  if (source.formatVersion <= deck.formatVersion) return null;
  if (source.formatVersion > DECK_FORMAT_VERSION) return null;
  if (source.cards.some((card) => card.formatVersion > CARD_FORMAT_VERSION)) {
    return null;
  }
  if (source.direction === deck.direction) return null;
  return {
    fromVersion: deck.formatVersion,
    toVersion: source.formatVersion,
    direction: source.direction,
  };
}

/** The deck as the upgrade writes it: the library's direction, current format. */
export function applyLibraryUpgrade(deck: Deck, plan: LibraryUpgradePlan): Deck {
  return { ...deck, direction: plan.direction, formatVersion: plan.toVersion };
}
