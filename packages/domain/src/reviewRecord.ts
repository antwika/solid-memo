import type { FsrsMemory } from "./fsrs";
import type { ReviewKey, ReviewSnapshot, ReviewState } from "./review";
import type { ReviewStateV3 } from "@solid-memo/vocab/types.generated";

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
 * The state from its record. The snapshot and the FSRS memory are each
 * all or nothing: a partial one could only restore or continue a state
 * that never existed, so it reads as absent.
 */
export function reviewStateFromRecord(
  key: ReviewKey,
  storedVersion: number,
  data: ReviewStateV3,
): ReviewState {
  const previous = snapshotOf(data);
  const memory = memoryOf(data.stability, data.stabilityFast, data.difficulty);
  return {
    ...key,
    easeFactor: data.easeFactor,
    intervalDays: data.intervalDays,
    repetitions: data.repetitions,
    ...(memory === undefined ? {} : { memory }),
    due: data.due,
    firstReviewedAt: data.firstReviewedAt,
    lastReviewedAt: data.lastReviewedAt,
    formatVersion: storedVersion,
    ...(previous === undefined ? {} : { previous }),
  };
}

function memoryOf(
  stability: number | undefined,
  stabilityFast: number | undefined,
  difficulty: number | undefined,
): FsrsMemory | undefined {
  return stability === undefined || stabilityFast === undefined || difficulty === undefined
    ? undefined
    : { stability, stabilityFast, difficulty };
}

function snapshotOf(data: ReviewStateV3): ReviewSnapshot | undefined {
  if (
    data.previousEaseFactor === undefined ||
    data.previousIntervalDays === undefined ||
    data.previousRepetitions === undefined ||
    data.previousDue === undefined ||
    data.previousLastReviewedAt === undefined
  ) {
    return undefined;
  }
  const memory = memoryOf(data.previousStability, data.previousStabilityFast, data.previousDifficulty);
  return {
    easeFactor: data.previousEaseFactor,
    intervalDays: data.previousIntervalDays,
    repetitions: data.previousRepetitions,
    due: data.previousDue,
    lastReviewedAt: data.previousLastReviewedAt,
    ...(memory === undefined ? {} : { memory }),
  };
}

export function reviewStateToRecord(state: ReviewState): ReviewStateV3 {
  return {
    easeFactor: state.easeFactor,
    intervalDays: state.intervalDays,
    repetitions: state.repetitions,
    due: state.due,
    firstReviewedAt: state.firstReviewedAt,
    lastReviewedAt: state.lastReviewedAt,
    ...(state.memory === undefined
      ? {}
      : {
          stability: state.memory.stability,
          stabilityFast: state.memory.stabilityFast,
          difficulty: state.memory.difficulty,
        }),
    ...(state.previous === undefined
      ? {}
      : {
          previousEaseFactor: state.previous.easeFactor,
          previousIntervalDays: state.previous.intervalDays,
          previousRepetitions: state.previous.repetitions,
          previousDue: state.previous.due,
          previousLastReviewedAt: state.previous.lastReviewedAt,
        }),
    ...(state.previous?.memory === undefined
      ? {}
      : {
          previousStability: state.previous.memory.stability,
          previousStabilityFast: state.previous.memory.stabilityFast,
          previousDifficulty: state.previous.memory.difficulty,
        }),
  };
}
