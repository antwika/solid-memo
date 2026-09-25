import {
  createSolidDataset,
  getThing,
  saveSolidDatasetAt,
  setThing,
} from "@inrupt/solid-client";
import type { PreferencesRepository } from "../../application/ports";
import { preferencesUrlOf } from "../../domain/instanceLayout";
import type { StoredPreferences } from "../../domain/preferences";
import { getSolidDatasetOrNull } from "./datasets";
import { toPreferences, toPreferencesThing } from "./mappers/preferencesMapper";

export interface SolidPreferencesRepositoryDeps {
  fetch: typeof globalThis.fetch;
}

export function createSolidPreferencesRepository({
  fetch,
}: SolidPreferencesRepositoryDeps): PreferencesRepository {
  return {
    async getPreferences(instanceUrl): Promise<StoredPreferences | null> {
      const documentUrl = preferencesUrlOf(instanceUrl);
      const dataset = await getSolidDatasetOrNull(documentUrl, fetch);
      if (dataset === null) return null;
      const subject = getThing(dataset, `${documentUrl}#it`);
      if (subject === null) return null;
      return toPreferences(subject);
    },

    /** Rewrites the subject in place, so triples this app does not know survive. */
    async savePreferences(instanceUrl, preferences): Promise<void> {
      const documentUrl = preferencesUrlOf(instanceUrl);
      const dataset =
        (await getSolidDatasetOrNull(documentUrl, fetch)) ??
        createSolidDataset();
      const url = `${documentUrl}#it`;
      const updated = setThing(
        dataset,
        toPreferencesThing(url, preferences, getThing(dataset, url)),
      );
      await saveSolidDatasetAt(documentUrl, updated, { fetch });
    },
  };
}
