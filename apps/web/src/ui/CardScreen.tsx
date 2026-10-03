import type { AppError } from "@solid-memo/domain/appError";
import { useState } from "preact/hooks";
import {
  cardLabel,
  validateCardContent,
  type Card,
  type CardContent,
} from "@solid-memo/domain/deck";
import { CARD_FIELDS_ERROR_ID, CardContentFields, contentOf, draftOf } from "./CardContentFields";
import { CardFace } from "./CardFace";
import { ErrorMessage } from "./ErrorMessage";
import { useI18n, type ErrorText } from "./i18n";
import { CardIcon, TrashIcon } from "./icons";
import { RetiredNotice } from "./RetiredCards";

/**
 * One card's own page: the card as it looks in study, and its editor.
 * While a change saves, its buttons keep the focus (aria-disabled), as
 * the page stays.
 */
export function CardScreen({
  card,
  busy,
  saved,
  error,
  onSave,
  onRemove,
}: {
  card: Card;
  busy: boolean;
  /** The last save succeeded (and nothing was edited since). */
  saved: boolean;
  error: ErrorText | null;
  onSave: (content: CardContent) => void;
  onRemove: () => void;
}) {
  const { t, locale, readerText, errorText } = useI18n();
  const [draft, setDraft] = useState(() => draftOf(card, locale));
  const [invalid, setInvalid] = useState<AppError | null>(null);

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (busy) return;
    const validation = validateCardContent(contentOf(draft, locale, card));
    if (!validation.ok) {
      setInvalid(validation.error);
      return;
    }
    setInvalid(null);
    onSave(validation.content);
  }

  function handleRemove() {
    if (busy) return;
    if (
      window.confirm(t("card.removeConfirm", { card: cardLabel(card, readerText) }))
    ) {
      onRemove();
    }
  }

  return (
    <section>
      <header>
        <h2>
          <CardIcon />
          {t("card.heading")}
        </h2>
      </header>
      <div class="practice-card">
        <CardFace
          side="front"
          text={card.front}
          imageUrl={card.frontImageUrl}
          imageDescription={card.frontImageDescription}
          note={card.frontNote}
        />
        <CardFace
          side="back"
          text={card.back}
          imageUrl={card.backImageUrl}
          imageDescription={card.backImageDescription}
          label={card.backLabel}
          note={card.backNote}
        />
      </div>
      {card.retired && <RetiredNotice />}
      <form onSubmit={handleSubmit} noValidate>
        <CardContentFields draft={draft} card={card} busy={busy} invalid={invalid} onChange={setDraft} />
        <ErrorMessage id={CARD_FIELDS_ERROR_ID} error={errorText(invalid)} />
        <div class="edit-actions">
          <button type="submit" aria-disabled={busy}>
            {t("card.saveButton")}
          </button>
          <button
            type="button"
            class="danger icon"
            aria-label={t("card.removeButton")}
            title={t("card.removeButton")}
            onClick={handleRemove}
            aria-disabled={busy}
          >
            <TrashIcon />
          </button>
        </div>
      </form>
      {/* Mounted throughout, so each save is heard: the text clears while
          the next one is under way and comes back once it is done. */}
      <p class="hint" role="status">
        {saved ? t("card.saved") : ""}
      </p>
      <ErrorMessage error={error} />
    </section>
  );
}
