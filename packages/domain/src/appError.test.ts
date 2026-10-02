import { describe, expect, it } from "vitest";
import { AppError, fillTemplate } from "./appError";

describe("AppError", () => {
  it("names the error by its code and says it in English, its values filled in", () => {
    const error = new AppError("deckGone", { deck: "Capitals" });
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("AppError");
    expect(error.code).toBe("deckGone");
    expect(error.vars).toEqual({ deck: "Capitals" });
    expect(error.message).toBe("The deck <Capitals> no longer exists.");
    expect(new AppError("webIdEmpty").vars).toEqual({});
  });

  it("picks the singular for a count of one, the plural otherwise", () => {
    expect(new AppError("updatedCopyInvalid", { count: 1 }).message).toContain("(1 violation)");
    expect(new AppError("updatedCopyInvalid", { count: 3 }).message).toContain("(3 violations)");
  });

  it("leaves a placeholder without a value as it is", () => {
    expect(fillTemplate("<{url}> already exists.", {})).toBe("<{url}> already exists.");
  });
});
