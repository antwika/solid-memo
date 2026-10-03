import { describe, expect, it } from "vitest";
import { GUEST_INSTANCE_URL, GUEST_ORIGIN, GUEST_WEBID, isGuestUrl, suggestedGuestLocation } from "./guest";

describe("guest", () => {
  it("keeps the WebID and the instance in the guest's pod", () => {
    expect(isGuestUrl(GUEST_WEBID)).toBe(true);
    expect(isGuestUrl(GUEST_INSTANCE_URL)).toBe(true);
    expect(new URL(GUEST_ORIGIN).hostname.endsWith(".invalid")).toBe(true);
  });

  it("tells guest URLs from any other", () => {
    expect(isGuestUrl("https://pod.example/solid-memo/")).toBe(false);
  });

  it("suggests keeping a guest's study where a first instance goes, unless an instance is there", () => {
    expect(suggestedGuestLocation("https://pod.example", [], "2026-10-03")).toBe("https://pod.example/solid-memo/main/");
    expect(
      suggestedGuestLocation("https://pod.example/", ["https://pod.example/solid-memo/main"], "2026-10-03"),
    ).toBe("https://pod.example/solid-memo/guest-2026-10-03/");
  });
});
