import { describe, expect, it } from "vitest";
import {
  editedTag,
  editedText,
  english,
  inEnglish,
  sameText,
  shown,
  shownTag,
  tidied,
  tidiedSideText,
  tidiedTagged,
  typedIn,
  typedTag,
  typedText,
  withEditedText,
  withTyped,
  withTypedTagged,
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

  it("names the language of the text it shows", () => {
    const text = { en: "Capitals", sv: "Huvudstäder", "pt-br": "Capitais" };
    expect(shownTag(text, ["sv-SE"])).toBe("sv");
    expect(shownTag(text, ["fi"])).toBe("en");
    expect(shownTag(text, ["pt"])).toBe("pt-br");
    expect(shownTag({ de: "Hauptstädte", sv: "Huvudstäder" })).toBe("de");
    expect(shownTag({ "": "en bil" }, ["sv"])).toBe("");
    expect(shownTag({})).toBeUndefined();
  });

  it("names the language of the text it edits", () => {
    expect(editedTag({ sv: "Huvudstäder", "en-gb": "Capitals" })).toBe("en-gb");
    expect(editedTag({ sv: "Huvudstäder" })).toBe("sv");
    expect(editedTag({})).toBeUndefined();
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

  it("replaces the English text under its own tag on an English page and keeps the rest", () => {
    expect(withTyped({ "en-gb": "Old", sv: "Gammal" }, "New", "en")).toEqual({ "en-gb": "New", sv: "Gammal" });
    expect(withTyped({ sv: "Gammal" }, "New", "en")).toEqual({ sv: "New", en: "New" });
    expect(withTyped(undefined, "New", "en")).toEqual(inEnglish("New"));
  });
});

describe("text the user typed", () => {
  it("is in the page's language, and stands in for the English the formats ask for", () => {
    expect(typedIn("Huvudstäder", "sv")).toEqual({ en: "Huvudstäder", sv: "Huvudstäder" });
    expect(typedIn("Capitals", "en")).toEqual({ en: "Capitals" });
    expect(withTyped(undefined, "Huvudstäder", "sv")).toEqual({ en: "Huvudstäder", sv: "Huvudstäder" });
  });

  it("edits the page's language, else the English, else the first by tag", () => {
    expect(typedTag({ en: "Capitals", sv: "Huvudstäder" }, "sv")).toBe("sv");
    expect(typedTag({ en: "Capitals", "sv-se": "Huvudstäder" }, "sv")).toBe("sv-se");
    expect(typedTag({ en: "Capitals", sv: "Huvudstäder" }, "en")).toBe("en");
    expect(typedTag({ en: "Capitals" }, "sv")).toBe("en");
    expect(typedTag({ de: "Hauptstädte" }, "sv")).toBe("de");
    expect(typedTag({}, "sv")).toBeUndefined();
    expect(typedText({ en: "Capitals", sv: "Huvudstäder" }, "sv")).toBe("Huvudstäder");
    expect(typedText({}, "sv")).toBe("");
    expect(typedText(undefined, "sv")).toBe("");
  });

  it("replaces the page language's text, and the English only where it stood in for it", () => {
    expect(withTyped({ en: "Capitals", sv: "Huvudstäder" }, "Mina huvudstäder", "sv")).toEqual({
      en: "Capitals",
      sv: "Mina huvudstäder",
    });
    expect(withTyped({ en: "Huvudstäder", sv: "Huvudstäder" }, "Städer", "sv")).toEqual({ en: "Städer", sv: "Städer" });
    expect(withTyped({ en: "Capitals" }, "Cities", "sv")).toEqual({ en: "Cities" });
    expect(withTyped({ en: "Capitals", sv: "Huvudstäder" }, "Cities", "en")).toEqual({ en: "Cities", sv: "Huvudstäder" });
    expect(withTyped({ de: "Hauptstädte" }, "Städte", "sv")).toEqual({ de: "Städte", en: "Städte" });
    expect(withTyped({}, "Städer", "sv")).toEqual({ sv: "Städer", en: "Städer" });
  });

  it("is no text at all once cleared, translations included", () => {
    expect(withTyped({ en: "A note", sv: "En anteckning" }, " ", "sv")).toEqual({});
    expect(tidied(withTyped({ en: "A note" }, "", "en"))).toBeUndefined();
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

describe("language-tagged text that needs no English", () => {
  it("edits the page's language, else the English, else the first by tag, and starts new text in the page's language", () => {
    expect(withTypedTagged({ en: "A flag", sv: "En flagga" }, "A blue flag", "en")).toEqual({ en: "A blue flag", sv: "En flagga" });
    expect(withTypedTagged({ en: "A flag", sv: "En flagga" }, "En blå flagga", "sv")).toEqual({ en: "A flag", sv: "En blå flagga" });
    expect(withTypedTagged({ de: "Eine Flagge" }, "En blå flagga", "sv")).toEqual({ de: "En blå flagga" });
    expect(withTypedTagged(undefined, "En flagga", "sv")).toEqual({ sv: "En flagga" });
    expect(withTypedTagged({}, "A flag", "en")).toEqual({ en: "A flag" });
    expect(withTypedTagged({ en: "A flag", sv: "En flagga" }, "", "sv")).toEqual({});
  });

  it("trims every language, leaves out an empty one, and is none when the edited text is cleared", () => {
    expect(tidiedTagged({ en: " A flag ", de: " " })).toEqual({ en: "A flag" });
    expect(tidiedTagged({ sv: " En flagga " })).toEqual({ sv: "En flagga" });
    expect(tidiedTagged({ en: " ", sv: "En flagga" })).toBeUndefined();
    expect(tidiedTagged({})).toBeUndefined();
    expect(tidiedTagged(undefined)).toBeUndefined();
  });
});
