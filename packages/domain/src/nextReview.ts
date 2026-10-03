import {
  DEFAULT_FSRS_PARAMETERS,
  FSRS_RATINGS,
  intervalFor,
  MAX_DAYS,
  memoryFromSm2,
  nextMemory,
  ratingOfQuality,
  type FsrsMemory,
  type FsrsParameters,
  type FsrsRating,
} from "./fsrs";
import type { StudyPreferences } from "./preferences";
import {
  REVIEW_STATE_FORMAT_VERSION,
  type ReviewKey,
  type ReviewQuality,
  type ReviewState,
} from "./review";
import { nextDueDate, snapshotBeforeReview } from "./scheduling";
import { applySm2, INITIAL_SM2_STATE } from "./sm2";

const DAY_MS = 86_400_000;

/**
 * A prompt's state after one answer (see docs/srs.md). Both algorithms
 * move on every answer: SM-2's ease and repetitions, and FSRS-7's memory
 * — given the exact time since the last answer, minutes or months. The
 * preferences' scheduler alone decides the interval, and with it the due
 * day. A prompt FSRS has not seen yet gets a memory estimated from its
 * SM-2 interval first.
 */
export function nextReviewState(args: {
  key: ReviewKey;
  /** The prompt's state before the answer; null for a new prompt. */
  current: ReviewState | null;
  quality: ReviewQuality;
  now: Date;
  prefs: StudyPreferences;
  /** Uniform [0, 1) source for FSRS's fuzz. */
  random: () => number;
  parameters?: FsrsParameters;
}): ReviewState {
  const { key, current, quality, now, prefs, random, parameters = DEFAULT_FSRS_PARAMETERS } = args;
  const sm2 = applySm2(current ?? INITIAL_SM2_STATE, quality);
  const elapsedDays = current === null ? 0 : Math.max(0, (now.getTime() - Date.parse(current.lastReviewedAt)) / DAY_MS);
  const before = current === null ? null : memoryOf(current, parameters);
  const rating = ratingOfQuality(quality);
  const intervalDays =
    prefs.scheduler === "fsrs"
      ? fsrsIntervalDays({ before, rating, elapsedDays, desiredRetention: prefs.desiredRetention, parameters, random })
      : sm2.intervalDays;
  const previous = snapshotBeforeReview(current, now, prefs.dayBoundaryHour);
  return {
    ...key,
    easeFactor: sm2.easeFactor,
    intervalDays,
    repetitions: sm2.repetitions,
    memory: nextMemory(before, rating, elapsedDays, parameters),
    due: nextDueDate(now, intervalDays, prefs.dayBoundaryHour),
    firstReviewedAt: current?.firstReviewedAt ?? now.toISOString(),
    lastReviewedAt: now.toISOString(),
    formatVersion: REVIEW_STATE_FORMAT_VERSION,
    ...(previous === undefined ? {} : { previous }),
  };
}

/** The state's FSRS memory, or one estimated from its SM-2 interval when it has none yet. */
export function memoryOf(state: ReviewState, parameters: FsrsParameters = DEFAULT_FSRS_PARAMETERS): FsrsMemory {
  return state.memory ?? memoryFromSm2(state.intervalDays, parameters);
}

/**
 * FSRS's next interval in whole study days, at least one: a prompt
 * forgotten today comes back within today's session, not on another day
 * (see requeueCard). Kept as ts-fsrs keeps it: the answer's interval
 * fuzzed, then never shorter than a lower rating's would have been — a
 * day longer, once that is a day or more.
 */
export function fsrsIntervalDays(args: {
  before: FsrsMemory | null;
  rating: FsrsRating;
  elapsedDays: number;
  desiredRetention: number;
  parameters: FsrsParameters;
  random: () => number;
}): number {
  const { before, rating, elapsedDays, desiredRetention, parameters, random } = args;
  const intervalAfter = (r: FsrsRating) => intervalFor(nextMemory(before, r, elapsedDays, parameters), desiredRetention, parameters);
  let scheduled: number | undefined;
  for (const lower of FSRS_RATINGS.filter((r) => r < rating)) {
    const days = intervalAfter(lower);
    if (days >= 1) scheduled = scheduled === undefined ? days : Math.max(days, scheduled + 1);
  }
  const days = fuzzedInterval(intervalAfter(rating), Math.floor(elapsedDays), random);
  if (days >= 1) scheduled = scheduled === undefined ? days : Math.max(days, scheduled + 1);
  return Math.max(1, Math.floor(Math.min(scheduled ?? days, MAX_DAYS)));
}

/**
 * An interval of 2.5 days or more spread at random over a range around
 * it (ts-fsrs's fuzz: ±15% of the part from 2.5 to 7 days, ±10% from 7 to
 * 20, ±5% beyond, plus a day), so prompts learnt together do not stay
 * due together. Never sooner than the day after the time already
 * elapsed. Shorter intervals are only rounded.
 */
export function fuzzedInterval(interval: number, elapsedDays: number, random: () => number): number {
  if (interval < 2.5) return Math.round(interval);
  const { min, max } = fuzzRange(interval, elapsedDays);
  return Math.floor(random() * (max - min + 1) + min);
}

const FUZZ_RANGES = [
  { start: 2.5, end: 7, factor: 0.15 },
  { start: 7, end: 20, factor: 0.1 },
  { start: 20, end: Number.POSITIVE_INFINITY, factor: 0.05 },
];

export function fuzzRange(interval: number, elapsedDays: number): { min: number; max: number } {
  let delta = 1;
  for (const range of FUZZ_RANGES) {
    delta += range.factor * Math.max(Math.min(interval, range.end) - range.start, 0);
  }
  const capped = Math.min(interval, MAX_DAYS);
  let min = Math.max(2, Math.round(capped - delta));
  const max = Math.min(Math.round(capped + delta), MAX_DAYS);
  if (capped > elapsedDays) min = Math.max(min, elapsedDays + 1);
  return { min: Math.min(min, max), max };
}

/**
 * Prompts' due days as FSRS would have set them at their last review: an
 * explicit step after switching to FSRS (or changing the desired
 * retention), since a switch alone leaves every due day as it was. Each
 * state keeps its last review and snapshot; it gains its memory where it
 * had none, and the interval and due day are FSRS's, fuzzed. Only the
 * states that change are returned.
 */
export function rescheduleByFsrs(args: {
  reviews: readonly ReviewState[];
  prefs: StudyPreferences;
  random: () => number;
  parameters?: FsrsParameters;
}): ReviewState[] {
  const { reviews, prefs, random, parameters = DEFAULT_FSRS_PARAMETERS } = args;
  return reviews.flatMap((review) => {
    const memory = memoryOf(review, parameters);
    const raw = intervalFor(memory, prefs.desiredRetention, parameters);
    const intervalDays = Math.max(1, Math.min(fuzzedInterval(raw, 0, random), MAX_DAYS));
    const due = nextDueDate(new Date(review.lastReviewedAt), intervalDays, prefs.dayBoundaryHour);
    if (review.memory !== undefined && review.intervalDays === intervalDays && review.due === due) return [];
    return [{ ...review, memory, intervalDays, due, formatVersion: REVIEW_STATE_FORMAT_VERSION }];
  });
}
