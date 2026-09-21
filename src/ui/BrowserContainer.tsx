import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Card, Deck } from "../domain/deck";
import { BrowserScreen } from "./BrowserScreen";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";

/** Owns the card list and the deck/card mutations for the Browser view. */
export function BrowserContainer({
  useCases,
  deck,
  deckHref,
  onAddCard,
  cardHref,
  onDeckRemoved,
}: {
  useCases: UseCases;
  deck: Deck;
  deckHref: string;
  onAddCard: () => void;
  /** URL of a card's own page. */
  cardHref: (card: Card) => string;
  /** The deck is gone; leave the Browser. */
  onDeckRemoved: () => void;
}) {
  const queryClient = useQueryClient();

  const cardsQuery = useQuery({
    queryKey: ["cards", deck.cardsDocumentUrl],
    queryFn: () => useCases.listCards(deck),
  });

  // The deck list is keyed by instance; match every ["decks", …] entry
  // rather than threading the instance through for one cache key.
  const renameDeckMutation = useMutation({
    mutationFn: (name: string) => useCases.renameDeck(deck, name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["decks"] }),
  });

  const removeDeckMutation = useMutation({
    mutationFn: () => useCases.removeDeck(deck),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["decks"] });
      onDeckRemoved();
    },
  });

  const removeCardMutation = useMutation({
    mutationFn: (card: Card) => useCases.removeCard(deck, card),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cards", deck.cardsDocumentUrl],
      });
      // Removing a card also removes its review state.
      await queryClient.invalidateQueries({
        queryKey: ["reviews", deck.reviewsDocumentUrl],
      });
    },
  });

  if (cardsQuery.error) {
    return <p class="error">{errorMessage(cardsQuery.error)}</p>;
  }
  if (cardsQuery.data === undefined) {
    return <Loading label="Loading cards…" />;
  }

  return (
    <BrowserScreen
      deck={deck}
      deckHref={deckHref}
      cards={cardsQuery.data}
      busy={
        renameDeckMutation.isPending ||
        removeDeckMutation.isPending ||
        removeCardMutation.isPending
      }
      error={
        errorMessage(renameDeckMutation.error) ??
        errorMessage(removeDeckMutation.error) ??
        errorMessage(removeCardMutation.error)
      }
      onRenameDeck={(name) => renameDeckMutation.mutate(name)}
      onRemoveDeck={() => removeDeckMutation.mutate()}
      onAddCard={onAddCard}
      cardHref={cardHref}
      onRemoveCard={(card) => removeCardMutation.mutate(card)}
    />
  );
}
