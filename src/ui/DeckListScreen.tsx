import type { Deck } from "../domain/deck";

/** Decks to open or study. Decks are renamed and removed in the Browser. */
export function DeckListScreen({
  decks,
  decksHref,
  deckHref,
  onStudy,
  onCreateDeck,
}: {
  decks: Deck[];
  /** URL of this deck list; wherever the UI says "Decks", it links here. */
  decksHref: string;
  /** URL of a deck's page; wherever the UI names a deck, it links there. */
  deckHref: (deck: Deck) => string;
  /** Start a due-only study session for the deck. */
  onStudy: (deck: Deck) => void;
  /** Navigate to the deck creator view. */
  onCreateDeck: () => void;
}) {
  return (
    <section>
      <header>
        <h2>
          <a href={decksHref}>Decks</a>
        </h2>
        <span class="hint">
          {decks.length === 1 ? "1 deck" : `${decks.length} decks`}
        </span>
      </header>
      {decks.length === 0 ? (
        <p>No decks yet. Create your first deck below.</p>
      ) : (
        <ul class="deck-list">
          {decks.map((deck) => (
            <li key={deck.url}>
              <a class="deck-open" href={deckHref(deck)}>
                {deck.name}
              </a>
              <button
                class="primary"
                aria-label={`Study ${deck.name}`}
                onClick={() => onStudy(deck)}
              >
                Study
              </button>
            </li>
          ))}
        </ul>
      )}
      <button class="primary" onClick={onCreateDeck}>
        Create deck
      </button>
    </section>
  );
}
