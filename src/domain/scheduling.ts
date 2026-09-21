import type { Card } from "./deck";
import type { StudyPreferences } from "./preferences";
import type { ReviewState } from "./review";

/**
 * The study day ("YYYY-MM-DD", device-local time) an instant belongs to.
 * The day rolls over at dayBoundaryHour, so 03:00 with a boundary of 4
 * still counts as the previous day. Note: computed in the device's local
 * timezone; a user crossing timezones sees cards a few hours early/late.
 * Accepted for v1.
 */
export function studyDayOf(instant: Date, dayBoundaryHour: number): string {
  const shifted = new Date(instant.getTime() - dayBoundaryHour * 3_600_000);
  return formatLocalDate(shifted);
}

/** The study day a card reviewed now with the given interval is next due. */
export function nextDueDate(
  reviewedAt: Date,
  intervalDays: number,
  dayBoundaryHour: number,
): string {
  const shifted = new Date(
    reviewedAt.getTime() - dayBoundaryHour * 3_600_000,
  );
  shifted.setDate(shifted.getDate() + intervalDays);
  return formatLocalDate(shifted);
}

export interface StudyQueue {
  /** Cards with review state due today or earlier, oldest due first. */
  due: Card[];
  /** Never-reviewed cards, capped by the daily new-card budget. */
  newCards: Card[];
}

export function buildStudyQueue(args: {
  cards: Card[];
  reviews: ReviewState[];
  prefs: StudyPreferences;
  now: Date;
}): StudyQueue {
  const { cards, reviews, prefs, now } = args;
  const today = studyDayOf(now, prefs.dayBoundaryHour);
  const reviewByCardId = new Map(reviews.map((r) => [r.cardId, r]));

  const reviewedToday = reviews.filter(
    (r) => studyDayOf(new Date(r.lastReviewedAt), prefs.dayBoundaryHour) === today,
  ).length;
  const introducedToday = reviews.filter(
    (r) =>
      studyDayOf(new Date(r.firstReviewedAt), prefs.dayBoundaryHour) === today,
  ).length;

  const dueBudget = Math.max(0, prefs.maxReviewsPerDay - reviewedToday);
  const newBudget = Math.max(0, prefs.newCardsPerDay - introducedToday);

  const due = cards
    .filter((card) => {
      const review = reviewByCardId.get(card.id);
      return review !== undefined && review.due <= today;
    })
    .sort((a, b) => {
      const dueA = reviewByCardId.get(a.id)!.due;
      const dueB = reviewByCardId.get(b.id)!.due;
      return dueA < dueB ? -1 : dueA > dueB ? 1 : 0;
    })
    .slice(0, dueBudget);

  const newCards = cards
    .filter((card) => !reviewByCardId.has(card.id))
    .slice(0, newBudget);

  return { due, newCards };
}

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
