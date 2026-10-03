import type { MigrationStep } from "../step";

/**
 * Review-state format 3 adds the FSRS-7 memory, which a format-2 state
 * has none of: it is estimated from the SM-2 interval at the prompt's
 * next review, so the step changes nothing. The version moved because a
 * format-2 reader would drop the memory the next time it wrote the state.
 */
export const REVIEW_STATE_2_TO_3: MigrationStep<"reviewState", 2, 3> = {
  shape: "reviewState",
  from: 2,
  to: 3,
  up: (data) => ({ ...data }),
};
