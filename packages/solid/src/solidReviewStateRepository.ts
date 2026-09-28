import {
  createSolidDataset,
  getThing,
  getThingAll,
  removeThing,
  setThing,
} from "@inrupt/solid-client";
import type { ReviewStateRepository } from "@solid-memo/application/ports";
import type { ReviewState } from "@solid-memo/domain/review";
import { getSolidDatasetOrNull, saveDataset } from "./datasets";
import { noWriteCheck, type WriteCheck } from "./writeCheck";
import {
  reviewSubjectUrl,
  toReviewState,
  toReviewStateThing,
} from "./mappers/reviewStateMapper";

export interface SolidReviewStateRepositoryDeps {
  fetch: typeof globalThis.fetch;
  /** Checks what is about to be written; see writeCheck.ts. */
  checkWrite?: WriteCheck;
}

export function createSolidReviewStateRepository({
  fetch,
  checkWrite = noWriteCheck,
}: SolidReviewStateRepositoryDeps): ReviewStateRepository {
  return {
    async listReviewStates(deck): Promise<ReviewState[]> {
      const dataset = await getSolidDatasetOrNull(
        deck.reviewsDocumentUrl,
        fetch,
      );
      if (dataset === null) return [];
      return getThingAll(dataset)
        .map(toReviewState)
        .filter((state): state is ReviewState => state !== null);
    },

    async getReviewState(deck, key): Promise<ReviewState | null> {
      const dataset = await getSolidDatasetOrNull(
        deck.reviewsDocumentUrl,
        fetch,
      );
      if (dataset === null) return null;
      const thing = getThing(
        dataset,
        reviewSubjectUrl(deck.reviewsDocumentUrl, key),
      );
      if (thing === null) return null;
      return toReviewState(thing);
    },

    async saveReviewState(deck, state): Promise<void> {
      const dataset =
        (await getSolidDatasetOrNull(deck.reviewsDocumentUrl, fetch)) ??
        createSolidDataset();
      const updated = setThing(
        dataset,
        toReviewStateThing(
          deck.reviewsDocumentUrl,
          state,
          getThing(dataset, reviewSubjectUrl(deck.reviewsDocumentUrl, state)),
        ),
      );
      await checkWrite(updated, [reviewSubjectUrl(deck.reviewsDocumentUrl, state)]);
      await saveDataset(deck.reviewsDocumentUrl, updated, fetch);
    },

    async applyReviewChanges(deck, { save, remove }): Promise<void> {
      const dataset = await getSolidDatasetOrNull(
        deck.reviewsDocumentUrl,
        fetch,
      );
      if (dataset === null) return;
      let updated = dataset;
      for (const state of save) {
        updated = setThing(
          updated,
          toReviewStateThing(
            deck.reviewsDocumentUrl,
            state,
            getThing(updated, reviewSubjectUrl(deck.reviewsDocumentUrl, state)),
          ),
        );
      }
      for (const key of remove) {
        updated = removeThing(
          updated,
          reviewSubjectUrl(deck.reviewsDocumentUrl, key),
        );
      }
      await checkWrite(
        updated,
        save.map((state) => reviewSubjectUrl(deck.reviewsDocumentUrl, state)),
      );
      await saveDataset(deck.reviewsDocumentUrl, updated, fetch);
    },
  };
}
