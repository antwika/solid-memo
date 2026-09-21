import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import { DeckDetailScreen } from "./DeckDetailScreen";
import { errorMessage } from "./errorMessage";

/** Owns the card count for one deck. */
export function DeckDetailContainer({
  useCases,
  deck,
  onBack,
  onAddCard,
  onStudy,
  onPractice,
  onBrowse,
}: {
  useCases: UseCases;
  deck: Deck;
  onBack: () => void;
  onAddCard: () => void;
  onStudy: () => void;
  onPractice: () => void;
  onBrowse: () => void;
}) {
  const cardsQuery = useQuery({
    queryKey: ["cards", deck.cardsDocumentUrl],
    queryFn: () => useCases.listCards(deck),
  });

  if (cardsQuery.error) {
    return <p class="error">{errorMessage(cardsQuery.error)}</p>;
  }
  if (cardsQuery.data === undefined) {
    return <p>Loading cards…</p>;
  }

  return (
    <DeckDetailScreen
      deck={deck}
      cardCount={cardsQuery.data.length}
      onBack={onBack}
      onAddCard={onAddCard}
      onStudy={onStudy}
      onPractice={onPractice}
      onBrowse={onBrowse}
    />
  );
}
