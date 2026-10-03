import {
  cardLabel,
  DECK_DIRECTIONS,
  type Card,
  type Deck,
  type DeckDirection,
} from "@solid-memo/domain/deck";
import type { DeckAbout } from "@solid-memo/domain/deckAbout";
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { CardRowBack, CardRowFront } from "./CardFace";
import { DeckAboutSection } from "./DeckAboutSection";
import { ErrorMessage } from "./ErrorMessage";
import { BrowserIcon, TrashIcon } from "./icons";
import { Pager, paginate } from "./Pager";
import { useI18n, type ErrorText } from "./i18n";
import { RetiredTag, useRetiredCards } from "./RetiredCards";
import { ReaderText } from "./ReaderText";

/** Cards per Browser page: a short list, so paging is quick to scan. */
export const CARDS_PER_PAGE = 10;

/**
 * Management view for one deck: describe it (description, topics,
 * keywords), choose which way it is studied, add
 * cards, and open any card's own page (where it
 * is edited) through its front. Retired cards are listed only when asked.
 * Long decks are paged; the page is route state, so it survives a round
 * trip to a card's page.
 *
 * Removing a card takes its row, and the button pressed, off the page:
 * the focus goes to the card now in that row (the last one, if it was
 * last, or the page before's last if the page emptied), or to Add card
 * when none is left, and a status line says it is
 * gone. While it is removed, the button keeps the focus (aria-disabled).
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
  addCardHref,
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
  error: ErrorText | null;
  /** Replace the deck's description, topics and keywords. */
  onDescribeDeck: (about: DeckAbout) => void;
  /** Study the deck front→back, back→front or both ways. */
  onChangeDirection: (direction: DeckDirection) => void;
  /** URL of the card creator. */
  addCardHref: string;
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
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const addCardRef = useRef<HTMLAnchorElement>(null);
  /** The card being removed, its page and row and its name, until it is gone. */
  const removing = useRef<{ url: string; page: number; row: number; label: string } | null>(null);
  const [removed, setRemoved] = useState("");

  useLayoutEffect(() => {
    const pending = removing.current;
    if (pending === null || busy || cards.some((card) => card.url === pending.url)) return;
    removing.current = null;
    const rows = tbodyRef.current?.children ?? [];
    // A page left empty gives way to the one before: its last row is nearest.
    const row = rows[currentPage < pending.page ? rows.length - 1 : Math.min(pending.row, rows.length - 1)];
    (row?.querySelector("a") ?? addCardRef.current!).focus();
    setRemoved(t("browser.removed", { card: pending.label }));
  });

  function handleRemove(card: Card) {
    if (busy) return;
    const label = cardLabel(card, readerText);
    if (window.confirm(t("browser.removeConfirm", { card: label }))) {
      removing.current = { url: card.url, page: currentPage, row: pageCards.indexOf(card), label };
      setRemoved("");
      onRemoveCard(card);
    }
  }

  return (
    <section>
      <header>
        <h2>
          <BrowserIcon />
          {tx("browser.heading", {
            deck: (
              <a href={deckHref}>
                <ReaderText text={deck.title} />
              </a>
            ),
          })}
        </h2>
        <a ref={addCardRef} class="button" href={addCardHref}>
          {t("browser.addCardButton")}
        </a>
      </header>
      <p class="hint">{t("browser.intro")}</p>
      <DeckAboutSection deck={deck} busy={busy} onSave={onDescribeDeck} />
      <fieldset aria-describedby="deck-direction-hint">
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
        <span id="deck-direction-hint" class="hint">
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
                <th scope="col">{t("browser.frontColumn")}</th>
                <th scope="col">{t("browser.backColumn")}</th>
                <th scope="col">
                  <span class="visually-hidden">{t("browser.actionsColumn")}</span>
                </th>
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {pageCards.map((card) => (
                <tr key={card.url} class={card.retired ? "retired" : undefined}>
                  <td class="clickable">
                    <a href={cardHref(card)}>
                      <CardRowFront
                        front={card.front}
                        back={card.back}
                        imageUrl={card.frontImageUrl}
                        imageDescription={card.frontImageDescription}
                      />
                      {card.retired && <RetiredTag />}
                    </a>
                  </td>
                  {/* The back stays readable to screen readers; only the
                      pointer target over it is hidden, since the front's
                      link already opens the card. */}
                  <td class="clickable back-cell">
                    <CardRowBack
                      back={card.back}
                      imageUrl={card.backImageUrl}
                      imageDescription={card.backImageDescription}
                    />
                    <a
                      class="cell-overlay"
                      href={cardHref(card)}
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                  </td>
                  <td class="actions">
                    <button
                      class="danger icon"
                      aria-label={t("browser.removeCardLabel", {
                        card: cardLabel(card, readerText),
                      })}
                      title={t("browser.removeButton")}
                      onClick={() => handleRemove(card)}
                      aria-disabled={busy}
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
      <p class="visually-hidden" role="status">
        {removed}
      </p>
      <ErrorMessage error={error} />
    </section>
  );
}
