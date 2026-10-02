import { useState } from "preact/hooks";
import { filterLibraryDecks, topicsOf, type LibraryDeck } from "@solid-memo/domain/library";
import { LibraryIcon } from "./icons";
import { useI18n, type I18n } from "./i18n";

/** "Import selected" until something is ticked, then the count. */
function importLabel(t: I18n["t"], count: number): string {
  if (count === 0) return t("library.importSelected");
  return t("library.importDecks", { count });
}

/**
 * The deck library: ready-made decks to copy into the current instance.
 * Any number can be ticked and imported in one go. The list can be
 * narrowed to topics (checkboxes, from Solid Memo's topics scheme) and
 * by a search of names, descriptions and keywords. A row says only the
 * deck's name and size; clicking it (anywhere but the checkbox and the
 * Preview button) opens the deck's own page, where it is described in
 * full and can be imported on its own. Preview tries its cards first.
 */
export function LibraryScreen({
  decks,
  libraryHref,
  deckHref,
  previewHref,
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
  /** URL of a library deck's preview; its Preview button links there. */
  previewHref: (deck: LibraryDeck) => string;
  /** Whether the instance already holds a copy of the deck. */
  isImported: (deck: LibraryDeck) => boolean;
  /** An import is in progress. */
  busy: boolean;
  error: string | null;
  onImport: (decks: LibraryDeck[]) => void;
}) {
  const { t, readerText } = useI18n();
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const selected = decks.filter((deck) => selectedUrls.includes(deck.url));
  const shown = filterLibraryDecks(decks, { topics, query });
  const available = topicsOf(decks);

  function toggleTopic(topic: string, checked: boolean) {
    setTopics((current) =>
      checked ? [...current, topic] : current.filter((t) => t !== topic),
    );
  }

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
            {t("library.heading")}
          </a>
        </h2>
        <span class="hint">
          {shown.length === decks.length
            ? t("library.deckCount", { count: decks.length })
            : t("library.shownCount", { shown: shown.length, count: decks.length })}
        </span>
      </header>
      <p>{t("library.intro")}</p>
      {decks.length === 0 ? (
        <p>{t("library.empty")}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {available.length > 0 && (
            <fieldset class="library-topics">
              <legend>{t("library.topics")}</legend>
              {available.map((topic) => (
                <label key={topic.iri} class="checkbox-option">
                  <input
                    type="checkbox"
                    checked={topics.includes(topic.iri)}
                    onChange={(e) => toggleTopic(topic.iri, e.currentTarget.checked)}
                  />
                  {readerText(topic.label)}
                </label>
              ))}
            </fieldset>
          )}
          <label for="library-search">{t("library.search")}</label>
          <input
            id="library-search"
            type="search"
            value={query}
            placeholder={t("library.searchPlaceholder")}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
          {shown.length === 0 && <p>{t("library.noMatch")}</p>}
          <ul class="library-list">
            {shown.map((deck) => (
              <li key={deck.url}>
                <input
                  type="checkbox"
                  aria-label={readerText(deck.title)}
                  checked={selectedUrls.includes(deck.url)}
                  disabled={busy}
                  onChange={(e) => toggle(deck, e.currentTarget.checked)}
                />
                <a class="library-deck-name" href={deckHref(deck)}>
                  {readerText(deck.title)}
                </a>
                <span class="library-deck-meta">
                  <span class="hint">{t("common.cardCount", { count: deck.cardCount })}</span>
                  {isImported(deck) && (
                    <span class="hint library-imported">{t("library.alreadyImported")}</span>
                  )}
                </span>
                <a
                  class="button library-preview"
                  href={previewHref(deck)}
                  aria-label={t("library.previewDeck", { deck: readerText(deck.title) })}
                >
                  {t("library.preview")}
                </a>
              </li>
            ))}
          </ul>
          <button type="submit" disabled={busy || selected.length === 0}>
            {busy ? t("library.importing") : importLabel(t, selected.length)}
          </button>
        </form>
      )}
      {error && <p class="error">{error}</p>}
    </section>
  );
}
