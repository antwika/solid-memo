import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import { CardCreatorScreen } from "./CardCreatorScreen";
import { errorMessage } from "./errorMessage";

/**
 * Owns the add-card mutation. Deliberately stays on the page after a
 * successful add (the form clears itself) so several cards can be entered
 * in a row; onBack leaves the page.
 */
export function CardCreatorContainer({
  useCases,
  deck,
  deckHref,
  onBack,
}: {
  useCases: UseCases;
  deck: Deck;
  deckHref: string;
  onBack: () => void;
}) {
  const queryClient = useQueryClient();

  const addCardMutation = useMutation({
    mutationFn: (args: { front: string; back: string }) =>
      useCases.addCard(deck, args.front, args.back),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cards", deck.cardsDocumentUrl],
      });
      // A new card is a new card to study; the cached queue predates it.
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
    },
  });

  return (
    <CardCreatorScreen
      deck={deck}
      deckHref={deckHref}
      busy={addCardMutation.isPending}
      error={errorMessage(addCardMutation.error)}
      onAdd={(front, back) => addCardMutation.mutate({ front, back })}
      onBack={onBack}
    />
  );
}
