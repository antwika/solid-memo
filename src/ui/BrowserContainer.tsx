import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Card, Deck } from "../domain/deck";
import { BrowserScreen } from "./BrowserScreen";
import { errorMessage } from "./errorMessage";

/** Owns the card list and edit/remove mutations for the Browser view. */
export function BrowserContainer({
  useCases,
  deck,
  onBack,
  onAddCard,
}: {
  useCases: UseCases;
  deck: Deck;
  onBack: () => void;
  onAddCard: () => void;
}) {
  const queryClient = useQueryClient();

  const cardsQuery = useQuery({
    queryKey: ["cards", deck.cardsDocumentUrl],
    queryFn: () => useCases.listCards(deck),
  });

  const updateCardMutation = useMutation({
    mutationFn: (args: { card: Card; front: string; back: string }) =>
      useCases.updateCard(deck, args.card, args.front, args.back),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cards", deck.cardsDocumentUrl],
      }),
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
    return <p>Loading cards…</p>;
  }

  return (
    <BrowserScreen
      deck={deck}
      cards={cardsQuery.data}
      busy={updateCardMutation.isPending || removeCardMutation.isPending}
      error={
        errorMessage(updateCardMutation.error) ??
        errorMessage(removeCardMutation.error)
      }
      onBack={onBack}
      onAddCard={onAddCard}
      onUpdateCard={(card, front, back) =>
        updateCardMutation.mutate({ card, front, back })
      }
      onRemoveCard={(card) => removeCardMutation.mutate(card)}
    />
  );
}
