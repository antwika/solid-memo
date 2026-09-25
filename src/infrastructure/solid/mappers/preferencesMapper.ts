import {
  getBoolean,
  getInteger,
  getStringNoLocale,
  type Thing,
} from "@inrupt/solid-client";
import { isAnswerScale } from "../../../domain/answerScale";
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
  const answerScale = getStringNoLocale(thing, SM.answerScale);
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
    answerScale: isAnswerScale(answerScale)
      ? answerScale
      : DEFAULT_PREFERENCES.answerScale,
    developerMode:
      getBoolean(thing, SM.developerMode) ?? DEFAULT_PREFERENCES.developerMode,
  };
}
