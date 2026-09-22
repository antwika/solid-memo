import { useState } from "preact/hooks";
import { validateCardContent, type CardContent } from "../domain/deck";
import { CardContentFields, EMPTY_DRAFT } from "./CardContentFields";

/** Card entry form: text and an optional picture for each side. */
export function AddCardForm({
  busy,
  onAdd,
}: {
  busy: boolean;
  onAdd: (content: CardContent) => void;
}) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [invalid, setInvalid] = useState<string | null>(null);

  function handleSubmit(event: Event) {
    event.preventDefault();
    const validation = validateCardContent(draft);
    if (!validation.ok) {
      setInvalid(validation.error);
      return;
    }
    setInvalid(null);
    onAdd(validation.content);
    setDraft(EMPTY_DRAFT);
  }

  // noValidate: what a side needs (text or a picture) is more than the
  // browser's `required` can say, so the messages come from the domain.
  return (
    <form onSubmit={handleSubmit} noValidate>
      <CardContentFields draft={draft} busy={busy} onChange={setDraft} />
      {invalid && (
        <p class="error" role="alert">
          {invalid}
        </p>
      )}
      <button type="submit" disabled={busy}>
        Add card
      </button>
    </form>
  );
}
