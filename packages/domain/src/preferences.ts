import type { AnswerScale } from "./answerScale";
import { DEFAULT_INVALID_DATA_POLICY, type InvalidDataPolicy } from "./invalidDataPolicy";
import { DEFAULT_DESIRED_RETENTION, type Scheduler } from "./scheduler";
import { LATEST_VERSION } from "@solid-memo/vocab/types.generated";

/**
 * Format version written on every preferences document this app saves.
 * Format 4 adds the scheduler and the desired retention; format 3 the
 * invalid data policy; format 2 states every field;
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
  /** Which algorithm decides the next interval. */
  scheduler: Scheduler;
  /** The probability of recall FSRS schedules a prompt's next review for, 0.70–0.97. */
  desiredRetention: number;
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
 * What an instance without a preferences document studies with: SM-2
 * and its six grades, as every instance did before FSRS. An instance
 * this app creates states its own (NEW_INSTANCE_PREFERENCES).
 */
export const DEFAULT_PREFERENCES: StudyPreferences = {
  newCardsPerDay: 20,
  maxReviewsPerDay: 200,
  dayBoundaryHour: 4,
  answerScale: "sm2",
  scheduler: "sm2",
  desiredRetention: DEFAULT_DESIRED_RETENTION,
  developerMode: false,
  invalidDataPolicy: DEFAULT_INVALID_DATA_POLICY,
};

/** The preferences written into a new instance: FSRS, with its four ratings. */
export const NEW_INSTANCE_PREFERENCES: StudyPreferences = {
  ...DEFAULT_PREFERENCES,
  answerScale: "minimal",
  scheduler: "fsrs",
};
