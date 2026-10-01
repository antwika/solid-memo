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
import { BrowserIcon, TrashIcon } from "./icons";
import { Pager, paginate } from "./Pager";
import { useI18n } from "./i18n";
import { RetiredTag, useRetiredCards } from "./RetiredCards";
import { breakable } from "./breakable";

/** Cards per Browser page: a short list, so paging is quick to scan. */
export const CARDS_PER_PAGE = 10;

/**
 * Management view for one deck: describe it (description, topics,
 * keywords), choose which way it is studied, add
 * cards, and open any card's own page (where it
 * is edited) by clicking it. Retired cards are listed only when asked.
 * Long decks are paged; the page is route state, so it survives a round
 * trip to a card's page.
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
  const { t, tx, readerText, directionLabel } = useI18n();
  const { listed, toggle } = useRetiredCards(cards);
  const {
    pageCount,
    currentPage,
    firstIndex,
    items: pageCards,
  } = paginate(listed, page, CARDS_PER_PAGE);

  function handleRemove(card: Card) {
    if (
      window.confirm(t("browser.removeConfirm", { card: cardLabel(card) }))
    ) {
      onRemoveCard(card);
    }
  }

  return (
    <section>
      <header>
        <h2>
          <BrowserIcon />
          {tx("browser.heading", {
            deck: <a href={deckHref}>{readerText(deck.title)}</a>,
          })}
        </h2>
        <button onClick={onAddCard} disabled={busy}>
          {t("browser.addCardButton")}
        </button>
      </header>
      <DeckAboutSection deck={deck} busy={busy} onSave={onDescribeDeck} />
      <fieldset>
        <legend>{t("browser.directionLegend")}</legend>
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
            {directionLabel(direction)}
          </label>
        ))}
        <span class="hint">
          {deck.direction === "bidirectional"
            ? t("browser.bidirectionalHint")
            : t("browser.directionHint")}
        </span>
      </fieldset>
      {toggle}
      {cards.length === 0 ? (
        <p>{t("browser.empty")}</p>
      ) : listed.length === 0 ? (
        <p>{t("browser.allRetired")}</p>
      ) : (
        <>
          <p class="hint">
            {pageCount > 1
              ? t("browser.pageHint", {
                  first: firstIndex + 1,
                  last: firstIndex + pageCards.length,
                  total: listed.length,
                })
              : t("browser.openHint")}
          </p>
          <table class="card-table">
            <thead>
              <tr>
                <th>{t("browser.frontColumn")}</th>
                <th>{t("browser.backColumn")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pageCards.map((card) => (
                <tr key={card.url} class={card.retired ? "retired" : undefined}>
                  <td class="clickable">
                    <a href={cardHref(card)}>
                      <CardThumbnail imageUrl={card.frontImageUrl} />
                      {breakable(card.front)}
                      {card.retired && <RetiredTag />}
                    </a>
                  </td>
                  <td class="clickable">
                    <a href={cardHref(card)} tabIndex={-1} aria-hidden="true">
                      <CardThumbnail imageUrl={card.backImageUrl} />
                      {breakable(card.back)}
                    </a>
                  </td>
                  <td class="actions">
                    <button
                      class="danger icon"
                      aria-label={t("browser.removeButton")}
                      title={t("browser.removeButton")}
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
