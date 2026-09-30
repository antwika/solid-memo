import {
  cardLabel,
  DECK_DIRECTIONS,
  type Card,
  type Deck,
  type DeckDirection,
} from "@solid-memo/domain/deck";
import type { DeckAbout } from "@solid-memo/domain/deckAbout";
import { CardThumbnail } from "./CardFace";
import { DeckAboutSection } from "./DeckAboutSection";
import { DIRECTION_LABELS } from "./direction";
import { BrowserIcon, TrashIcon } from "./icons";
import { Pager, paginate } from "./Pager";
import { readerText } from "./readerText";

/** Cards per Browser page: a short list, so paging is quick to scan. */
export const CARDS_PER_PAGE = 10;

/**
 * Management view for one deck: describe it (description, topics,
 * keywords), choose which way it is studied, add
 * cards, and open any card's own page (where it
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
  onDescribeDeck,
  onChangeDirection,
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
  /** Replace the deck's description, topics and keywords. */
  onDescribeDeck: (about: DeckAbout) => void;
  /** Study the deck front→back, back→front or both ways. */
  onChangeDirection: (direction: DeckDirection) => void;
  /** Navigate to the card creator view. */
  onAddCard: () => void;
  /** URL of a card's own page. */
  cardHref: (card: Card) => string;
  onRemoveCard: (card: Card) => void;
  onPageChange: (page: number) => void;
}) {
  const {
    pageCount,
    currentPage,
    firstIndex,
    items: pageCards,
  } = paginate(cards, page, CARDS_PER_PAGE);

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
          Browser: <a href={deckHref}>{readerText(deck.title)}</a>
        </h2>
        <button onClick={onAddCard} disabled={busy}>
          Add card
        </button>
      </header>
      <DeckAboutSection deck={deck} busy={busy} onSave={onDescribeDeck} />
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
                    <a href={cardHref(card)} tabIndex={-1} aria-hidden="true">
                      <CardThumbnail imageUrl={card.backImageUrl} />
                      {card.back}
                    </a>
                  </td>
                  <td class="actions">
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
