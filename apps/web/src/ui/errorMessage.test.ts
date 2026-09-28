import { describe, expect, it } from "vitest";
import { errorMessage } from "./errorMessage";

describe("errorMessage", () => {
  it("returns null for null and undefined", () => {
    expect(errorMessage(null)).toBeNull();
    expect(errorMessage(undefined)).toBeNull();
  });

  it("returns the message of an Error", () => {
    expect(errorMessage(new Error("broken"))).toBe("broken");
  });

  it("stringifies non-Error values", () => {
    expect(errorMessage("plain")).toBe("plain");
    expect(errorMessage(42)).toBe("42");
  });
});
