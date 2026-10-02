import { shown, tidied, tidiedSideText, type LangText } from "./langText";
import { LATEST_VERSION } from "@solid-memo/vocab/types.generated";
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
 *
 * Deck format 3 makes a deck a DCAT dataset: the direction is a SKOS
 * concept (`sm:studyDirection`), a description is required, creators
 * are foaf:Agent nodes, and topics and keywords may be stated. A
 * format-2 reader would find no `sm:direction` and drop the deck.
 *
 * Card format 3 adds a note under each side (`sm:frontNote`,
 * `sm:backNote`) and a label above the back (`sm:backLabel`), and lets a
 * card be retired (`owl:deprecated true`): a library deck keeps a card it
 * no longer uses rather than removing it, so a copy keeps the card and
 * its review state. A format-2 reader would go on studying a retired
 * card, which is why the version moved.
 */
export const DECK_FORMAT_VERSION: number = LATEST_VERSION.deck;
export const CARD_FORMAT_VERSION: number = LATEST_VERSION.card;

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
  /** The side's text in every language it is in; no language when the side is a picture only. */
  text: LangText;
  imageUrl?: string;
  /** The back's label, on the back whichever way it is studied: how the answer relates to the front. */
  label?: LangText;
  /** The side's note, under its text: shown once the answer is revealed, never while asking. */
  note?: LangText;
}

/**
 * What a prompt asks and what it answers with. Any card content will do,
 * so a library deck's cards can be shown the same way before import.
 */
export function promptSides(prompt: {
  card: CardContent;
  direction: StudyDirection;
}): {
  question: CardSide;
  answer: CardSide;
} {
  const { card } = prompt;
  const front: CardSide = {
    side: "front",
    text: card.front,
    ...(card.frontImageUrl === undefined ? {} : { imageUrl: card.frontImageUrl }),
    ...(card.frontNote === undefined ? {} : { note: card.frontNote }),
  };
  const back: CardSide = {
    side: "back",
    text: card.back,
    ...(card.backImageUrl === undefined ? {} : { imageUrl: card.backImageUrl }),
    ...(card.backLabel === undefined ? {} : { label: card.backLabel }),
    ...(card.backNote === undefined ? {} : { note: card.backNote }),
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
  /**
   * The deck's title, in every language it states it in (one of them
   * English): the app shows the reader's language and edits the English.
   */
  title: LangText;
  cardsDocumentUrl: string;
  reviewsDocumentUrl: string;
  /** ISO dateTime. */
  createdAt: string;
  /** ISO dateTime of the last change to the deck's content, when stated. */
  modifiedAt?: string;
  formatVersion: number;
  /** How the deck is studied; a deck that states none is front→back. */
  direction: DeckDirection;
  /** Who made the deck (names), when stated. Empty for most own decks. */
  authors: string[];
  /** URL of the licence the deck's content is offered under, when stated. */
  license?: string;
  /**
   * A sentence or two about the deck, when stated: what it covers and,
   * for content taken from elsewhere, where it came from. In every
   * language the deck states it in, as the title.
   */
  description?: LangText;
  /** URL of the library release this one was imported from, if it was. */
  sourceUrl?: string;
  /**
   * What the deck is about: dcat:theme concepts, Solid Memo's topics
   * and the EU data themes. Absent when none is stated.
   */
  themes?: string[];
  /** Free-text keywords (dcat:keyword). Absent when none is stated. */
  keywords?: string[];
  /**
   * The deck's own cap on new prompts per study day, in place of the
   * instance's preference; absent means the preference (see deckPace.ts).
   */
  newCardsPerDay?: number;
  /** The deck's own cap on reviews per study day, likewise. */
  maxReviewsPerDay?: number;
}

/** What is on a card: its editable content, without identity. */
export interface CardContent {
  /**
   * Text on the front, in every language it is in (card format 4), or
   * untagged under the empty tag ("") when its language is not known, as
   * for text typed in the app; no language when the front is a picture only.
   */
  front: LangText;
  /** Text on the back, likewise. */
  back: LangText;
  /** URL of a picture shown on the front, above any text. */
  frontImageUrl?: string;
  /**
   * A short note under the front's text ("Out of use"), shown once the
   * answer is revealed, so it never gives it away. In every language it
   * is stated in, one of them English. Card format 3.
   */
  frontNote?: LangText;
  /** URL of a picture shown on the back, above any text. */
  backImageUrl?: string;
  /**
   * A short label above the back's text that says how the answer relates
   * to the front ("Replaced by", "Capital"), shown with the back,
   * smaller: the back's text stays the answer itself. In every language
   * it is stated in, one of them English. Card format 3.
   */
  backLabel?: LangText;
  /**
   * A short note under the back's text ("In version 30, 2026-05-08"),
   * shown once the answer is revealed: the back's text stays the answer
   * itself. In every language it is stated in, one of them English.
   * Card format 3.
   */
  backNote?: LangText;
}

export interface Card extends CardContent {
  /** Fragment id shared between the cards and reviews documents. */
  id: string;
  /** Full subject URL: <cardsDocument>#<id>. */
  url: string;
  /** ISO dateTime. */
  createdAt: string;
  formatVersion: number;
  /**
   * Set when the card is retired (card format 3, owl:deprecated): the
   * library deck it came from no longer uses it. It is kept, with its
   * review state, but not studied, and the Browser hides it unless asked.
   */
  retired?: true;
}

/** The cards in use: all but the retired ones, which are kept but never studied. */
export function activeCards<T extends { retired?: true }>(cards: readonly T[]): T[] {
  return cards.filter((card) => card.retired !== true);
}

/** Outcome of validating card content as entered. */
export type CardContentValidation =
  | { ok: true; content: CardContent }
  | { ok: false; error: string };

/**
 * Validate and normalize card content as entered: text is trimmed, an
 * empty image field is none, a label or note without English text is
 * none, and each side needs text or a picture.
 * A picture must be an http(s) URL — it is shown to whoever studies the
 * card, so nothing else may end up in an `<img>`.
 */
export function validateCardContent(
  input: CardContent,
): CardContentValidation {
  const front = tidiedSideText(input.front);
  const back = tidiedSideText(input.back);
  const frontImageUrl = normalizeImageUrl(input.frontImageUrl);
  const backImageUrl = normalizeImageUrl(input.backImageUrl);
  const frontNote = tidied(input.frontNote);
  const backLabel = tidied(input.backLabel);
  const backNote = tidied(input.backNote);
  if (frontImageUrl !== undefined && !isHttpUrl(frontImageUrl)) {
    return { ok: false, error: "The front image must be an http(s) URL." };
  }
  if (backImageUrl !== undefined && !isHttpUrl(backImageUrl)) {
    return { ok: false, error: "The back image must be an http(s) URL." };
  }
  if (isEmptyText(front) && frontImageUrl === undefined) {
    return { ok: false, error: "The front needs text or an image." };
  }
  if (isEmptyText(back) && backImageUrl === undefined) {
    return { ok: false, error: "The back needs text or an image." };
  }
  return {
    ok: true,
    content: {
      front,
      back,
      ...(frontImageUrl === undefined ? {} : { frontImageUrl }),
      ...(backImageUrl === undefined ? {} : { backImageUrl }),
      ...(frontNote === undefined ? {} : { frontNote }),
      ...(backLabel === undefined ? {} : { backLabel }),
      ...(backNote === undefined ? {} : { backNote }),
    },
  };
}

function normalizeImageUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim() ?? "";
  return trimmed === "" ? undefined : trimmed;
}

/** Whether a side has no text: it is a picture only. */
export function isEmptyText(text: LangText): boolean {
  return Object.keys(text).length === 0;
}

/**
 * A short name for a card where one is needed (breadcrumbs, confirmation
 * prompts): its front text, else its back text — a picture-only front is
 * best named by its answer — else its id; each as `show` shows text
 * (the reader's language, else English).
 */
export function cardLabel(
  card: CardContent & { id: string },
  show: (text: LangText) => string = shown,
): string {
  if (!isEmptyText(card.front)) return show(card.front);
  if (!isEmptyText(card.back)) return show(card.back);
  return card.id;
}
