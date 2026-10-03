import type { AnswerScale } from "./answerScale";
import { DEFAULT_INVALID_DATA_POLICY, type InvalidDataPolicy } from "./invalidDataPolicy";
import { LATEST_VERSION } from "@solid-memo/vocab/types.generated";

/**
 * Format version written on every preferences document this app saves.
 * Format 3 adds the invalid data policy; format 2 states every field;
 * format 1 is whatever the unversioned era wrote, each missing field
 * meaning its default.
 */
export const PREFERENCES_FORMAT_VERSION: number = LATEST_VERSION.preferences;

export interface StudyPreferences {
  /** Maximum unseen cards introduced per study day. */
  newCardsPerDay: number;
  /** Maximum due-card reviews per study day. */
  maxReviewsPerDay: number;
  /**
   * Local hour at which the study day rolls over (Anki-style: with 4,
   * reviewing at 03:00 still counts as the previous day).
   */
  dayBoundaryHour: number;
  /** Which grading buttons a session shows. */
  answerScale: AnswerScale;
  /**
   * Developer settings: reveals diagnostic views (the raw WebID
   * document) that ordinary study has no use for.
   */
  developerMode: boolean;
  /** What the app does when data in the instance does not conform to its shapes. */
  invalidDataPolicy: InvalidDataPolicy;
}

/** Preferences as a pod holds them, with the format they are stored in. */
export interface StoredPreferences {
  preferences: StudyPreferences;
  formatVersion: number;
}

/**
 * A few new cards a day: each comes back for reviews in the days after,
 * so a small, steady pace keeps the reviews to come manageable.
 */
export const DEFAULT_PREFERENCES: StudyPreferences = {
  newCardsPerDay: 5,
  maxReviewsPerDay: 200,
  dayBoundaryHour: 4,
  answerScale: "sm2",
  developerMode: false,
  invalidDataPolicy: DEFAULT_INVALID_DATA_POLICY,
};
