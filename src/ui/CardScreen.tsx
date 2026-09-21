import { useState } from "preact/hooks";
import type { Card } from "../domain/deck";
import { TrashIcon } from "./icons";

/** One card's own page: the card as it looks in study, and its editor. */
export function CardScreen({
  card,
  browserHref,
  busy,
  saved,
  error,
  onSave,
  onRemove,
}: {
  card: Card;
  /** URL of the deck's Browser, for "Back to Browser". */
  browserHref: string;
  busy: boolean;
  /** The last save succeeded (and nothing was edited since). */
  saved: boolean;
  error: string | null;
  onSave: (front: string, back: string) => void;
  onRemove: () => void;
}) {
  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);

  function handleSubmit(event: Event) {
    event.preventDefault();
    onSave(front.trim(), back.trim());
  }

  function handleRemove() {
    if (
      window.confirm(`Remove the card "${card.front}"? This cannot be undone.`)
    ) {
      onRemove();
    }
  }

  return (
    <section>
      <header>
        <h2>Card</h2>
        <a class="button" href={browserHref}>
          Back to Browser
        </a>
      </header>
      <div class="practice-card">
        <p class="card-front">{card.front}</p>
        <p class="card-back">{card.back}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label for="card-front">Front</label>
        <input
          id="card-front"
          type="text"
          value={front}
          onInput={(e) => setFront(e.currentTarget.value)}
          required
          disabled={busy}
        />
        <label for="card-back">Back</label>
        <input
          id="card-back"
          type="text"
          value={back}
          onInput={(e) => setBack(e.currentTarget.value)}
          required
          disabled={busy}
        />
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
