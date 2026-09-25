import { describe, expect, it } from "vitest";
import { preferencesFromRecord, preferencesToRecord } from "./preferencesRecord";

describe("preferences records", () => {
  it("round-trip the five fields", () => {
    const preferences = {
      newCardsPerDay: 5,
      maxReviewsPerDay: 50,
      dayBoundaryHour: 0,
      answerScale: "minimal" as const,
      developerMode: true,
    };
    expect(preferencesToRecord(preferences)).toEqual(preferences);
    expect(preferencesFromRecord(preferencesToRecord(preferences))).toEqual(preferences);
  });
});
