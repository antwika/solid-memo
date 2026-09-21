import { useState } from "preact/hooks";

/** Front/back entry form shared by the deck view and the Browser. */
export function AddCardForm({
  busy,
  onAdd,
}: {
  busy: boolean;
  onAdd: (front: string, back: string) => void;
}) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  function handleSubmit(event: Event) {
    event.preventDefault();
    onAdd(front.trim(), back.trim());
    setFront("");
    setBack("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label for="card-front">Front</label>
      <input
        id="card-front"
        type="text"
        placeholder="Question or prompt"
        value={front}
        onInput={(e) => setFront(e.currentTarget.value)}
        required
        disabled={busy}
      />
      <label for="card-back">Back</label>
      <input
        id="card-back"
        type="text"
        placeholder="Answer"
        value={back}
        onInput={(e) => setBack(e.currentTarget.value)}
        required
        disabled={busy}
      />
      <button type="submit" disabled={busy}>
        Add card
      </button>
    </form>
  );
}
