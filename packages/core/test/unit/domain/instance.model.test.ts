import {
  parseInstance,
  type InstanceModel,
} from "../../../src/domain/instance.model";
import { describe, expect, it } from "vitest";

describe("instance.model", () => {
  describe("parseInstance (function) (named export)", () => {
    it("successfully parses an object that conforms to the Instance type", () => {
      // Arrange
      const mockInstance: InstanceModel = {
        iri: "mock-iri",
        version: "mock-version",
        name: "mock-name",
        isInPrivateTypeIndex: "mock-isInPrivateTypeIndex",
        hasDeck: ["mock-deck"],
        hasSchedule: ["mock-schedule"],
      };

      const instance = parseInstance(mockInstance);
      expect(instance).toStrictEqual({
        iri: "mock-iri",
        version: "mock-version",
        name: "mock-name",
        isInPrivateTypeIndex: "mock-isInPrivateTypeIndex",
        hasDeck: ["mock-deck"],
        hasSchedule: ["mock-schedule"],
      });
    });
  });
});
