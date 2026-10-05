import { describe, expect, it } from "vitest";
import type { LibraryNotice } from "./libraryStats";
import {
  libraryLikeFromRecord,
  libraryLikeToRecord,
  noticeFromRecords,
  noticeToRecords,
} from "./libraryStatsRecord";

const FLAGS = "https://solid-memo.com/decks/index.ttl#world-flags";
const ALICE = "https://alice.example/#me";
const AT = "2026-10-05T10:00:00.000Z";

describe("a like in the user's instance", () => {
  it("is an as:Like of the deck without an actor, read back as written", () => {
    const like = { deckUrl: FLAGS, likedAt: AT, announced: false };
    expect(libraryLikeToRecord(like)).toEqual({ deck: FLAGS, published: AT, announced: false });
    expect(libraryLikeFromRecord(libraryLikeToRecord(like))).toEqual(like);
  });

  it("is not announced unless it says so, and is left out without a time", () => {
    expect(libraryLikeFromRecord({ deck: FLAGS, published: AT })).toEqual({ deckUrl: FLAGS, likedAt: AT, announced: false });
    expect(libraryLikeFromRecord({ deck: FLAGS })).toBeNull();
  });
});

describe("a notice", () => {
  const notice = (action: LibraryNotice["action"]): LibraryNotice => ({ action, by: ALICE, deckUrl: FLAGS, at: AT });

  it("of a like is an as:Like by the user", () => {
    expect(noticeToRecords(notice("like"), "x")).toEqual({ kind: "like", like: { actor: ALICE, deck: FLAGS, published: AT } });
  });

  it("of an unlike is an as:Undo of the user's like of the deck", () => {
    expect(noticeToRecords(notice("unlike"), "https://inbox.example/n#like")).toEqual({
      kind: "undo",
      undo: { actor: ALICE, like: "https://inbox.example/n#like", published: AT },
      like: { actor: ALICE, deck: FLAGS },
    });
  });

  it("of an import is an as:Add of the deck", () => {
    expect(noticeToRecords(notice("import"), "x")).toEqual({ kind: "add", add: { actor: ALICE, deck: FLAGS, published: AT } });
  });

  it.each(["like", "unlike", "import"] as const)("of a%s reads back as written", (action) => {
    expect(noticeFromRecords(noticeToRecords(notice(action), "https://inbox.example/n#like"))).toEqual(notice(action));
  });

  it("of a like that does not say who gave it or when is none", () => {
    expect(noticeFromRecords({ kind: "like", like: { deck: FLAGS, published: AT } })).toBeNull();
    expect(noticeFromRecords({ kind: "like", like: { actor: ALICE, deck: FLAGS } })).toBeNull();
  });
});
