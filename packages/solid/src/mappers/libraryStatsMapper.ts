import {
  asUrl,
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
import type { DeckStats, LibraryLike, LibraryNotice, LibraryStats } from "@solid-memo/domain/libraryStats";
import {
  libraryLikeFromRecord,
  libraryLikeToRecord,
  noticeFromRecords,
  noticeToRecords,
} from "@solid-memo/domain/libraryStatsRecord";
import { ADD_ACTIVITY_V1, LIKE_ACTIVITY_V1, UNDO_ACTIVITY_V1 } from "@solid-memo/vocab/descriptors.generated";
import { readVersioned, recordThing } from "../records";
import { DCAT, DCTERMS, LDP, RDF, SCHEMA, SM } from "../vocab";

/**
 * Likes, notices and the library's statistics in standard vocabularies
 * (docs/library-stats.md): ActivityStreams activities, and schema.org
 * interaction counters.
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
 * not fit its shape is left out. The inbox's notices as its owner reads
 * them back (the library's own counter is another repository).
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

/** The library's catalogue in its index: the subject typed dcat:Catalog, which the build writes as the index itself. */
function catalogOf(index: SolidDataset): Thing | undefined {
  return getThingAll(index).find((thing) => getUrlAll(thing, RDF.type).includes(DCAT.Catalog));
}

/** The inbox the library's index names on its catalogue; null when it names none. */
export function toLibraryInboxUrl(index: SolidDataset): string | null {
  const catalog = catalogOf(index);
  return catalog === undefined ? null : getUrl(catalog, LDP.inbox);
}

/** The statistics document the library's index names on its catalogue, beside its inbox; null when it names none. */
export function toLibraryStatsUrl(index: SolidDataset): string | null {
  const catalog = catalogOf(index);
  return catalog === undefined ? null : getUrl(catalog, SM.libraryStats);
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
