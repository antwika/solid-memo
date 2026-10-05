import { getSolidDataset } from "@inrupt/solid-client";
import type { DeckLibrary } from "@solid-memo/application/ports";
import type { LibraryDeck } from "@solid-memo/domain/library";
import { NO_LIBRARY_STATS } from "@solid-memo/domain/libraryStats";
import { toLibraryDeckContent, toLibraryDecks } from "./mappers/libraryMapper";
import { toLibraryInboxUrl, toLibraryStats } from "./mappers/libraryStatsMapper";

export interface SolidDeckLibraryDeps {
  /**
   * Plain fetch: the library is static, public Turtle published next to
   * the app (docs/deck-library.md), not a Solid resource, so no
   * authentication is involved.
   */
  fetch: typeof globalThis.fetch;
  /** URL of the library's index document. */
  indexUrl: string;
}

/**
 * Reads the deck library through its index. The build always publishes
 * an index (empty when there are no decks), so a failed read is an error
 * worth showing, not an empty library. Its statistics are published
 * beside the index, stats.ttl, when they have been counted
 * (docs/library-stats.md): without them the library still works.
 */
export function createSolidDeckLibrary({
  fetch,
  indexUrl,
}: SolidDeckLibraryDeps): DeckLibrary {
  return {
    async listLibraryDecks(): Promise<LibraryDeck[]> {
      return toLibraryDecks(await getSolidDataset(indexUrl, { fetch }));
    },

    async fetchLibraryDeck(url) {
      return toLibraryDeckContent(url, await getSolidDataset(url, { fetch }));
    },

    async libraryStats() {
      const url = new URL("stats.ttl", indexUrl).href;
      try {
        return toLibraryStats(await getSolidDataset(url, { fetch }), url);
      } catch {
        return NO_LIBRARY_STATS;
      }
    },

    async inboxUrl() {
      return toLibraryInboxUrl(await getSolidDataset(indexUrl, { fetch }));
    },
  };
}
