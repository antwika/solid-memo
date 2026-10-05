import type { AddActivityV1, LikeActivityV1, UndoActivityV1 } from "@solid-memo/vocab/types.generated";
import type { LibraryLike, LibraryNotice } from "./libraryStats";

/**
 * Likes and notices as ActivityStreams activities (docs/library-stats.md):
 * a like is an as:Like of the deck's series; an unlike, an as:Undo of
 * such a like; an import, an as:Add of the deck (where to is left out).
 */

/** A like in the user's instance: an as:Like without an actor (the pod is theirs). */
export function libraryLikeToRecord(like: LibraryLike): LikeActivityV1 {
  return { deck: like.deckUrl, published: like.likedAt, announced: like.announced };
}

/**
 * A like read from the user's instance; null without a time (one this
 * app did not write). Not stated as announced, it is not: the library is
 * told (again), which counts it once all the same.
 */
export function libraryLikeFromRecord(data: LikeActivityV1): LibraryLike | null {
  if (data.published === undefined) return null;
  return { deckUrl: data.deck, likedAt: data.published, announced: data.announced ?? false };
}

/** A notice's activities: the one sent, and for an undo the like it undoes. */
export type NoticeRecords =
  | { kind: "like"; like: LikeActivityV1 }
  | { kind: "undo"; undo: UndoActivityV1; like: LikeActivityV1 }
  | { kind: "add"; add: AddActivityV1 };

/** A notice as activities; an undo names the like it undoes by `likeIri`. */
export function noticeToRecords(notice: LibraryNotice, likeIri: string): NoticeRecords {
  const { by: actor, deckUrl: deck, at: published } = notice;
  switch (notice.action) {
    case "like":
      return { kind: "like", like: { actor, deck, published } };
    case "unlike":
      return { kind: "undo", undo: { actor, like: likeIri, published }, like: { actor, deck } };
    case "import":
      return { kind: "add", add: { actor, deck, published } };
  }
}

/** The notice the activities say; null for a like that does not say who gave it or when. */
export function noticeFromRecords(records: NoticeRecords): LibraryNotice | null {
  switch (records.kind) {
    case "like": {
      const { actor, deck, published } = records.like;
      if (actor === undefined || published === undefined) return null;
      return { action: "like", by: actor, deckUrl: deck, at: published };
    }
    case "undo":
      return { action: "unlike", by: records.undo.actor, deckUrl: records.like.deck, at: records.undo.published };
    case "add":
      return { action: "import", by: records.add.actor, deckUrl: records.add.deck, at: records.add.published };
  }
}
