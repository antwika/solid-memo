import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import { DeckDetailScreen } from "./DeckDetailScreen";
import { errorMessage } from "./errorMessage";
import { LibraryUpgradeContainer } from "./LibraryUpgradeContainer";
import { Loading } from "./Loading";
import { deckHref } from "./router";

/** Owns the card count, today's study queue and the day reset for one deck. */
export function DeckDetailContainer({
  useCases,
  instance,
  deck,
  onStudy,
  onBrowse,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: Deck;
  onStudy: () => void;
  onBrowse: () => void;
}) {
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
    },
  });

  const error = cardsQuery.error ?? queueQuery.error;
  if (error) {
    return <p class="error">{errorMessage(error)}</p>;
  }
  if (
    cardsQuery.data === undefined ||
    queueQuery.data === undefined ||
    (queueQuery.isFetching && !resetDayMutation.isPending)
  ) {
    return <Loading label="Loading cards…" />;
  }

  return (
    <DeckDetailScreen
      deck={deck}
      cardCount={cardsQuery.data.length}
      dueCount={queueQuery.data.due.length}
      newCount={queueQuery.data.newPrompts.length}
      studiedToday={queueQuery.data.studiedToday}
      busy={resetDayMutation.isPending}
      error={errorMessage(resetDayMutation.error)}
      onResetDay={() => resetDayMutation.mutate()}
      deckHref={deckHref(instance.url, deck.url)}
      onStudy={onStudy}
      onBrowse={onBrowse}
      notice={
        <LibraryUpgradeContainer
          useCases={useCases}
          instance={instance}
          deck={deck}
        />
      }
    />
  );
}
