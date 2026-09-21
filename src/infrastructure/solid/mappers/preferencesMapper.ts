import { getBoolean, getInteger, type Thing } from "@inrupt/solid-client";
import {
  DEFAULT_PREFERENCES,
  type StudyPreferences,
} from "../../../domain/preferences";
import { SM } from "../vocab";

/**
 * Lenient reader: any field missing from the stored document falls back to
 * its default, so old documents survive new preference fields.
 */
export function toPreferences(thing: Thing): StudyPreferences {
  return {
    newCardsPerDay:
      getInteger(thing, SM.newCardsPerDay) ??
      DEFAULT_PREFERENCES.newCardsPerDay,
    maxReviewsPerDay:
      getInteger(thing, SM.maxReviewsPerDay) ??
      DEFAULT_PREFERENCES.maxReviewsPerDay,
    dayBoundaryHour:
      getInteger(thing, SM.dayBoundaryHour) ??
      DEFAULT_PREFERENCES.dayBoundaryHour,
    developerMode:
      getBoolean(thing, SM.developerMode) ?? DEFAULT_PREFERENCES.developerMode,
  };
}
