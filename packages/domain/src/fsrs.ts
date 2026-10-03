import type { ReviewQuality } from "./review";

/**
 * FSRS-7, the Free Spaced Repetition Scheduler's dual-trace model
 * (open-spaced-repetition: fsrs-rs model_v7.rs, ts-fsrs models/fsrs-7).
 * Ported rather than imported, since the domain imports no vendor code
 * (docs/vendor-code.md); test vectors generated with the pinned ts-fsrs
 * hold this port to it (scripts/generateFsrsVectors.ts).
 *
 * A prompt's memory is two traces, a slow and a fast one, and a
 * difficulty; its forgetting curve mixes the two traces. Time is in
 * fractional days: FSRS-7 is meant to be given the exact time between
 * reviews, minutes apart as well as months.
 */

/** FSRS's four ratings: Again, Hard, Good, Easy. */
export type FsrsRating = 1 | 2 | 3 | 4;

export const AGAIN: FsrsRating = 1;
export const HARD: FsrsRating = 2;
export const GOOD: FsrsRating = 3;
export const EASY: FsrsRating = 4;

export const FSRS_RATINGS: readonly FsrsRating[] = [AGAIN, HARD, GOOD, EASY];

/** What FSRS-7 knows of one prompt's memory. */
export interface FsrsMemory {
  /** The slow trace's stability, in days. */
  stability: number;
  /** The fast trace's stability, in days. */
  stabilityFast: number;
  /** How hard the prompt is, 1 to 10. */
  difficulty: number;
}

/** FSRS-7's 34 weights. */
export type FsrsParameters = readonly number[];

/** The weights FSRS-7 schedules with until a person's own are fitted. */
export const DEFAULT_FSRS_PARAMETERS: FsrsParameters = Object.freeze([
  0.1104, 2.2395, 3.9221, 11.7841, 6.1686, 0.6457, 3.6807, 1.9795, 0, 1.3826,
  0.7024, 0.5999, 0.8146, 0.6398, 1, 1.3207, 0.6707, 3.8668, 0.4416, 0.0934,
  1.8631, 0.6162, 1.0869, 0.1567, 0.0801, 0.2421, 0.9464, 0.1433, 0.7145, 0,
  0.5667, 0.3734, 0.5333, 0.3048,
]);

/** The longest interval and the largest stability: a hundred years. */
export const MAX_DAYS = 36500;

const S_MIN = 1e-4;
const D_MIN = 1;
const D_MAX = 10;
const MIN_T = 1 / 86400;
const LOG_MIN_T = Math.log(MIN_T);
const LOG_S_MAX = Math.log(MAX_DAYS);

/**
 * The rating an SM-2 quality stands for. Qualities 0–2 are all lapses in
 * SM-2 and all Again here; 3, the lowest pass, is Hard.
 */
export function ratingOfQuality(quality: ReviewQuality): FsrsRating {
  if (quality <= 2) return AGAIN;
  return (quality - 1) as FsrsRating;
}

/** The memory after a prompt's first answer. */
export function initialMemory(rating: FsrsRating, w: FsrsParameters = DEFAULT_FSRS_PARAMETERS): FsrsMemory {
  const stability = clamp(w[rating - 1], S_MIN, MAX_DAYS);
  return {
    stability: clamp(roundTo8(stability), S_MIN, MAX_DAYS),
    stabilityFast: clamp(roundTo8(stability * 0.8), S_MIN, MAX_DAYS),
    difficulty: clamp(roundTo8(initialDifficulty(rating, w)), D_MIN, D_MAX),
  };
}

/** The probability of recalling the prompt `elapsedDays` after its last review. */
export function retrievability(
  memory: FsrsMemory,
  elapsedDays: number,
  w: FsrsParameters = DEFAULT_FSRS_PARAMETERS,
): number {
  return curveAt(elapsedDays, curveOf(memory, w)).retrievability;
}

/**
 * The memory after an answer given `elapsedDays` after the previous one;
 * `null` for a prompt never answered before.
 */
export function nextMemory(
  memory: FsrsMemory | null,
  rating: FsrsRating,
  elapsedDays: number,
  w: FsrsParameters = DEFAULT_FSRS_PARAMETERS,
): FsrsMemory {
  if (memory === null) return initialMemory(rating, w);
  const s = clamp(memory.stability, S_MIN, MAX_DAYS);
  const sFast = clamp(memory.stabilityFast, S_MIN, MAX_DAYS);
  const d = clamp(memory.difficulty, D_MIN, D_MAX);
  const r = curveAt(elapsedDays, curveOf(memory, w)).retrievability;
  const stability = nextStability(s, d, r, rating, 7, w);
  const fastRecall = traceAt(elapsedDays, fastTraceOf(sFast, w)).recall;
  let stabilityFast = nextStability(sFast, d, fastRecall, rating, 15, w);
  if (rating === AGAIN) stabilityFast = Math.min(stabilityFast, stability * 0.8);
  let deltaD = -w[6] * (rating - 3);
  if (rating === AGAIN) deltaD *= r + 0.1;
  const difficulty = 0.01 * initialDifficulty(EASY, w) + 0.99 * (d + ((10 - d) * deltaD) / 9);
  return {
    stability: clamp(roundTo8(stability), S_MIN, MAX_DAYS),
    stabilityFast: clamp(roundTo8(stabilityFast), S_MIN, MAX_DAYS),
    difficulty: clamp(roundTo8(difficulty), D_MIN, D_MAX),
  };
}

/**
 * The fractional days until the probability of recall falls to
 * `desiredRetention`, which is in (0, 1). The curve has no inverse in
 * closed form: a few Newton steps on log time, then bisection if they
 * did not land within 0.001.
 */
export function intervalFor(
  memory: FsrsMemory,
  desiredRetention: number,
  w: FsrsParameters = DEFAULT_FSRS_PARAMETERS,
): number {
  const target = clamp(desiredRetention, 1e-4, 0.9999);
  if (target >= 0.9999) return 0;
  const s = clamp(memory.stability, S_MIN, MAX_DAYS);
  const sFast = clamp(memory.stabilityFast, S_MIN, MAX_DAYS);
  const maxStability = Math.max(s, sFast);
  const curve = curveOf(memory, w);
  let logT = Math.log(maxStability);
  for (let i = 0; i < 7; i++) {
    logT = clamp(logT, LOG_MIN_T, LOG_S_MAX);
    const t = clamp(Math.exp(logT), MIN_T, MAX_DAYS);
    const { retrievability, derivative } = curveAt(t, curve);
    logT -= clamp((retrievability - target) / Math.min(derivative * t, -1e-12), -4, 4);
  }
  const interval = clamp(Math.exp(logT), 0, MAX_DAYS);
  if (Math.abs(curveAt(interval, curve).retrievability - target) <= 0.001) return interval;
  let low = 0;
  let high = Math.min(Math.max(maxStability, 1), MAX_DAYS);
  while (curveAt(high, curve).retrievability > target && high < MAX_DAYS) {
    high = Math.min(high * 2, MAX_DAYS);
  }
  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    if (curveAt(mid, curve).retrievability > target) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

/**
 * A memory for a prompt SM-2 has scheduled but FSRS has not seen: the one
 * whose curve reaches `sm2Retention` exactly at the SM-2 interval, the
 * fast trace at 0.8 of the slow one and the difficulty neutral (fsrs-rs
 * memory_state_from_sm2 for FSRS-7, which has no use for the ease factor).
 */
export function memoryFromSm2(
  intervalDays: number,
  w: FsrsParameters = DEFAULT_FSRS_PARAMETERS,
  sm2Retention = 0.9,
): FsrsMemory {
  const interval = clamp(intervalDays, S_MIN, MAX_DAYS);
  const stateAt = (logStability: number): FsrsMemory => {
    const stability = clamp(roundTo8(Math.exp(logStability)), S_MIN, MAX_DAYS);
    return { stability, stabilityFast: clamp(roundTo8(stability * 0.8), S_MIN, MAX_DAYS), difficulty: 5 };
  };
  let low = Math.log(S_MIN);
  let high = LOG_S_MAX;
  if (sm2Retention <= retrievability(stateAt(low), interval, w)) return stateAt(low);
  if (sm2Retention >= retrievability(stateAt(high), interval, w)) return stateAt(high);
  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    if (retrievability(stateAt(mid), interval, w) < sm2Retention) low = mid;
    else high = mid;
  }
  return stateAt((low + high) / 2);
}

function initialDifficulty(rating: FsrsRating, w: FsrsParameters): number {
  return w[4] - Math.exp(w[5] * (rating - 1)) + 1;
}

/**
 * One trace's next stability: after a lapse the post-lapse stability
 * (never above the old one), after a pass the old one grown — less on
 * Hard, more on Easy. `start` is where the trace's eight weights begin.
 */
function nextStability(
  s: number,
  d: number,
  r: number,
  rating: FsrsRating,
  start: number,
  w: FsrsParameters,
): number {
  const fail = w[start + 3] * (Math.pow(s + 1, w[start + 4]) - 1) * Math.exp((1 - r) * w[start + 5]);
  const postLapse = Math.min(s, fail);
  if (rating === AGAIN) return postLapse;
  const hardPenalty = rating === HARD ? w[start + 6] : 1;
  const easyBonus = rating === EASY ? w[start + 7] : 1;
  const increase =
    Math.exp(w[start] - 1.5) *
      (11 - d) *
      Math.pow(s, -w[start + 1]) *
      (Math.exp((1 - r) * w[start + 2]) - 1) *
      hardPenalty *
      easyBonus +
    1;
  return Math.max(postLapse, s * increase);
}

interface Trace {
  decay: number;
  scale: number;
}

interface Curve {
  fast: Trace;
  slow: Trace;
  fastWeight: number;
  slowWeight: number;
}

function fastTraceOf(sFast: number, w: FsrsParameters): Trace {
  const decay = -clamp(w[23] * Math.pow(sFast, w[33] - 0.3), 0.01, 0.95);
  return { decay, scale: (Math.exp(Math.min(Math.log(w[25]) / decay, 60)) - 1) / sFast };
}

/** The time-independent parts of a memory's curve, worked out once per curve. */
function curveOf(memory: FsrsMemory, w: FsrsParameters): Curve {
  const s = clamp(memory.stability, S_MIN, MAX_DAYS);
  const sFast = clamp(memory.stabilityFast, S_MIN, MAX_DAYS);
  const d = clamp(memory.difficulty, D_MIN, D_MAX);
  const decay = -clamp(w[24], 0.01, 0.95);
  const scale = ((Math.pow(w[26], 1 / decay) - 1) * Math.exp((d - 5) * (w[32] - 0.3))) / s;
  return {
    fast: fastTraceOf(sFast, w),
    slow: { decay, scale },
    fastWeight: w[27] * Math.pow(sFast, -w[29]),
    slowWeight: w[28] * Math.pow(s, w[30]) * Math.exp((d - 5) * (w[31] - 0.5)),
  };
}

function traceAt(t: number, trace: Trace): { recall: number; derivative: number } {
  const base = 1 + trace.scale * Math.max(t, 0);
  return {
    recall: Math.pow(base, trace.decay),
    derivative: trace.decay * Math.pow(base, trace.decay - 1) * trace.scale,
  };
}

function curveAt(t: number, curve: Curve): { retrievability: number; derivative: number } {
  const fast = traceAt(t, curve.fast);
  const slow = traceAt(t, curve.slow);
  const total = curve.fastWeight + curve.slowWeight;
  return {
    retrievability: ((curve.fastWeight * fast.recall + curve.slowWeight * slow.recall) / total) * 0.99998 + 1e-5,
    derivative: ((curve.fastWeight * fast.derivative + curve.slowWeight * slow.derivative) / total) * 0.99998,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundTo8(value: number): number {
  return Math.round(value * 1e8) / 1e8;
}
