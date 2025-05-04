import { parseInstance } from "../../../src/domain/instance.model";
import { describe, expect, it } from "vitest";

describe("instance.model", () => {
  describe("parseInstance (function) (named export)", () => {
    it("successfully parses an object that conforms to the Instance type", () => {
      const instance = parseInstance({
        iri: "mock-iri",
        version: "mock-version",
        name: "mock-name",
        isInPrivateTypeIndex: "mock-isInPrivateTypeIndex",
        hasDeck: ["mock-deck"],
      });
      expect(instance).toStrictEqual({
        iri: "mock-iri",
        version: "mock-version",
        name: "mock-name",
        isInPrivateTypeIndex: "mock-isInPrivateTypeIndex",
        hasDeck: ["mock-deck"],
      });
    });
  });
});
