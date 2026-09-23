import { CARD_FORMAT_VERSION, DECK_FORMAT_VERSION } from "../domain/deck";
import type { MigrationPlan, MigrationResult } from "../domain/migration";
import { cardCount as formatCardCount } from "./studyCounts";

/** "1 deck entry" / "n deck entries". */
function deckEntries(count: number): string {
  return count === 1 ? "1 deck entry" : `${count} deck entries`;
}

/**
 * What is outdated, as a subject: "2 deck entries and 255 cards in 3
 * decks". Either part may be missing, never both.
 */
export function describeOutdated(plan: MigrationPlan): string {
  const parts: string[] = [];
  if (plan.deckCount > 0) parts.push(deckEntries(plan.deckCount));
  if (plan.cardCount > 0) {
    const decks = plan.decks.filter(({ cardCount }) => cardCount > 0).length;
    parts.push(
      `${formatCardCount(plan.cardCount)} in ${decks === 1 ? "one deck" : `${decks} decks`}`,
    );
  }
  return parts.join(" and ");
}

/** What a migration rewrote: "1 deck entry and 12 cards". */
export function describeMigrated(result: MigrationResult): string {
  const parts: string[] = [];
  if (result.deckCount > 0) parts.push(deckEntries(result.deckCount));
  if (result.cardCount > 0) parts.push(formatCardCount(result.cardCount));
  return parts.join(" and ");
}

/**
 * Tells the user their decks are stored in an older format, what an
 * update would touch, and lets them start it. Nothing happens until they
 * do: the app works on the old format meanwhile.
 */
export function MigrationNotice({
  plan,
  busy,
  error,
  onMigrate,
}: {
  plan: MigrationPlan;
  busy: boolean;
  error: string | null;
  onMigrate: () => void;
}) {
  const singular = plan.deckCount + plan.cardCount === 1;
  return (
    <div class="warning migration" role="region" aria-label="Format update">
      <p>
        <strong>Your decks need a format update.</strong>{" "}
        {describeOutdated(plan)} {singular ? "is" : "are"} stored in an
        older format. Solid Memo now writes deck format {DECK_FORMAT_VERSION}
        , which adds a study direction, and card format {CARD_FORMAT_VERSION}
        , which adds pictures on cards. Updating rewrites the format version
        in your pod; deck names, card text and your review history stay as
        they are, and a deck without a stated direction keeps being studied
        front → back.
      </p>
      <ul>
        {plan.decks.map(({ deck, deckOutdated, cardCount }) => (
          <li key={deck.url}>
            {deck.name} —{" "}
            {[
              ...(deckOutdated ? ["deck entry"] : []),
              ...(cardCount > 0 ? [formatCardCount(cardCount)] : []),
            ].join(", ")}
          </li>
        ))}
      </ul>
      <button class="primary" onClick={onMigrate} disabled={busy}>
        {busy
          ? "Updating…"
          : `Update ${plan.decks.length === 1 ? "1 deck" : `${plan.decks.length} decks`}`}
      </button>
      {error && <p class="error">{error}</p>}
    </div>
  );
}
