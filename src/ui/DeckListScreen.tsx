import type { ComponentChildren } from "preact";
import type { Deck } from "../domain/deck";
import { CollectionIcon, DeckIcon, LibraryIcon } from "./icons";

/** Decks to open or study. Decks are renamed and removed in the Browser. */
export function DeckListScreen({
  decks,
  decksHref,
  libraryHref,
  deckHref,
  renderStudyAction,
  onCreateDeck,
}: {
  decks: Deck[];
  /** URL of this deck list; wherever the UI says "Decks", it links here. */
  decksHref: string;
  /** URL of the deck library, where ready-made decks are imported from. */
  libraryHref: string;
  /** URL of a deck's page; wherever the UI names a deck, it links there. */
  deckHref: (deck: Deck) => string;
  /**
   * What the row suggests doing with the deck today (Study, Practice, or
   * nothing). Supplied by the container: it depends on each deck's queue.
   */
  renderStudyAction: (deck: Deck) => ComponentChildren;
  /** Navigate to the deck creator view. */
  onCreateDeck: () => void;
}) {
  return (
    <section>
      <header>
        <h2>
          <a href={decksHref}>
            <CollectionIcon />
            Decks
          </a>
        </h2>
        <span class="hint">
          {decks.length === 1 ? "1 deck" : `${decks.length} decks`}
        </span>
      </header>
      {decks.length === 0 ? (
        <p>
          No decks yet. Create your first deck below, or import one from
          the deck library.
        </p>
      ) : (
        <ul class="deck-list">
          {decks.map((deck) => (
            <li key={deck.url}>
              <a class="deck-open" href={deckHref(deck)}>
                <DeckIcon />
                {deck.name}
              </a>
              {renderStudyAction(deck)}
            </li>
          ))}
        </ul>
      )}
      <div class="actions">
        <button class="primary" onClick={onCreateDeck}>
          Create deck
        </button>
        <a class="button" href={libraryHref}>
          <LibraryIcon />
          Deck library
        </a>
      </div>
    </section>
  );
}
