import type { DeckDirection } from "../domain/deck";

/** How each study direction is named to the user. */
export const DIRECTION_LABELS: Record<DeckDirection, string> = {
  "front-to-back": "Front → back",
  "back-to-front": "Back → front",
  bidirectional: "Both ways",
};
