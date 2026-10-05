import { describe, expect, it } from "vitest";
import type { LibraryDeck } from "./library";
import {
  likeIdOf,
  NO_LIBRARY_STATS,
  sortLibraryDecks,
  statsOf,
  type LibraryStats,
} from "./libraryStats";

const INDEX = "https://solid-memo.com/decks/index.ttl";
const FLAGS = `${INDEX}#world-flags`;

const deck = (name: string) => ({ seriesUrl: `${INDEX}#${name}` }) as LibraryDeck;

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
