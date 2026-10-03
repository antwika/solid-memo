import { describe, expect, it } from "vitest";
import {
  AGAIN,
  DEFAULT_FSRS_PARAMETERS,
  EASY,
  GOOD,
  HARD,
  initialMemory,
  intervalFor,
  MAX_DAYS,
  memoryFromSm2,
  nextMemory,
} from "./fsrs";
import { fsrsIntervalDays, fuzzedInterval, fuzzRange, memoryOf, nextReviewState, rescheduleByFsrs } from "./nextReview";
import { DEFAULT_PREFERENCES, type StudyPreferences } from "./preferences";
import { REVIEW_STATE_FORMAT_VERSION, type ReviewState } from "./review";

const key = { cardId: "a", direction: "front-to-back" as const };
const sm2: StudyPreferences = DEFAULT_PREFERENCES;
const fsrs: StudyPreferences = { ...DEFAULT_PREFERENCES, scheduler: "fsrs" };
const yesterday = new Date(2026, 8, 20, 12, 0);
const now = new Date(2026, 8, 21, 12, 0);
const middle = () => 0.5;

function reviewed(overrides: Partial<ReviewState> = {}): ReviewState {
  return {
    ...key,
    easeFactor: 2.5,
    intervalDays: 30,
    repetitions: 4,
    due: "2026-09-20",
    firstReviewedAt: "2026-06-01T10:00:00.000Z",
    lastReviewedAt: new Date(now.getTime() - 30 * 86_400_000).toISOString(),
    formatVersion: 2,
    ...overrides,
  };
}

describe("nextReviewState", () => {
  it("introduces a prompt: SM-2's first state, FSRS's first memory, both timestamps now", () => {
    const state = nextReviewState({ key, current: null, quality: 4, now, prefs: sm2, random: middle });
    expect(state).toEqual({
      ...key,
      easeFactor: 2.5,
      intervalDays: 1,
      repetitions: 1,
      memory: initialMemory(GOOD),
      due: "2026-09-22",
      firstReviewedAt: now.toISOString(),
      lastReviewedAt: now.toISOString(),
      formatVersion: REVIEW_STATE_FORMAT_VERSION,
    });
  });

  it("schedules by SM-2 under SM-2, while the FSRS memory moves on as well", () => {
    const current = reviewed({ memory: memoryFromSm2(30) });
    const state = nextReviewState({ key, current, quality: 4, now, prefs: sm2, random: middle });
    expect(state.intervalDays).toBe(75);
    expect(state.memory).toEqual(nextMemory(current.memory!, GOOD, 30));
  });

  it("schedules by FSRS under FSRS, while SM-2's ease and repetitions move on as well", () => {
    const current = reviewed({ memory: memoryFromSm2(30) });
    const state = nextReviewState({ key, current, quality: 4, now, prefs: fsrs, random: middle });
    const days = intervalFor(state.memory!, 0.9);
    expect(Math.abs(state.intervalDays - days)).toBeLessThan(days * 0.06 + 1);
    expect(state.easeFactor).toBe(2.5);
    expect(state.repetitions).toBe(5);
    expect(state.due).toBe(new Date(2026, 8, 21 + state.intervalDays).toLocaleDateString("sv-SE"));
  });

  it("estimates a memory from the SM-2 interval for a prompt FSRS has not seen", () => {
    const current = reviewed();
    const state = nextReviewState({ key, current, quality: 3, now, prefs: fsrs, random: middle });
    expect(state.memory).toEqual(nextMemory(memoryFromSm2(30), HARD, 30));
  });

  it("gives FSRS the exact time since the last answer, ten minutes as well as days", () => {
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60_000).toISOString();
    const current = reviewed({ lastReviewedAt: tenMinutesAgo, memory: initialMemory(GOOD) });
    const state = nextReviewState({ key, current, quality: 1, now, prefs: fsrs, random: middle });
    expect(state.memory!.stability).toBeCloseTo(nextMemory(initialMemory(GOOD), AGAIN, 10 / 1440).stability, 8);
  });

  it("counts a review stamped after now as no time at all", () => {
    const current = reviewed({ lastReviewedAt: new Date(now.getTime() + 60_000).toISOString(), memory: initialMemory(GOOD) });
    const state = nextReviewState({ key, current, quality: 4, now, prefs: fsrs, random: middle });
    expect(state.memory).toEqual(nextMemory(initialMemory(GOOD), GOOD, 0));
  });

  it("schedules for the desired retention: the higher it is, the sooner", () => {
    const current = reviewed({ memory: memoryFromSm2(30) });
    const at = (desiredRetention: number) =>
      nextReviewState({ key, current, quality: 4, now, prefs: { ...fsrs, desiredRetention }, random: middle }).intervalDays;
    expect(at(0.97)).toBeLessThan(at(0.9));
    expect(at(0.9)).toBeLessThan(at(0.7));
  });

  it("snapshots the morning's state, memory included, and keeps the introduction", () => {
    const memory = memoryFromSm2(30);
    const current = reviewed({ lastReviewedAt: yesterday.toISOString(), memory });
    const state = nextReviewState({ key, current, quality: 5, now, prefs: fsrs, random: middle });
    expect(state.previous).toEqual({
      easeFactor: 2.5,
      intervalDays: 30,
      repetitions: 4,
      due: "2026-09-20",
      lastReviewedAt: yesterday.toISOString(),
      memory,
    });
    expect(state.firstReviewedAt).toBe(current.firstReviewedAt);
  });

  it("schedules with the weights it is given", () => {
    const parameters = DEFAULT_FSRS_PARAMETERS.map((w, i) => (i < 4 ? w * 2 : w));
    const state = nextReviewState({ key, current: null, quality: 4, now, prefs: fsrs, random: middle, parameters });
    expect(state.memory).toEqual(initialMemory(GOOD, parameters));
  });
});

describe("memoryOf", () => {
  it("is the state's memory, or one estimated from its SM-2 interval", () => {
    const memory = initialMemory(EASY);
    expect(memoryOf(reviewed({ memory }))).toBe(memory);
    expect(memoryOf(reviewed())).toEqual(memoryFromSm2(30));
  });
});

describe("fsrsIntervalDays", () => {
  const at = (before: Parameters<typeof fsrsIntervalDays>[0]["before"], rating: 1 | 2 | 3 | 4, elapsedDays: number, random = middle) =>
    fsrsIntervalDays({ before, rating, elapsedDays, desiredRetention: 0.9, parameters: DEFAULT_FSRS_PARAMETERS, random });

  it("is at least a day: a prompt forgotten today comes back within the session instead", () => {
    expect(at(null, AGAIN, 0)).toBe(1);
    expect(at(memoryFromSm2(30), AGAIN, 30)).toBe(1);
  });

  it("never schedules a better rating sooner than a worse one", () => {
    for (const [before, elapsed] of [[null, 0], [initialMemory(GOOD), 10 / 1440], [memoryFromSm2(30), 30]] as const) {
      for (const random of [() => 0, () => 0.999999]) {
        const [again, hard, good, easy] = [AGAIN, HARD, GOOD, EASY].map((rating) => at(before, rating, elapsed, random));
        expect(hard).toBeGreaterThanOrEqual(again!);
        expect(good).toBeGreaterThan(hard!);
        expect(easy).toBeGreaterThan(good!);
      }
    }
  });

  it("keeps a rating a day after the lower one, when fuzz would put it on the same day or sooner", () => {
    const hard = intervalFor(nextMemory(memoryFromSm2(30), HARD, 30), 0.9);
    const good = at(memoryFromSm2(30), GOOD, 30, () => 0);
    expect(good).toBeGreaterThanOrEqual(Math.floor(hard + 1));
  });

  it("caps the interval at a hundred years", () => {
    const strong = { stability: MAX_DAYS, stabilityFast: MAX_DAYS, difficulty: 1 };
    expect(at(strong, EASY, MAX_DAYS)).toBeLessThanOrEqual(MAX_DAYS);
  });
});

describe("fuzzedInterval", () => {
  it("only rounds an interval under two and a half days", () => {
    expect(fuzzedInterval(2.4, 0, () => 0.999999)).toBe(2);
    expect(fuzzedInterval(0.3, 0, () => 0.999999)).toBe(0);
  });

  it("spreads a longer one over its range", () => {
    expect(fuzzedInterval(100, 0, () => 0)).toBe(93);
    expect(fuzzedInterval(100, 0, () => 0.999999)).toBe(107);
  });
});

describe("fuzzRange", () => {
  it("widens with the interval", () => {
    expect(fuzzRange(10, 0)).toEqual({ min: 8, max: 12 });
    expect(fuzzRange(100, 0)).toEqual({ min: 93, max: 107 });
  });

  it("never goes below two days, nor before the day after the time already elapsed", () => {
    expect(fuzzRange(2.6, 0)).toEqual({ min: 2, max: 4 });
    expect(fuzzRange(10, 9)).toEqual({ min: 10, max: 12 });
    expect(fuzzRange(10, 20)).toEqual({ min: 8, max: 12 });
  });

  it("stays within a hundred years", () => {
    expect(fuzzRange(MAX_DAYS, 0)).toEqual({ min: MAX_DAYS - 1827, max: MAX_DAYS });
    expect(fuzzRange(MAX_DAYS, MAX_DAYS - 1)).toEqual({ min: MAX_DAYS, max: MAX_DAYS });
  });
});

describe("rescheduleByFsrs", () => {
  it("sets each due day from the last review by FSRS's interval, estimating memory where there is none", () => {
    const [state] = rescheduleByFsrs({ reviews: [reviewed()], prefs: fsrs, random: () => 0 });
    expect(state!.memory).toEqual(memoryFromSm2(30));
    expect(state!.intervalDays).toBe(fuzzRange(intervalFor(memoryFromSm2(30), 0.9), 0).min);
    expect(state!.due).toBe(new Date(2026, 7, 22 + state!.intervalDays).toLocaleDateString("sv-SE"));
    expect(state!.lastReviewedAt).toBe(reviewed().lastReviewedAt);
    expect(state!.formatVersion).toBe(REVIEW_STATE_FORMAT_VERSION);
  });

  it("schedules for the desired retention, at least a day out", () => {
    const weak = reviewed({ memory: initialMemory(AGAIN) });
    const [state] = rescheduleByFsrs({ reviews: [weak], prefs: { ...fsrs, desiredRetention: 0.97 }, random: middle });
    expect(state!.intervalDays).toBe(1);
  });

  it("leaves out a state FSRS would schedule as it is", () => {
    const [moved] = rescheduleByFsrs({ reviews: [reviewed()], prefs: fsrs, random: middle });
    expect(rescheduleByFsrs({ reviews: [moved!], prefs: fsrs, random: middle })).toEqual([]);
    const sameDayOtherInterval = { ...moved!, intervalDays: moved!.intervalDays + 1 };
    expect(rescheduleByFsrs({ reviews: [sameDayOtherInterval], prefs: fsrs, random: middle })).toHaveLength(1);
  });

  it("schedules with the weights it is given", () => {
    const parameters = DEFAULT_FSRS_PARAMETERS.map((w) => w);
    expect(rescheduleByFsrs({ reviews: [reviewed()], prefs: fsrs, random: middle, parameters })).toEqual(
      rescheduleByFsrs({ reviews: [reviewed()], prefs: fsrs, random: middle }),
    );
  });
});
