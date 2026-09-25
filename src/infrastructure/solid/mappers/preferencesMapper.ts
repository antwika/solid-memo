import type { Thing, ThingPersisted } from "@inrupt/solid-client";
import type { StoredPreferences, StudyPreferences } from "../../../domain/preferences";
import { preferencesFromRecord, preferencesToRecord } from "../../../domain/preferencesRecord";
import { migrate } from "../../../domain/shapes/migrations";
import { PREFERENCES_V2 } from "../../shacl/shapes.generated";
import { readVersioned, recordThing } from "../records";

/**
 * Map a preferences subject to what it stores; null when it is not an
 * sm:Preferences that fits its format's shape. A format-1 document may
 * lack any field: the migration fills in the defaults.
 */
export function toPreferences(thing: Thing): StoredPreferences | null {
  const read = readVersioned(thing, "preferences");
  if (read === null) return null;
  return {
    preferences: preferencesFromRecord(migrate("preferences", read.record)),
    formatVersion: read.storedVersion,
  };
}

/** The preferences subject as this app writes it, in place when it exists. */
export function toPreferencesThing(
  url: string,
  preferences: StudyPreferences,
  existing: ThingPersisted | null,
): ThingPersisted {
  return recordThing(url, PREFERENCES_V2, preferencesToRecord(preferences), existing);
}
