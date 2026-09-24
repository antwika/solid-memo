import { describe, expect, it } from "vitest";
import { cardCount, studyCountsSummary } from "./studyCounts";

describe("studyCountsSummary", () => {
  it.each([
    [{ dueCount: 12, newCount: 5 }, "17 to review"],
    [{ dueCount: 12, newCount: 0 }, "12 to review"],
    [{ dueCount: 0, newCount: 5 }, "5 to review"],
    [{ dueCount: 1, newCount: 0 }, "1 to review"],
    [{ dueCount: 0, newCount: 0 }, null],
  ])("summarises %j as %j", (counts, expected) => {
    expect(studyCountsSummary(counts)).toBe(expected);
  });
});

describe("cardCount", () => {
  it("pluralises", () => {
    expect(cardCount(0)).toBe("0 cards");
    expect(cardCount(1)).toBe("1 card");
    expect(cardCount(2)).toBe("2 cards");
  });
});
