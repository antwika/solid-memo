import type { ComponentChildren } from "preact";
import type { Deck } from "../domain/deck";
import { DeckProvenance } from "./DeckProvenance";
import { DeckIcon } from "./icons";
import { cardCount as formatCardCount } from "./studyCounts";

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
  onBrowse,
  onResetDay,
  notice,
}: {
  deck: Deck;
  cardCount: number;
  /** Prompts due today. */
  dueCount: number;
  /** New prompts still within today's budget. */
  newCount: number;
  /** Cards reviewed today; the reset option appears once there are any. */
  studiedToday: number;
  /** A reset is in progress. */
  busy: boolean;
  error: string | null;
  /** URL of this deck's page; its name links here wherever it is shown. */
  deckHref: string;
  /** Today's session: due prompts and new ones, interleaved. */
  onStudy: () => void;
  /** Open the Browser view, where the deck and its cards are edited. */
  onBrowse: () => void;
  /** Undo today's reviews of this deck. */
  onResetDay: () => void;
  /** Anything to say about the deck before its study state, e.g. an offer. */
  notice?: ComponentChildren;
}) {
  const canStudy = dueCount + newCount > 0;
  const studied = formatCardCount(studiedToday);

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
      <DeckProvenance
        authors={deck.authors}
        license={deck.license}
        description={deck.description}
      />
      {notice}
      {!canStudy && (
        <p>
          {cardCount === 0
            ? "This deck has no cards yet. Add some in the Browser."
            : "All cards have been studied — nothing more to study today."}
        </p>
      )}
      {canStudy && (
        <p class="hint">
          {dueCount > 0
            ? `${formatCardCount(dueCount)} due today`
            : "No cards are due today"}
          {newCount > 0
            ? `${dueCount > 0 ? ", and" : ";"} ${newCount} new to introduce.`
            : "."}
        </p>
      )}
      <div class="session-actions">
        {canStudy && (
          <button class="primary" onClick={onStudy} disabled={busy}>
            Study
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
        {formatCardCount(cardCount)} in this deck. Add, edit or remove cards
        in the Browser.
      </p>
    </section>
  );
}
