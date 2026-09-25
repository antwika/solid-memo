import { asUrl, type Thing } from "@inrupt/solid-client";
import type { Card, Deck } from "../../../domain/deck";
import { cardFromRecord, deckFromRecord } from "../../../domain/deckRecord";
import { migrate } from "../../../domain/shapes/migrations";
import { readVersioned } from "../records";

export { fragmentIdOf } from "../../../domain/subjectUrl";

/**
 * Map a catalog subject to a Deck; null when the subject is not an
 * sm:Deck that fits its format's shape. An older format is brought up to
 * the current one in memory; the stored version stays on the model.
 */
export function toDeck(thing: Thing): Deck | null {
  const read = readVersioned(thing, "deck");
  if (read === null) return null;
  return deckFromRecord(asUrl(thing), read.storedVersion, migrate("deck", read.record));
}

/**
 * Map a cards-document subject to a Card; null when the subject is not
 * an sm:Card that fits its format's shape, or a side has neither text
 * nor a picture.
 */
export function toCard(thing: Thing): Card | null {
  const read = readVersioned(thing, "card");
  if (read === null) return null;
  return cardFromRecord(asUrl(thing), read.storedVersion, migrate("card", read.record));
}
