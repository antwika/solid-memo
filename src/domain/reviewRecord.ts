import type { ReviewKey, ReviewSnapshot, ReviewState } from "./review";
import type { ReviewStateV2 } from "./shapes/generated";

/**
 * Review states between their latest shape record and the model. The
 * direction is not a triple: a state's subject is named after its card,
 * `#<cardId>` for front→back (every state written before directions
 * existed, which is what they were) and `#<cardId>@back-to-front` for
 * the other way.
 */

export const BACK_TO_FRONT_SUFFIX = "@back-to-front";

/** The fragment of a card's review state in one direction. */
export function reviewFragmentOf(key: ReviewKey): string {
  return key.direction === "back-to-front"
    ? `${key.cardId}${BACK_TO_FRONT_SUFFIX}`
    : key.cardId;
}

/** The card and direction a review subject's fragment names. */
export function reviewKeyOf(fragment: string): ReviewKey {
  return fragment.endsWith(BACK_TO_FRONT_SUFFIX)
    ? {
        cardId: fragment.slice(0, -BACK_TO_FRONT_SUFFIX.length),
        direction: "back-to-front",
      }
    : { cardId: fragment, direction: "front-to-back" };
}

/**
 * The state from its record. The snapshot is all or nothing: a partial
 * one could only restore a state that never existed, so it reads as
 * absent.
 */
export function reviewStateFromRecord(
  key: ReviewKey,
  storedVersion: number,
  data: ReviewStateV2,
): ReviewState {
  const previous = snapshotOf(data);
  return {
    ...key,
    easeFactor: data.easeFactor,
    intervalDays: data.intervalDays,
    repetitions: data.repetitions,
    due: data.due,
    firstReviewedAt: data.firstReviewedAt,
    lastReviewedAt: data.lastReviewedAt,
    formatVersion: storedVersion,
    ...(previous === undefined ? {} : { previous }),
  };
}

function snapshotOf(data: ReviewStateV2): ReviewSnapshot | undefined {
  if (
    data.previousEaseFactor === undefined ||
    data.previousIntervalDays === undefined ||
    data.previousRepetitions === undefined ||
    data.previousDue === undefined ||
    data.previousLastReviewedAt === undefined
  ) {
    return undefined;
  }
  return {
    easeFactor: data.previousEaseFactor,
    intervalDays: data.previousIntervalDays,
    repetitions: data.previousRepetitions,
    due: data.previousDue,
    lastReviewedAt: data.previousLastReviewedAt,
  };
}

export function reviewStateToRecord(state: ReviewState): ReviewStateV2 {
  return {
    easeFactor: state.easeFactor,
    intervalDays: state.intervalDays,
    repetitions: state.repetitions,
    due: state.due,
    firstReviewedAt: state.firstReviewedAt,
    lastReviewedAt: state.lastReviewedAt,
    ...(state.previous === undefined
      ? {}
      : {
          previousEaseFactor: state.previous.easeFactor,
          previousIntervalDays: state.previous.intervalDays,
          previousRepetitions: state.previous.repetitions,
          previousDue: state.previous.due,
          previousLastReviewedAt: state.previous.lastReviewedAt,
        }),
  };
}
