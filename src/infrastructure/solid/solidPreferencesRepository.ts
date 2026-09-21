import {
  buildThing,
  createSolidDataset,
  createThing,
  getThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import type { PreferencesRepository } from "../../application/ports";
import type { StudyPreferences } from "../../domain/preferences";
import { getSolidDatasetOrNull } from "./datasets";
import { toPreferences } from "./mappers/preferencesMapper";
import { ensureTrailingSlash } from "./urls";
import { RDF, SM } from "./vocab";

export interface SolidPreferencesRepositoryDeps {
  fetch: typeof globalThis.fetch;
}

export function createSolidPreferencesRepository({
  fetch,
}: SolidPreferencesRepositoryDeps): PreferencesRepository {
  return {
    async getPreferences(instanceUrl): Promise<StudyPreferences | null> {
      const documentUrl = preferencesUrlOf(instanceUrl);
      const dataset = await getSolidDatasetOrNull(documentUrl, fetch);
      if (dataset === null) return null;
      const subject = getThing(dataset, `${documentUrl}#it`);
      if (subject === null) return null;
      return toPreferences(subject);
    },

    async savePreferences(instanceUrl, preferences): Promise<void> {
      const documentUrl = preferencesUrlOf(instanceUrl);
      const dataset =
        (await getSolidDatasetOrNull(documentUrl, fetch)) ??
        createSolidDataset();
      const updated = setThing(
        dataset,
        buildThing(createThing({ url: `${documentUrl}#it` }))
          .addIri(RDF.type, SM.Preferences)
          .addInteger(SM.newCardsPerDay, preferences.newCardsPerDay)
          .addInteger(SM.maxReviewsPerDay, preferences.maxReviewsPerDay)
          .addInteger(SM.dayBoundaryHour, preferences.dayBoundaryHour)
          .build(),
      );
      await saveSolidDatasetAt(documentUrl, updated, { fetch });
    },
  };
}

function preferencesUrlOf(instanceUrl: string): string {
  return `${ensureTrailingSlash(instanceUrl)}preferences.ttl`;
}
