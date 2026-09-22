/**
 * Format version written on every deck and card this app creates. A
 * reader that meets a higher version knows the data is newer than it
 * understands; a missing version means the format that predates the
 * field, which is 1.
 */
export const DECK_FORMAT_VERSION = 1;
export const CARD_FORMAT_VERSION = 1;

export interface Deck {
  /** Fragment id inside the catalog document (e.g. "deck-<uuid>"). */
  id: string;
  /** Full subject URL: <catalog.ttl>#<id>. The deck's identity. */
  url: string;
  name: string;
  cardsDocumentUrl: string;
  reviewsDocumentUrl: string;
  /** ISO dateTime. */
  createdAt: string;
  formatVersion: number;
  /** Who made the deck (names), when stated. Empty for most own decks. */
  authors: string[];
  /** URL of the licence the deck's content is offered under, when stated. */
  license?: string;
  /** URL of the library deck this one was imported from, if it was. */
  sourceUrl?: string;
}

export interface Card {
  /** Fragment id shared between the cards and reviews documents. */
  id: string;
  /** Full subject URL: <cardsDocument>#<id>. */
  url: string;
  front: string;
  back: string;
  /** ISO dateTime. */
  createdAt: string;
  formatVersion: number;
}
