import { describe, expect, it } from "vitest";
import { buildThing, createThing, getSolidDataset, mockSolidDatasetFrom, setThing, type SolidDataset } from "@inrupt/solid-client";
import type { LibraryNotice } from "@solid-memo/domain/libraryStats";
import {
  toLibraryLike,
  toLibraryLikeThing,
  toLibraryStats,
  toNotices,
  toNoticeThings,
} from "./libraryStatsMapper";
import { AS, RDF, SCHEMA, SM } from "../vocab";

const INDEX = "https://solid-memo.com/decks/index.ttl";
const STATS = "https://pod.solid-memo.com/library/stats.ttl";
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

describe("the library's statistics", () => {
  const PUBLISHED = "https://pod.solid-memo.com/library/stats.ttl";
  const read = (url: string, turtle: string) =>
    getSolidDataset(url, {
      fetch: async () => Object.defineProperty(new Response(turtle, { headers: { "Content-Type": "text/turtle" } }), "url", { value: url }),
    });

  it("are read from the document the library's inbox processor publishes, its decks named absolutely", async () => {
    const turtle = `
@prefix dcterms: <http://purl.org/dc/terms/>.
@prefix schema: <https://schema.org/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
<> dcterms:modified "2026-10-05T06:00:00.000Z"^^xsd:dateTime.
<https://solid-memo.com/decks/index.ttl#world-flags> schema:interactionStatistic <#world-flags-likes>, <#world-flags-downloads>.
<#world-flags-likes> a schema:InteractionCounter; schema:interactionType schema:LikeAction; schema:userInteractionCount 2.
<#world-flags-downloads> a schema:InteractionCounter; schema:interactionType schema:DownloadAction; schema:userInteractionCount 7.
`;
    expect(toLibraryStats(await read(PUBLISHED, turtle), PUBLISHED)).toEqual({
      countedAt: "2026-10-05T06:00:00.000Z",
      decks: { [FLAGS]: { likes: 2, downloads: 7 } },
    });
  });

  it("leave out when they were counted when it is not said", async () => {
    expect(toLibraryStats(await read(PUBLISHED, ""), PUBLISHED)).toEqual({ decks: {} });
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
