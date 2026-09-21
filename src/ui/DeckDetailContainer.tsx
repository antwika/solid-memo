import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import { DeckDetailScreen } from "./DeckDetailScreen";
import { errorMessage } from "./errorMessage";
import { deckHref, decksHref } from "./router";

/** Owns the card count and today's study queue for one deck. */
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

  const error = cardsQuery.error ?? queueQuery.error;
  if (error) {
    return <p class="error">{errorMessage(error)}</p>;
  }
  if (
    cardsQuery.data === undefined ||
    queueQuery.data === undefined ||
    queueQuery.isFetching
  ) {
    return <p>Loading cards…</p>;
  }

  return (
    <DeckDetailScreen
      deck={deck}
      cardCount={cardsQuery.data.length}
      dueCount={queueQuery.data.due.length}
      newCount={queueQuery.data.newCards.length}
      decksHref={decksHref(instance.url)}
      deckHref={deckHref(instance.url, deck.url)}
      onStudy={onStudy}
      onPractice={onPractice}
      onBrowse={onBrowse}
    />
  );
}
