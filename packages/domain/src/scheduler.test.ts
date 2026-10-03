import { describe, expect, it } from "vitest";
import { DEFAULT_DESIRED_RETENTION, isDesiredRetention, isScheduler } from "./scheduler";

describe("isScheduler", () => {
  it("knows SM-2 and FSRS only", () => {
    expect(isScheduler("sm2")).toBe(true);
    expect(isScheduler("fsrs")).toBe(true);
    expect(isScheduler("leitner")).toBe(false);
  });
});

describe("isDesiredRetention", () => {
  it("admits 0.70 to 0.97, the default among them", () => {
    expect(isDesiredRetention(DEFAULT_DESIRED_RETENTION)).toBe(true);
    expect(isDesiredRetention(0.7)).toBe(true);
    expect(isDesiredRetention(0.97)).toBe(true);
    expect(isDesiredRetention(0.69)).toBe(false);
    expect(isDesiredRetention(0.98)).toBe(false);
    expect(isDesiredRetention(Number.NaN)).toBe(false);
  });
});
