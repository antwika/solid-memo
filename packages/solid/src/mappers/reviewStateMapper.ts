import { asUrl, type Thing, type ThingPersisted } from "@inrupt/solid-client";
import type { ReviewKey, ReviewState } from "@solid-memo/domain/review";
import {
  reviewFragmentOf,
  reviewKeyOf,
  reviewStateFromRecord,
  reviewStateToRecord,
} from "@solid-memo/domain/reviewRecord";
import { migrate } from "@solid-memo/domain/shapes/migrations";
import { fragmentIdOf } from "@solid-memo/domain/subjectUrl";
import { REVIEW_STATE_V2 } from "@solid-memo/vocab/descriptors.generated";
import { readVersioned, recordThing } from "../records";

/** The subject URL of a card's review state in one direction. */
export function reviewSubjectUrl(reviewsDocumentUrl: string, key: ReviewKey): string {
  return `${reviewsDocumentUrl}#${reviewFragmentOf(key)}`;
}

/**
 * Map a reviews-document subject to a ReviewState; null when the subject
 * is not an sm:ReviewState that fits its format's shape.
 *
 * sm:due is a plain string literal ("YYYY-MM-DD"): a study day is a
 * calendar label, not an instant — xsd:date round-trips risk timezone
 * off-by-one shifts.
 */
export function toReviewState(thing: Thing): ReviewState | null {
  const read = readVersioned(thing, "reviewState");
  if (read === null) return null;
  return reviewStateFromRecord(
    reviewKeyOf(fragmentIdOf(asUrl(thing))),
    read.storedVersion,
    migrate("reviewState", read.record, { subject: asUrl(thing) }),
  );
}

/**
 * The subject of one ReviewState inside its reviews document, written in
 * this app's format onto the existing subject when there is one.
 */
export function toReviewStateThing(
  reviewsDocumentUrl: string,
  state: ReviewState,
  existing: ThingPersisted | null = null,
): ThingPersisted {
  return recordThing(
    reviewSubjectUrl(reviewsDocumentUrl, state),
    REVIEW_STATE_V2,
    reviewStateToRecord(state),
    existing,
  );
}
