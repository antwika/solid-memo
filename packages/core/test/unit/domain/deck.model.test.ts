import { parseDeck } from "../../../src/domain/deck.model";
import { describe, expect, it } from "vitest";

describe("deck.model", () => {
  describe("parseDeck (function) (named export)", () => {
    it("successfully parses an object that conforms to the Deck type", () => {
      const deck = parseDeck({
        iri: "mock-iri",
        version: "mock-version",
        name: "mock-name",
        isInSolidMemoDataInstance: "mock-instance",
        hasCard: ["mock-card"],
      });
      expect(deck).toStrictEqual({
        iri: "mock-iri",
        version: "mock-version",
        name: "mock-name",
        isInSolidMemoDataInstance: "mock-instance",
        hasCard: ["mock-card"],
      });
    });
  });
});
