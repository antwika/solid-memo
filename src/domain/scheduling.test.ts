import { describe, expect, it } from "vitest";
import {
  buildStudyQueue,
  nextDueDate,
  resetStudyDay,
  snapshotBeforeReview,
  studyDayOf,
} from "./scheduling";
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

describe("buildStudyQueue studiedToday", () => {
  it("counts the cards reviewed during the current study day", () => {
    const queue = buildStudyQueue({
      cards: [card("a"), card("b"), card("c")],
      reviews: [
        review("a", "2026-09-22", now),
        review("b", "2026-09-22", now, yesterday),
        review("c", "2026-09-25", yesterday),
      ],
      prefs,
      now,
    });
    expect(queue.studiedToday).toBe(2);
  });
});

describe("snapshotBeforeReview", () => {
  it("has nothing to snapshot for a card without earlier state", () => {
    expect(snapshotBeforeReview(null, now, 4)).toBeUndefined();
  });

  it("snapshots the state left by an earlier study day", () => {
    const earlier = review("a", "2026-09-21", yesterday);
    expect(snapshotBeforeReview(earlier, now, 4)).toEqual({
      easeFactor: 2.5,
      intervalDays: 1,
      repetitions: 1,
      due: "2026-09-21",
      lastReviewedAt: yesterday.toISOString(),
    });
  });

  it("keeps the morning's snapshot on a second review the same day", () => {
    const morning = {
      easeFactor: 2.36,
      intervalDays: 6,
      repetitions: 2,
      due: "2026-09-21",
      lastReviewedAt: yesterday.toISOString(),
    };
    const reviewedToday = { ...review("a", "2026-09-22", now, yesterday), previous: morning };
    expect(snapshotBeforeReview(reviewedToday, now, 4)).toBe(morning);
  });

  it("carries no snapshot for a card introduced today and reviewed again", () => {
    expect(
      snapshotBeforeReview(review("a", "2026-09-22", now), now, 4),
    ).toBeUndefined();
  });
});

describe("resetStudyDay", () => {
  const morning = {
    easeFactor: 2.36,
    intervalDays: 6,
    repetitions: 2,
    due: "2026-09-21",
    lastReviewedAt: yesterday.toISOString(),
  };

  it("leaves cards that were not reviewed today alone", () => {
    expect(
      resetStudyDay([review("a", "2026-09-25", yesterday)], now, 4),
    ).toEqual({ restore: [], removeCardIds: [] });
  });

  it("makes a card introduced today new again", () => {
    expect(resetStudyDay([review("a", "2026-09-22", now)], now, 4)).toEqual({
      restore: [],
      removeCardIds: ["a"],
    });
  });

  it("restores a card reviewed today to its morning state", () => {
    const reviewed = {
      ...review("a", "2026-09-27", now, yesterday),
      easeFactor: 2.6,
      intervalDays: 15,
      repetitions: 3,
      previous: morning,
    };
    const { restore, removeCardIds } = resetStudyDay([reviewed], now, 4);
    expect(removeCardIds).toEqual([]);
    expect(restore).toEqual([
      {
        cardId: "a",
        ...morning,
        firstReviewedAt: yesterday.toISOString(),
      },
    ]);
    // The snapshot is spent: nothing left to restore twice.
    expect(restore[0]).not.toHaveProperty("previous");
  });

  it("makes a card without a snapshot due today, as the best it can do", () => {
    const legacy = review("a", "2026-09-27", now, yesterday);
    expect(resetStudyDay([legacy], now, 4).restore).toEqual([
      { ...legacy, due: "2026-09-21" },
    ]);
  });

  it("frees the day's budget: a reset card is due and counted unstudied again", () => {
    const reviewed = {
      ...review("a", "2026-09-27", now, yesterday),
      previous: morning,
    };
    const { restore } = resetStudyDay([reviewed], now, 4);
    const queue = buildStudyQueue({
      cards: [card("a")],
      reviews: restore,
      prefs: { ...prefs, maxReviewsPerDay: 1 },
      now,
    });
    expect(queue.due.map((c) => c.id)).toEqual(["a"]);
    expect(queue.studiedToday).toBe(0);
  });

  it("respects the day boundary: 03:00 still belongs to the previous day", () => {
    const lateNight = new Date(2026, 8, 21, 3, 0);
    expect(
      resetStudyDay([review("a", "2026-09-22", lateNight)], now, 4),
    ).toEqual({ restore: [], removeCardIds: [] });
  });
});
