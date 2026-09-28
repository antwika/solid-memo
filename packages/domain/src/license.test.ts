import { describe, expect, it } from "vitest";
import { licenseLabel } from "./license";

describe("licenseLabel", () => {
  it.each([
    ["https://creativecommons.org/publicdomain/zero/1.0/", "CC0 1.0"],
    ["http://creativecommons.org/publicdomain/zero/1.0/legalcode", "CC0 1.0"],
    ["https://creativecommons.org/publicdomain/mark/1.0/", "Public Domain Mark 1.0"],
    ["https://creativecommons.org/licenses/by/4.0/", "CC BY 4.0"],
    ["https://creativecommons.org/licenses/by-nc-sa/3.0/", "CC BY-NC-SA 3.0"],
  ])("names %s", (url, label) => {
    expect(licenseLabel(url)).toBe(label);
  });

  it("falls back to the URL for anything else", () => {
    expect(licenseLabel("https://example.org/my-terms")).toBe(
      "https://example.org/my-terms",
    );
  });
});
