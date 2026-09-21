import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { StudyQueue } from "../domain/scheduling";

/**
 * What a deck-list row suggests doing with its deck today. Nothing is
 * suggested unless there is something to do: no "Study" without due cards.
 */
export function DeckStudyAction({
  deckName,
  queue,
  onStudy,
  onPractice,
}: {
  deckName: string;
  /** Today's queue; undefined while it is unknown (loading or unreadable). */
  queue: StudyQueue | undefined;
  /** Start a due-only session. */
  onStudy: () => void;
  /** Start a session that introduces new cards. */
  onPractice: () => void;
}) {
  if (queue === undefined) return null;
  if (queue.due.length > 0) {
    return (
      <button class="primary" aria-label={`Study ${deckName}`} onClick={onStudy}>
        Study
      </button>
    );
  }
  if (queue.newCards.length > 0) {
    return (
      <button
        class="primary"
        aria-label={`Practice ${deckName}`}
        onClick={onPractice}
      >
        Practice
      </button>
    );
  }
  return <span class="hint">Nothing to study today</span>;
}

/** Owns one deck's queue query for its deck-list row. */
export function DeckStudyActionContainer({
  useCases,
  instance,
  deck,
  onStudy,
  onPractice,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: Deck;
  onStudy: () => void;
  onPractice: () => void;
}) {
  // Same cache entry and freshness rules as the deck page: always
  // refetched on mount, and a queue still being fetched is not shown — a
  // stale one could suggest studying cards that were just studied.
  const queueQuery = useQuery({
    queryKey: ["studyQueue", deck.url],
    queryFn: () => useCases.getStudyQueue(instance.url, deck, new Date()),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
  });

  return (
    <DeckStudyAction
      deckName={deck.name}
      queue={queueQuery.isFetching ? undefined : queueQuery.data}
      onStudy={onStudy}
      onPractice={onPractice}
    />
  );
}
