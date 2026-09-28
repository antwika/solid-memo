import {
  CARD_FORMAT_VERSION,
  type Card,
  type CardContent,
  type Deck,
  type DeckDirection,
} from "./deck";
import type { LibraryCard, LibraryDeckContent, LibraryRelease } from "./library";

/**
 * Bringing an imported deck up to a newer release of its library deck
 * (see docs/deck-library.md). The copy says which release it came from;
 * the library publishes the deck's releases, their cards keeping the same
 * fragment ids from one release to the next. Comparing the release the
 * copy came from, the newer one and the copy itself tells what the
 * library changed and what the user did: the library's changes are
 * applied only to cards the user has left as the library had them.
 * Review history is kept, but for cards the upgrade removes.
 */
export interface LibraryUpgradePlan {
  /** The release the copy came from, and the one it moves to. */
  fromVersion: string;
  toVersion: string;
  /** URL of the release the copy moves to: its new source. */
  releaseUrl: string;
  /** What changed, release by release, oldest first; releases without notes left out. */
  notes: { version: string; notes: string }[];
  /** Cards the library added. */
  add: LibraryCard[];
  /** Cards the library changed that the user has not. */
  change: LibraryCard[];
  /** Cards the library removed that the user has not changed. */
  remove: Card[];
  /** Cards the library changed or removed that the user has changed too: left as the user has them. */
  kept: Card[];
  /** The library's new study direction, when the copy is still studied the old one. */
  direction?: DeckDirection;
}

function sameContent(a: CardContent, b: CardContent): boolean {
  return (
    a.front === b.front &&
    a.back === b.back &&
    a.frontImageUrl === b.frontImageUrl &&
    a.backImageUrl === b.backImageUrl
  );
}

/**
 * What upgrading the copy to the newer release would do; null — no
 * offer — when the release is not newer, uses a card format this app
 * does not know, or would change nothing.
 */
export function planLibraryUpgrade({
  deck,
  cards,
  from,
  to,
  releases,
}: {
  deck: Deck;
  /** The copy's cards, as the pod holds them. */
  cards: readonly Card[];
  /** The release the copy came from. */
  from: LibraryDeckContent;
  /** The deck's current release. */
  to: LibraryDeckContent;
  /** Every release of the deck, as the index describes them. */
  releases: readonly LibraryRelease[];
}): LibraryUpgradePlan | null {
  if (Number(to.version) <= Number(from.version)) return null;
  if (to.cards.some((card) => card.formatVersion > CARD_FORMAT_VERSION)) return null;
  const before = new Map(from.cards.map((card) => [card.id, card]));
  const after = new Map(to.cards.map((card) => [card.id, card]));
  const copy = new Map(cards.map((card) => [card.id, card]));

  const add = to.cards.filter((card) => !before.has(card.id) && !copy.has(card.id));
  const change: LibraryCard[] = [];
  const remove: Card[] = [];
  const kept: Card[] = [];
  for (const old of from.cards) {
    const mine = copy.get(old.id);
    const next = after.get(old.id);
    if (mine === undefined || (next !== undefined && sameContent(old, next))) continue;
    if (!sameContent(mine, old)) kept.push(mine);
    else if (next === undefined) remove.push(mine);
    else change.push(next);
  }
  const direction =
    to.direction !== from.direction && deck.direction === from.direction ? to.direction : undefined;
  if (add.length + change.length + remove.length === 0 && direction === undefined) return null;
  return {
    fromVersion: from.version,
    toVersion: to.version,
    releaseUrl: to.url,
    notes: releases
      .filter((r) => Number(r.version) > Number(from.version) && Number(r.version) <= Number(to.version))
      .flatMap((r) => (r.notes === undefined ? [] : [{ version: r.version, notes: r.notes }])),
    add,
    change,
    remove,
    kept,
    ...(direction === undefined ? {} : { direction }),
  };
}

/** The deck as the upgrade writes it: from the newer release, in its direction when that changes. */
export function applyLibraryUpgrade(deck: Deck, plan: LibraryUpgradePlan): Deck {
  return {
    ...deck,
    sourceUrl: plan.releaseUrl,
    ...(plan.direction === undefined ? {} : { direction: plan.direction }),
  };
}
