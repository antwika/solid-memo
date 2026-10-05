import type { LibraryDeck } from "./library";

/**
 * Likes and downloads of the deck library's decks (see
 * docs/library-stats.md). A user's like is kept in their own pod; word
 * of it, and of every import, goes to the library's inbox as a notice;
 * the library counts the notices into its statistics, published where
 * its index says. Decks are named by their series URL throughout, which
 * stays the same from release to release.
 */

/** That the user likes a library deck: a subject of the instance's likes document. */
export interface LibraryLike {
  /** The deck liked: its series in the library's index. */
  deckUrl: string;
  /** When (ISO 8601). */
  likedAt: string;
  /** Whether the library's inbox has been told; until it has, the app tries again. */
  announced: boolean;
}

/** What a notice says someone did to a library deck. */
export type LibraryAction = "like" | "unlike" | "import";

/** Word sent to the library's inbox that someone did something to one of its decks. */
export interface LibraryNotice {
  action: LibraryAction;
  /** Who: their WebID. */
  by: string;
  /** The deck: its series in the library's index. */
  deckUrl: string;
  /** When (ISO 8601). */
  at: string;
}

/** How many people like a deck and how many have imported it. */
export interface DeckStats {
  likes: number;
  downloads: number;
}

/** The library's statistics, by deck series; a deck not in them has neither likes nor downloads yet. */
export interface LibraryStats {
  /** When they were counted (ISO 8601); absent when there are none. */
  countedAt?: string;
  decks: Readonly<Record<string, DeckStats>>;
}

/** Statistics when the library publishes none (or they could not be read). */
export const NO_LIBRARY_STATS: LibraryStats = { decks: {} };

const NONE: DeckStats = { likes: 0, downloads: 0 };

/** A deck's statistics; none counted is nought of each. */
export function statsOf(stats: LibraryStats, seriesUrl: string): DeckStats {
  return stats.decks[seriesUrl] ?? NONE;
}

/** The fragment a like of the deck is kept under in the likes document: one like per deck. */
export function likeIdOf(seriesUrl: string): string {
  const name = seriesUrl.slice(seriesUrl.indexOf("#") + 1);
  return `like-${name.replace(/[^A-Za-z0-9._-]/g, "-")}`;
}

/** How the library's decks are listed: as the index lists them, or the most imported or most liked first. */
export type LibrarySort = "library" | "downloads" | "likes";

export const LIBRARY_SORTS: readonly LibrarySort[] = ["library", "downloads", "likes"];

/**
 * The decks in the order asked for; decks counting the same keep the
 * index's order among them.
 */
export function sortLibraryDecks(decks: readonly LibraryDeck[], stats: LibraryStats, sort: LibrarySort): LibraryDeck[] {
  if (sort === "library") return [...decks];
  const count = (deck: LibraryDeck) => statsOf(stats, deck.seriesUrl)[sort];
  return [...decks].sort((a, b) => count(b) - count(a));
}
