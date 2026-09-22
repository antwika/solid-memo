import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { StudyQueue } from "../domain/scheduling";
import { CheckIcon } from "./icons";
import { LoadingDots } from "./Loading";
import { studyCountsSummary } from "./studyCounts";

/**
 * What a deck-list row suggests doing with its deck today, with how much
 * is left ("12 due · 5 new"). Nothing is suggested unless there is
 * something to do: no "Study" without due cards, and a green tick when
 * the deck is done for the day. While the queue is first being fetched
 * the slot shows a loader, so an empty slot never reads as "done".
 */
export function DeckStudyAction({
  deckName,
  queue,
  loading,
  onStudy,
  onPractice,
}: {
  deckName: string;
  /** Today's queue; undefined while it is unknown (loading or unreadable). */
  queue: StudyQueue | undefined;
  /** The queue is being fetched and nothing is known yet. */
  loading: boolean;
  /** Start a due-only session. */
  onStudy: () => void;
  /** Start a session that introduces new cards. */
  onPractice: () => void;
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
    newCount: queue.newCards.length,
  });
  if (summary === null) {
    // A green tick says "done" at a glance; the label carries the words.
    return (
      <span
        class="hint study-done"
        role="img"
        aria-label="Nothing to study today"
        title="Nothing to study today"
      >
        <CheckIcon />
      </span>
    );
  }
  const action =
    queue.due.length > 0
      ? { label: "Study", onClick: onStudy }
      : { label: "Practice", onClick: onPractice };
  return (
    <>
      <span class="hint study-counts">{summary}</span>
      <button
        class="primary"
        aria-label={`${action.label} ${deckName}`}
        onClick={action.onClick}
      >
        {action.label}
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
  onPractice,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: Deck;
  onStudy: () => void;
  onPractice: () => void;
}) {
  // Shares the cache entry of the deck page and the study session. The
  // cached queue is shown at once — every local write that changes a
  // queue (a session, a card added or removed, a reset, new caps) drops
  // the entry, so whatever is cached is not known to be wrong — and a
  // background refetch picks up changes made elsewhere. Only a first
  // fetch, with nothing cached, shows the loader (isPending: no data).
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
      onPractice={onPractice}
    />
  );
}
