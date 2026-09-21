import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import { DeckListScreen } from "./DeckListScreen";
import { errorMessage } from "./errorMessage";

/** Owns the deck list query and the remove mutation for one instance. */
export function DeckListContainer({
  useCases,
  instance,
  onOpenDeck,
  onStudyDeck,
  onCreateDeck,
}: {
  useCases: UseCases;
  instance: Instance;
  onOpenDeck: (deck: Deck) => void;
  onStudyDeck: (deck: Deck) => void;
  onCreateDeck: () => void;
}) {
  const queryClient = useQueryClient();

  const decksQuery = useQuery({
    queryKey: ["decks", instance.url],
    queryFn: () => useCases.listDecks(instance.url),
  });

  const removeDeckMutation = useMutation({
    mutationFn: (deck: Deck) => useCases.removeDeck(deck),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["decks", instance.url] }),
  });

  if (decksQuery.error) {
    return <p class="error">{errorMessage(decksQuery.error)}</p>;
  }
  if (decksQuery.data === undefined) {
    return <p>Loading decks…</p>;
  }

  return (
    <DeckListScreen
      decks={decksQuery.data}
      busy={removeDeckMutation.isPending}
      error={errorMessage(removeDeckMutation.error)}
      onOpen={onOpenDeck}
      onStudy={onStudyDeck}
      onCreateDeck={onCreateDeck}
      onRemove={(deck) => removeDeckMutation.mutate(deck)}
    />
  );
}
