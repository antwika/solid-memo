import { describe, expect, it } from "vitest";
import type { Deck } from "./deck";
import {
  catalogUrlOf,
  ensureTrailingSlash,
  instanceDocumentUrls,
  metaUrlOf,
  preferencesUrlOf,
} from "./instanceLayout";

const INSTANCE = "https://pod.example/solid-memo/main";

describe("instance layout", () => {
  it("names the fixed documents, with or without a trailing slash", () => {
    expect(ensureTrailingSlash(INSTANCE)).toBe(`${INSTANCE}/`);
    expect(ensureTrailingSlash(`${INSTANCE}/`)).toBe(`${INSTANCE}/`);
    expect(metaUrlOf(INSTANCE)).toBe(`${INSTANCE}/meta.ttl`);
    expect(preferencesUrlOf(`${INSTANCE}/`)).toBe(`${INSTANCE}/preferences.ttl`);
    expect(catalogUrlOf(INSTANCE)).toBe(`${INSTANCE}/catalog.ttl`);
  });

  it("lists every document of an instance, fixed ones first", () => {
    const deck = {
      cardsDocumentUrl: `${INSTANCE}/decks/deck-1.ttl`,
      reviewsDocumentUrl: `${INSTANCE}/reviews/deck-1.ttl`,
    } as Deck;
    expect(instanceDocumentUrls(INSTANCE, [deck])).toEqual([
      `${INSTANCE}/meta.ttl`,
      `${INSTANCE}/preferences.ttl`,
      `${INSTANCE}/catalog.ttl`,
      `${INSTANCE}/decks/deck-1.ttl`,
      `${INSTANCE}/reviews/deck-1.ttl`,
    ]);
  });
});
