import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Deck } from "@solid-memo/domain/deck";
import type { Instance } from "@solid-memo/domain/instance";
import type { StudyQueue } from "@solid-memo/domain/scheduling";
import { CheckIcon } from "./icons";
import { LoadingDots } from "./Loading";
import { studyCountsSummary } from "./studyCounts";

/**
 * What a deck-list row offers for its deck today, with how much is left
 * ("12 to review"). Nothing is offered unless there is something to
 * do: when the deck is done for the day, a hint says so beside a green
 * tick. While the queue is
 * first being fetched the slot shows a loader, so an empty slot never
 * reads as "done".
 */
export function DeckStudyAction({
  deckName,
  queue,
  loading,
  onStudy,
}: {
  deckName: string;
  /** Today's queue; undefined while it is unknown (loading or unreadable). */
  queue: StudyQueue | undefined;
  /** The queue is being fetched and nothing is known yet. */
  loading: boolean;
  /** Start today's session over the deck. */
  onStudy: () => void;
}) {
  if (queue === undefined) {
    return loading ? (
      <span class="study-loading" role="status" aria-label="Checking what is due">
        <LoadingDots />
      </span>
    ) : null;
  }
  const summary = studyCountsSummary({
    dueCount: queue.due.length,
    newCount: queue.newPrompts.length,
  });
  if (summary === null) {
    return (
      <>
        <span class="hint">Done for today</span>
        <span class="hint study-done">
          <CheckIcon />
        </span>
      </>
    );
  }
  return (
    <>
      <span class="hint study-counts">{summary}</span>
      <button
        class="primary"
        aria-label={`Study ${deckName}`}
        onClick={onStudy}
      >
        Study
      </button>
    </>
  );
}

/** Owns one deck's queue query for its deck-list row. */
export function DeckStudyActionContainer({
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
      queue={queueQuery.data}
      loading={queueQuery.isPending}
      onStudy={onStudy}
    />
  );
}
