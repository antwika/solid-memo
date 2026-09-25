import type { StudyPreferences } from "./preferences";
import type { PreferencesV2 } from "./shapes/generated";

/** Preferences between their latest shape record and the model: the same five fields. */
export function preferencesFromRecord(data: PreferencesV2): StudyPreferences {
  return {
    newCardsPerDay: data.newCardsPerDay,
    maxReviewsPerDay: data.maxReviewsPerDay,
    dayBoundaryHour: data.dayBoundaryHour,
    answerScale: data.answerScale,
    developerMode: data.developerMode,
  };
}

export function preferencesToRecord(preferences: StudyPreferences): PreferencesV2 {
  return {
    newCardsPerDay: preferences.newCardsPerDay,
    maxReviewsPerDay: preferences.maxReviewsPerDay,
    dayBoundaryHour: preferences.dayBoundaryHour,
    answerScale: preferences.answerScale,
    developerMode: preferences.developerMode,
  };
}
