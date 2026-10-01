import type { LibraryCard } from "@solid-memo/domain/library";
import { CardFace } from "./CardFace";
import { useI18n } from "./i18n";
import { CardIcon } from "./icons";
import { RetiredNotice } from "./RetiredCards";

/**
 * One card of a library deck, both sides as study shows them, read-only:
 * a library card is edited only once the deck is imported.
 */
export function LibraryCardScreen({
  card,
  deckName,
  deckHref,
}: {
  card: LibraryCard;
  deckName: string;
  /** URL of the deck's page; its name links there. */
  deckHref: string;
}) {
  const { t, tx } = useI18n();
  return (
    <section>
      <header>
        <h2>
          <CardIcon />
          {t("libraryCard.heading")}
        </h2>
      </header>
      <div class="practice-card">
        <CardFace side="front" text={card.front} imageUrl={card.frontImageUrl} note={card.frontNote} />
        <CardFace
          side="back"
          text={card.back}
          imageUrl={card.backImageUrl}
          label={card.backLabel}
          note={card.backNote}
        />
      </div>
      {card.retired && <RetiredNotice />}
      <p class="hint">
        {tx("libraryCard.from", { deck: <a href={deckHref}>{deckName}</a> })}
      </p>
    </section>
  );
}
