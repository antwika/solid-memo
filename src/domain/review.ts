/** SM-2 answer quality: 0 (blackout) to 5 (perfect). */
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

/** The scheduling fields a review overwrites. */
export interface ReviewSnapshot {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  due: string;
  lastReviewedAt: string;
}

/** Scheduling state of one card, stored separately from its content. */
export interface ReviewState {
  /** Fragment id of the card this state belongs to. */
  cardId: string;
  /** SM-2 easiness factor, never below 1.3. */
  easeFactor: number;
  intervalDays: number;
  /** Successful repetitions in a row. */
  repetitions: number;
  /** Study day ("YYYY-MM-DD") the card becomes due. */
  due: string;
  /** ISO dateTime of the first-ever review (introduction). */
  firstReviewedAt: string;
  /** ISO dateTime of the most recent review. */
  lastReviewedAt: string;
  /**
   * The state as it was before the first review of the study day in
   * `lastReviewedAt` — what resetting that day restores. Absent for a card
   * introduced that day (it had no earlier state) and on states written
   * before snapshots existed.
   */
  previous?: ReviewSnapshot;
}
