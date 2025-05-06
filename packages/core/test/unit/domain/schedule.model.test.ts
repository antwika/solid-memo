import { parseSchedule } from "../../../src/domain/schedule.model";
import { describe, expect, it } from "vitest";

describe("schedule.model", () => {
  describe("parseSchedule (function) (named export)", () => {
    it("successfully parses an object that conforms to the Schedule type", () => {
      const schedule = parseSchedule({
        iri: "mock-iri",
        version: "mock-version",
        interval: 1,
        repetition: 2,
        easeFactor: 3,
        lastReviewed: "2025-05-01",
        nextReview: "2025-06-01",
      });
      expect(schedule).toStrictEqual({
        iri: "mock-iri",
        version: "mock-version",
        interval: 1,
        repetition: 2,
        easeFactor: 3,
        lastReviewed: "2025-05-01",
        nextReview: "2025-06-01",
      });
    });
  });
});
