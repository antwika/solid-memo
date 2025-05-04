import { parseFlashcard } from "../../../src/domain/flashcard.model";
import { describe, expect, it } from "vitest";

describe("flashcard.model", () => {
  describe("parseFlashcard (function) (named export)", () => {
    it("successfully parses an object that conforms to the Flashcard type", () => {
      const flashcard = parseFlashcard({
        iri: "mock-iri",
        version: "mock-version",
        front: "mock-front",
        back: "mock-back",
        isInDeck: "mock-deck",
      });
      expect(flashcard).toStrictEqual({
        iri: "mock-iri",
        version: "mock-version",
        front: "mock-front",
        back: "mock-back",
        isInDeck: "mock-deck",
      });
    });
  });
});
