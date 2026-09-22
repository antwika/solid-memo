import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Card, CardContent, Deck } from "../domain/deck";
import { CardScreen } from "./CardScreen";
import { errorMessage } from "./errorMessage";

/**
 * Owns the edit/remove mutations of one card's page. The card itself is
 * resolved by the Workspace from the ["cards", …] query, so a save shows
 * up here as a fresh `card` prop once that query is invalidated.
 */
export function CardContainer({
  useCases,
  deck,
  card,
  onRemoved,
}: {
  useCases: UseCases;
  deck: Deck;
  card: Card;
  /** The card is gone; leave its page. */
  onRemoved: () => void;
}) {
  const queryClient = useQueryClient();

  const updateCardMutation = useMutation({
    mutationFn: (content: CardContent) =>
      useCases.updateCard(deck, card, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cards", deck.cardsDocumentUrl],
      });
      // The cached queue carries the card's old text.
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
    },
  });

  const removeCardMutation = useMutation({
    mutationFn: () => useCases.removeCard(deck, card),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cards", deck.cardsDocumentUrl],
      });
      // Removing a card also removes its review state.
      await queryClient.invalidateQueries({
        queryKey: ["reviews", deck.reviewsDocumentUrl],
      });
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
      onRemoved();
    },
  });

  return (
    <CardScreen
      card={card}
      busy={updateCardMutation.isPending || removeCardMutation.isPending}
      saved={updateCardMutation.isSuccess}
      error={
        errorMessage(updateCardMutation.error) ??
        errorMessage(removeCardMutation.error)
      }
      onSave={(content) => updateCardMutation.mutate(content)}
      onRemove={() => removeCardMutation.mutate()}
    />
  );
}
