import { CARD_FORMAT_VERSION } from "../domain/deck";
import type { MigrationPlan } from "../domain/migration";
import { cardCount as formatCardCount } from "./studyCounts";

/**
 * Tells the user their cards are stored in an older format, what an
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
  const cards = formatCardCount(plan.cardCount);
  return (
    <div class="warning migration" role="region" aria-label="Format update">
      <p>
        <strong>Your cards need a format update.</strong> {cards} in{" "}
        {plan.decks.length === 1 ? "one deck" : `${plan.decks.length} decks`}{" "}
        {plan.cardCount === 1 ? "is" : "are"} stored in an older card format.
        Solid Memo now writes format {CARD_FORMAT_VERSION}, which adds
        pictures on cards. Updating rewrites the format version of those
        cards in your pod; their text and your review history stay as they
        are.
      </p>
      <ul>
        {plan.decks.map(({ deck, cardCount }) => (
          <li key={deck.url}>
            {deck.name} — {formatCardCount(cardCount)}
          </li>
        ))}
      </ul>
      <button class="primary" onClick={onMigrate} disabled={busy}>
        {busy ? "Updating…" : `Update ${cards}`}
      </button>
      {error && <p class="error">{error}</p>}
    </div>
  );
}
