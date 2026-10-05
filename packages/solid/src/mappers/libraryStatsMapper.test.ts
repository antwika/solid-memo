import { describe, expect, it } from "vitest";
import { buildThing, createThing, getSolidDataset, mockSolidDatasetFrom, setThing, type SolidDataset } from "@inrupt/solid-client";
import type { LibraryNotice } from "@solid-memo/domain/libraryStats";
import {
  toLibraryLike,
  toLibraryLikeThing,
  toLibraryStats,
  toLibraryStatsTurtle,
  toNotices,
  toNoticeThings,
  toTally,
  toTallyThings,
} from "./libraryStatsMapper";
import { AS, RDF, SCHEMA, SM } from "../vocab";

const INDEX = "https://solid-memo.com/decks/index.ttl";
const STATS = "https://solid-memo.com/decks/stats.ttl";
const FLAGS = `${INDEX}#world-flags`;
const ALICE = "https://alice.example/profile/card#me";
const AT = "2026-10-05T10:00:00.000Z";
const DOC = "https://library.example/inbox/n1";

const datasetOf = (url: string, things: readonly ReturnType<typeof createThing>[]): SolidDataset =>
  things.reduce((dataset, thing) => setThing(dataset, thing), mockSolidDatasetFrom(url) as SolidDataset);

const notice = (action: LibraryNotice["action"], by = ALICE): LibraryNotice => ({ action, by, deckUrl: FLAGS, at: AT });

describe("a like in the user's instance", () => {
  it("is an as:Like, read back as written", () => {
    const like = { deckUrl: FLAGS, likedAt: AT, announced: true };
    const thing = toLibraryLikeThing("https://pod.example/i/likes.ttl#like-world-flags", like, null);
    expect(thing.predicates[RDF.type]!.namedNodes).toEqual([AS.Like]);
    expect(toLibraryLike(thing)).toEqual(like);
  });

  it("is null for a subject of another kind", () => {
    const thing = buildThing(createThing({ url: "https://pod.example/x#y" })).addIri(RDF.type, SM.Card).build();
    expect(toLibraryLike(thing)).toBeNull();
  });
});

describe("notices", () => {
  it.each(["like", "unlike", "import"] as const)("of a%s read back as written", (action) => {
    const things = toNoticeThings(`${DOC}#notice`, `${DOC}#like`, notice(action));
    expect(toNotices(datasetOf(DOC, things))).toEqual([notice(action)]);
  });

  it("are an as:Undo of an as:Like for an unlike, an as:Add for an import", () => {
    const [undo, like] = toNoticeThings(`${DOC}#notice`, `${DOC}#like`, notice("unlike"));
    expect(undo!.predicates[RDF.type]!.namedNodes).toEqual([AS.Undo]);
    expect(undo!.predicates[AS.object]!.namedNodes).toEqual([`${DOC}#like`]);
    expect(like!.predicates[RDF.type]!.namedNodes).toEqual([AS.Like]);
    const [add] = toNoticeThings(`${DOC}#notice`, `${DOC}#like`, notice("import"));
    expect(add!.predicates[RDF.type]!.namedNodes).toEqual([AS.Add]);
  });

  it("leave out an undo whose like is not in the document, and what is no activity", () => {
    const [undo] = toNoticeThings(`${DOC}#notice`, `${DOC}#like`, notice("unlike"));
    const other = buildThing(createThing({ url: `${DOC}#x` })).addIri(RDF.type, SM.Card).build();
    expect(toNotices(datasetOf(DOC, [undo!, other]))).toEqual([]);
  });
});

describe("the counter's tally", () => {
  const STATE = "https://library.example/private/state.ttl";

  it("is kept as activities by people named by their key, and read back as kept", () => {
    const tally = [
      { person: "p1", deckUrl: FLAGS, like: { liked: true, at: AT }, importedAt: AT },
      { person: "p2", deckUrl: FLAGS, like: { liked: false, at: AT } },
      { person: "p3", deckUrl: FLAGS, importedAt: AT },
    ];
    const things = toTallyThings(STATE, tally);
    expect(things.map((thing) => thing.predicates[RDF.type]!.namedNodes![0])).toEqual([AS.Like, AS.Add, AS.Undo, AS.Like, AS.Add]);
    expect(JSON.stringify(things)).not.toContain("alice");
    expect(toTally(datasetOf(STATE, things), STATE)).toEqual(tally);
  });

  it("leaves out activities by anyone not named by a key", () => {
    const things = toNoticeThings(`${STATE}#x`, `${STATE}#y`, notice("like"));
    expect(toTally(datasetOf(STATE, things), STATE)).toEqual([]);
  });
});

describe("the library's statistics", () => {
  it("are written as schema.org interaction counters relative to the library, and read back", async () => {
    const stats = {
      countedAt: "2026-10-05T06:00:00.000Z",
      decks: {
        [FLAGS]: { likes: 2, downloads: 7 },
        [`${INDEX}#capitals`]: { likes: 0, downloads: 1 },
        "https://elsewhere.example/decks/index.ttl#x": { likes: 9, downloads: 9 },
      },
    };
    const turtle = toLibraryStatsTurtle(stats, INDEX);
    expect(turtle).toContain(`<index.ttl#world-flags> <${SCHEMA.interactionStatistic}> <stats.ttl#world-flags-likes> .`);
    expect(turtle).toContain(`<stats.ttl#world-flags-likes> <${SCHEMA.interactionType}> <${SCHEMA.LikeAction}> .`);
    const elsewhere = "https://mirror.example/decks/stats.ttl";
    const dataset = await getSolidDataset(elsewhere, {
      fetch: async () => Object.defineProperty(new Response(turtle, { headers: { "Content-Type": "text/turtle" } }), "url", { value: elsewhere }),
    });
    expect(toLibraryStats(dataset, elsewhere)).toEqual({
      countedAt: stats.countedAt,
      decks: {
        "https://mirror.example/decks/index.ttl#world-flags": { likes: 2, downloads: 7 },
        "https://mirror.example/decks/index.ttl#capitals": { likes: 0, downloads: 1 },
      },
    });
  });

  it("leave out when they were counted when it is not known", () => {
    expect(toLibraryStatsTurtle({ decks: {} }, INDEX)).not.toContain("modified");
  });

  it("count a missing, negative or unknown counter as nought", () => {
    const counter = (url: string, type: string, count?: number) => {
      const built = buildThing(createThing({ url })).addIri(SCHEMA.interactionType, type);
      return (count === undefined ? built : built.addInteger(SCHEMA.userInteractionCount, count)).build();
    };
    const deck = buildThing(createThing({ url: FLAGS }))
      .addIri(SCHEMA.interactionStatistic, `${STATS}#a`)
      .addIri(SCHEMA.interactionStatistic, `${STATS}#b`)
      .addIri(SCHEMA.interactionStatistic, `${STATS}#c`)
      .addIri(SCHEMA.interactionStatistic, `${STATS}#gone`)
      .build();
    const dataset = datasetOf(STATS, [
      deck,
      counter(`${STATS}#a`, SCHEMA.LikeAction),
      counter(`${STATS}#b`, SCHEMA.DownloadAction, -3),
      counter(`${STATS}#c`, "https://schema.org/ShareAction", 5),
    ]);
    expect(toLibraryStats(dataset, STATS)).toEqual({ decks: { [FLAGS]: { likes: 0, downloads: 0 } } });
  });
});
