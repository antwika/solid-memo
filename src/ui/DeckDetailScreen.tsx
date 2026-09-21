import type { Deck } from "../domain/deck";

export function DeckDetailScreen({
  deck,
  cardCount,
  dueCount,
  newCount,
  decksHref,
  deckHref,
  onStudy,
  onPractice,
  onBrowse,
}: {
  deck: Deck;
  cardCount: number;
  /** Cards due today (what a Study session would cover). */
  dueCount: number;
  /** New cards still within today's budget (added by Practice). */
  newCount: number;
  /** URL of the deck list, for "Back to decks". */
  decksHref: string;
  /** URL of this deck's page; its name links here wherever it is shown. */
  deckHref: string;
  /** Session over due cards only. */
  onStudy: () => void;
  /** Session over due + new cards. */
  onPractice: () => void;
  /** Open the Browser view, where the deck and its cards are edited. */
  onBrowse: () => void;
}) {
  // Only offer sessions that have something in them, so nobody has to
  // start one to learn there is nothing to study.
  const canStudy = dueCount > 0;
  const canPractice = dueCount + newCount > 0;

  return (
    <section>
      <header>
        <h2>
          <a href={deckHref}>{deck.name}</a>
        </h2>
        <button onClick={onBrowse}>Browser</button>
        <a class="button" href={decksHref}>
          Back to decks
        </a>
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
          <button class="primary" onClick={onStudy}>
            Study
          </button>
        )}
        {canPractice && (
          <button class={canStudy ? undefined : "primary"} onClick={onPractice}>
            Practice
          </button>
        )}
      </div>
      <p class="hint">
        {cardCount === 1 ? "1 card" : `${cardCount} cards`} in this deck.
        Add, edit or remove cards in the Browser.
      </p>
    </section>
  );
}
