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
  ratingOfQuality,
  retrievability,
  type FsrsMemory,
} from "./fsrs";
import { FSRS_VECTOR_PARAMETERS, FSRS_VECTOR_RETENTIONS, FSRS_VECTORS } from "./testing/fsrsVectors";

/** Within `digits` significant digits of the vector, however large the value. */
function expectNear(actual: number, expected: number, digits = 9) {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(Math.max(Math.abs(expected), 1) * 10 ** -digits);
}

describe("the FSRS-7 port", () => {
  it("matches ts-fsrs on every vector: memory, retrievability and intervals", () => {
    expect(FSRS_VECTOR_PARAMETERS[0]).toEqual(DEFAULT_FSRS_PARAMETERS);
    for (const sequence of FSRS_VECTORS) {
      const w = FSRS_VECTOR_PARAMETERS[sequence.parameters];
      let memory: FsrsMemory | null = null;
      for (const step of sequence.steps) {
        if (memory !== null) expectNear(retrievability(memory, step.elapsedDays, w), step.retrievability!);
        memory = nextMemory(memory, step.rating, step.elapsedDays, w);
        expectNear(memory.stability, step.memory.stability);
        expectNear(memory.stabilityFast, step.memory.stabilityFast);
        expectNear(memory.difficulty, step.memory.difficulty);
        FSRS_VECTOR_RETENTIONS.forEach((retention, i) => {
          expectNear(intervalFor(memory!, retention, w), step.intervals[i], 6);
        });
      }
    }
  });

  it("uses the default weights unless given others", () => {
    const memory = initialMemory(GOOD);
    expect(memory).toEqual(nextMemory(null, GOOD, 0, DEFAULT_FSRS_PARAMETERS));
    expect(retrievability(memory, 3)).toBe(retrievability(memory, 3, DEFAULT_FSRS_PARAMETERS));
    expect(intervalFor(memory, 0.9)).toBe(intervalFor(memory, 0.9, DEFAULT_FSRS_PARAMETERS));
    expect(nextMemory(memory, HARD, 2)).toEqual(nextMemory(memory, HARD, 2, DEFAULT_FSRS_PARAMETERS));
  });

  it("orders a new prompt's first memories by rating", () => {
    const [again, hard, good, easy] = [AGAIN, HARD, GOOD, EASY].map((rating) => initialMemory(rating));
    expect(again.stability).toBeLessThan(hard.stability);
    expect(hard.stability).toBeLessThan(good.stability);
    expect(good.stability).toBeLessThan(easy.stability);
    expect(again.difficulty).toBeGreaterThan(easy.difficulty);
    expect(good.stabilityFast).toBeCloseTo(good.stability * 0.8, 8);
  });

  it("finds no interval for a retention of 0.9999 or more", () => {
    expect(intervalFor(initialMemory(GOOD), 0.9999)).toBe(0);
    expect(intervalFor(initialMemory(GOOD), 1)).toBe(0);
  });

  it("falls back to bisection where the Newton steps do not land, up to a hundred years", () => {
    const memory = { stability: MAX_DAYS, stabilityFast: 1e-4, difficulty: 10 };
    expect(retrievability(memory, MAX_DAYS)).toBeGreaterThan(0.5);
    expect(intervalFor(memory, 0.5)).toBeCloseTo(MAX_DAYS, 6);
    const fastHeavy = { stability: 1e-4, stabilityFast: MAX_DAYS, difficulty: 1 };
    expect(retrievability(fastHeavy, intervalFor(fastHeavy, 0.5))).toBeCloseTo(0.5, 6);
  });
});

describe("ratingOfQuality", () => {
  it("makes every SM-2 lapse Again and the passes Hard, Good and Easy", () => {
    expect([0, 1, 2, 3, 4, 5].map((q) => ratingOfQuality(q as 0))).toEqual([AGAIN, AGAIN, AGAIN, HARD, GOOD, EASY]);
  });
});

describe("memoryFromSm2", () => {
  it("is the memory whose recall falls to 90% at the SM-2 interval", () => {
    for (const interval of [1, 6, 15, 100, 1000]) {
      const memory = memoryFromSm2(interval);
      expect(retrievability(memory, interval)).toBeCloseTo(0.9, 5);
      expect(memory.stabilityFast).toBeCloseTo(memory.stability * 0.8, 8);
      expect(memory.difficulty).toBe(5);
    }
  });

  it("takes another retention and other weights", () => {
    const memory = memoryFromSm2(20, DEFAULT_FSRS_PARAMETERS, 0.8);
    expect(retrievability(memory, 20)).toBeCloseTo(0.8, 5);
  });

  it("stops at the stability bounds when no memory within them reaches the retention", () => {
    expect(memoryFromSm2(1, DEFAULT_FSRS_PARAMETERS, 1e-6).stability).toBeCloseTo(1e-4, 12);
    expect(memoryFromSm2(MAX_DAYS, DEFAULT_FSRS_PARAMETERS, 0.99999).stability).toBeCloseTo(MAX_DAYS, 6);
  });
});
