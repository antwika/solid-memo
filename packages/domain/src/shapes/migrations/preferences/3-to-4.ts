import { conceptOfScheduler } from "../../../concepts";
import { DEFAULT_DESIRED_RETENTION } from "../../../scheduler";
import type { MigrationStep } from "../step";

/**
 * Preferences format 4 states the scheduler and the desired retention.
 * Preferences saved before there was a choice keep SM-2, which scheduled
 * their cards so far, and FSRS's default retention for when the user
 * switches.
 */
export const PREFERENCES_3_TO_4: MigrationStep<"preferences", 3, 4> = {
  shape: "preferences",
  from: 3,
  to: 4,
  up: (data) => ({ ...data, scheduler: conceptOfScheduler("sm2"), desiredRetention: DEFAULT_DESIRED_RETENTION }),
};
