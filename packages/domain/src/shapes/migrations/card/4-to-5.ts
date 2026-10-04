import type { MigrationStep } from "../step";

/**
 * Card format 5 lets a note or label be in any language, English no
 * longer required. Every format-4 card is a format-5 card already, so
 * nothing changes but the version the chain stamps: an untagged side
 * stays untagged, and no language is guessed.
 */
export const CARD_4_TO_5: MigrationStep<"card", 4, 5> = {
  shape: "card",
  from: 4,
  to: 5,
  up: (data) => ({ ...data }),
};
