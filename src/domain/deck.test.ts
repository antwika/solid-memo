import { describe, expect, it } from "vitest";
import { cardLabel, validateCardContent, type Card } from "./deck";

const FLAG = "https://flagcdn.com/h80/af.png";

describe("validateCardContent", () => {
  it("trims text and drops empty image fields", () => {
    expect(
      validateCardContent({
        front: " 水 ",
        back: " water ",
        frontImageUrl: "  ",
        backImageUrl: "",
      }),
    ).toEqual({ ok: true, content: { front: "水", back: "water" } });
  });

  it("accepts a picture-only side, trimming the URL", () => {
    expect(
      validateCardContent({
        front: "",
        back: "Afghanistan",
        frontImageUrl: ` ${FLAG} `,
      }),
    ).toEqual({
      ok: true,
      content: { front: "", back: "Afghanistan", frontImageUrl: FLAG },
    });
  });

  it("accepts pictures on both sides, with or without text", () => {
    expect(
      validateCardContent({
        front: "Flag",
        back: "",
        frontImageUrl: FLAG,
        backImageUrl: "http://example.org/map.png",
      }),
    ).toEqual({
      ok: true,
      content: {
        front: "Flag",
        back: "",
        frontImageUrl: FLAG,
        backImageUrl: "http://example.org/map.png",
      },
    });
  });

  it("requires text or an image on each side", () => {
    expect(validateCardContent({ front: " ", back: "b" })).toEqual({
      ok: false,
      error: "The front needs text or an image.",
    });
    expect(
      validateCardContent({ front: "", back: "", frontImageUrl: FLAG }),
    ).toEqual({ ok: false, error: "The back needs text or an image." });
  });

  it("rejects images that are not http(s) URLs", () => {
    expect(
      validateCardContent({
        front: "f",
        back: "b",
        frontImageUrl: "/data/flags/h80/af.png",
      }),
    ).toEqual({ ok: false, error: "The front image must be an http(s) URL." });
    expect(
      validateCardContent({
        front: "f",
        back: "b",
        backImageUrl: "javascript:alert(1)",
      }),
    ).toEqual({ ok: false, error: "The back image must be an http(s) URL." });
  });
});

describe("cardLabel", () => {
  const card: Card = {
    id: "afghanistan",
    url: "https://pod.example/decks/deck-1.ttl#afghanistan",
    front: "",
    back: "",
    createdAt: "",
    formatVersion: 2,
  };

  it("prefers the front text, then the back text, then the id", () => {
    expect(cardLabel({ ...card, front: "水", back: "water" })).toBe("水");
    expect(cardLabel({ ...card, back: "Afghanistan", frontImageUrl: FLAG })).toBe(
      "Afghanistan",
    );
    expect(cardLabel({ ...card, frontImageUrl: FLAG, backImageUrl: FLAG })).toBe(
      "afghanistan",
    );
  });
});
