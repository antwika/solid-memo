import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Deck } from "@solid-memo/domain/deck";
import type { Instance } from "@solid-memo/domain/instance";
import { DeckListScreen } from "./DeckListScreen";
import { DeckStudyActionContainer } from "./DeckStudyAction";
import { useI18n } from "./i18n";
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
  const { t, errorText } = useI18n();
  const decksQuery = useQuery({
    queryKey: ["decks", instance.url],
    queryFn: () => useCases.listDecks(instance.url),
  });

  if (decksQuery.error) {
    return <p class="error">{errorText(decksQuery.error)}</p>;
  }
  if (decksQuery.data === undefined) {
    return <Loading label={t("deckList.loading")} />;
  }

  return (
    <DeckListScreen
      decks={decksQuery.data}
      decksHref={decksHref(instance.url)}
      libraryHref={libraryHref(instance.url)}
      deckHref={(deck) => deckHref(instance.url, deck.url)}
      renderStudyAction={(deck) =>
        isSetAside(deck) ? (
          <span class="hint">{t("deckList.setAside")}</span>
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
