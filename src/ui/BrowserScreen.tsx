import { useState } from "preact/hooks";
import type { Card, Deck } from "../domain/deck";
import { TrashIcon } from "./icons";

/** Card management for one deck: list, edit in place, remove. */
export function BrowserScreen({
  deck,
  cards,
  busy,
  error,
  onBack,
  onAddCard,
  onUpdateCard,
  onRemoveCard,
}: {
  deck: Deck;
  cards: Card[];
  busy: boolean;
  error: string | null;
  onBack: () => void;
  /** Navigate to the card creator view. */
  onAddCard: () => void;
  onUpdateCard: (card: Card, front: string, back: string) => void;
  onRemoveCard: (card: Card) => void;
}) {
  const [editing, setEditing] = useState<{
    id: string;
    front: string;
    back: string;
  } | null>(null);

  function startEditing(card: Card) {
    if (busy) return;
    setEditing({ id: card.id, front: card.front, back: card.back });
  }

  function handleEditSubmit(
    event: Event,
    card: Card,
    edit: { front: string; back: string },
  ) {
    event.preventDefault();
    onUpdateCard(card, edit.front.trim(), edit.back.trim());
    setEditing(null);
  }

  /** Confirmed removal; returns whether the user went through with it. */
  function handleRemove(card: Card): boolean {
    if (
      !window.confirm(
        `Remove the card "${card.front}"? This cannot be undone.`,
      )
    ) {
      return false;
    }
    onRemoveCard(card);
    return true;
  }

  function handleRemoveFromEditor(card: Card) {
    if (handleRemove(card)) {
      setEditing(null);
    }
  }

  return (
    <section>
      <header>
        <h2>Browser: {deck.name}</h2>
        <button onClick={onAddCard} disabled={busy}>
          Add card
        </button>
        <button onClick={onBack} disabled={busy}>
          Back to deck
        </button>
      </header>
      {cards.length === 0 ? (
        <p>No cards in this deck yet.</p>
      ) : (
        <>
          <p class="hint">Click a card to edit it.</p>
          <table class="card-table">
            <thead>
              <tr>
                <th>Front</th>
                <th>Back</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cards.map((card) =>
                editing !== null && editing.id === card.id ? (
                  <tr key={card.url}>
                    <td colSpan={3}>
                      <form
                        class="card-edit"
                        onSubmit={(e) => handleEditSubmit(e, card, editing)}
                      >
                        <label for={`edit-front-${card.id}`}>Front</label>
                        <input
                          id={`edit-front-${card.id}`}
                          type="text"
                          value={editing.front}
                          onInput={(e) =>
                            setEditing({
                              ...editing,
                              front: e.currentTarget.value,
                            })
                          }
                          required
                          disabled={busy}
                        />
                        <label for={`edit-back-${card.id}`}>Back</label>
                        <input
                          id={`edit-back-${card.id}`}
                          type="text"
                          value={editing.back}
                          onInput={(e) =>
                            setEditing({
                              ...editing,
                              back: e.currentTarget.value,
                            })
                          }
                          required
                          disabled={busy}
                        />
                        <div class="edit-actions">
                          <button type="submit" disabled={busy}>
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditing(null)}
                            disabled={busy}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            class="danger icon"
                            aria-label="Remove"
                            title="Remove"
                            onClick={() => handleRemoveFromEditor(card)}
                            disabled={busy}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                ) : (
                  <tr key={card.url}>
                    <td class="clickable" onClick={() => startEditing(card)}>
                      {card.front}
                    </td>
                    <td class="clickable" onClick={() => startEditing(card)}>
                      {card.back}
                    </td>
                    <td>
                      <button
                        onClick={() => startEditing(card)}
                        disabled={busy}
                      >
                        Edit
                      </button>
                      <button
                        class="danger icon"
                        aria-label="Remove"
                        title="Remove"
                        onClick={() => handleRemove(card)}
                        disabled={busy}
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </>
      )}
      {error && <p class="error">{error}</p>}
    </section>
  );
}
