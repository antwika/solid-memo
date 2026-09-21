import { useState } from "preact/hooks";

export function DeckCreatorScreen({
  busy,
  error,
  onCreate,
  decksHref,
}: {
  busy: boolean;
  error: string | null;
  onCreate: (name: string) => void;
  /** URL of the deck list, for "Back to decks". */
  decksHref: string;
}) {
  const [name, setName] = useState("");

  function handleSubmit(event: Event) {
    event.preventDefault();
    onCreate(name.trim());
  }

  return (
    <section>
      <header>
        <h2>New deck</h2>
        <a class="button" href={decksHref}>
          Back to decks
        </a>
      </header>
      <form onSubmit={handleSubmit}>
        <label for="deck-name">Name</label>
        <input
          id="deck-name"
          type="text"
          placeholder="My new deck"
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
          required
          disabled={busy}
        />
        <button type="submit" disabled={busy}>
          Create deck
        </button>
      </form>
      {error && <p class="error">{error}</p>}
    </section>
  );
}
