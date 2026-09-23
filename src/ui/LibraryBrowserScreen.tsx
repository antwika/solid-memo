import type { LibraryCard, LibraryDeck } from "../domain/library";
import { CARDS_PER_PAGE } from "./BrowserScreen";
import { CardThumbnail } from "./CardFace";
import { BrowserIcon } from "./icons";
import { Pager, paginate } from "./Pager";
import { cardCount } from "./studyCounts";

/**
 * A library deck's cards, to look through before importing it: the
 * Browser's table without its editing. Paged the same way, with the page
 * as route state.
 */
export function LibraryBrowserScreen({
  deck,
  deckHref,
  cards,
  page,
  onPageChange,
}: {
  deck: LibraryDeck;
  /** URL of the deck's page; its name links there. */
  deckHref: string;
  cards: LibraryCard[];
  /** 1-based; out-of-range values show the nearest page. */
  page: number;
  onPageChange: (page: number) => void;
}) {
  const {
    pageCount,
    currentPage,
    firstIndex,
    items: pageCards,
  } = paginate(cards, page, CARDS_PER_PAGE);

  return (
    <section>
      <header>
        <h2>
          <BrowserIcon />
          Cards: <a href={deckHref}>{deck.name}</a>
        </h2>
      </header>
      {cards.length === 0 ? (
        <p>This deck has no cards.</p>
      ) : (
        <>
          <p class="hint">
            {pageCount > 1
              ? `Cards ${firstIndex + 1}–${firstIndex + pageCards.length} of ${cards.length}. `
              : `${cardCount(cards.length)}. `}
            Import the deck to study or edit them.
          </p>
          <table class="card-table">
            <thead>
              <tr>
                <th>Front</th>
                <th>Back</th>
              </tr>
            </thead>
            <tbody>
              {pageCards.map((card) => (
                <tr key={card.id}>
                  <td>
                    <CardThumbnail imageUrl={card.frontImageUrl} />
                    {card.front}
                  </td>
                  <td>
                    <CardThumbnail imageUrl={card.backImageUrl} />
                    {card.back}
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
