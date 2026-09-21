import type { Deck } from "../domain/deck";
import { DeckIcon } from "./icons";

export function DeckDetailScreen({
  deck,
  cardCount,
  dueCount,
  newCount,
  studiedToday,
  busy,
  error,
  deckHref,
  onStudy,
  onPractice,
  onBrowse,
  onResetDay,
}: {
  deck: Deck;
  cardCount: number;
  /** Cards due today (what a Study session would cover). */
  dueCount: number;
  /** New cards still within today's budget (added by Practice). */
  newCount: number;
  /** Cards reviewed today; the reset option appears once there are any. */
  studiedToday: number;
  /** A reset is in progress. */
  busy: boolean;
  error: string | null;
  /** URL of this deck's page; its name links here wherever it is shown. */
  deckHref: string;
  /** Session over due cards only. */
  onStudy: () => void;
  /** Session over due + new cards. */
  onPractice: () => void;
  /** Open the Browser view, where the deck and its cards are edited. */
  onBrowse: () => void;
  /** Undo today's reviews of this deck. */
  onResetDay: () => void;
}) {
  // Only offer sessions that have something in them, so nobody has to
  // start one to learn there is nothing to study.
  const canStudy = dueCount > 0;
  const canPractice = dueCount + newCount > 0;
  const studied = studiedToday === 1 ? "1 card" : `${studiedToday} cards`;

  function handleResetDay() {
    if (
      window.confirm(
        `Reset today's study of "${deck.name}"? The ${studied} you studied today will go back to how they were before, and today's answers will be discarded.`,
      )
    ) {
      onResetDay();
    }
  }

  return (
    <section>
      <header>
        <h2>
          <a href={deckHref}>
            <DeckIcon />
            {deck.name}
          </a>
        </h2>
        <button onClick={onBrowse}>Browser</button>
      </header>
      {!canPractice && (
        <p>
          {cardCount === 0
            ? "This deck has no cards yet. Add some in the Browser."
            : "All cards have been studied — nothing more to study today."}
        </p>
      )}
      {canPractice && !canStudy && (
        <p class="hint">No cards are due today. Practice introduces new cards.</p>
      )}
      <div class="session-actions">
        {canStudy && (
          <button class="primary" onClick={onStudy} disabled={busy}>
            Study
          </button>
        )}
        {canPractice && (
          <button
            class={canStudy ? undefined : "primary"}
            onClick={onPractice}
            disabled={busy}
          >
            Practice
          </button>
        )}
      </div>
      {studiedToday > 0 && (
        <div class="day-reset">
          <span class="hint">{studied} studied today.</span>
          <button onClick={handleResetDay} disabled={busy}>
            {busy ? "Resetting…" : "Reset today's study"}
          </button>
        </div>
      )}
      {error && <p class="error">{error}</p>}
      <p class="hint">
        {cardCount === 1 ? "1 card" : `${cardCount} cards`} in this deck.
        Add, edit or remove cards in the Browser.
      </p>
    </section>
  );
}
