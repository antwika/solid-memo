import { isRecalled, type Answer } from "./answer";

/**
 * Study statistics, computed from the answer log (domain/answer.ts):
 * activity by study day, streaks, totals, and how well reviewed cards
 * were remembered. Pure; the use case reads the months it needs.
 */

/** A prompt reviewed at an interval of this many days or more is mature; below, young. */
export const MATURE_INTERVAL_DAYS = 21;

/** What happened on one study day. */
export interface DayActivity {
  /** "YYYY-MM-DD". */
  studyDay: string;
  answers: number;
  /** Prompts answered for the first time: introduced that day. */
  introduced: number;
  /** Answers below grade 3: the card was forgotten. */
  forgotten: number;
}

/** Reviews of prompts already introduced, and how many of them were remembered. */
export interface Recall {
  reviews: number;
  recalled: number;
}

export interface Retention {
  /** Reviews at an interval below MATURE_INTERVAL_DAYS. */
  young: Recall;
  /** Reviews at an interval of MATURE_INTERVAL_DAYS or more. */
  mature: Recall;
}

export interface Streaks {
  /** Study days in a row up to today, or up to yesterday while today is not studied yet. */
  current: number;
  longest: number;
}

export interface DeckStatistics {
  deckUrl: string;
  answers: number;
  lastStudyDay: string;
  retention: Retention;
}

export interface Statistics {
  /** The study day the statistics run up to. */
  today: string;
  totals: { answers: number; studyDays: number; cards: number };
  /** Every study day with answers, oldest first. */
  days: DayActivity[];
  streaks: Streaks;
  retention: Retention;
  /** Every deck answered in, most answers first. */
  decks: DeckStatistics[];
}

/** Every study day with answers, oldest first. */
export function dailyActivity(answers: readonly Answer[]): DayActivity[] {
  const byDay = new Map<string, DayActivity>();
  for (const answer of answers) {
    const day = byDay.get(answer.studyDay) ?? { studyDay: answer.studyDay, answers: 0, introduced: 0, forgotten: 0 };
    day.answers += 1;
    if (answer.priorIntervalDays === undefined) day.introduced += 1;
    if (!isRecalled(answer)) day.forgotten += 1;
    byDay.set(answer.studyDay, day);
  }
  return [...byDay.values()].sort((a, b) => a.studyDay.localeCompare(b.studyDay));
}

/** The study day `days` after (or before, when negative) another, by the calendar. */
export function shiftStudyDay(studyDay: string, days: number): string {
  const [year, month, day] = studyDay.split("-").map(Number);
  return new Date(Date.UTC(year!, month! - 1, day! + days)).toISOString().slice(0, 10);
}

/** Runs of consecutive study days: the one alive today, and the longest. */
export function streaksOf(studyDays: readonly string[], today: string): Streaks {
  const studied = new Set(studyDays);
  let longest = 0;
  for (const day of studied) {
    if (studied.has(shiftStudyDay(day, -1))) continue;
    let run = 1;
    while (studied.has(shiftStudyDay(day, run))) run += 1;
    longest = Math.max(longest, run);
  }
  let current = 0;
  let day = studied.has(today) ? today : shiftStudyDay(today, -1);
  while (studied.has(day)) {
    current += 1;
    day = shiftStudyDay(day, -1);
  }
  return { current, longest };
}

/** How well reviewed prompts were remembered, young and mature apart; first answers are not reviews. */
export function retentionOf(answers: readonly Answer[]): Retention {
  const retention: Retention = { young: { reviews: 0, recalled: 0 }, mature: { reviews: 0, recalled: 0 } };
  for (const answer of answers) {
    if (answer.priorIntervalDays === undefined) continue;
    const group = answer.priorIntervalDays >= MATURE_INTERVAL_DAYS ? retention.mature : retention.young;
    group.reviews += 1;
    if (isRecalled(answer)) group.recalled += 1;
  }
  return retention;
}

/** Everything the statistics screens show, of the answers given (in any order) up to `today`. */
export function statisticsOf(answers: readonly Answer[], today: string): Statistics {
  const days = dailyActivity(answers);
  const byDeck = new Map<string, Answer[]>();
  for (const answer of answers) byDeck.set(answer.deckUrl, [...(byDeck.get(answer.deckUrl) ?? []), answer]);
  return {
    today,
    totals: {
      answers: answers.length,
      studyDays: days.length,
      cards: new Set(answers.map((answer) => answer.cardUrl)).size,
    },
    days,
    streaks: streaksOf(
      days.map((day) => day.studyDay),
      today,
    ),
    retention: retentionOf(answers),
    decks: [...byDeck]
      .map(([deckUrl, deckAnswers]) => ({
        deckUrl,
        answers: deckAnswers.length,
        lastStudyDay: deckAnswers.map((answer) => answer.studyDay).sort().at(-1)!,
        retention: retentionOf(deckAnswers),
      }))
      .sort((a, b) => b.answers - a.answers || a.deckUrl.localeCompare(b.deckUrl)),
  };
}
