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
 */
export const DECK_FORMAT_VERSION = 1;
export const CARD_FORMAT_VERSION = 2;

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
