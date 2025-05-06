import { parseAssessment } from "../../../src/domain/assessment.model";
import { describe, expect, it } from "vitest";

describe("assessment.model", () => {
  describe("parseAssessment (function) (named export)", () => {
    it("successfully parses an object that conforms to the Assessment type", () => {
      const assessment = parseAssessment({
        iri: "mock-iri",
        version: "mock-version",
        forFlashcard: "mock-card-iri",
        date: "2025-05-01",
        score: 1,
      });
      expect(assessment).toStrictEqual({
        iri: "mock-iri",
        version: "mock-version",
        forFlashcard: "mock-card-iri",
        date: "2025-05-01",
        score: 1,
      });
    });
  });
});
