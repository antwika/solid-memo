import { useState } from "preact/hooks";
import type { Card, Deck } from "../domain/deck";
import { BrowserIcon, TrashIcon } from "./icons";

/**
 * Management view for one deck: rename/remove the deck, add cards, and
 * open any card's own page (where it is edited) by clicking it.
 */
export function BrowserScreen({
  deck,
  deckHref,
  cards,
  busy,
  error,
  onRenameDeck,
  onRemoveDeck,
  onAddCard,
  cardHref,
  onRemoveCard,
}: {
  deck: Deck;
  /** URL of the deck's page; its name links there. */
  deckHref: string;
  cards: Card[];
  busy: boolean;
  error: string | null;
  onRenameDeck: (name: string) => void;
  onRemoveDeck: () => void;
  /** Navigate to the card creator view. */
  onAddCard: () => void;
  /** URL of a card's own page. */
  cardHref: (card: Card) => string;
  onRemoveCard: (card: Card) => void;
}) {
  /** The deck-name draft while renaming; null otherwise. */
  const [deckName, setDeckName] = useState<string | null>(null);

  function handleRenameSubmit(event: Event, name: string) {
    event.preventDefault();
    onRenameDeck(name.trim());
    setDeckName(null);
  }

  function handleRemoveDeck() {
    if (
      window.confirm(
        `Remove the deck "${deck.name}" and all its cards? This cannot be undone.`,
      )
    ) {
      onRemoveDeck();
    }
  }

  function handleRemove(card: Card) {
    if (
      window.confirm(
        `Remove the card "${card.front}"? This cannot be undone.`,
      )
    ) {
      onRemoveCard(card);
    }
  }

  return (
    <section>
      <header>
        <h2>
          <BrowserIcon />
          Browser: <a href={deckHref}>{deck.name}</a>
        </h2>
        <button onClick={onAddCard} disabled={busy}>
          Add card
        </button>
      </header>
      {deckName === null ? (
        <div class="edit-actions">
          <button onClick={() => setDeckName(deck.name)} disabled={busy}>
            Rename deck
          </button>
          <button class="danger" onClick={handleRemoveDeck} disabled={busy}>
            Remove deck
          </button>
        </div>
      ) : (
        <form
          class="card-edit"
          onSubmit={(e) => handleRenameSubmit(e, deckName)}
        >
          <label for="deck-name">Deck name</label>
          <input
            id="deck-name"
            type="text"
            value={deckName}
            onInput={(e) => setDeckName(e.currentTarget.value)}
            required
            disabled={busy}
          />
          <div class="edit-actions">
            <button type="submit" disabled={busy}>
              Save name
            </button>
            <button
              type="button"
              aria-label="Cancel renaming"
              onClick={() => setDeckName(null)}
              disabled={busy}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {cards.length === 0 ? (
        <p>No cards in this deck yet.</p>
      ) : (
        <>
          <p class="hint">Click a card to open it.</p>
          <table class="card-table">
            <thead>
              <tr>
                <th>Front</th>
                <th>Back</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr key={card.url}>
                  <td class="clickable">
                    <a href={cardHref(card)}>{card.front}</a>
                  </td>
                  <td class="clickable">
                    {/* Same destination as the front: the whole row is
                        clickable, but only one link is announced/tabbed. */}
                    <a href={cardHref(card)} tabIndex={-1} aria-hidden="true">
                      {card.back}
                    </a>
                  </td>
                  <td>
                    <button
                      class="danger icon"
                      aria-label="Remove"
                      title="Remove"
                      onClick={() => handleRemove(card)}
                      disabled={busy}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {error && <p class="error">{error}</p>}
    </section>
  );
}
