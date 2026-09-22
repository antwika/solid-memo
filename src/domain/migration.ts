import { CARD_FORMAT_VERSION, type Card, type Deck } from "./deck";

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

/** What a migration would touch, for the user to approve first. */
export interface MigrationPlan {
  /** Decks holding outdated cards, with how many each. */
  decks: { deck: Deck; cardCount: number }[];
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
      cardCount: cards.filter(isOutdated).length,
    }))
    .filter(({ cardCount }) => cardCount > 0);
  return {
    decks,
    cardCount: decks.reduce((sum, { cardCount }) => sum + cardCount, 0),
  };
}
