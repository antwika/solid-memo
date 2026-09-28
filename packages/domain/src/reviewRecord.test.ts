import { describe, expect, it } from "vitest";
import type { ReviewState } from "./review";
import {
  reviewFragmentOf,
  reviewKeyOf,
  reviewStateFromRecord,
  reviewStateToRecord,
} from "./reviewRecord";

const key = { cardId: "card-1", direction: "front-to-back" as const };
const state: ReviewState = {
  ...key,
  easeFactor: 2.36,
  intervalDays: 6,
  repetitions: 2,
  due: "2026-09-27",
  firstReviewedAt: "2026-09-15T08:00:00.000Z",
  lastReviewedAt: "2026-09-21T08:12:00.000Z",
  formatVersion: 2,
};
const snapshot = {
  easeFactor: 2.5,
  intervalDays: 1,
  repetitions: 1,
  due: "2026-09-21",
  lastReviewedAt: "2026-09-20T08:00:00.000Z",
};

describe("review subjects", () => {
  it("name the direction in the fragment", () => {
    expect(reviewFragmentOf(key)).toBe("card-1");
    expect(reviewFragmentOf({ cardId: "card-1", direction: "back-to-front" })).toBe(
      "card-1@back-to-front",
    );
    expect(reviewKeyOf("card-1")).toEqual(key);
    expect(reviewKeyOf("card-1@back-to-front")).toEqual({
      cardId: "card-1",
      direction: "back-to-front",
    });
  });
});

describe("review state records", () => {
  it("round-trip a state without a snapshot", () => {
    const record = reviewStateToRecord(state);
    expect(record).toEqual({
      easeFactor: 2.36,
      intervalDays: 6,
      repetitions: 2,
      due: "2026-09-27",
      firstReviewedAt: state.firstReviewedAt,
      lastReviewedAt: state.lastReviewedAt,
    });
    expect(reviewStateFromRecord(key, 2, record)).toEqual(state);
  });

  it("round-trip the snapshot, keeping the stored version", () => {
    const withSnapshot = { ...state, previous: snapshot, formatVersion: 1 };
    const record = reviewStateToRecord(withSnapshot);
    expect(record).toMatchObject({
      previousEaseFactor: 2.5,
      previousIntervalDays: 1,
      previousRepetitions: 1,
      previousDue: "2026-09-21",
      previousLastReviewedAt: snapshot.lastReviewedAt,
    });
    expect(reviewStateFromRecord(key, 1, record)).toEqual(withSnapshot);
  });

  it.each([
    "previousEaseFactor",
    "previousIntervalDays",
    "previousRepetitions",
    "previousDue",
    "previousLastReviewedAt",
  ])("read a snapshot missing %s as no snapshot", (field) => {
    const record = { ...reviewStateToRecord({ ...state, previous: snapshot }) };
    delete (record as Record<string, unknown>)[field];
    expect(reviewStateFromRecord(key, 2, record)).toEqual(state);
  });
});
