import { useState } from "preact/hooks";
import {
  cardLabel,
  validateCardContent,
  type Card,
  type CardContent,
} from "@solid-memo/domain/deck";
import { CardContentFields, contentOf, draftOf } from "./CardContentFields";
import { CardFace } from "./CardFace";
import { useI18n } from "./i18n";
import { CardIcon, TrashIcon } from "./icons";
import { RetiredNotice } from "./RetiredCards";

/** One card's own page: the card as it looks in study, and its editor. */
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
  error: string | null;
  onSave: (content: CardContent) => void;
  onRemove: () => void;
}) {
  const { t } = useI18n();
  const [draft, setDraft] = useState(() => draftOf(card));
  const [invalid, setInvalid] = useState<string | null>(null);

  function handleSubmit(event: Event) {
    event.preventDefault();
    const validation = validateCardContent(contentOf(draft, card));
    if (!validation.ok) {
      setInvalid(validation.error);
      return;
    }
    setInvalid(null);
    onSave(validation.content);
  }

  function handleRemove() {
    if (
      window.confirm(t("card.removeConfirm", { card: cardLabel(card) }))
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
        <CardFace side="front" text={card.front} imageUrl={card.frontImageUrl} note={card.frontNote} />
        <CardFace
          side="back"
          text={card.back}
          imageUrl={card.backImageUrl}
          label={card.backLabel}
          note={card.backNote}
        />
      </div>
      {card.retired && <RetiredNotice />}
      <form onSubmit={handleSubmit} noValidate>
        <CardContentFields draft={draft} busy={busy} onChange={setDraft} />
        {invalid && (
          <p class="error" role="alert">
            {invalid}
          </p>
        )}
        <div class="edit-actions">
          <button type="submit" disabled={busy}>
            {t("card.saveButton")}
          </button>
          <button
            type="button"
            class="danger icon"
            aria-label={t("card.removeButton")}
            title={t("card.removeButton")}
            onClick={handleRemove}
            disabled={busy}
          >
            <TrashIcon />
          </button>
        </div>
      </form>
      {saved && (
        <p class="hint" role="status">
          {t("card.saved")}
        </p>
      )}
      {error && <p class="error">{error}</p>}
    </section>
  );
}
