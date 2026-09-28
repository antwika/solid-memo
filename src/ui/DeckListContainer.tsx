import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import { DeckListScreen } from "./DeckListScreen";
import { DeckStudyActionContainer } from "./DeckStudyAction";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";
import { deckHref, decksHref, libraryHref } from "./router";

/**
 * Owns the deck list query for one instance. A deck set aside for
 * invalid data (docs/validation.md) is listed, but not offered for study.
 */
export function DeckListContainer({
  useCases,
  instance,
  isSetAside = () => false,
  onStudyDeck,
  onCreateDeck,
}: {
  useCases: UseCases;
  instance: Instance;
  isSetAside?: (deck: Deck) => boolean;
  onStudyDeck: (deck: Deck) => void;
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
      libraryHref={libraryHref(instance.url)}
      deckHref={(deck) => deckHref(instance.url, deck.url)}
      renderStudyAction={(deck) =>
        isSetAside(deck) ? (
          <span class="hint">Set aside: its data needs repair</span>
        ) : (
          <DeckStudyActionContainer
            useCases={useCases}
            instance={instance}
            deck={deck}
            onStudy={() => onStudyDeck(deck)}
          />
        )
      }
      onCreateDeck={onCreateDeck}
    />
  );
}
