import { afterEach, describe, expect, it, vi } from "vitest";
import { readerText } from "./readerText";

const capitals = { en: "Capitals", sv: "Huvudstäder" };

describe("readerText", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the text in the browser's preferred language when the deck states it in one", () => {
    vi.stubGlobal("navigator", { languages: ["sv-SE", "en"] });
    expect(readerText(capitals)).toBe("Huvudstäder");
  });

  it("shows the English text otherwise", () => {
    vi.stubGlobal("navigator", { languages: ["fi-FI"] });
    expect(readerText(capitals)).toBe("Capitals");
  });
});
