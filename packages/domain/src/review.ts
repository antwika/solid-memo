import type { StudyDirection } from "./deck";
import type { FsrsMemory } from "./fsrs";
import { LATEST_VERSION } from "@solid-memo/vocab/types.generated";

/**
 * Format version written on every review state this app saves. Format 3
 * adds the FSRS-7 memory. Format 2 has the fields format 1 had; it is where stamping began, and where the
 * previous* snapshot and the per-direction subject naming became part of
 * the contract (see docs/migrations.md).
 */
export const REVIEW_STATE_FORMAT_VERSION: number = LATEST_VERSION.reviewState;

/** SM-2 answer quality: 0 (blackout) to 5 (perfect). */
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * What a review state belongs to: a card seen from one side. A card
 * studied both ways has two states, scheduled independently.
 */
export interface ReviewKey {
  /** Fragment id of the card this state belongs to. */
  cardId: string;
  direction: StudyDirection;
}

/** The key as one string, for maps and comparisons. */
export function reviewKeyOf(key: ReviewKey): string {
  return `${key.direction}/${key.cardId}`;
}

/** The scheduling fields a review overwrites. */
export interface ReviewSnapshot {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  due: string;
  lastReviewedAt: string;
  /** Absent when the state had no FSRS memory yet. */
  memory?: FsrsMemory;
}

/**
 * Scheduling state of one card in one direction, stored separately from
 * the card's content.
 */
export interface ReviewState extends ReviewKey {
  /** SM-2 easiness factor, never below 1.3. */
  easeFactor: number;
  /** Days from the last review to the due day, as whichever scheduler decided. */
  intervalDays: number;
  /** Successful repetitions in a row. */
  repetitions: number;
  /**
   * FSRS-7's memory of the prompt, kept up to date whichever scheduler
   * decides. Absent until the prompt's first review by an app that knows
   * FSRS: it is then estimated from the SM-2 interval.
   */
  memory?: FsrsMemory;
  /** Study day ("YYYY-MM-DD") the card becomes due. */
  due: string;
  /** ISO dateTime of the first-ever review (introduction). */
  firstReviewedAt: string;
  /** ISO dateTime of the most recent review. */
  lastReviewedAt: string;
  /** The format the state is stored in; a missing one read as 1. */
  formatVersion: number;
  /**
   * The state as it was before the first review of the study day in
   * `lastReviewedAt` — what resetting that day restores. Absent for a card
   * introduced that day (it had no earlier state) and on states written
   * before snapshots existed.
   */
  previous?: ReviewSnapshot;
}
