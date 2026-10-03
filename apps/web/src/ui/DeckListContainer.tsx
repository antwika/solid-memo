import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Deck } from "@solid-memo/domain/deck";
import type { Instance } from "@solid-memo/domain/instance";
import { DeckListScreen } from "./DeckListScreen";
import { DeckStudyActionContainer } from "./DeckStudyAction";
import { ErrorMessage } from "./ErrorMessage";
import { useI18n } from "./i18n";
import { Loading } from "./Loading";
import { TodaySummaryContainer } from "./TodaySummaryContainer";
import { deckHref, libraryHref, routeToHash } from "./router";

/**
 * Owns the deck list query for one instance. A deck set aside for
 * invalid data (docs/validation.md) is listed, but not offered for study.
 */
export function DeckListContainer({
  useCases,
  instance,
  isSetAside = () => false,
  onStudyDeck,
}: {
  useCases: UseCases;
  instance: Instance;
  isSetAside?: (deck: Deck) => boolean;
  onStudyDeck: (deck: Deck) => void;
}) {
  const { t, errorText } = useI18n();
  const decksQuery = useQuery({
    queryKey: ["decks", instance.url],
    queryFn: () => useCases.listDecks(instance.url),
  });

  if (decksQuery.error) {
    return <ErrorMessage error={errorText(decksQuery.error)} />;
  }
  if (decksQuery.data === undefined) {
    return <Loading label={t("deckList.loading")} />;
  }

  return (
    <>
      <TodaySummaryContainer useCases={useCases} instance={instance} />
      <DeckListScreen
        decks={decksQuery.data}
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
        createDeckHref={routeToHash({ screen: "deckCreator", instanceUrl: instance.url })}
      />
    </>
  );
}
