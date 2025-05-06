import {
  parseSchedule,
  type ScheduleModel,
} from "../../../src/domain/schedule.model";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("schedule.model", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("parseSchedule (function) (named export)", () => {
    it("successfully parses an object that conforms to the Schedule type", () => {
      // Arrange
      vi.setSystemTime(new Date(2000, 1, 2, 3, 4, 5, 6));

      const mockLastReviewed = new Date(2000, 1, 2, 3, 4, 5, 6);
      const nextReview = new Date(2001, 1, 2, 3, 4, 5, 6);

      const mockSchedule: ScheduleModel = {
        iri: "mock-iri",
        version: "mock-version",
        isInSolidMemoDataInstance: "mock-instance-iri",
        forFlashcard: "mock-card-iri",
        lastReviewed: mockLastReviewed,
        nextReview: nextReview,
      };

      // Act
      const schedule = parseSchedule(mockSchedule);

      // Assert
      expect(schedule).toStrictEqual({
        iri: "mock-iri",
        version: "mock-version",
        isInSolidMemoDataInstance: "mock-instance-iri",
        forFlashcard: "mock-card-iri",
        lastReviewed: new Date(2000, 1, 2, 3, 4, 5, 6),
        nextReview: new Date(2001, 1, 2, 3, 4, 5, 6),
      });
    });
  });
});
