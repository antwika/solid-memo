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
  /**
   * Developer settings: reveals diagnostic views (the raw WebID
   * document) that ordinary study has no use for.
   */
  developerMode: boolean;
}

export const DEFAULT_PREFERENCES: StudyPreferences = {
  newCardsPerDay: 20,
  maxReviewsPerDay: 200,
  dayBoundaryHour: 4,
  developerMode: false,
};
