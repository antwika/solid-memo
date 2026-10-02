import { describe, expect, it } from "vitest";
import { defaultDeckDescription, defaultDeckDescriptionText, descriptionInFormat4, isDefaultDeckDescription } from "./dcat";

describe("a deck's default description", () => {
  it("is English before format 4", () => {
    expect(defaultDeckDescription("Capitals")).toBe("Flashcards: Capitals.");
  });

  it("is English and Swedish in format 4, naming the deck by its Swedish title when it has one", () => {
    expect(defaultDeckDescriptionText({ en: "Capitals", sv: "Huvudstäder" })).toEqual({
      en: "Flashcards: Capitals.",
      sv: "Kortlek: Huvudstäder.",
    });
    expect(defaultDeckDescriptionText({ en: "Capitals" })).toEqual({
      en: "Flashcards: Capitals.",
      sv: "Kortlek: Capitals.",
    });
    expect(defaultDeckDescriptionText({ de: "Hauptstädte" })).toEqual({
      en: "Flashcards: Hauptstädte.",
      sv: "Kortlek: Hauptstädte.",
    });
  });

  it("is stated in Swedish too when a format-3 deck moves to format 4, any other description in English", () => {
    expect(descriptionInFormat4("Flashcards: Capitals.", "Capitals")).toEqual({
      en: "Flashcards: Capitals.",
      sv: "Kortlek: Capitals.",
    });
    expect(descriptionInFormat4("Every capital.", "Capitals")).toEqual({ en: "Every capital." });
  });
});

describe("isDefaultDeckDescription", () => {
  it("knows the default in English, with or without its Swedish, for any of the deck's titles", () => {
    const titles = [{ en: "Capitals of the world" }, { en: "Capitals" }];
    expect(isDefaultDeckDescription({ en: "Flashcards: Capitals." }, titles)).toBe(true);
    expect(isDefaultDeckDescription({ en: "Flashcards: Capitals of the world.", sv: "Kortlek: Capitals of the world." }, titles)).toBe(true);
    expect(isDefaultDeckDescription({ en: "Flashcards: Capitals.", sv: "Mina huvudstäder." }, titles)).toBe(false);
    expect(isDefaultDeckDescription({ en: "Every capital." }, titles)).toBe(false);
    expect(isDefaultDeckDescription({ en: "Flashcards: Hauptstädte.", de: "Karten" }, [{ de: "Hauptstädte" }])).toBe(false);
  });
});
