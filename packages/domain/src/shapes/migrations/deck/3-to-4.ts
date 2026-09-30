import { inEnglish } from "../../../langText";
import type { MigrationStep } from "../step";

/**
 * Deck format 4 states the title and description as language-tagged text,
 * one per language and one of them English. A format-3 deck's untagged
 * title and description become its English ones.
 */
export const DECK_3_TO_4: MigrationStep<"deck", 3, 4> = {
  shape: "deck",
  from: 3,
  to: 4,
  up: ({ title, description, ...data }) => ({
    ...data,
    title: inEnglish(title),
    description: inEnglish(description),
  }),
};
