import { useState } from "preact/hooks";
import type { LibraryDeck } from "../domain/library";
import { DeckProvenance } from "./DeckProvenance";
import { LibraryIcon } from "./icons";
import { cardCount } from "./studyCounts";

/** "Import selected" until something is ticked, then the count. */
function importLabel(count: number): string {
  if (count === 0) return "Import selected";
  return count === 1 ? "Import 1 deck" : `Import ${count} decks`;
}

/**
 * The deck library: ready-made decks to copy into the current instance.
 * Any number can be ticked and imported in one go.
 */
export function LibraryScreen({
  decks,
  libraryHref,
  isImported,
  busy,
  error,
  onImport,
}: {
  decks: LibraryDeck[];
  /** URL of this screen; wherever the UI says "Deck library", it links here. */
  libraryHref: string;
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
        Ready-made decks. Tick the ones you want and import them into this
        instance as your own copies to study and edit.
      </p>
      {decks.length === 0 ? (
        <p>The library has no decks yet.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <ul class="library-list">
            {decks.map((deck) => (
              <li key={deck.url}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedUrls.includes(deck.url)}
                    disabled={busy}
                    onChange={(e) => toggle(deck, e.currentTarget.checked)}
                  />
                  <span class="library-deck-name">{deck.name}</span>
                </label>
                <DeckProvenance
                  authors={deck.authors}
                  license={deck.license}
                  description={deck.description}
                />
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
