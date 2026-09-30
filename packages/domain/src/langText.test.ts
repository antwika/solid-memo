import { describe, expect, it } from "vitest";
import { editedText, english, inEnglish, shown, withEnglish } from "./langText";

describe("text in several languages", () => {
  it("finds the English text, a regional English when there is no plain one", () => {
    expect(english({ sv: "Huvudstäder", en: "Capitals" })).toBe("Capitals");
    expect(english({ "en-gb": "Capitals", "en-us": "Capitals (US)" })).toBe("Capitals");
    expect(english({ sv: "Huvudstäder" })).toBeUndefined();
  });

  it("shows the English text, else the first language's", () => {
    expect(shown({ sv: "Huvudstäder", en: "Capitals" })).toBe("Capitals");
    expect(shown({ sv: "Huvudstäder", de: "Hauptstädte" })).toBe("Hauptstädte");
    expect(shown({})).toBe("");
  });

  it("shows the text in the first preferred language it is in", () => {
    const text = { en: "Capitals", sv: "Huvudstäder", "pt-br": "Capitais" };
    expect(shown(text, ["fi", "sv", "en"])).toBe("Huvudstäder");
    expect(shown(text, ["fi"])).toBe("Capitals");
  });

  it("matches a preferred language with or without its region", () => {
    expect(shown({ en: "Capitals", sv: "Huvudstäder" }, ["sv-SE"])).toBe("Huvudstäder");
    expect(shown({ en: "Capitals", "pt-br": "Capitais" }, ["pt"])).toBe("Capitais");
    expect(shown({ "en-gb": "Colours", "en-us": "Colors" }, ["en-US"])).toBe("Colors");
  });

  it("edits the English text, else the text shown", () => {
    expect(editedText({ sv: "Huvudstäder", "en-gb": "Capitals" })).toBe("Capitals");
    expect(editedText({ sv: "Huvudstäder" })).toBe("Huvudstäder");
    expect(editedText(undefined)).toBe("");
  });

  it("replaces the English text under its own tag and keeps the rest", () => {
    expect(withEnglish({ "en-gb": "Old", sv: "Gammal" }, "New")).toEqual({ "en-gb": "New", sv: "Gammal" });
    expect(withEnglish({ sv: "Gammal" }, "New")).toEqual({ sv: "Gammal", en: "New" });
    expect(withEnglish(undefined, "New")).toEqual(inEnglish("New"));
  });
});
