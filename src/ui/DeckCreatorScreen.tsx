import { useState } from "preact/hooks";

export function DeckCreatorScreen({
  busy,
  error,
  onCreate,
}: {
  busy: boolean;
  error: string | null;
  onCreate: (name: string) => void;
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
