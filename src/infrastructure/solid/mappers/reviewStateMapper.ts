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
import type {
  ReviewKey,
  ReviewSnapshot,
  ReviewState,
} from "../../../domain/review";
import { RDF, SM } from "../vocab";
import { fragmentIdOf } from "./deckMapper";

/**
 * A review state's subject is named after its card: `#<cardId>` for the
 * front→back direction — every state written before directions existed,
 * which is what they were — and `#<cardId>@back-to-front` for the other.
 * The join with the card stays on the fragment id.
 */
const BACK_TO_FRONT_SUFFIX = "@back-to-front";

/** The subject URL of a card's review state in one direction. */
export function reviewSubjectUrl(
  reviewsDocumentUrl: string,
  key: ReviewKey,
): string {
  const suffix = key.direction === "back-to-front" ? BACK_TO_FRONT_SUFFIX : "";
  return `${reviewsDocumentUrl}#${key.cardId}${suffix}`;
}

/** The card and direction a review subject's URL names. */
function toReviewKey(subjectUrl: string): ReviewKey {
  const fragment = fragmentIdOf(subjectUrl);
  return fragment.endsWith(BACK_TO_FRONT_SUFFIX)
    ? {
        cardId: fragment.slice(0, -BACK_TO_FRONT_SUFFIX.length),
        direction: "back-to-front",
      }
    : { cardId: fragment, direction: "front-to-back" };
}

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
  const previous = toSnapshot(thing);
  return {
    ...toReviewKey(asUrl(thing)),
    easeFactor,
    intervalDays,
    repetitions,
    due,
    firstReviewedAt: firstReviewedAt.toISOString(),
    lastReviewedAt: lastReviewedAt.toISOString(),
    ...(previous === null ? {} : { previous }),
  };
}

/**
 * The sm:previous* snapshot, all or nothing: a partial snapshot could only
 * restore a state that never existed, so it reads as absent.
 */
function toSnapshot(thing: Thing): ReviewSnapshot | null {
  const easeFactor = getDecimal(thing, SM.previousEaseFactor);
  const intervalDays = getInteger(thing, SM.previousIntervalDays);
  const repetitions = getInteger(thing, SM.previousRepetitions);
  const due = getStringNoLocale(thing, SM.previousDue);
  const lastReviewedAt = getDatetime(thing, SM.previousLastReviewedAt);
  if (
    easeFactor === null ||
    intervalDays === null ||
    repetitions === null ||
    due === null ||
    lastReviewedAt === null
  ) {
    return null;
  }
  return {
    easeFactor,
    intervalDays,
    repetitions,
    due,
    lastReviewedAt: lastReviewedAt.toISOString(),
  };
}

/** Build the subject for one ReviewState inside its reviews document. */
export function toReviewStateThing(
  reviewsDocumentUrl: string,
  state: ReviewState,
): Thing {
  const thing = buildThing(
    createThing({ url: reviewSubjectUrl(reviewsDocumentUrl, state) }),
  )
    .addIri(RDF.type, SM.ReviewState)
    .addDecimal(SM.easeFactor, state.easeFactor)
    .addInteger(SM.intervalDays, state.intervalDays)
    .addInteger(SM.repetitions, state.repetitions)
    .addStringNoLocale(SM.due, state.due)
    .addDatetime(SM.firstReviewedAt, new Date(state.firstReviewedAt))
    .addDatetime(SM.lastReviewedAt, new Date(state.lastReviewedAt));
  if (state.previous === undefined) return thing.build();
  return thing
    .addDecimal(SM.previousEaseFactor, state.previous.easeFactor)
    .addInteger(SM.previousIntervalDays, state.previous.intervalDays)
    .addInteger(SM.previousRepetitions, state.previous.repetitions)
    .addStringNoLocale(SM.previousDue, state.previous.due)
    .addDatetime(
      SM.previousLastReviewedAt,
      new Date(state.previous.lastReviewedAt),
    )
    .build();
}
