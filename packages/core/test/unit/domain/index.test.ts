import { describe, expect, it, vi } from "vitest";
import * as index from "../../../src/domain/index";

vi.mock("../../../src/domain/deck.model", () => ({
  a: "a",
}));
vi.mock("../../../src/domain/flashcard.model", () => ({
  b: "b",
}));
vi.mock("../../../src/domain/instance.model", () => ({
  c: "c",
}));

describe("index", () => {
  it("it exports properties from deck.model", () => {
    expect((index as any).a).toBe("a");
  });
  it("it exports properties from flashcard.model", () => {
    expect((index as any).b).toBe("b");
  });
  it("it exports properties from instance.model", () => {
    expect((index as any).c).toBe("c");
  });
});
