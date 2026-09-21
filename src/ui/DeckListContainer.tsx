import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import { DeckListScreen } from "./DeckListScreen";
import { DeckStudyActionContainer } from "./DeckStudyAction";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";
import { deckHref, decksHref } from "./router";

/** Owns the deck list query for one instance. */
export function DeckListContainer({
  useCases,
  instance,
  onStudyDeck,
  onPracticeDeck,
  onCreateDeck,
}: {
  useCases: UseCases;
  instance: Instance;
  onStudyDeck: (deck: Deck) => void;
  onPracticeDeck: (deck: Deck) => void;
  onCreateDeck: () => void;
}) {
  const decksQuery = useQuery({
    queryKey: ["decks", instance.url],
    queryFn: () => useCases.listDecks(instance.url),
  });

  if (decksQuery.error) {
    return <p class="error">{errorMessage(decksQuery.error)}</p>;
  }
  if (decksQuery.data === undefined) {
    return <Loading label="Loading decks…" />;
  }

  return (
    <DeckListScreen
      decks={decksQuery.data}
      decksHref={decksHref(instance.url)}
      deckHref={(deck) => deckHref(instance.url, deck.url)}
      renderStudyAction={(deck) => (
        <DeckStudyActionContainer
          useCases={useCases}
          instance={instance}
          deck={deck}
          onStudy={() => onStudyDeck(deck)}
          onPractice={() => onPracticeDeck(deck)}
        />
      )}
      onCreateDeck={onCreateDeck}
    />
  );
}
