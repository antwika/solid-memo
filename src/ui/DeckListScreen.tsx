import type { Deck } from "../domain/deck";
import { TrashIcon } from "./icons";

export function DeckListScreen({
  decks,
  busy,
  error,
  onOpen,
  onStudy,
  onCreateDeck,
  onRemove,
}: {
  decks: Deck[];
  busy: boolean;
  error: string | null;
  onOpen: (deck: Deck) => void;
  /** Start a due-only study session for the deck. */
  onStudy: (deck: Deck) => void;
  /** Navigate to the deck creator view. */
  onCreateDeck: () => void;
  onRemove: (deck: Deck) => void;
}) {
  function handleRemove(deck: Deck) {
    if (
      window.confirm(
        `Remove the deck "${deck.name}" and all its cards? This cannot be undone.`,
      )
    ) {
      onRemove(deck);
    }
  }

  return (
    <section>
      <header>
        <h2>Decks</h2>
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
              <button
                class="deck-open"
                onClick={() => onOpen(deck)}
                disabled={busy}
              >
                {deck.name}
              </button>
              <button
                class="primary"
                aria-label={`Study ${deck.name}`}
                onClick={() => onStudy(deck)}
                disabled={busy}
              >
                Study
              </button>
              <button
                class="danger icon"
                aria-label="Remove"
                title="Remove"
                onClick={() => handleRemove(deck)}
                disabled={busy}
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
      <button class="primary" onClick={onCreateDeck} disabled={busy}>
        Create deck
      </button>
      {error && <p class="error">{error}</p>}
    </section>
  );
}
