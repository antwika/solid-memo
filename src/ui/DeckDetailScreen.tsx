import type { Deck } from "../domain/deck";

export function DeckDetailScreen({
  deck,
  cardCount,
  onBack,
  onAddCard,
  onStudy,
  onPractice,
  onBrowse,
}: {
  deck: Deck;
  cardCount: number;
  onBack: () => void;
  /** Navigate to the card creator view. */
  onAddCard: () => void;
  /** Session over due cards only. */
  onStudy: () => void;
  /** Session over due + new cards. */
  onPractice: () => void;
  /** Open the Browser view to manage cards. */
  onBrowse: () => void;
}) {
  return (
    <section>
      <header>
        <h2>{deck.name}</h2>
        <button onClick={onBrowse}>Browser</button>
        <button onClick={onBack}>Back to decks</button>
      </header>
      <div class="session-actions">
        <button class="primary" onClick={onStudy}>
          Study
        </button>
        <button onClick={onPractice}>Practice</button>
        <button onClick={onAddCard}>Add card</button>
      </div>
      <p class="hint">
        {cardCount === 1 ? "1 card" : `${cardCount} cards`} in this deck.
        Edit or remove cards in the Browser.
      </p>
    </section>
  );
}
