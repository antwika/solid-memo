import { describe, expect, it } from "vitest";
import { cardCount, studyCountsSummary } from "./studyCounts";

describe("studyCountsSummary", () => {
  it.each([
    [{ dueCount: 12, newCount: 5 }, "12 due · 5 new"],
    [{ dueCount: 12, newCount: 0 }, "12 due"],
    [{ dueCount: 0, newCount: 5 }, "5 new"],
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
