import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import { DeckDetailScreen } from "./DeckDetailScreen";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";
import { deckHref } from "./router";

/** Owns the card count, today's study queue and the day reset for one deck. */
export function DeckDetailContainer({
  useCases,
  instance,
  deck,
  onStudy,
  onPractice,
  onBrowse,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: Deck;
  onStudy: () => void;
  onPractice: () => void;
  onBrowse: () => void;
}) {
  const cardsQuery = useQuery({
    queryKey: ["cards", deck.cardsDocumentUrl],
    queryFn: () => useCases.listCards(deck),
  });

  // Shares its cache entry with PracticeContainer. Always refetched on
  // mount and hidden while fetching: a queue cached before a session or
  // before adding a card must never be shown as today's state.
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
      // Review state changed under both caches that are derived from it.
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
  // While a reset is running the screen stays up (showing "Resetting…");
  // only an ordinary (re)load hides it.
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
      newCount={queueQuery.data.newCards.length}
      studiedToday={queueQuery.data.studiedToday}
      busy={resetDayMutation.isPending}
      error={errorMessage(resetDayMutation.error)}
      onResetDay={() => resetDayMutation.mutate()}
      deckHref={deckHref(instance.url, deck.url)}
      onStudy={onStudy}
      onPractice={onPractice}
      onBrowse={onBrowse}
    />
  );
}
