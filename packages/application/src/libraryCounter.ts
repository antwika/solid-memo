import {
  statsOfTally,
  tallyNotices,
  type LibraryNotice,
  type LibraryStats,
} from "@solid-memo/domain/libraryStats";
import type { LibraryCounterStore } from "./ports";

export interface LibraryCounterDeps {
  store: LibraryCounterStore;
  /** The inbox the app sends notices to (the library's ldp:inbox). */
  inboxUrl: string;
  /** Where the counter keeps its tally: private, as it names people (by key). */
  stateUrl: string;
  /** The library's index: only notices about its decks (`<index>#<name>`) count. */
  indexUrl: string;
  /** The key a person is counted by: derived from their WebID, never the WebID itself. */
  personKey: (webId: string) => string;
  /** Whether a URL is a WebID: its profile can be read. Asked once per person. */
  isWebId: (webId: string) => Promise<boolean>;
  now: () => Date;
}

export interface CountOutcome {
  stats: LibraryStats;
  /** Notices counted in this run. */
  counted: number;
  /** Notices left out: not one, about no deck of the library, or not from a WebID. */
  dropped: number;
}

/**
 * Count the inbox's notices into the library's statistics
 * (docs/library-stats.md): read each notice, count those about the
 * library's decks from people with a WebID into the kept tally, save
 * it, and only then delete the notices read. Should a run stop
 * half-way, the next counts the notices left again, which changes
 * nothing (tallyNotices).
 */
export async function countLibraryNotices({
  store,
  inboxUrl,
  stateUrl,
  indexUrl,
  personKey,
  isWebId,
  now,
}: LibraryCounterDeps): Promise<CountOutcome> {
  const kept = await store.readTally(stateUrl);
  // Everyone in the tally was found to have a WebID when first counted.
  const people = new Set(kept.map((entry) => entry.person));
  const urls = await store.listNotices(inboxUrl);
  const notices: { person: string; notice: LibraryNotice }[] = [];
  for (const url of urls) {
    const notice = await store.readNotice(url);
    if (notice === null || !notice.deckUrl.startsWith(`${indexUrl}#`) || !notice.by.startsWith("https://")) continue;
    const person = personKey(notice.by);
    if (!people.has(person)) {
      if (!(await isWebId(notice.by))) continue;
      people.add(person);
    }
    notices.push({ person, notice });
  }
  const tally = tallyNotices(kept, notices);
  await store.saveTally(stateUrl, tally);
  for (const url of urls) await store.deleteNotice(url);
  return { stats: statsOfTally(tally, now().toISOString()), counted: notices.length, dropped: urls.length - notices.length };
}
