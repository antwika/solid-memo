import { getSolidDataset, getThingAll } from "@inrupt/solid-client";
import type { DeckLibrary } from "../../application/ports";
import type { LibraryDeck } from "../../domain/library";
import { toLibraryDeck, toLibraryDeckContent } from "./mappers/libraryMapper";

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
 * worth showing, not an empty library.
 */
export function createSolidDeckLibrary({
  fetch,
  indexUrl,
}: SolidDeckLibraryDeps): DeckLibrary {
  return {
    async listLibraryDecks(): Promise<LibraryDeck[]> {
      const index = await getSolidDataset(indexUrl, { fetch });
      return getThingAll(index)
        .map(toLibraryDeck)
        .filter((deck): deck is LibraryDeck => deck !== null);
    },

    async fetchLibraryDeck(url) {
      return toLibraryDeckContent(url, await getSolidDataset(url, { fetch }));
    },
  };
}
