import {
  createSolidDataset,
  getThing,
  getThingAll,
  removeThing,
  setThing,
  type SolidDataset,
} from "@inrupt/solid-client";
import type { LibraryLikeRepository } from "@solid-memo/application/ports";
import { likesUrlOf } from "@solid-memo/domain/instanceLayout";
import { likeIdOf } from "@solid-memo/domain/libraryStats";
import { getSolidDatasetOrNull, PreconditionFailedError, saveDataset } from "./datasets";
import { toLibraryLike, toLibraryLikeThing } from "./mappers/libraryStatsMapper";
import { noWriteCheck, type WriteCheck } from "./writeCheck";

/** A change of the likes document as read: what to write and the subjects it writes; null when nothing is to change. */
type Edit = (dataset: SolidDataset) => { dataset: SolidDataset; subjects: string[] } | null;

/** Tries at a change of the likes document while another tab or device changes it too. */
const ATTEMPTS = 3;

/**
 * The user's likes of library decks, in the instance's likes document
 * (docs/data-model.md): one subject per liked deck, `#like-<name>`. Each
 * change reads the document and writes it whole (a PUT), only if it is
 * unchanged since, trying again when it was not: node-solid-server
 * keeps a boolean as 1 or 0, so a PATCH deleting `"false"^^xsd:boolean`
 * finds nothing to delete there (409). The document is small. Read leniently: a like that does not
 * fit its shape is left out.
 */
export function createSolidLibraryLikeRepository({
  fetch,
  checkWrite = noWriteCheck,
}: {
  fetch: typeof globalThis.fetch;
  checkWrite?: WriteCheck;
}): LibraryLikeRepository {
  async function change(instanceUrl: string, edit: Edit): Promise<void> {
    const url = likesUrlOf(instanceUrl);
    for (let attempt = 1; ; attempt++) {
      const edited = edit((await getSolidDatasetOrNull(url, fetch)) ?? createSolidDataset());
      if (edited === null) return;
      try {
        await checkWrite(edited.dataset, edited.subjects);
        await saveDataset(url, edited.dataset, fetch, { whole: true });
        return;
      } catch (error) {
        if (!(error instanceof PreconditionFailedError) || attempt === ATTEMPTS) throw error;
      }
    }
  }

  return {
    async listLikes(instanceUrl) {
      const dataset = await getSolidDatasetOrNull(likesUrlOf(instanceUrl), fetch);
      if (dataset === null) return [];
      return getThingAll(dataset).flatMap((thing) => toLibraryLike(thing) ?? []);
    },

    saveLike(instanceUrl, like) {
      return change(instanceUrl, (dataset) => {
        const url = `${likesUrlOf(instanceUrl)}#${likeIdOf(like.deckUrl)}`;
        return { dataset: setThing(dataset, toLibraryLikeThing(url, like, getThing(dataset, url))), subjects: [url] };
      });
    },

    removeLike(instanceUrl, deckUrl) {
      return change(instanceUrl, (dataset) => {
        const thing = getThing(dataset, `${likesUrlOf(instanceUrl)}#${likeIdOf(deckUrl)}`);
        return thing === null ? null : { dataset: removeThing(dataset, thing), subjects: [] };
      });
    },
  };
}
