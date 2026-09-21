import { describe, expect, it } from "vitest";
import { isLinkableUrl, isSecureUrl, validateWebId } from "./webId";

describe("isSecureUrl", () => {
  it("accepts an https URL", () => {
    expect(isSecureUrl("https://datapod.igrant.io")).toBe(true);
  });

  it("rejects a string that is not a URL", () => {
    expect(isSecureUrl("not a url")).toBe(false);
  });

  it("rejects a non-https URL", () => {
    expect(isSecureUrl("http://issuer.example")).toBe(false);
  });

  it("rejects embedded credentials", () => {
    expect(isSecureUrl("https://user@issuer.example")).toBe(false);
    expect(isSecureUrl("https://:secret@issuer.example")).toBe(false);
  });
});

describe("isLinkableUrl", () => {
  it.each([
    "https://alice.example/profile/card#me",
    "http://localhost:3000/pod/",
    "mailto:alice@example.org",
  ])("accepts %s", (value) => {
    expect(isLinkableUrl(value)).toBe(true);
  });

  it.each(["javascript:alert(1)", "data:text/html,<p>hi</p>", "not a url", ""])(
    "rejects %j",
    (value) => {
      expect(isLinkableUrl(value)).toBe(false);
    },
  );
});

describe("validateWebId", () => {
  it("accepts an https WebID and trims surrounding whitespace", () => {
    expect(validateWebId("  https://alice.example/profile/card#me ")).toEqual({
      ok: true,
      webId: "https://alice.example/profile/card#me",
    });
  });

  it("normalizes the URL", () => {
    expect(validateWebId("https://Alice.Example/profile/card#me")).toEqual({
      ok: true,
      webId: "https://alice.example/profile/card#me",
    });
  });

  it("rejects empty input", () => {
    expect(validateWebId("   ")).toEqual({
      ok: false,
      error: "Enter your WebID.",
    });
  });

  it("rejects input that is not a URL", () => {
    const result = validateWebId("alice");
    expect(result.ok).toBe(false);
    expect(result).toHaveProperty(
      "error",
      expect.stringContaining("not a valid URL"),
    );
  });

  it("rejects a non-https URL", () => {
    expect(validateWebId("http://alice.example/profile/card#me")).toEqual({
      ok: false,
      error: "A WebID must start with https://.",
    });
  });

  it("rejects embedded credentials", () => {
    expect(
      validateWebId("https://alice:hunter2@alice.example/profile/card#me"),
    ).toEqual({
      ok: false,
      error: "A WebID must not contain a username or password.",
    });
  });
});
