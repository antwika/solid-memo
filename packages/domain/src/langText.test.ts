import { describe, expect, it } from "vitest";
import { beyondEnglish, english, inEnglish, shown, withEnglish } from "./langText";

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

  it("replaces the English text under its own tag and keeps the rest", () => {
    expect(withEnglish({ "en-gb": "Old", sv: "Gammal" }, "New")).toEqual({ "en-gb": "New", sv: "Gammal" });
    expect(withEnglish({ sv: "Gammal" }, "New")).toEqual({ sv: "Gammal", en: "New" });
    expect(withEnglish(undefined, "New")).toEqual(inEnglish("New"));
  });

  it("keeps a text in a model only when it is in more than English", () => {
    expect(beyondEnglish({ en: "Capitals" })).toBeUndefined();
    expect(beyondEnglish({ en: "Capitals", sv: "Huvudstäder" })).toEqual({ en: "Capitals", sv: "Huvudstäder" });
  });
});
