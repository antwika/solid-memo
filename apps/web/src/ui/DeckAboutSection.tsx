import { useState } from "preact/hooks";
import { TOPICS } from "@solid-memo/vocab/concepts.generated";
import type { Deck } from "@solid-memo/domain/deck";
import { parseKeywords, topicsOfDeck, type DeckAbout } from "@solid-memo/domain/deckAbout";
import { topicLabels } from "@solid-memo/domain/library";
import { linkify } from "./linkify";
import { useI18n } from "./i18n";
import { ReaderText, ReaderTexts } from "./ReaderText";

/**
 * What a deck says about itself — its description, its topics (from
 * Solid Memo's topics scheme) and its keywords — with a form to change
 * them. The description is required: every deck has one, as DCAT-AP asks
 * of every dataset (see docs/data-model.md).
 */
export function DeckAboutSection({
  deck,
  busy,
  onSave,
}: {
  deck: Deck;
  busy: boolean;
  onSave: (about: DeckAbout) => void;
}) {
  const { t, tx, readerText, readerLang, typedPart, typedText } = useI18n();
  /** The drafts while editing; null otherwise. */
  const [draft, setDraft] = useState<{ description: string; topics: string[]; keywords: string } | null>(
    null,
  );
  const topics = topicLabels(deck.themes ?? []);
  const keywords = deck.keywords ?? [];

  function edit() {
    setDraft({
      description: typedText(deck.description),
      topics: topicsOfDeck(deck),
      keywords: keywords.join(", "),
    });
  }

  /** Only while editing, when there is a draft. */
  function toggleTopic(topic: string, checked: boolean) {
    setDraft((current) => ({
      ...current!,
      topics: checked ? [...current!.topics, topic] : current!.topics.filter((other) => other !== topic),
    }));
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    onSave({
      description: draft!.description,
      topics: draft!.topics,
      keywords: parseKeywords(draft!.keywords),
    });
    setDraft(null);
  }

  if (draft === null) {
    return (
      <section class="deck-about" aria-label={t("deckAbout.label")}>
        {deck.description !== undefined && (
          <p class="deck-description" lang={readerLang(deck.description)}>
            {linkify(readerText(deck.description))}
          </p>
        )}
        {(topics.length > 0 || keywords.length > 0) && (
          <p class="hint">
            {topics.length > 0 && tx("deckAbout.topicsLine", { topics: <ReaderTexts texts={topics} /> })}
            {topics.length > 0 && keywords.length > 0 && " · "}
            {keywords.length > 0 && t("deckAbout.keywordsLine", { keywords: keywords.join(", ") })}
          </p>
        )}
        <button onClick={edit} disabled={busy}>
          {t("deckAbout.describeButton")}
        </button>
      </section>
    );
  }

  const edited = typedPart(deck.description);
  return (
    <form class="card-edit deck-about" aria-label={t("deckAbout.label")} onSubmit={handleSubmit}>
      <label for="deck-description">{t("deckAbout.description")}</label>
      <textarea
        id="deck-description"
        lang={edited.lang}
        aria-describedby={edited.hint === null ? undefined : "deck-description-language"}
        value={draft.description}
        onInput={(e) => setDraft({ ...draft, description: e.currentTarget.value })}
        required
        disabled={busy}
      />
      {edited.hint !== null && (
        <p id="deck-description-language" class="hint field-hint">
          {edited.hint}
        </p>
      )}
      <fieldset class="library-topics">
        <legend>{t("deckAbout.topics")}</legend>
        {TOPICS.concepts.map((topic) => (
          <label key={topic.iri} class="checkbox-option">
            <input
              type="checkbox"
              checked={draft.topics.includes(topic.iri)}
              onChange={(e) => toggleTopic(topic.iri, e.currentTarget.checked)}
              disabled={busy}
            />
            <ReaderText text={topic.label} />
          </label>
        ))}
      </fieldset>
      <label for="deck-keywords">{t("deckAbout.keywords")}</label>
      <input
        id="deck-keywords"
        type="text"
        value={draft.keywords}
        aria-describedby="deck-keywords-hint"
        onInput={(e) => setDraft({ ...draft, keywords: e.currentTarget.value })}
        disabled={busy}
      />
      <p id="deck-keywords-hint" class="hint field-hint">
        {t("deckAbout.keywordsHint")}
      </p>
      <div class="edit-actions">
        <button type="submit" disabled={busy}>
          {t("deckAbout.saveButton")}
        </button>
        <button type="button" aria-label={t("deckAbout.cancelLabel")} onClick={() => setDraft(null)} disabled={busy}>
          {t("deckAbout.cancelButton")}
        </button>
      </div>
    </form>
  );
}
