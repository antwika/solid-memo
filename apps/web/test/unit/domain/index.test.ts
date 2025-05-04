import { describe, expect, it, vi } from "vitest";
import * as index from "@domain/index";

vi.mock("@domain/deck.model", () => ({
  a: "a",
}));
vi.mock("@domain/flashcard.model", () => ({
  b: "b",
}));
vi.mock("@domain/instance.model", () => ({
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
