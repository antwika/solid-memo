import type { ComponentChildren } from "preact";
import type { Deck } from "@solid-memo/domain/deck";
import { CollectionIcon, DeckIcon, LibraryIcon } from "./icons";
import { useI18n } from "./i18n";
import { ReaderText } from "./ReaderText";

/** Decks to open or study. Decks are renamed and removed in the Browser. */
export function DeckListScreen({
  decks,
  libraryHref,
  deckHref,
  renderStudyAction,
  createDeckHref,
}: {
  decks: Deck[];
  /** URL of the deck library, where ready-made decks are imported from. */
  libraryHref: string;
  /** URL of a deck's page; wherever the UI names a deck, it links there. */
  deckHref: (deck: Deck) => string;
  /**
   * What the row offers for the deck today (Study, or nothing). Supplied
   * by the container: it depends on each deck's queue.
   */
  renderStudyAction: (deck: Deck) => ComponentChildren;
  /** URL of the deck creator. */
  createDeckHref: string;
}) {
  const { t } = useI18n();
  return (
    <section>
      <header>
        <h2>
          <CollectionIcon />
          {t("deckList.heading")}
        </h2>
        <span class="hint">
          {t("deckList.deckCount", { count: decks.length })}
        </span>
      </header>
      {decks.length === 0 ? (
        <p>{t("deckList.empty")}</p>
      ) : (
        <ul class="deck-list">
          {decks.map((deck) => (
            <li key={deck.url}>
              <a class="deck-open" href={deckHref(deck)}>
                <DeckIcon />
                <ReaderText text={deck.title} />
              </a>
              <span class="deck-meta">{renderStudyAction(deck)}</span>
            </li>
          ))}
        </ul>
      )}
      <div class="actions">
        <a class="button primary" href={createDeckHref}>
          {t("deckList.createButton")}
        </a>
        <a class="button" href={libraryHref}>
          <LibraryIcon />
          {t("deckList.libraryLink")}
        </a>
      </div>
    </section>
  );
}
