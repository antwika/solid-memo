/**
 * Which algorithm decides a prompt's next interval (see docs/srs.md): SM-2
 * or FSRS-7. A preference, stored as a concept of solid-memo:Schedulers
 * whose notation is the value here. Every review keeps both algorithms'
 * state up to date, so switching takes effect at once and either way.
 */
export type Scheduler = "sm2" | "fsrs";

export const SCHEDULERS: readonly Scheduler[] = ["sm2", "fsrs"];

export function isScheduler(value: string): value is Scheduler {
  return (SCHEDULERS as readonly string[]).includes(value);
}

/** The probability of recall FSRS schedules for, unless the user says otherwise. */
export const DEFAULT_DESIRED_RETENTION = 0.9;
export const MIN_DESIRED_RETENTION = 0.7;
export const MAX_DESIRED_RETENTION = 0.97;

/**
 * A desired retention the app schedules with: 0.70 to 0.97. Below, too
 * much is forgotten to be worth studying; above, the reviews pile up for
 * little gain.
 */
export function isDesiredRetention(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_DESIRED_RETENTION && value <= MAX_DESIRED_RETENTION;
}
