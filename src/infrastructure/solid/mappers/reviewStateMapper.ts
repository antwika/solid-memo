import {
  asUrl,
  buildThing,
  createThing,
  getDatetime,
  getDecimal,
  getInteger,
  getStringNoLocale,
  getUrlAll,
  type Thing,
} from "@inrupt/solid-client";
import type { ReviewState } from "../../../domain/review";
import { RDF, SM } from "../vocab";
import { fragmentIdOf } from "./deckMapper";

/**
 * Map a reviews-document subject to a ReviewState; null when the subject
 * is not a well-formed sm:ReviewState.
 *
 * sm:due is a plain string literal ("YYYY-MM-DD"): a study day is a
 * calendar label, not an instant — xsd:date round-trips risk timezone
 * off-by-one shifts.
 */
export function toReviewState(thing: Thing): ReviewState | null {
  if (!getUrlAll(thing, RDF.type).includes(SM.ReviewState)) return null;
  const easeFactor = getDecimal(thing, SM.easeFactor);
  const intervalDays = getInteger(thing, SM.intervalDays);
  const repetitions = getInteger(thing, SM.repetitions);
  const due = getStringNoLocale(thing, SM.due);
  const firstReviewedAt = getDatetime(thing, SM.firstReviewedAt);
  const lastReviewedAt = getDatetime(thing, SM.lastReviewedAt);
  if (
    easeFactor === null ||
    intervalDays === null ||
    repetitions === null ||
    due === null ||
    firstReviewedAt === null ||
    lastReviewedAt === null
  ) {
    return null;
  }
  return {
    cardId: fragmentIdOf(asUrl(thing)),
    easeFactor,
    intervalDays,
    repetitions,
    due,
    firstReviewedAt: firstReviewedAt.toISOString(),
    lastReviewedAt: lastReviewedAt.toISOString(),
  };
}

/** Build the subject for one ReviewState inside its reviews document. */
export function toReviewStateThing(
  reviewsDocumentUrl: string,
  state: ReviewState,
): Thing {
  return buildThing(
    createThing({ url: `${reviewsDocumentUrl}#${state.cardId}` }),
  )
    .addIri(RDF.type, SM.ReviewState)
    .addDecimal(SM.easeFactor, state.easeFactor)
    .addInteger(SM.intervalDays, state.intervalDays)
    .addInteger(SM.repetitions, state.repetitions)
    .addStringNoLocale(SM.due, state.due)
    .addDatetime(SM.firstReviewedAt, new Date(state.firstReviewedAt))
    .addDatetime(SM.lastReviewedAt, new Date(state.lastReviewedAt))
    .build();
}
