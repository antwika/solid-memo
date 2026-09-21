import {
  asUrl,
  getDatetime,
  getStringNoLocale,
  getUrl,
  getUrlAll,
  type Thing,
} from "@inrupt/solid-client";
import type { Card, Deck } from "../../../domain/deck";
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
  return {
    id,
    url,
    name: getStringNoLocale(thing, DCTERMS.title) ?? id,
    cardsDocumentUrl,
    reviewsDocumentUrl,
    createdAt: getDatetime(thing, DCTERMS.created)?.toISOString() ?? "",
  };
}

/**
 * Map a cards-document subject to a Card; null when the subject is not a
 * well-formed sm:Card.
 */
export function toCard(thing: Thing): Card | null {
  if (!getUrlAll(thing, RDF.type).includes(SM.Card)) return null;
  const front = getStringNoLocale(thing, SM.front);
  const back = getStringNoLocale(thing, SM.back);
  if (front === null || back === null) return null;
  const url = asUrl(thing);
  return {
    id: fragmentIdOf(url),
    url,
    front,
    back,
    createdAt: getDatetime(thing, DCTERMS.created)?.toISOString() ?? "",
  };
}
