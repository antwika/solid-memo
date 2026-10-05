import { describe, expect, it } from "vitest";
import type { LibraryDeck } from "./library";
import {
  likeIdOf,
  NO_LIBRARY_STATS,
  sortLibraryDecks,
  statsOf,
  statsOfTally,
  tallyNotices,
  type LibraryNotice,
  type LibraryStats,
} from "./libraryStats";

const INDEX = "https://solid-memo.com/decks/index.ttl";
const FLAGS = `${INDEX}#world-flags`;
const CAPITALS = `${INDEX}#capitals-of-the-world`;

const deck = (name: string) => ({ seriesUrl: `${INDEX}#${name}` }) as LibraryDeck;

function notice(action: LibraryNotice["action"], deckUrl: string, at: string): LibraryNotice {
  return { action, by: "https://alice.example/#me", deckUrl, at };
}

describe("statsOf", () => {
  it("counts nought of each for a deck the statistics do not name", () => {
    expect(statsOf(NO_LIBRARY_STATS, FLAGS)).toEqual({ likes: 0, downloads: 0 });
    expect(statsOf({ decks: { [FLAGS]: { likes: 2, downloads: 5 } } }, FLAGS)).toEqual({ likes: 2, downloads: 5 });
  });
});

describe("likeIdOf", () => {
  it("names the like by the series' name, any other character a dash", () => {
    expect(likeIdOf(FLAGS)).toBe("like-world-flags");
    expect(likeIdOf(`${INDEX}#a b/c`)).toBe("like-a-b-c");
  });
});

describe("sortLibraryDecks", () => {
  const decks = [deck("a"), deck("b"), deck("c")];
  const stats: LibraryStats = {
    decks: { [`${INDEX}#b`]: { likes: 1, downloads: 9 }, [`${INDEX}#c`]: { likes: 4, downloads: 9 } },
  };
  const names = (list: LibraryDeck[]) => list.map((d) => d.seriesUrl.slice(INDEX.length + 1));

  it("keeps the index's order, or puts the most imported or the most liked first, ties as the index has them", () => {
    expect(names(sortLibraryDecks(decks, stats, "library"))).toEqual(["a", "b", "c"]);
    expect(names(sortLibraryDecks(decks, stats, "downloads"))).toEqual(["b", "c", "a"]);
    expect(names(sortLibraryDecks(decks, stats, "likes"))).toEqual(["c", "b", "a"]);
  });

  it("returns a new list", () => {
    expect(sortLibraryDecks(decks, stats, "library")).not.toBe(decks);
  });
});

describe("tallyNotices", () => {
  it("counts a person once per deck, however often they import it", () => {
    const tally = tallyNotices([], [
      { person: "p1", notice: notice("import", FLAGS, "2026-10-05T10:00:00Z") },
      { person: "p1", notice: notice("import", FLAGS, "2026-10-05T11:00:00Z") },
      { person: "p2", notice: notice("import", FLAGS, "2026-10-05T11:00:00Z") },
      { person: "p1", notice: notice("import", CAPITALS, "2026-10-05T11:00:00Z") },
    ]);
    expect(statsOfTally(tally, "2026-10-05T12:00:00Z")).toEqual({
      countedAt: "2026-10-05T12:00:00Z",
      decks: { [FLAGS]: { likes: 0, downloads: 2 }, [CAPITALS]: { likes: 0, downloads: 1 } },
    });
  });

  it("keeps when a person first imported a deck", () => {
    const tally = tallyNotices([], [
      { person: "p1", notice: notice("import", FLAGS, "2026-10-05T11:00:00Z") },
      { person: "p1", notice: notice("import", FLAGS, "2026-10-05T10:00:00Z") },
      { person: "p1", notice: notice("import", FLAGS, "2026-10-05T12:00:00Z") },
    ]);
    expect(tally).toEqual([{ person: "p1", deckUrl: FLAGS, importedAt: "2026-10-05T10:00:00Z" }]);
  });

  it("lets a person's latest like or unlike win, in whatever order the notices come", () => {
    const tally = tallyNotices([], [
      { person: "p1", notice: notice("unlike", FLAGS, "2026-10-05T11:00:00Z") },
      { person: "p1", notice: notice("like", FLAGS, "2026-10-05T10:00:00Z") },
      { person: "p2", notice: notice("like", FLAGS, "2026-10-05T10:00:00Z") },
      { person: "p2", notice: notice("unlike", FLAGS, "2026-10-05T10:30:00Z") },
      { person: "p2", notice: notice("like", FLAGS, "2026-10-05T11:30:00Z") },
    ]);
    expect(statsOfTally(tally, "2026-10-05T12:00:00Z").decks[FLAGS]).toEqual({ likes: 1, downloads: 0 });
  });

  it("builds on an earlier tally, and counting the same notices again changes nothing", () => {
    const notices = [
      { person: "p1", notice: notice("like", FLAGS, "2026-10-05T10:00:00Z") },
      { person: "p1", notice: notice("import", FLAGS, "2026-10-05T10:00:00Z") },
    ];
    const once = tallyNotices([], notices);
    expect(tallyNotices(once, notices)).toEqual(once);
    expect(once).toEqual([{ person: "p1", deckUrl: FLAGS, importedAt: "2026-10-05T10:00:00Z", like: { liked: true, at: "2026-10-05T10:00:00Z" } }]);
    const later = tallyNotices(once, [{ person: "p1", notice: notice("unlike", FLAGS, "2026-10-06T10:00:00Z") }]);
    expect(statsOfTally(later, "2026-10-06T12:00:00Z").decks[FLAGS]).toEqual({ likes: 0, downloads: 1 });
  });
});
