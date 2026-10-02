import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { CardContent, Deck } from "@solid-memo/domain/deck";
import { CardCreatorScreen } from "./CardCreatorScreen";
import { useI18n } from "./i18n";

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
  const { errorText } = useI18n();
  const queryClient = useQueryClient();

  const addCardMutation = useMutation({
    mutationFn: (content: CardContent) => useCases.addCard(deck, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cards", deck.cardsDocumentUrl],
      });
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
    },
  });

  return (
    <CardCreatorScreen
      deck={deck}
      deckHref={deckHref}
      busy={addCardMutation.isPending}
      error={errorText(addCardMutation.error)}
      onAdd={(content) => addCardMutation.mutate(content)}
      onBack={onBack}
    />
  );
}
