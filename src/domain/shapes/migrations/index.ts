import { LATEST_VERSION, type LatestRecord, type ShapeName, type VersionedRecord } from "../generated";
import { CARD_1_TO_2 } from "./card/1-to-2";
import { DECK_1_TO_2 } from "./deck/1-to-2";
import { LIBRARY_DECK_1_TO_2 } from "./libraryDeck/1-to-2";
import { PREFERENCES_1_TO_2 } from "./preferences/1-to-2";
import { REVIEW_STATE_1_TO_2 } from "./reviewState/1-to-2";
import type { AnyMigrationStep } from "./step";

/**
 * Every migration step, one per consecutive pair of versions of each
 * kind (see docs/migrations.md). Reading upgrades a record in memory by
 * walking the chain; nothing is written until the user asks.
 */
export const MIGRATIONS: readonly AnyMigrationStep[] = [
  CARD_1_TO_2,
  DECK_1_TO_2,
  LIBRARY_DECK_1_TO_2,
  PREFERENCES_1_TO_2,
  REVIEW_STATE_1_TO_2,
];

/** The step from `from` to `from + 1`; a gap in the chain is a programming error. */
export function stepFor(shape: ShapeName, from: number): AnyMigrationStep {
  const step = MIGRATIONS.find((s) => s.shape === shape && s.from === from);
  if (step === undefined) {
    throw new Error(`No migration from ${shape} format ${from}.`);
  }
  return step;
}

/** The record brought up to the latest version of its kind. */
export function migrate<S extends ShapeName>(
  shape: S,
  record: VersionedRecord[S],
): LatestRecord[S] {
  let current: { version: number; data: unknown } = record;
  while (current.version < LATEST_VERSION[shape]) {
    const step = stepFor(shape, current.version);
    current = { version: step.to, data: step.up(current.data) };
  }
  return current.data as LatestRecord[S];
}
