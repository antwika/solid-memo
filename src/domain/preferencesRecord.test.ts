import { describe, expect, it } from "vitest";
import { preferencesFromRecord, preferencesToRecord } from "./preferencesRecord";

describe("preferences records", () => {
  it("round-trip every field, the invalid data policy as a concept", () => {
    const preferences = {
      newCardsPerDay: 5,
      maxReviewsPerDay: 50,
      dayBoundaryHour: 0,
      answerScale: "minimal" as const,
      developerMode: true,
      invalidDataPolicy: "warn-only" as const,
    };
    expect(preferencesToRecord(preferences)).toEqual({
      ...preferences,
      invalidDataPolicy: "https://solid-memo.com/vocab/v1#warnOnly",
    });
    expect(preferencesFromRecord(preferencesToRecord(preferences))).toEqual(preferences);
  });
});
