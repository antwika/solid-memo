import { useState } from "preact/hooks";
import type { LibraryDeck } from "../domain/library";
import { LibraryIcon } from "./icons";
import { cardCount } from "./studyCounts";

/** "Import selected" until something is ticked, then the count. */
function importLabel(count: number): string {
  if (count === 0) return "Import selected";
  return count === 1 ? "Import 1 deck" : `Import ${count} decks`;
}

/**
 * The deck library: ready-made decks to copy into the current instance.
 * Any number can be ticked and imported in one go. A row says only the
 * deck's name and size; clicking it (anywhere but the checkbox) opens
 * the deck's own page, where it is described in full and can be
 * imported on its own.
 */
export function LibraryScreen({
  decks,
  libraryHref,
  deckHref,
  isImported,
  busy,
  error,
  onImport,
}: {
  decks: LibraryDeck[];
  /** URL of this screen; wherever the UI says "Deck library", it links here. */
  libraryHref: string;
  /** URL of a library deck's page; its name links there. */
  deckHref: (deck: LibraryDeck) => string;
  /** Whether the instance already holds a copy of the deck. */
  isImported: (deck: LibraryDeck) => boolean;
  /** An import is in progress. */
  busy: boolean;
  error: string | null;
  onImport: (decks: LibraryDeck[]) => void;
}) {
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const selected = decks.filter((deck) => selectedUrls.includes(deck.url));

  function toggle(deck: LibraryDeck, checked: boolean) {
    setSelectedUrls((urls) =>
      checked
        ? [...urls, deck.url]
        : urls.filter((url) => url !== deck.url),
    );
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    onImport(selected);
  }

  return (
    <section>
      <header>
        <h2>
          <a href={libraryHref}>
            <LibraryIcon />
            Deck library
          </a>
        </h2>
        <span class="hint">
          {decks.length === 1 ? "1 deck" : `${decks.length} decks`}
        </span>
      </header>
      <p>
        Ready-made decks. Open one to read about it, or tick several and
        import them into this instance as your own copies.
      </p>
      {decks.length === 0 ? (
        <p>The library has no decks yet.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <ul class="library-list">
            {decks.map((deck) => (
              <li key={deck.url}>
                <input
                  type="checkbox"
                  aria-label={deck.name}
                  checked={selectedUrls.includes(deck.url)}
                  disabled={busy}
                  onChange={(e) => toggle(deck, e.currentTarget.checked)}
                />
                <a class="library-deck-name" href={deckHref(deck)}>
                  {deck.name}
                </a>
                <span class="hint">{cardCount(deck.cardCount)}</span>
                {isImported(deck) && (
                  <span class="hint library-imported">Already imported</span>
                )}
              </li>
            ))}
          </ul>
          <button type="submit" disabled={busy || selected.length === 0}>
            {busy ? "Importing…" : importLabel(selected.length)}
          </button>
        </form>
      )}
      {error && <p class="error">{error}</p>}
    </section>
  );
}
