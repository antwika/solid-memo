import { useState } from "preact/hooks";
import {
  cardLabel,
  DECK_DIRECTIONS,
  type Card,
  type Deck,
  type DeckDirection,
} from "../domain/deck";
import { CardThumbnail } from "./CardFace";
import { DIRECTION_LABELS } from "./direction";
import { BrowserIcon, TrashIcon } from "./icons";
import { Pager, paginate } from "./Pager";

/** Cards per Browser page: a short list, so paging is quick to scan. */
export const CARDS_PER_PAGE = 10;

/**
 * Management view for one deck: rename/remove the deck, choose which
 * way it is studied, add cards, and open any card's own page (where it
 * is edited) by clicking it. Long decks are paged; the page is route
 * state, so it survives a round trip to a card's page.
 */
export function BrowserScreen({
  deck,
  deckHref,
  cards,
  page,
  busy,
  error,
  onRenameDeck,
  onChangeDirection,
  onRemoveDeck,
  onAddCard,
  cardHref,
  onRemoveCard,
  onPageChange,
}: {
  deck: Deck;
  /** URL of the deck's page; its name links there. */
  deckHref: string;
  cards: Card[];
  /** 1-based; out-of-range values show the nearest page. */
  page: number;
  busy: boolean;
  error: string | null;
  onRenameDeck: (name: string) => void;
  /** Study the deck front→back, back→front or both ways. */
  onChangeDirection: (direction: DeckDirection) => void;
  onRemoveDeck: () => void;
  /** Navigate to the card creator view. */
  onAddCard: () => void;
  /** URL of a card's own page. */
  cardHref: (card: Card) => string;
  onRemoveCard: (card: Card) => void;
  onPageChange: (page: number) => void;
}) {
  /** The deck-name draft while renaming; null otherwise. */
  const [deckName, setDeckName] = useState<string | null>(null);

  const {
    pageCount,
    currentPage,
    firstIndex,
    items: pageCards,
  } = paginate(cards, page, CARDS_PER_PAGE);

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
        `Remove the card "${cardLabel(card)}"? This cannot be undone.`,
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
      <fieldset>
        <legend>Study direction</legend>
        {DECK_DIRECTIONS.map((direction) => (
          <label key={direction} class="radio-option">
            <input
              type="radio"
              name="deck-direction"
              value={direction}
              checked={deck.direction === direction}
              onChange={() => onChangeDirection(direction)}
              disabled={busy}
            />
            {DIRECTION_LABELS[direction]}
          </label>
        ))}
        <span class="hint">
          {deck.direction === "bidirectional"
            ? "Every card is asked both ways, each way scheduled on its own."
            : "Change it any time; what you have learnt each way is kept."}
        </span>
      </fieldset>
      {cards.length === 0 ? (
        <p>No cards in this deck yet.</p>
      ) : (
        <>
          <p class="hint">
            {pageCount > 1
              ? `Cards ${firstIndex + 1}–${firstIndex + pageCards.length} of ${cards.length}. `
              : ""}
            Click a card to open it.
          </p>
          <table class="card-table">
            <thead>
              <tr>
                <th>Front</th>
                <th>Back</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pageCards.map((card) => (
                <tr key={card.url}>
                  <td class="clickable">
                    <a href={cardHref(card)}>
                      <CardThumbnail imageUrl={card.frontImageUrl} />
                      {card.front}
                    </a>
                  </td>
                  <td class="clickable">
                    {/* Same destination as the front: the whole row is
                        clickable, but only one link is announced/tabbed. */}
                    <a href={cardHref(card)} tabIndex={-1} aria-hidden="true">
                      <CardThumbnail imageUrl={card.backImageUrl} />
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
          {pageCount > 1 && (
            <Pager
              page={currentPage}
              pageCount={pageCount}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
      {error && <p class="error">{error}</p>}
    </section>
  );
}
