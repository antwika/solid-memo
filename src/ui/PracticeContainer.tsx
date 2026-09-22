import { useEffect, useState } from "preact/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Card, Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import { DEFAULT_PREFERENCES } from "../domain/preferences";
import type { ReviewQuality } from "../domain/review";
import { repeatsInSession, requeueCard } from "../domain/scheduling";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";
import { PracticeScreen, type PracticeMode } from "./PracticeScreen";
import { deckHref } from "./router";

/**
 * Owns one study session. The queue is fetched once when the session
 * starts and then walked in order; answering a card badly puts it back
 * into the remainder (never as the very next card unless it is the only
 * one left). Caches are invalidated when the session ends. "study" mode
 * limits the session to due cards; "practice" also introduces new cards.
 */
export function PracticeContainer({
  useCases,
  instance,
  deck,
  mode,
  onExit,
  random = Math.random,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: Deck;
  mode: PracticeMode;
  onExit: () => void;
  /** Uniform [0, 1) source deciding where a failed card comes back. */
  random?: () => number;
}) {
  const queryClient = useQueryClient();

  const queueQuery = useQuery({
    queryKey: ["studyQueue", deck.url],
    queryFn: () => useCases.getStudyQueue(instance.url, deck, new Date()),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
  });

  // Which grading buttons to show. Shares the cache entry the preferences
  // screen invalidates; a failed read just uses the defaults.
  const preferencesQuery = useQuery({
    queryKey: ["preferences", instance.url],
    queryFn: () => useCases.getPreferences(instance.url),
  });
  const answerScale =
    preferencesQuery.data?.answerScale ?? DEFAULT_PREFERENCES.answerScale;

  // The session's own order of cards, seeded from the queue once it is
  // known. Kept apart from the query so a refetch never reshuffles a
  // session in progress, and so failed cards can be slotted back in.
  const [session, setSession] = useState<{
    cards: Card[];
    position: number;
  } | null>(null);
  useEffect(() => {
    if (session !== null || queueQuery.data === undefined) return;
    const { due, newCards } = queueQuery.data;
    setSession({
      cards: mode === "study" ? [...due] : [...due, ...newCards],
      position: 0,
    });
  }, [session, queueQuery.data, mode]);

  const answerMutation = useMutation({
    mutationFn: (args: { card: Card; quality: ReviewQuality }) =>
      useCases.recordReview(
        instance.url,
        deck,
        args.card,
        args.quality,
        new Date(),
      ),
    onSuccess: (state, { card, quality }) => {
      // No refetch mid-session: keep the reviews cache warm for other
      // screens, and simply advance the session.
      queryClient.setQueryData(
        ["reviews", deck.reviewsDocumentUrl, state.cardId],
        state,
      );
      setSession((current) => {
        const next = current!.position + 1;
        if (!repeatsInSession(quality)) {
          return { cards: current!.cards, position: next };
        }
        const done = current!.cards.slice(0, next);
        const remaining = current!.cards.slice(next);
        return {
          cards: [...done, ...requeueCard(remaining, card, random)],
          position: next,
        };
      });
    },
  });

  async function handleExit() {
    await queryClient.invalidateQueries({
      queryKey: ["reviews", deck.reviewsDocumentUrl],
    });
    await queryClient.invalidateQueries({
      queryKey: ["studyQueue", deck.url],
    });
    onExit();
  }

  if (queueQuery.error) {
    return <p class="error">{errorMessage(queueQuery.error)}</p>;
  }
  if (session === null) {
    return <Loading label="Preparing your study session…" />;
  }

  const { cards, position } = session;
  const card = position < cards.length ? cards[position] : null;
  return (
    <PracticeScreen
      mode={mode}
      deckName={deck.name}
      deckHref={deckHref(instance.url, deck.url)}
      card={card}
      position={position + 1}
      total={cards.length}
      answerScale={answerScale}
      busy={answerMutation.isPending}
      error={errorMessage(answerMutation.error)}
      onAnswer={(quality) => answerMutation.mutate({ card: card!, quality })}
      onExit={() => void handleExit()}
    />
  );
}
