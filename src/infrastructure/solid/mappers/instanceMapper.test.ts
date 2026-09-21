import { describe, expect, it } from "vitest";
import { toInstance } from "./instanceMapper";

describe("toInstance", () => {
  it("uses the registration title as the name", () => {
    expect(
      toInstance({
        containerUrl: "https://pod.example/solid-memo/main/",
        title: "Japanese study",
      }),
    ).toEqual({
      url: "https://pod.example/solid-memo/main/",
      name: "Japanese study",
    });
  });

  it("falls back to the container slug and normalizes the URL", () => {
    expect(
      toInstance({
        containerUrl: "https://pod.example/solid-memo/main",
        title: null,
      }),
    ).toEqual({
      url: "https://pod.example/solid-memo/main/",
      name: "main",
    });
  });
});
