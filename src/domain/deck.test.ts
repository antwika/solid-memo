import { describe, expect, it } from "vitest";
import {
  cardLabel,
  isDeckDirection,
  promptSides,
  promptsOf,
  studyDirections,
  validateCardContent,
  type Card,
} from "./deck";

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

describe("deck directions", () => {
  const sweden: Card = {
    id: "sweden",
    url: "https://pod.example/decks/d.ttl#sweden",
    front: "Sweden",
    back: "Stockholm",
    backImageUrl: FLAG,
    createdAt: "2026-09-01T00:00:00.000Z",
    formatVersion: 2,
  };
  const norway: Card = { ...sweden, id: "norway", front: "Norway", back: "Oslo" };

  it("recognises the three directions and nothing else", () => {
    expect(isDeckDirection("front-to-back")).toBe(true);
    expect(isDeckDirection("back-to-front")).toBe(true);
    expect(isDeckDirection("bidirectional")).toBe(true);
    expect(isDeckDirection("sideways")).toBe(false);
  });

  it("studies a one-way deck one way and a bidirectional deck both ways", () => {
    expect(studyDirections("front-to-back")).toEqual(["front-to-back"]);
    expect(studyDirections("back-to-front")).toEqual(["back-to-front"]);
    expect(studyDirections("bidirectional")).toEqual([
      "front-to-back",
      "back-to-front",
    ]);
  });

  it("makes the deck's prompts card by card", () => {
    expect(promptsOf([sweden, norway], "back-to-front")).toEqual([
      { card: sweden, direction: "back-to-front" },
      { card: norway, direction: "back-to-front" },
    ]);
    expect(promptsOf([sweden, norway], "bidirectional")).toEqual([
      { card: sweden, direction: "front-to-back" },
      { card: sweden, direction: "back-to-front" },
      { card: norway, direction: "front-to-back" },
      { card: norway, direction: "back-to-front" },
    ]);
  });

  it("asks the front and answers with the back, or the reverse", () => {
    expect(promptSides({ card: sweden, direction: "front-to-back" })).toEqual({
      question: { side: "front", text: "Sweden" },
      answer: { side: "back", text: "Stockholm", imageUrl: FLAG },
    });
    expect(promptSides({ card: sweden, direction: "back-to-front" })).toEqual({
      question: { side: "back", text: "Stockholm", imageUrl: FLAG },
      answer: { side: "front", text: "Sweden" },
    });
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
