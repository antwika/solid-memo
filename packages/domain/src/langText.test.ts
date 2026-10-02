import { describe, expect, it } from "vitest";
import {
  editedText,
  english,
  inEnglish,
  sameText,
  shown,
  tidied,
  tidiedSideText,
  withEditedText,
  withEnglish,
} from "./langText";

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

  it("tidies typed text, and drops a text without English", () => {
    expect(tidied({ en: " Replaced by ", sv: " Ersatt av ", de: "  " })).toEqual({ en: "Replaced by", sv: "Ersatt av" });
    expect(tidied({ en: " ", sv: "Ersatt av" })).toBeUndefined();
    expect(tidied(undefined)).toBeUndefined();
  });

  it("compares texts language by language", () => {
    expect(sameText({ en: "a", sv: "b" }, { sv: "b", en: "a" })).toBe(true);
    expect(sameText({ en: "a" }, { en: "a", sv: "b" })).toBe(false);
    expect(sameText({ en: "a", sv: "b" }, { en: "a", de: "b" })).toBe(false);
    expect(sameText(undefined, undefined)).toBe(true);
    expect(sameText({ en: "a" }, undefined)).toBe(false);
  });

  it("replaces the English text under its own tag and keeps the rest", () => {
    expect(withEnglish({ "en-gb": "Old", sv: "Gammal" }, "New")).toEqual({ "en-gb": "New", sv: "Gammal" });
    expect(withEnglish({ sv: "Gammal" }, "New")).toEqual({ sv: "Gammal", en: "New" });
    expect(withEnglish(undefined, "New")).toEqual(inEnglish("New"));
  });
});

describe("a card side's text", () => {
  it("shows untagged text when it is in no language the reader prefers", () => {
    expect(shown({ "": "en bil" }, ["sv"])).toBe("en bil");
    expect(editedText({ "": "en bil" })).toBe("en bil");
  });

  it("edits the English, else the untagged or only text, and starts a new side untagged", () => {
    expect(withEditedText({ en: "Mona Lisa", sv: "Mona Lisa" }, "La Joconde")).toEqual({ en: "La Joconde", sv: "Mona Lisa" });
    expect(withEditedText({ "": "en bil" }, "ett hus")).toEqual({ "": "ett hus" });
    expect(withEditedText({ sv: "Stjärnenatt" }, "Natten")).toEqual({ sv: "Natten" });
    expect(withEditedText({}, "Sweden")).toEqual({ "": "Sweden" });
  });

  it("trims every language and leaves out an empty one, clearing all when the edited text is cleared", () => {
    expect(tidiedSideText({ en: " Mona Lisa ", sv: " " })).toEqual({ en: "Mona Lisa" });
    expect(tidiedSideText({ en: " ", sv: "Mona Lisa" })).toEqual({});
    expect(tidiedSideText({ "": "  " })).toEqual({});
    expect(tidiedSideText({})).toEqual({});
  });
});
