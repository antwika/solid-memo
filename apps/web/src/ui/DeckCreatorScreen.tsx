import { useState } from "preact/hooks";
import { useI18n } from "./i18n";

export function DeckCreatorScreen({
  busy,
  error,
  onCreate,
}: {
  busy: boolean;
  error: string | null;
  onCreate: (name: string) => void;
}) {
  const { t } = useI18n();
  const [name, setName] = useState("");

  function handleSubmit(event: Event) {
    event.preventDefault();
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
        <button type="submit" disabled={busy}>
          {t("deckCreator.createButton")}
        </button>
      </form>
      {error && <p class="error">{error}</p>}
    </section>
  );
}
