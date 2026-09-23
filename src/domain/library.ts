import type { CardContent } from "./deck";

/**
 * A ready-made deck the app offers for import, as the deck library's
 * index lists it. The library is read-only; importing copies a deck into
 * the user's own instance, where it becomes an ordinary Deck.
 */
export interface LibraryDeck {
  /** URL of the deck document. The deck's identity in the library. */
  url: string;
  name: string;
  cardCount: number;
  authors: string[];
  license?: string;
  description?: string;
  /** When the deck was made (ISO 8601), when it says. */
  createdAt?: string;
  /** Where its content came from, as the deck states. */
  sources: LibrarySource[];
}

/**
 * A resource a library deck was compiled from, with what the deck says
 * about it. The authors and licence are the source's own, not the
 * deck's: a CC0 deck may well be compiled from a CC BY-SA page.
 */
export interface LibrarySource {
  url: string;
  title?: string;
  authors: string[];
  license?: string;
}

/** A library deck's full content, fetched when it is imported. */
export interface LibraryDeckContent {
  url: string;
  name: string;
  formatVersion: number;
  authors: string[];
  license?: string;
  description?: string;
  cards: LibraryCard[];
}

export interface LibraryCard extends CardContent {
  /** Fragment id in the library document; kept as the card's id on import. */
  id: string;
  formatVersion: number;
}
