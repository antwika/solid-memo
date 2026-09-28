import { DEFAULT_PREFERENCES } from "../../../preferences";
import type { MigrationStep } from "../step";

/**
 * Preferences format 2 states every field; a format-1 document may lack
 * any of them, and a missing one means its default.
 */
export const PREFERENCES_1_TO_2: MigrationStep<"preferences", 1, 2> = {
  shape: "preferences",
  from: 1,
  to: 2,
  up: (data) => ({
    newCardsPerDay: data.newCardsPerDay ?? DEFAULT_PREFERENCES.newCardsPerDay,
    maxReviewsPerDay: data.maxReviewsPerDay ?? DEFAULT_PREFERENCES.maxReviewsPerDay,
    dayBoundaryHour: data.dayBoundaryHour ?? DEFAULT_PREFERENCES.dayBoundaryHour,
    answerScale: data.answerScale ?? DEFAULT_PREFERENCES.answerScale,
    developerMode: data.developerMode ?? DEFAULT_PREFERENCES.developerMode,
  }),
};
