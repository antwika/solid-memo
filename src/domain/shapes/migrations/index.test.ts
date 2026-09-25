import { describe, expect, it } from "vitest";
import { DEFAULT_PREFERENCES } from "../../preferences";
import { LATEST_VERSION, type ShapeName } from "../generated";
import { MIGRATIONS, migrate, stepFor } from "./index";

const SHAPES = Object.keys(LATEST_VERSION) as ShapeName[];

describe("the migration chain", () => {
  it("has exactly one step between every pair of consecutive versions, and none beyond", () => {
    for (const shape of SHAPES) {
      const steps = MIGRATIONS.filter((step) => step.shape === shape);
      expect(steps.map((step) => [step.from, step.to]), shape).toEqual(
        Array.from({ length: LATEST_VERSION[shape] - 1 }, (_, i) => [i + 1, i + 2]),
      );
    }
    expect(MIGRATIONS.every((step) => SHAPES.includes(step.shape))).toBe(true);
  });

  it("never mutates its input", () => {
    for (const step of MIGRATIONS) {
      const input = Object.freeze({ front: "a", back: "b", title: "t", creator: [], easeFactor: 1 });
      expect(() => step.up(input)).not.toThrow();
    }
  });

  it("names a gap in the chain", () => {
    expect(() => stepFor("instance", 1)).toThrow("No migration from instance format 1.");
  });
});

describe("migrate", () => {
  it("returns a latest record untouched", () => {
    const data = { front: "Sweden", back: "Stockholm" };
    expect(migrate("card", { version: 2, data })).toBe(data);
  });

  it("walks a record up to the latest version", () => {
    expect(migrate("card", { version: 1, data: { front: "Sweden", back: "Stockholm" } })).toEqual({
      front: "Sweden",
      back: "Stockholm",
    });
    const deck = { title: "Own", creator: [], cardsDocument: "d", reviewsDocument: "r" };
    expect(migrate("deck", { version: 1, data: deck })).toEqual({ ...deck, direction: "front-to-back" });
    expect(migrate("libraryDeck", { version: 1, data: { title: "L", creator: [], source: [] } })).toEqual({
      title: "L",
      creator: [],
      source: [],
      direction: "front-to-back",
    });
    const review = {
      easeFactor: 2.5,
      intervalDays: 1,
      repetitions: 1,
      due: "2026-09-22",
      firstReviewedAt: "2026-09-21T10:00:00.000Z",
      lastReviewedAt: "2026-09-21T10:00:00.000Z",
    };
    expect(migrate("reviewState", { version: 1, data: review })).toEqual(review);
    const snapshot = {
      previousEaseFactor: 2.4,
      previousIntervalDays: 1,
      previousRepetitions: 1,
      previousDue: "2026-09-21",
      previousLastReviewedAt: "2026-09-20T10:00:00.000Z",
    };
    expect(migrate("reviewState", { version: 1, data: { ...review, ...snapshot } })).toEqual({
      ...review,
      ...snapshot,
    });
    expect(
      migrate("reviewState", { version: 1, data: { ...review, previousDue: "2026-09-21" } }),
    ).toEqual(review);
    expect(migrate("preferences", { version: 1, data: { newCardsPerDay: 5 } })).toEqual({
      ...DEFAULT_PREFERENCES,
      newCardsPerDay: 5,
    });
    expect(migrate("preferences", { version: 1, data: { answerScale: "minimal", developerMode: true } })).toEqual({
      ...DEFAULT_PREFERENCES,
      answerScale: "minimal",
      developerMode: true,
    });
  });
});
