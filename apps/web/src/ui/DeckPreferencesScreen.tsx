import { Fragment } from "preact";
import { useState } from "preact/hooks";
import type { Deck } from "@solid-memo/domain/deck";
import type { DeckPace } from "@solid-memo/domain/deckPace";
import type { StudyPreferences } from "@solid-memo/domain/preferences";

type Limit = keyof DeckPace;

const LIMITS: {
  limit: Limit;
  label: string;
  /** What the number in the field counts, shown after it. */
  unit: (count: number) => string;
}[] = [
  {
    limit: "newCardsPerDay",
    label: "New cards per day",
    unit: (count) => `new ${count === 1 ? "card" : "cards"} per day`,
  },
  {
    limit: "maxReviewsPerDay",
    label: "Max reviews per day",
    unit: (count) => `max ${count === 1 ? "review" : "reviews"} per day`,
  },
];

/**
 * A deck's own preferences: its name (renamed here, or the deck removed)
 * and its daily limits on new cards and on
 * reviews. A limit the deck does not set follows the instance's
 * preferences, which an empty field shows as its placeholder — so
 * emptying a field hands the limit back to them. Each field is followed
 * by what it counts, in the number of the value shown in it.
 */
export function DeckPreferencesScreen({
  deck,
  deckHref,
  preferences,
  preferencesHref,
  busy,
  error,
  onSave,
  onRename,
  onRemove,
}: {
  deck: Deck;
  /** URL of the deck's page; its name links there. */
  deckHref: string;
  /** The instance's preferences: the limits a deck follows unless it sets its own. */
  preferences: Pick<StudyPreferences, Limit>;
  /** URL of the instance's preferences, where those limits are set. */
  preferencesHref: string;
  busy: boolean;
  error: string | null;
  onSave: (pace: DeckPace) => void;
  onRename: (name: string) => void;
  /** Remove the deck and all its cards (after the user confirms). */
  onRemove: () => void;
}) {
  /** The deck-name draft while renaming; null otherwise. */
  const [deckName, setDeckName] = useState<string | null>(null);

  /** The fields as typed; empty means "follow the instance's preferences". */
  const [draft, setDraft] = useState<Record<Limit, string>>(() => ({
    newCardsPerDay: deck.newCardsPerDay?.toString() ?? "",
    maxReviewsPerDay: deck.maxReviewsPerDay?.toString() ?? "",
  }));

  function handleRenameSubmit(event: Event, name: string) {
    event.preventDefault();
    onRename(name.trim());
    setDeckName(null);
  }

  function handleRemove() {
    if (
      window.confirm(
        `Remove the deck "${deck.name}" and all its cards? This cannot be undone.`,
      )
    ) {
      onRemove();
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    const pace: DeckPace = {};
    for (const { limit } of LIMITS) {
      if (draft[limit] !== "") pace[limit] = Number(draft[limit]);
    }
    onSave(pace);
  }

  return (
    <section>
      <header>
        <h2>
          Preferences: <a href={deckHref}>{deck.name}</a>
        </h2>
      </header>
      {deckName === null ? (
        <div class="edit-actions">
          <button onClick={() => setDeckName(deck.name)} disabled={busy}>
            Rename deck
          </button>
          <button class="danger" onClick={handleRemove} disabled={busy}>
            Remove deck
          </button>
        </div>
      ) : (
        <form
          class="card-edit"
          onSubmit={(e) => handleRenameSubmit(e, deckName)}
        >
          <label for="deck-name">Deck name</label>
          <input
            id="deck-name"
            type="text"
            value={deckName}
            onInput={(e) => setDeckName(e.currentTarget.value)}
            required
            disabled={busy}
          />
          <div class="edit-actions">
            <button type="submit" disabled={busy}>
              Save name
            </button>
            <button
              type="button"
              aria-label="Cancel renaming"
              onClick={() => setDeckName(null)}
              disabled={busy}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <form onSubmit={handleSubmit}>
        {LIMITS.map(({ limit, label, unit }) => (
          <Fragment key={limit}>
            <label for={`deck-${limit}`}>{label}</label>
            <span class="input-with-unit">
              <input
                id={`deck-${limit}`}
                type="number"
                min="0"
                step="1"
                value={draft[limit]}
                placeholder={String(preferences[limit])}
                onInput={(e) => setDraft({ ...draft, [limit]: e.currentTarget.value })}
                disabled={busy}
              />
              <span class="hint">
                {unit(draft[limit] === "" ? preferences[limit] : Number(draft[limit]))}
              </span>
            </span>
          </Fragment>
        ))}
        <p class="hint">
          An empty field defaults to your{" "}
          <a href={preferencesHref}>study preferences</a>.
        </p>
        <button type="submit" disabled={busy}>
          Save preferences
        </button>
      </form>
      {error && <p class="error">{error}</p>}
    </section>
  );
}
