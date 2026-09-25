import type { AnswerScale } from "./answerScale";
import { LATEST_VERSION } from "./shapes/generated";

/**
 * Format version written on every preferences document this app saves.
 * Format 2 states every field; format 1 is whatever the unversioned era
 * wrote, each missing field meaning its default.
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
}

/** Preferences as a pod holds them, with the format they are stored in. */
export interface StoredPreferences {
  preferences: StudyPreferences;
  formatVersion: number;
}

export const DEFAULT_PREFERENCES: StudyPreferences = {
  newCardsPerDay: 20,
  maxReviewsPerDay: 200,
  dayBoundaryHour: 4,
  answerScale: "sm2",
  developerMode: false,
};
