import type { LibraryCard, LibraryDeck } from "@solid-memo/domain/library";
import { CARDS_PER_PAGE } from "./BrowserScreen";
import { CardThumbnail } from "./CardFace";
import { BrowserIcon } from "./icons";
import { useI18n } from "./i18n";
import { Pager, paginate } from "./Pager";
import { RetiredTag, useRetiredCards } from "./RetiredCards";
import { breakable } from "./breakable";

/**
 * A library deck's cards, to look through before importing it: the
 * Browser's table without its editing, retired cards listed only when
 * asked. Paged the same way, with the page as route state.
 */
export function LibraryBrowserScreen({
  deck,
  deckHref,
  cardHref,
  cards,
  page,
  onPageChange,
}: {
  deck: LibraryDeck;
  /** URL of the deck's page; its name links there. */
  deckHref: string;
  /** URL of a card's own page; its row links there. */
  cardHref: (card: LibraryCard) => string;
  cards: LibraryCard[];
  /** 1-based; out-of-range values show the nearest page. */
  page: number;
  onPageChange: (page: number) => void;
}) {
  const { t, tx, readerText } = useI18n();
  const { listed, toggle } = useRetiredCards(cards);
  const {
    pageCount,
    currentPage,
    firstIndex,
    items: pageCards,
  } = paginate(listed, page, CARDS_PER_PAGE);

  return (
    <section>
      <header>
        <h2>
          <BrowserIcon />
          {tx("libraryBrowser.heading", {
            deck: <a href={deckHref}>{readerText(deck.title)}</a>,
          })}
        </h2>
      </header>
      {toggle}
      {listed.length === 0 ? (
        <p>{t("libraryBrowser.empty")}</p>
      ) : (
        <>
          <p class="hint">
            {pageCount > 1
              ? t("libraryBrowser.range", {
                  first: firstIndex + 1,
                  last: firstIndex + pageCards.length,
                  total: listed.length,
                })
              : t("libraryBrowser.count", { count: listed.length })}{" "}
            {t("libraryBrowser.hint")}
          </p>
          <table class="card-table">
            <thead>
              <tr>
                <th>{t("libraryBrowser.front")}</th>
                <th>{t("libraryBrowser.back")}</th>
              </tr>
            </thead>
            <tbody>
              {pageCards.map((card) => (
                <tr key={card.id} class={card.retired ? "retired" : undefined}>
                  <td class="clickable">
                    <a href={cardHref(card)}>
                      <CardThumbnail imageUrl={card.frontImageUrl} />
                      {breakable(readerText(card.front))}
                      {card.retired && <RetiredTag />}
                    </a>
                  </td>
                  <td class="clickable">
                    <a href={cardHref(card)} tabIndex={-1} aria-hidden="true">
                      <CardThumbnail imageUrl={card.backImageUrl} />
                      {breakable(readerText(card.back))}
                    </a>
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
    </section>
  );
}
