import { conceptOfPolicy, policyOfConcept } from "./concepts";
import type { StudyPreferences } from "./preferences";
import type { PreferencesV3 } from "@solid-memo/vocab/types.generated";

/**
 * Preferences between their latest shape record and the model: the same
 * fields, the invalid data policy as a concept in the record and by its
 * notation in the model.
 */
export function preferencesFromRecord(data: PreferencesV3): StudyPreferences {
  return {
    newCardsPerDay: data.newCardsPerDay,
    maxReviewsPerDay: data.maxReviewsPerDay,
    dayBoundaryHour: data.dayBoundaryHour,
    answerScale: data.answerScale,
    developerMode: data.developerMode,
    invalidDataPolicy: policyOfConcept(data.invalidDataPolicy)!,
  };
}

export function preferencesToRecord(preferences: StudyPreferences): PreferencesV3 {
  return {
    newCardsPerDay: preferences.newCardsPerDay,
    maxReviewsPerDay: preferences.maxReviewsPerDay,
    dayBoundaryHour: preferences.dayBoundaryHour,
    answerScale: preferences.answerScale,
    developerMode: preferences.developerMode,
    invalidDataPolicy: conceptOfPolicy(preferences.invalidDataPolicy),
  };
}
