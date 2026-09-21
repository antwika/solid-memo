import { useState } from "preact/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Card, Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { ReviewQuality } from "../domain/review";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";
import { PracticeScreen, type PracticeMode } from "./PracticeScreen";
import { deckHref } from "./router";

/**
 * Owns one study session. The queue is fetched once when the session
 * starts and then frozen (answered cards must not reshuffle it); caches
 * are invalidated when the session ends. "study" mode limits the session
 * to due cards; "practice" also introduces new cards.
 */
export function PracticeContainer({
  useCases,
  instance,
  deck,
  mode,
  onExit,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: Deck;
  mode: PracticeMode;
  onExit: () => void;
}) {
  const queryClient = useQueryClient();
  const [position, setPosition] = useState(0);

  const queueQuery = useQuery({
    queryKey: ["studyQueue", deck.url],
    queryFn: () => useCases.getStudyQueue(instance.url, deck, new Date()),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
  });
  const cards: Card[] | undefined =
    queueQuery.data === undefined
      ? undefined
      : mode === "study"
        ? [...queueQuery.data.due]
        : [...queueQuery.data.due, ...queueQuery.data.newCards];

  const answerMutation = useMutation({
    mutationFn: (args: { card: Card; quality: ReviewQuality }) =>
      useCases.recordReview(
        instance.url,
        deck,
        args.card,
        args.quality,
        new Date(),
      ),
    onSuccess: (state) => {
      // No refetch mid-session: keep the reviews cache warm for other
      // screens, and simply advance the frozen queue.
      queryClient.setQueryData(
        ["reviews", deck.reviewsDocumentUrl, state.cardId],
        state,
      );
      setPosition((current) => current + 1);
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
  if (cards === undefined) {
    return <Loading label="Preparing your study session…" />;
  }

  const card = position < cards.length ? cards[position] : null;
  return (
    <PracticeScreen
      mode={mode}
      deckName={deck.name}
      deckHref={deckHref(instance.url, deck.url)}
      card={card}
      position={position + 1}
      total={cards.length}
      busy={answerMutation.isPending}
      error={errorMessage(answerMutation.error)}
      onAnswer={(quality) => answerMutation.mutate({ card: card!, quality })}
      onExit={() => void handleExit()}
    />
  );
}
