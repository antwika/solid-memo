import { useState } from "preact/hooks";
import { ErrorMessage } from "./ErrorMessage";
import { useI18n, type ErrorText } from "./i18n";

export function DeckCreatorScreen({
  busy,
  error,
  onCreate,
}: {
  busy: boolean;
  error: ErrorText | null;
  onCreate: (name: string) => void;
}) {
  const { t } = useI18n();
  const [name, setName] = useState("");

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (busy) return;
    onCreate(name.trim());
  }

  return (
    <section>
      <header>
        <h2>{t("deckCreator.heading")}</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label for="deck-name">{t("deckCreator.nameLabel")}</label>
        <input
          id="deck-name"
          type="text"
          placeholder={t("deckCreator.namePlaceholder")}
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
          required
          disabled={busy}
        />
        {/* Only aria-disabled while it creates, so it keeps the focus should that fail. */}
        <button type="submit" aria-disabled={busy}>
          {t("deckCreator.createButton")}
        </button>
      </form>
      <ErrorMessage error={error} />
    </section>
  );
}
