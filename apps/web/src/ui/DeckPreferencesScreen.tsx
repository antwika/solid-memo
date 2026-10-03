import { Fragment } from "preact";
import { useState } from "preact/hooks";
import type { Deck } from "@solid-memo/domain/deck";
import type { DeckPace } from "@solid-memo/domain/deckPace";
import type { StudyPreferences } from "@solid-memo/domain/preferences";
import { editedText } from "@solid-memo/domain/langText";
import { useI18n, type I18n } from "./i18n";

type Limit = keyof DeckPace;

const LIMITS: Limit[] = ["newCardsPerDay", "maxReviewsPerDay"];

/** A limit's field label. */
function limitLabel(t: I18n["t"], limit: Limit): string {
  switch (limit) {
    case "newCardsPerDay":
      return t("deckPreferences.newCardsPerDay");
    case "maxReviewsPerDay":
      return t("deckPreferences.maxReviewsPerDay");
  }
}

/** What the number in a limit's field counts, shown after it. */
function limitUnit(t: I18n["t"], limit: Limit, count: number): string {
  switch (limit) {
    case "newCardsPerDay":
      return t("deckPreferences.newCardsUnit", { count });
    case "maxReviewsPerDay":
      return t("deckPreferences.maxReviewsUnit", { count });
  }
}

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
  const { t, tx, readerText } = useI18n();
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
        t("deckPreferences.removeConfirm", { title: readerText(deck.title) }),
      )
    ) {
      onRemove();
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    const pace: DeckPace = {};
    for (const limit of LIMITS) {
      if (draft[limit] !== "") pace[limit] = Number(draft[limit]);
    }
    onSave(pace);
  }

  return (
    <section>
      <header>
        <h2>
          {tx("deckPreferences.heading", { deck: <a href={deckHref}>{readerText(deck.title)}</a> })}
        </h2>
      </header>
      {deckName === null ? (
        <div class="edit-actions">
          <button onClick={() => setDeckName(editedText(deck.title))} disabled={busy}>
            {t("deckPreferences.renameButton")}
          </button>
          <button class="danger" onClick={handleRemove} disabled={busy}>
            {t("deckPreferences.removeButton")}
          </button>
        </div>
      ) : (
        <form
          class="card-edit"
          onSubmit={(e) => handleRenameSubmit(e, deckName)}
        >
          <label for="deck-name">{t("deckPreferences.deckName")}</label>
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
              {t("deckPreferences.saveName")}
            </button>
            <button
              type="button"
              aria-label={t("deckPreferences.cancelRenamingLabel")}
              onClick={() => setDeckName(null)}
              disabled={busy}
            >
              {t("deckPreferences.cancelButton")}
            </button>
          </div>
        </form>
      )}
      <form onSubmit={handleSubmit}>
        {LIMITS.map((limit) => (
          <Fragment key={limit}>
            <label for={`deck-${limit}`}>{limitLabel(t, limit)}</label>
            <span class="input-with-unit">
              <input
                id={`deck-${limit}`}
                type="number"
                min="0"
                step="1"
                value={draft[limit]}
                placeholder={String(preferences[limit])}
                onInput={(e) => setDraft({ ...draft, [limit]: e.currentTarget.value })}
                aria-describedby={limit === "newCardsPerDay" ? "deck-new-hint" : undefined}
                disabled={busy}
              />
              <span class="hint">
                {limitUnit(t, limit, draft[limit] === "" ? preferences[limit] : Number(draft[limit]))}
              </span>
            </span>
            {limit === "newCardsPerDay" && (
              <p id="deck-new-hint" class="hint">
                {t("studyPace.startSmall")}
              </p>
            )}
          </Fragment>
        ))}
        <p class="hint">
          {tx("deckPreferences.emptyHint", {
            link: <a href={preferencesHref}>{t("deckPreferences.studyPreferencesLink")}</a>,
          })}
        </p>
        <button type="submit" disabled={busy}>
          {t("deckPreferences.saveButton")}
        </button>
      </form>
      {error && <p class="error">{error}</p>}
    </section>
  );
}
