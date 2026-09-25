import {
  createSolidDataset,
  getThing,
  getThingAll,
  removeThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import type { ReviewStateRepository } from "../../application/ports";
import type { ReviewState } from "../../domain/review";
import { getSolidDatasetOrNull } from "./datasets";
import {
  reviewSubjectUrl,
  toReviewState,
  toReviewStateThing,
} from "./mappers/reviewStateMapper";

export interface SolidReviewStateRepositoryDeps {
  fetch: typeof globalThis.fetch;
}

export function createSolidReviewStateRepository({
  fetch,
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
        toReviewStateThing(deck.reviewsDocumentUrl, state),
      );
      await saveSolidDatasetAt(deck.reviewsDocumentUrl, updated, { fetch });
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
          toReviewStateThing(deck.reviewsDocumentUrl, state),
        );
      }
      for (const key of remove) {
        updated = removeThing(
          updated,
          reviewSubjectUrl(deck.reviewsDocumentUrl, key),
        );
      }
      await saveSolidDatasetAt(deck.reviewsDocumentUrl, updated, { fetch });
    },
  };
}
