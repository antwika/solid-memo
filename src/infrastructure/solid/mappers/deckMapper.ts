import {
  asUrl,
  getDatetime,
  getInteger,
  getStringNoLocale,
  getStringNoLocaleAll,
  getUrl,
  getUrlAll,
  type Thing,
} from "@inrupt/solid-client";
import type { Card, CardContent, Deck } from "../../../domain/deck";
import { DCTERMS, RDF, SM } from "../vocab";

/** Fragment id of a subject URL, e.g. "deck-1" for ".../catalog.ttl#deck-1". */
export function fragmentIdOf(subjectUrl: string): string {
  return subjectUrl.slice(subjectUrl.indexOf("#") + 1);
}

/**
 * Map a catalog subject to a Deck; null when the subject is not a
 * well-formed sm:Deck (wrong type or missing document links).
 */
export function toDeck(thing: Thing): Deck | null {
  if (!getUrlAll(thing, RDF.type).includes(SM.Deck)) return null;
  const url = asUrl(thing);
  const cardsDocumentUrl = getUrl(thing, SM.cardsDocument);
  const reviewsDocumentUrl = getUrl(thing, SM.reviewsDocument);
  if (cardsDocumentUrl === null || reviewsDocumentUrl === null) return null;
  const id = fragmentIdOf(url);
  const license = getUrl(thing, DCTERMS.license);
  const description = getStringNoLocale(thing, DCTERMS.description);
  const sourceUrl = getUrl(thing, DCTERMS.source);
  return {
    id,
    url,
    name: getStringNoLocale(thing, DCTERMS.title) ?? id,
    cardsDocumentUrl,
    reviewsDocumentUrl,
    createdAt: getDatetime(thing, DCTERMS.created)?.toISOString() ?? "",
    // Data written before the field existed is the first format.
    formatVersion: getInteger(thing, SM.formatVersion) ?? 1,
    authors: getStringNoLocaleAll(thing, DCTERMS.creator),
    ...(license === null ? {} : { license }),
    ...(description === null ? {} : { description }),
    ...(sourceUrl === null ? {} : { sourceUrl }),
  };
}

/**
 * Map a cards-document subject to a Card; null when the subject is not a
 * well-formed sm:Card.
 */
export function toCard(thing: Thing): Card | null {
  if (!getUrlAll(thing, RDF.type).includes(SM.Card)) return null;
  const content = toCardContent(thing);
  if (content === null) return null;
  const url = asUrl(thing);
  return {
    id: fragmentIdOf(url),
    url,
    ...content,
    createdAt: getDatetime(thing, DCTERMS.created)?.toISOString() ?? "",
    // Data written before the field existed is the first format.
    formatVersion: getInteger(thing, SM.formatVersion) ?? 1,
  };
}

/**
 * The content of a card subject; null when a side has neither text nor
 * a picture. A picture is only ever an IRI object: a string literal in
 * its place is not a picture and is ignored.
 */
export function toCardContent(thing: Thing): CardContent | null {
  const front = getStringNoLocale(thing, SM.front) ?? "";
  const back = getStringNoLocale(thing, SM.back) ?? "";
  const frontImageUrl = getUrl(thing, SM.frontImage);
  const backImageUrl = getUrl(thing, SM.backImage);
  if (front === "" && frontImageUrl === null) return null;
  if (back === "" && backImageUrl === null) return null;
  return {
    front,
    back,
    ...(frontImageUrl === null ? {} : { frontImageUrl }),
    ...(backImageUrl === null ? {} : { backImageUrl }),
  };
}
