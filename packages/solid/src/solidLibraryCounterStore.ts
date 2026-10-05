import { deleteFile, getContainedResourceUrlAll, getSolidDataset } from "@inrupt/solid-client";
import type { LibraryCounterStore } from "@solid-memo/application/ports";
import { turtleOfThings } from "./datasets";
import { toNotices, toTally, toTallyThings } from "./mappers/libraryStatsMapper";

/**
 * The library counter's inbox and tally on the library's own pod
 * (docs/library-stats.md), read and written as the counter's agent. The
 * tally is a Turtle document of ActivityStreams activities by people
 * named by their key. Every read is made afresh, not through the shared
 * reads (datasets.ts): the counter changes the inbox and the tally
 * itself, which a server whose ETags count whole seconds (Community
 * Solid Server 6) may still call unchanged. Its errors are the
 * counter's own, never shown in the app: plain Errors.
 */
export function createSolidLibraryCounterStore({ fetch }: { fetch: typeof globalThis.fetch }): LibraryCounterStore {
  /** The document; null when there is none. */
  async function read(url: string) {
    try {
      return await getSolidDataset(url, { fetch });
    } catch (error) {
      if ((error as { statusCode?: number }).statusCode === 404) return null;
      throw error;
    }
  }

  return {
    /** Only the documents directly in the inbox are notices. */
    async listNotices(inboxUrl) {
      const inbox = await read(inboxUrl);
      if (inbox === null) return [];
      return getContainedResourceUrlAll(inbox)
        .filter((url) => url.startsWith(inboxUrl) && url !== inboxUrl && !url.endsWith("/"))
        .sort();
    },

    async readNotice(url) {
      const dataset = await read(url);
      return dataset === null ? null : (toNotices(dataset)[0] ?? null);
    },

    async deleteNotice(url) {
      try {
        await deleteFile(url, { fetch });
      } catch (error) {
        if ((error as { statusCode?: number }).statusCode !== 404) throw error;
      }
    },

    async readTally(url) {
      const dataset = await read(url);
      return dataset === null ? [] : toTally(dataset, url);
    },

    async saveTally(url, tally) {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "text/turtle" },
        body: turtleOfThings(toTallyThings(url, tally), url),
      });
      if (!response.ok) throw new Error(`Saving the counter's tally at ${url} failed: ${response.status}.`);
    },
  };
}
