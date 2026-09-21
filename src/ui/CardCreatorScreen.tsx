import { AddCardForm } from "./AddCardForm";
import type { Deck } from "../domain/deck";

/** Card entry page; stays open after each add so batches are easy. */
export function CardCreatorScreen({
  deck,
  busy,
  error,
  onAdd,
  onBack,
}: {
  deck: Deck;
  busy: boolean;
  error: string | null;
  onAdd: (front: string, back: string) => void;
  onBack: () => void;
}) {
  return (
    <section>
      <header>
        <h2>New card</h2>
        <button onClick={onBack} disabled={busy}>
          Back
        </button>
      </header>
      <p class="hint">Adding to "{deck.name}".</p>
      <AddCardForm busy={busy} onAdd={onAdd} />
      {error && <p class="error">{error}</p>}
    </section>
  );
}
