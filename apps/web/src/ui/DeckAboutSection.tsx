import { useState } from "preact/hooks";
import { TOPICS } from "@solid-memo/vocab/concepts.generated";
import type { Deck } from "@solid-memo/domain/deck";
import { parseKeywords, topicsOfDeck, type DeckAbout } from "@solid-memo/domain/deckAbout";
import { topicLabels } from "@solid-memo/domain/library";
import { linkify } from "./linkify";
import { editedText } from "@solid-memo/domain/langText";
import { readerText } from "./readerText";

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
  /** The drafts while editing; null otherwise. */
  const [draft, setDraft] = useState<{ description: string; topics: string[]; keywords: string } | null>(
    null,
  );
  const topics = topicLabels(deck.themes ?? []);
  const keywords = deck.keywords ?? [];

  function edit() {
    setDraft({
      description: editedText(deck.description),
      topics: topicsOfDeck(deck),
      keywords: keywords.join(", "),
    });
  }

  /** Only while editing, when there is a draft. */
  function toggleTopic(topic: string, checked: boolean) {
    setDraft((current) => ({
      ...current!,
      topics: checked ? [...current!.topics, topic] : current!.topics.filter((t) => t !== topic),
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
      <section class="deck-about" aria-label="About this deck">
        {deck.description !== undefined && <p class="deck-description">{linkify(readerText(deck.description))}</p>}
        {(topics.length > 0 || keywords.length > 0) && (
          <p class="hint">
            {topics.length > 0 && `Topics: ${topics.join(", ")}`}
            {topics.length > 0 && keywords.length > 0 && " · "}
            {keywords.length > 0 && `Keywords: ${keywords.join(", ")}`}
          </p>
        )}
        <button onClick={edit} disabled={busy}>
          Describe deck
        </button>
      </section>
    );
  }

  return (
    <form class="card-edit deck-about" aria-label="About this deck" onSubmit={handleSubmit}>
      <label for="deck-description">Description</label>
      <textarea
        id="deck-description"
        value={draft.description}
        onInput={(e) => setDraft({ ...draft, description: e.currentTarget.value })}
        required
        disabled={busy}
      />
      <fieldset class="library-topics">
        <legend>Topics</legend>
        {TOPICS.concepts.map((topic) => (
          <label key={topic.iri} class="checkbox-option">
            <input
              type="checkbox"
              checked={draft.topics.includes(topic.iri)}
              onChange={(e) => toggleTopic(topic.iri, e.currentTarget.checked)}
              disabled={busy}
            />
            {topic.label}
          </label>
        ))}
      </fieldset>
      <label for="deck-keywords">Keywords</label>
      <input
        id="deck-keywords"
        type="text"
        value={draft.keywords}
        placeholder="Separated by commas"
        onInput={(e) => setDraft({ ...draft, keywords: e.currentTarget.value })}
        disabled={busy}
      />
      <div class="edit-actions">
        <button type="submit" disabled={busy}>
          Save description
        </button>
        <button type="button" aria-label="Cancel describing" onClick={() => setDraft(null)} disabled={busy}>
          Cancel
        </button>
      </div>
    </form>
  );
}
