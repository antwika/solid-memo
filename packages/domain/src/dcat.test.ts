import { describe, expect, it } from "vitest";
import { defaultDeckDescription, defaultDeckDescriptionText, descriptionInFormat4 } from "./dcat";

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
