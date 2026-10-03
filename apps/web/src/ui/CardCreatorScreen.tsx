import { AddCardForm } from "./AddCardForm";
import type { CardContent, Deck } from "@solid-memo/domain/deck";
import { ErrorMessage } from "./ErrorMessage";
import { useI18n, type ErrorText } from "./i18n";
import { ReaderText } from "./ReaderText";

/** Card entry page; stays open after each add so batches are easy. */
export function CardCreatorScreen({
  deck,
  deckHref,
  busy,
  error,
  onAdd,
  backHref,
}: {
  deck: Deck;
  /** URL of the deck's page; its name links there. */
  deckHref: string;
  busy: boolean;
  error: ErrorText | null;
  /** Add the card; `onAdded` once it is. */
  onAdd: (content: CardContent, onAdded: () => void) => void;
  /** URL of the deck's Browser, where Back goes. */
  backHref: string;
}) {
  const { t, tx } = useI18n();
  return (
    <section>
      <header>
        <h2>{t("cardCreator.heading")}</h2>
        <a class="button" href={backHref}>
          {t("cardCreator.backButton")}
        </a>
      </header>
      <p class="hint">
        {tx("cardCreator.addingTo", {
          deck: (
            <a href={deckHref}>
              <ReaderText text={deck.title} />
            </a>
          ),
        })}
      </p>
      <AddCardForm busy={busy} onAdd={onAdd} />
      <ErrorMessage error={error} />
    </section>
  );
}
