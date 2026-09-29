import type { LibraryCard } from "@solid-memo/domain/library";
import { CardFace } from "./CardFace";
import { CardIcon } from "./icons";

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
  return (
    <section>
      <header>
        <h2>
          <CardIcon />
          Card
        </h2>
      </header>
      <div class="practice-card">
        <CardFace side="front" text={card.front} imageUrl={card.frontImageUrl} />
        <CardFace side="back" text={card.back} imageUrl={card.backImageUrl} />
      </div>
      <p class="hint">
        From <a href={deckHref}>{deckName}</a>. Import the deck to study or
        edit its cards.
      </p>
    </section>
  );
}
