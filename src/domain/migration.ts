import {
  CARD_FORMAT_VERSION,
  DECK_FORMAT_VERSION,
  type Card,
  type Deck,
} from "./deck";

/**
 * Format migrations: bringing data written by an older Solid Memo up to
 * the format this one writes (see docs/migrations.md). Everything here is
 * pure; the application layer does the reading and writing.
 */

/** True when the card is stored in an older format than this app writes. */
export function isOutdated(card: Card): boolean {
  return card.formatVersion < CARD_FORMAT_VERSION;
}

/**
 * The card as this app writes it. Format 1 → 2 changes no content: every
 * format-1 card has text on both sides, which format 2 still allows, so
 * only the version moves. A card already at (or beyond) the current
 * format is returned as is.
 */
export function upgradeCard(card: Card): Card {
  return isOutdated(card) ? { ...card, formatVersion: CARD_FORMAT_VERSION } : card;
}

/** True when the deck's catalog entry is in an older format than this app writes. */
export function isDeckOutdated(deck: Deck): boolean {
  return deck.formatVersion < DECK_FORMAT_VERSION;
}

/**
 * The deck as this app writes it. Format 1 → 2 adds the study direction;
 * a deck read without one is already front→back, the only direction
 * format 1 knew, so only the version moves — the write then states the
 * direction explicitly. A deck already at (or beyond) the current format
 * is returned as is.
 */
export function upgradeDeck(deck: Deck): Deck {
  return isDeckOutdated(deck)
    ? { ...deck, formatVersion: DECK_FORMAT_VERSION }
    : deck;
}

/** What a migration would touch, for the user to approve first. */
export interface MigrationPlan {
  /** Decks with an outdated entry or outdated cards, with how many of each. */
  decks: { deck: Deck; deckOutdated: boolean; cardCount: number }[];
  /** Outdated deck entries across the instance. */
  deckCount: number;
  /** Outdated cards across the instance. */
  cardCount: number;
}

/** Plan the migration of an instance from its decks and their cards. */
export function planMigration(
  entries: { deck: Deck; cards: Card[] }[],
): MigrationPlan {
  const decks = entries
    .map(({ deck, cards }) => ({
      deck,
      deckOutdated: isDeckOutdated(deck),
      cardCount: cards.filter(isOutdated).length,
    }))
    .filter(({ deckOutdated, cardCount }) => deckOutdated || cardCount > 0);
  return {
    decks,
    deckCount: decks.filter(({ deckOutdated }) => deckOutdated).length,
    cardCount: decks.reduce((sum, { cardCount }) => sum + cardCount, 0),
  };
}

/** What a migration did: how many deck entries and cards it rewrote. */
export interface MigrationResult {
  deckCount: number;
  cardCount: number;
}
