import { AddCardForm } from "./AddCardForm";
import type { CardContent, Deck } from "@solid-memo/domain/deck";
import { useI18n } from "./i18n";

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
  const { t, tx, readerText } = useI18n();
  return (
    <section>
      <header>
        <h2>{t("cardCreator.heading")}</h2>
        <button onClick={onBack} disabled={busy}>
          {t("cardCreator.backButton")}
        </button>
      </header>
      <p class="hint">
        {tx("cardCreator.addingTo", {
          deck: <a href={deckHref}>{readerText(deck.title)}</a>,
        })}
      </p>
      <AddCardForm busy={busy} onAdd={onAdd} />
      {error && <p class="error">{error}</p>}
    </section>
  );
}
