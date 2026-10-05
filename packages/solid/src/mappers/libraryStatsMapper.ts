import {
  asUrl,
  buildThing,
  createThing,
  getDatetime,
  getInteger,
  getThing,
  getThingAll,
  getUrl,
  getUrlAll,
  type SolidDataset,
  type Thing,
  type ThingPersisted,
} from "@inrupt/solid-client";
import { migrate } from "@solid-memo/domain/shapes/migrations";
import {
  tallyNotices,
  type DeckStats,
  type LibraryLike,
  type LibraryNotice,
  type LibraryStats,
  type Tally,
} from "@solid-memo/domain/libraryStats";
import {
  libraryLikeFromRecord,
  libraryLikeToRecord,
  noticeFromRecords,
  noticeToRecords,
} from "@solid-memo/domain/libraryStatsRecord";
import { ADD_ACTIVITY_V1, LIKE_ACTIVITY_V1, UNDO_ACTIVITY_V1 } from "@solid-memo/vocab/descriptors.generated";
import { turtleOfThings } from "../datasets";
import { readVersioned, recordThing } from "../records";
import { DCAT, DCTERMS, LDP, RDF, SCHEMA } from "../vocab";

/**
 * Likes, notices, the counter's tally and the library's statistics in
 * standard vocabularies (docs/library-stats.md): ActivityStreams
 * activities, and schema.org interaction counters.
 */

/** A like in the instance's likes document; null when it is not an as:Like this app can use. */
export function toLibraryLike(thing: Thing): LibraryLike | null {
  const read = readVersioned(thing, "likeActivity");
  if (read === null) return null;
  return libraryLikeFromRecord(migrate("likeActivity", read.record, { subject: asUrl(thing) }));
}

/** A like as this app writes it, in place when it exists. */
export function toLibraryLikeThing(url: string, like: LibraryLike, existing: ThingPersisted | null): ThingPersisted {
  return recordThing(url, LIKE_ACTIVITY_V1, libraryLikeToRecord(like), existing);
}

/** A notice's subjects: the activity at `url`, and for an unlike the like it undoes at `likeUrl`. */
export function toNoticeThings(url: string, likeUrl: string, notice: LibraryNotice): ThingPersisted[] {
  const records = noticeToRecords(notice, likeUrl);
  switch (records.kind) {
    case "like":
      return [recordThing(url, LIKE_ACTIVITY_V1, records.like, null)];
    case "undo":
      return [recordThing(url, UNDO_ACTIVITY_V1, records.undo, null), recordThing(likeUrl, LIKE_ACTIVITY_V1, records.like, null)];
    case "add":
      return [recordThing(url, ADD_ACTIVITY_V1, records.add, null)];
  }
}

/**
 * Every notice a document's activities say: each as:Undo of an as:Like
 * in the document, each as:Add, and each as:Like that says who gave it
 * and when (a like an undo names says neither). An activity that does
 * not fit its shape is left out.
 */
export function toNotices(dataset: SolidDataset): LibraryNotice[] {
  const notices: LibraryNotice[] = [];
  const likeOf = (thing: Thing | null) => {
    const read = thing === null ? null : readVersioned(thing, "likeActivity");
    return read === null ? null : migrate("likeActivity", read.record, { subject: asUrl(thing!) });
  };
  for (const thing of getThingAll(dataset)) {
    const subject = { subject: asUrl(thing) };
    const undo = readVersioned(thing, "undoActivity");
    const add = readVersioned(thing, "addActivity");
    const like = likeOf(thing);
    let notice: LibraryNotice | null = null;
    if (undo !== null) {
      const record = migrate("undoActivity", undo.record, subject);
      const undone = likeOf(getThing(dataset, record.like));
      notice = undone === null ? null : noticeFromRecords({ kind: "undo", undo: record, like: undone });
    } else if (add !== null) {
      notice = noticeFromRecords({ kind: "add", add: migrate("addActivity", add.record, subject) });
    } else if (like !== null) {
      notice = noticeFromRecords({ kind: "like", like });
    }
    if (notice !== null) notices.push(notice);
  }
  return notices;
}

/** The inbox the library's index names on its catalogue; null when it names none. */
export function toLibraryInboxUrl(index: SolidDataset): string | null {
  const catalog = getThingAll(index).find((thing) => getUrlAll(thing, RDF.type).includes(DCAT.Catalog));
  return catalog === undefined ? null : getUrl(catalog, LDP.inbox);
}

/** Where the counter names a person in its tally: by their key, a fragment of the tally's document. */
function personUrl(stateUrl: string, person: string): string {
  return `${stateUrl}#person-${person}`;
}

/**
 * The counter's tally as activities: for each person and deck, their
 * latest as:Like or as:Undo of one, and an as:Add of their first import,
 * each by the person's key, never their WebID.
 */
export function toTallyThings(stateUrl: string, tally: Tally): ThingPersisted[] {
  return tally.flatMap((entry, n) => {
    const by = personUrl(stateUrl, entry.person);
    const things: ThingPersisted[] = [];
    if (entry.like !== undefined) {
      const notice: LibraryNotice = { action: entry.like.liked ? "like" : "unlike", by, deckUrl: entry.deckUrl, at: entry.like.at };
      things.push(...toNoticeThings(`${stateUrl}#e${n}-like`, `${stateUrl}#e${n}-undone`, notice));
    }
    if (entry.importedAt !== undefined) {
      const notice: LibraryNotice = { action: "import", by, deckUrl: entry.deckUrl, at: entry.importedAt };
      things.push(...toNoticeThings(`${stateUrl}#e${n}-add`, `${stateUrl}#e${n}-add`, notice));
    }
    return things;
  });
}

/** The tally the counter kept: its activities counted again, by people named by their key. */
export function toTally(dataset: SolidDataset, stateUrl: string): Tally {
  const prefix = personUrl(stateUrl, "");
  return tallyNotices(
    [],
    toNotices(dataset)
      .filter((notice) => notice.by.startsWith(prefix))
      .map((notice) => ({ person: notice.by.slice(prefix.length), notice })),
  );
}

/**
 * The library's statistics document (docs/library-stats.md): each deck
 * series' schema:interactionStatistic, a schema:InteractionCounter of
 * schema:LikeAction or schema:DownloadAction with its
 * schema:userInteractionCount, and when they were counted
 * (dcterms:modified on the document). A count that is missing or below
 * nought is nought.
 */
export function toLibraryStats(dataset: SolidDataset, url: string): LibraryStats {
  const decks: Record<string, DeckStats> = {};
  for (const thing of getThingAll(dataset)) {
    const counters = getUrlAll(thing, SCHEMA.interactionStatistic);
    if (counters.length === 0) continue;
    const stats = { likes: 0, downloads: 0 };
    for (const counterUrl of counters) {
      const counter = getThing(dataset, counterUrl);
      if (counter === null) continue;
      const count = Math.max(getInteger(counter, SCHEMA.userInteractionCount) ?? 0, 0);
      const type = getUrl(counter, SCHEMA.interactionType);
      if (type === SCHEMA.LikeAction) stats.likes = count;
      if (type === SCHEMA.DownloadAction) stats.downloads = count;
    }
    decks[asUrl(thing)] = stats;
  }
  const document = getThing(dataset, url);
  const countedAt = document === null ? null : getDatetime(document, DCTERMS.modified);
  return countedAt === null ? { decks } : { countedAt: countedAt.toISOString(), decks };
}

/**
 * The statistics as the subjects of the document published beside the
 * index, stats.ttl at `statsUrl`: each deck of the index (others are
 * left out) with its two counters, `#<name>-likes` and
 * `#<name>-downloads`.
 */
export function toLibraryStatsThings(stats: LibraryStats, indexUrl: string, statsUrl: string): ThingPersisted[] {
  const things: ThingPersisted[] = [];
  if (stats.countedAt !== undefined) {
    things.push(buildThing(createThing({ url: statsUrl })).addDatetime(DCTERMS.modified, new Date(stats.countedAt)).build());
  }
  for (const deckUrl of Object.keys(stats.decks).sort()) {
    if (!deckUrl.startsWith(`${indexUrl}#`)) continue;
    const name = deckUrl.slice(indexUrl.length + 1).replace(/[^A-Za-z0-9._-]/g, "-");
    const counters = [
      { url: `${statsUrl}#${name}-likes`, type: SCHEMA.LikeAction, count: stats.decks[deckUrl]!.likes },
      { url: `${statsUrl}#${name}-downloads`, type: SCHEMA.DownloadAction, count: stats.decks[deckUrl]!.downloads },
    ];
    const deck = buildThing(createThing({ url: deckUrl }));
    for (const counter of counters) {
      deck.addIri(SCHEMA.interactionStatistic, counter.url);
      things.push(
        buildThing(createThing({ url: counter.url }))
          .addIri(RDF.type, SCHEMA.InteractionCounter)
          .addIri(SCHEMA.interactionType, counter.type)
          .addInteger(SCHEMA.userInteractionCount, counter.count)
          .build(),
      );
    }
    things.push(deck.build());
  }
  return things;
}

/**
 * The statistics as the Turtle file published beside the index,
 * stats.ttl, every IRI of the site's library written relative to it
 * (`<index.ttl#name>`, `<stats.ttl#name-likes>`), so the same file
 * serves wherever the site is.
 */
export function toLibraryStatsTurtle(stats: LibraryStats, indexUrl: string): string {
  const folder = new URL("./", indexUrl).href;
  return turtleOfThings(toLibraryStatsThings(stats, indexUrl, `${folder}stats.ttl`), folder);
}
