import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import { activeCards, type Deck } from "@solid-memo/domain/deck";
import type { Instance } from "@solid-memo/domain/instance";
import { DeckDetailScreen } from "./DeckDetailScreen";
import { DeckStatisticsContainer } from "./DeckStatisticsContainer";
import { ErrorMessage } from "./ErrorMessage";
import { LibraryUpgradeContainer } from "./LibraryUpgradeContainer";
import { Loading } from "./Loading";
import { routeToHash } from "./router";
import { useI18n } from "./i18n";

/** Owns the card count, today's study queue and the day reset for one deck. */
export function DeckDetailContainer({
  useCases,
  instance,
  deck,
  onStudy,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: Deck;
  onStudy: () => void;
}) {
  const { t, errorText } = useI18n();
  const cardsQuery = useQuery({
    queryKey: ["cards", deck.cardsDocumentUrl],
    queryFn: () => useCases.listCards(deck),
  });

  const queueQuery = useQuery({
    queryKey: ["studyQueue", deck.url],
    queryFn: () => useCases.getStudyQueue(instance.url, deck, new Date()),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
  });

  const queryClient = useQueryClient();
  const resetDayMutation = useMutation({
    mutationFn: () => useCases.resetStudyDay(instance.url, deck, new Date()),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["reviews", deck.reviewsDocumentUrl],
      });
      await queryClient.invalidateQueries({
        queryKey: ["studyQueue", deck.url],
      });
      await queryClient.invalidateQueries({ queryKey: ["statistics", instance.url] });
    },
  });

  const error = cardsQuery.error ?? queueQuery.error;
  if (error) {
    return <ErrorMessage error={errorText(error)} />;
  }
  if (
    cardsQuery.data === undefined ||
    queueQuery.data === undefined ||
    (queueQuery.isFetching && !resetDayMutation.isPending)
  ) {
    return <Loading label={t("deckDetail.loading")} />;
  }

  return (
    <>
    <DeckDetailScreen
      deck={deck}
      cardCount={activeCards(cardsQuery.data).length}
      dueCount={queueQuery.data.due.length}
      newCount={queueQuery.data.newPrompts.length}
      studiedToday={queueQuery.data.studiedToday}
      busy={resetDayMutation.isPending}
      error={errorText(resetDayMutation.error)}
      onResetDay={() => resetDayMutation.mutate()}
      preferencesHref={routeToHash({ screen: "deckPreferences", instanceUrl: instance.url, deckUrl: deck.url })}
      browseHref={routeToHash({ screen: "browser", instanceUrl: instance.url, deckUrl: deck.url })}
      onStudy={onStudy}
      notice={
        <LibraryUpgradeContainer
          useCases={useCases}
          instance={instance}
          deck={deck}
        />
      }
    />
    <DeckStatisticsContainer useCases={useCases} instance={instance} deck={deck} />
    </>
  );
}
