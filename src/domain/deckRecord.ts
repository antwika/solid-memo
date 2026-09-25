import type { Card, CardContent, Deck } from "./deck";
import type { LibraryCard, LibraryDeckContent } from "./library";
import type { CardV2, DeckV2, LibraryDeckV2 } from "./shapes/generated";
import { fragmentIdOf } from "./subjectUrl";

/**
 * Decks and cards between their latest shape records and the domain
 * models (see docs/shapes.md). Reading takes the version the pod stored,
 * which the model keeps for the migration plan; writing always produces
 * the latest record.
 */

export function deckFromRecord(url: string, storedVersion: number, data: DeckV2): Deck {
  return {
    id: fragmentIdOf(url),
    url,
    name: data.title,
    cardsDocumentUrl: data.cardsDocument,
    reviewsDocumentUrl: data.reviewsDocument,
    createdAt: data.created ?? "",
    formatVersion: storedVersion,
    direction: data.direction,
    authors: [...data.creator],
    ...(data.license === undefined ? {} : { license: data.license }),
    ...(data.description === undefined ? {} : { description: data.description }),
    ...(data.source === undefined ? {} : { sourceUrl: data.source }),
  };
}

export function deckToRecord(deck: Deck): DeckV2 {
  return {
    title: deck.name,
    ...(deck.createdAt === "" ? {} : { created: deck.createdAt }),
    creator: deck.authors,
    ...(deck.license === undefined ? {} : { license: deck.license }),
    ...(deck.description === undefined ? {} : { description: deck.description }),
    direction: deck.direction,
    cardsDocument: deck.cardsDocumentUrl,
    reviewsDocument: deck.reviewsDocumentUrl,
    ...(deck.sourceUrl === undefined ? {} : { source: deck.sourceUrl }),
  };
}

/**
 * The content of a card record; null when a side has neither text nor a
 * picture — the one rule of the card shape a record cannot carry.
 */
export function cardContentFromRecord(data: CardV2): CardContent | null {
  const front = data.front ?? "";
  const back = data.back ?? "";
  if (front === "" && data.frontImage === undefined) return null;
  if (back === "" && data.backImage === undefined) return null;
  return {
    front,
    back,
    ...(data.frontImage === undefined ? {} : { frontImageUrl: data.frontImage }),
    ...(data.backImage === undefined ? {} : { backImageUrl: data.backImage }),
  };
}

export function cardFromRecord(url: string, storedVersion: number, data: CardV2): Card | null {
  const content = cardContentFromRecord(data);
  if (content === null) return null;
  return {
    id: fragmentIdOf(url),
    url,
    ...content,
    createdAt: data.created ?? "",
    formatVersion: storedVersion,
  };
}

/** Empty text and a missing picture leave their fields out. */
export function cardToRecord(content: CardContent, createdAt: string): CardV2 {
  return {
    ...(content.front === "" ? {} : { front: content.front }),
    ...(content.back === "" ? {} : { back: content.back }),
    ...(content.frontImageUrl === undefined ? {} : { frontImage: content.frontImageUrl }),
    ...(content.backImageUrl === undefined ? {} : { backImage: content.backImageUrl }),
    ...(createdAt === "" ? {} : { created: createdAt }),
  };
}

export function libraryDeckFromRecord(
  url: string,
  storedVersion: number,
  data: LibraryDeckV2,
  cards: LibraryCard[],
): LibraryDeckContent {
  return {
    url,
    name: data.title,
    formatVersion: storedVersion,
    authors: [...data.creator],
    ...(data.license === undefined ? {} : { license: data.license }),
    ...(data.description === undefined ? {} : { description: data.description }),
    direction: data.direction,
    cards,
  };
}
