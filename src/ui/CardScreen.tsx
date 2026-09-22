import { useState } from "preact/hooks";
import {
  cardLabel,
  validateCardContent,
  type Card,
  type CardContent,
} from "../domain/deck";
import { CardContentFields, draftOf } from "./CardContentFields";
import { CardFace } from "./CardFace";
import { CardIcon, TrashIcon } from "./icons";

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
  const [draft, setDraft] = useState(() => draftOf(card));
  const [invalid, setInvalid] = useState<string | null>(null);

  function handleSubmit(event: Event) {
    event.preventDefault();
    const validation = validateCardContent(draft);
    if (!validation.ok) {
      setInvalid(validation.error);
      return;
    }
    setInvalid(null);
    onSave(validation.content);
  }

  function handleRemove() {
    if (
      window.confirm(
        `Remove the card "${cardLabel(card)}"? This cannot be undone.`,
      )
    ) {
      onRemove();
    }
  }

  return (
    <section>
      <header>
        <h2>
          <CardIcon />
          Card
        </h2>
      </header>
      <div class="practice-card">
        <CardFace side="front" text={card.front} imageUrl={card.frontImageUrl} />
        <CardFace side="back" text={card.back} imageUrl={card.backImageUrl} />
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <CardContentFields draft={draft} busy={busy} onChange={setDraft} />
        {invalid && (
          <p class="error" role="alert">
            {invalid}
          </p>
        )}
        <div class="edit-actions">
          <button type="submit" disabled={busy}>
            Save
          </button>
          <button
            type="button"
            class="danger icon"
            aria-label="Remove card"
            title="Remove card"
            onClick={handleRemove}
            disabled={busy}
          >
            <TrashIcon />
          </button>
        </div>
      </form>
      {saved && (
        <p class="hint" role="status">
          Saved.
        </p>
      )}
      {error && <p class="error">{error}</p>}
    </section>
  );
}
