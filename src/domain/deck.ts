import { isHttpUrl } from "./webId";

/**
 * Format version written on every deck and card this app creates. A
 * reader that meets a higher version knows the data is newer than it
 * understands; a missing version means the format that predates the
 * field, which is 1.
 *
 * Card format 2 adds pictures: a side of a card may be text, an image
 * (`sm:frontImage` / `sm:backImage`, an IRI) or both, so `sm:front` and
 * `sm:back` are no longer required. A format-1 reader would drop an
 * image-only card as malformed, which is why the version moved (see
 * docs/migrations.md).
 *
 * Deck format 2 adds a study direction (`sm:direction`): a deck may be
 * studied front→back (the only way format 1 knew), back→front, or both
 * ways, each direction with review state of its own. A format-1 reader
 * would study a bidirectional deck one way and mistake the other way's
 * review state for stray subjects, which is why the version moved.
 */
export const DECK_FORMAT_VERSION = 2;
export const CARD_FORMAT_VERSION = 2;

/** Which side of a card a session asks: the other side is the answer. */
export type StudyDirection = "front-to-back" | "back-to-front";

/**
 * How a deck is studied. "bidirectional" makes two prompts of every card,
 * one per direction, scheduled separately: knowing a word one way says
 * nothing about knowing it the other way.
 */
export type DeckDirection = StudyDirection | "bidirectional";

export const DECK_DIRECTIONS: readonly DeckDirection[] = [
  "front-to-back",
  "back-to-front",
  "bidirectional",
];

/** A deck that states no direction is studied front→back, as format 1 did. */
export const DEFAULT_DECK_DIRECTION: DeckDirection = "front-to-back";

export function isDeckDirection(value: string): value is DeckDirection {
  return (DECK_DIRECTIONS as readonly string[]).includes(value);
}

/** The directions a deck is studied in, front→back first. */
export function studyDirections(direction: DeckDirection): StudyDirection[] {
  return direction === "bidirectional"
    ? ["front-to-back", "back-to-front"]
    : [direction];
}

/** One thing a session asks: a card, seen from one side. */
export interface Prompt {
  card: Card;
  direction: StudyDirection;
}

/** Every prompt a deck makes of its cards, card by card. */
export function promptsOf(cards: Card[], direction: DeckDirection): Prompt[] {
  const directions = studyDirections(direction);
  return cards.flatMap((card) =>
    directions.map((direction) => ({ card, direction })),
  );
}

/** One side of a card as shown: its text and picture, and which side it is. */
export interface CardSide {
  side: "front" | "back";
  text: string;
  imageUrl?: string;
}

/** What a prompt asks and what it answers with. */
export function promptSides(prompt: Prompt): {
  question: CardSide;
  answer: CardSide;
} {
  const { card } = prompt;
  const front: CardSide = {
    side: "front",
    text: card.front,
    ...(card.frontImageUrl === undefined ? {} : { imageUrl: card.frontImageUrl }),
  };
  const back: CardSide = {
    side: "back",
    text: card.back,
    ...(card.backImageUrl === undefined ? {} : { imageUrl: card.backImageUrl }),
  };
  return prompt.direction === "front-to-back"
    ? { question: front, answer: back }
    : { question: back, answer: front };
}

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
  /** How the deck is studied; a deck that states none is front→back. */
  direction: DeckDirection;
  /** Who made the deck (names), when stated. Empty for most own decks. */
  authors: string[];
  /** URL of the licence the deck's content is offered under, when stated. */
  license?: string;
  /**
   * A sentence or two about the deck, when stated: what it covers and,
   * for content taken from elsewhere, where it came from.
   */
  description?: string;
  /** URL of the library deck this one was imported from, if it was. */
  sourceUrl?: string;
}

/** What is on a card: its editable content, without identity. */
export interface CardContent {
  /** Text on the front; empty when the front is a picture only. */
  front: string;
  /** Text on the back; empty when the back is a picture only. */
  back: string;
  /** URL of a picture shown on the front, above any text. */
  frontImageUrl?: string;
  /** URL of a picture shown on the back, above any text. */
  backImageUrl?: string;
}

export interface Card extends CardContent {
  /** Fragment id shared between the cards and reviews documents. */
  id: string;
  /** Full subject URL: <cardsDocument>#<id>. */
  url: string;
  /** ISO dateTime. */
  createdAt: string;
  formatVersion: number;
}

/** Outcome of validating card content as entered. */
export type CardContentValidation =
  | { ok: true; content: CardContent }
  | { ok: false; error: string };

/**
 * Validate and normalize card content as entered: text is trimmed, an
 * empty image field is no image, and each side needs text or a picture.
 * A picture must be an http(s) URL — it is shown to whoever studies the
 * card, so nothing else may end up in an `<img>`.
 */
export function validateCardContent(
  input: CardContent,
): CardContentValidation {
  const front = input.front.trim();
  const back = input.back.trim();
  const frontImageUrl = normalizeImageUrl(input.frontImageUrl);
  const backImageUrl = normalizeImageUrl(input.backImageUrl);
  if (frontImageUrl !== undefined && !isHttpUrl(frontImageUrl)) {
    return { ok: false, error: "The front image must be an http(s) URL." };
  }
  if (backImageUrl !== undefined && !isHttpUrl(backImageUrl)) {
    return { ok: false, error: "The back image must be an http(s) URL." };
  }
  if (front === "" && frontImageUrl === undefined) {
    return { ok: false, error: "The front needs text or an image." };
  }
  if (back === "" && backImageUrl === undefined) {
    return { ok: false, error: "The back needs text or an image." };
  }
  return {
    ok: true,
    content: {
      front,
      back,
      ...(frontImageUrl === undefined ? {} : { frontImageUrl }),
      ...(backImageUrl === undefined ? {} : { backImageUrl }),
    },
  };
}

function normalizeImageUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim() ?? "";
  return trimmed === "" ? undefined : trimmed;
}

/**
 * A short name for a card where one is needed (breadcrumbs, confirmation
 * prompts): its front text, else its back text — a picture-only front is
 * best named by its answer — else its id.
 */
export function cardLabel(card: Card): string {
  if (card.front !== "") return card.front;
  if (card.back !== "") return card.back;
  return card.id;
}
