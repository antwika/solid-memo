import { AddCardForm } from "./AddCardForm";
import type { CardContent, Deck } from "../domain/deck";

/** Card entry page; stays open after each add so batches are easy. */
export function CardCreatorScreen({
  deck,
  deckHref,
  busy,
  error,
  onAdd,
  onBack,
}: {
  deck: Deck;
  /** URL of the deck's page; its name links there. */
  deckHref: string;
  busy: boolean;
  error: string | null;
  onAdd: (content: CardContent) => void;
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
      <p class="hint">
        Adding to "<a href={deckHref}>{deck.name}</a>".
      </p>
      <AddCardForm busy={busy} onAdd={onAdd} />
      {error && <p class="error">{error}</p>}
    </section>
  );
}
