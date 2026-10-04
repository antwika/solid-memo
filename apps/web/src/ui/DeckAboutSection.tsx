import { useState } from "preact/hooks";
import { AppError } from "@solid-memo/domain/appError";
import { TOPICS } from "@solid-memo/vocab/concepts.generated";
import type { Deck } from "@solid-memo/domain/deck";
import { parseKeywords, topicsOfDeck, type DeckAbout } from "@solid-memo/domain/deckAbout";
import { topicLabels } from "@solid-memo/domain/library";
import { shownTag } from "@solid-memo/domain/langText";
import { ErrorMessage } from "./ErrorMessage";
import {
  draftOf,
  LangTextField,
  rememberLanguages,
  textOfDraft,
  useMissingLanguage,
  type LangTextDraft,
} from "./LangTextField";
import { linkify } from "./linkify";
import { recentLanguages } from "./remembered";
import { useI18n } from "./i18n";
import { ReaderText, ReaderTexts } from "./ReaderText";

/**
 * What a deck says about itself — its description, its topics (from
 * Solid Memo's topics scheme) and its keywords — with a form to change
 * them. The description is required: every deck has one, as DCAT-AP asks
 * of every dataset (see docs/data-model.md). It is edited in every
 * language it has, each the user's to state (LangTextField); a deck with
 * none yet starts it in the language of the name the reader sees, else
 * the one last chosen for a deck's text on this device.
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
  const { t, tx, locale, readerText, readerLang, errorText } = useI18n();
  /** The drafts while editing; null otherwise. */
  const [draft, setDraft] = useState<{ description: LangTextDraft; topics: string[]; keywords: string } | null>(
    null,
  );
  const { missing, ask, clear } = useMissingLanguage("deck-description");
  const topics = topicLabels(deck.themes ?? []);
  const keywords = deck.keywords ?? [];

  function edit() {
    setDraft({
      description: draftOf(deck.description, [locale, ...navigator.languages], {
        tag: shownTag(deck.title, [locale, ...navigator.languages]) ?? recentLanguages("deck")[0] ?? null,
      }),
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
    const result = textOfDraft(draft!.description);
    if ("missing" in result) {
      ask(result.missing);
      return;
    }
    rememberLanguages("deck", result.text, draft!.description);
    onSave({
      description: result.text,
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

  return (
    <form class="card-edit deck-about" aria-label={t("deckAbout.label")} onSubmit={handleSubmit}>
      <LangTextField
        id="deck-description"
        label={t("deckAbout.description")}
        role="description"
        draft={draft.description}
        suggestions={Object.keys({ ...deck.description, ...deck.title })}
        multiline
        translationsOpen
        required
        disabled={busy}
        missing={missing}
        errorId="deck-description-error"
        onChange={(description) => {
          clear();
          setDraft({ ...draft, description });
        }}
      />
      <ErrorMessage
        id="deck-description-error"
        error={
          missing === undefined
            ? null
            : errorText(new AppError("textNeedsLanguage", { field: t("language.field.description") }))
        }
      />
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
        <button
          type="button"
          aria-label={t("deckAbout.cancelLabel")}
          onClick={() => {
            clear();
            setDraft(null);
          }}
          disabled={busy}
        >
          {t("deckAbout.cancelButton")}
        </button>
      </div>
    </form>
  );
}
