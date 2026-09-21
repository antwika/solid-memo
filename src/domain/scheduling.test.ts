import { describe, expect, it } from "vitest";
import { buildStudyQueue, nextDueDate, studyDayOf } from "./scheduling";
import type { Card } from "./deck";
import { DEFAULT_PREFERENCES, type StudyPreferences } from "./preferences";
import type { ReviewState } from "./review";

function card(id: string): Card {
  return {
    id,
    url: `https://pod.example/decks/d.ttl#${id}`,
    front: "front",
    back: "back",
    createdAt: "2026-09-01T00:00:00.000Z",
  };
}

function review(
  cardId: string,
  due: string,
  reviewedAt: Date,
  firstReviewedAt: Date = reviewedAt,
): ReviewState {
  return {
    cardId,
    easeFactor: 2.5,
    intervalDays: 1,
    repetitions: 1,
    due,
    firstReviewedAt: firstReviewedAt.toISOString(),
    lastReviewedAt: reviewedAt.toISOString(),
  };
}

const prefs: StudyPreferences = DEFAULT_PREFERENCES;

// Local-time instants around the study-day boundary.
const yesterday = new Date(2026, 8, 20, 12, 0);
const now = new Date(2026, 8, 21, 12, 0);

describe("studyDayOf", () => {
  it("counts 03:59 as the previous day with a boundary of 4", () => {
    expect(studyDayOf(new Date(2026, 8, 21, 3, 59), 4)).toBe("2026-09-20");
  });

  it("counts 04:00 as the same day with a boundary of 4", () => {
    expect(studyDayOf(new Date(2026, 8, 21, 4, 0), 4)).toBe("2026-09-21");
  });

  it("rolls over at midnight with a boundary of 0", () => {
    expect(studyDayOf(new Date(2026, 8, 21, 0, 0), 0)).toBe("2026-09-21");
  });
});

describe("nextDueDate", () => {
  it("adds the interval to the review's study day", () => {
    expect(nextDueDate(new Date(2026, 8, 21, 10, 0), 6, 4)).toBe("2026-09-27");
  });

  it("crosses month boundaries", () => {
    expect(nextDueDate(new Date(2026, 8, 30, 10, 0), 3, 4)).toBe("2026-10-03");
  });

  it("bases the due day on the study day, not the calendar day", () => {
    // 02:00 with boundary 4 belongs to Sep 20, so +1 day is Sep 21.
    expect(nextDueDate(new Date(2026, 8, 21, 2, 0), 1, 4)).toBe("2026-09-21");
  });
});

describe("buildStudyQueue", () => {
  it("separates due cards (oldest due first) from new cards, ignoring future cards", () => {
    const cards = [card("b"), card("a"), card("future"), card("new1"), card("new2")];
    const reviews = [
      review("a", "2026-09-20", yesterday),
      review("b", "2026-09-21", yesterday),
      review("future", "2026-09-22", yesterday),
    ];

    const queue = buildStudyQueue({ cards, reviews, prefs, now });
    expect(queue.due.map((c) => c.id)).toEqual(["a", "b"]);
    expect(queue.newCards.map((c) => c.id)).toEqual(["new1", "new2"]);
  });

  it("keeps a stable order for cards due on the same day", () => {
    const cards = [card("x"), card("y")];
    const reviews = [
      review("x", "2026-09-21", yesterday),
      review("y", "2026-09-21", yesterday),
    ];

    const queue = buildStudyQueue({ cards, reviews, prefs, now });
    expect(queue.due.map((c) => c.id)).toEqual(["x", "y"]);
  });

  it("reduces the review budget by cards already reviewed today", () => {
    const cards = [card("due1"), card("due2"), card("done")];
    const reviews = [
      review("due1", "2026-09-20", yesterday),
      review("due2", "2026-09-21", yesterday),
      // Reviewed earlier today; due moved to the future.
      review("done", "2026-09-25", new Date(2026, 8, 21, 9, 0), yesterday),
    ];

    const queue = buildStudyQueue({
      cards,
      reviews,
      prefs: { ...prefs, maxReviewsPerDay: 2 },
      now,
    });
    expect(queue.due.map((c) => c.id)).toEqual(["due1"]);
  });

  it("clamps the review budget at zero when the cap is already exceeded", () => {
    const cards = [card("due1")];
    const reviews = [
      review("due1", "2026-09-21", yesterday),
      review("done1", "2026-09-25", new Date(2026, 8, 21, 8, 0), yesterday),
      review("done2", "2026-09-25", new Date(2026, 8, 21, 9, 0), yesterday),
    ];

    const queue = buildStudyQueue({
      cards,
      reviews,
      prefs: { ...prefs, maxReviewsPerDay: 1 },
      now,
    });
    expect(queue.due).toEqual([]);
  });

  it("reduces the new-card budget by cards introduced today", () => {
    const cards = [card("new1"), card("new2"), card("introduced")];
    const reviews = [
      // First-ever review happened today.
      review("introduced", "2026-09-22", new Date(2026, 8, 21, 9, 0)),
    ];

    const queue = buildStudyQueue({
      cards,
      reviews,
      prefs: { ...prefs, newCardsPerDay: 2 },
      now,
    });
    expect(queue.newCards.map((c) => c.id)).toEqual(["new1"]);
  });
});
