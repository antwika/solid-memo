import { useEffect, useState } from "preact/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck, Prompt } from "../domain/deck";
import type { Instance } from "../domain/instance";
import { DEFAULT_PREFERENCES } from "../domain/preferences";
import type { ReviewQuality } from "../domain/review";
import {
  interleave,
  repeatsInSession,
  requeueCard,
} from "../domain/scheduling";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";
import { StudyScreen } from "./StudyScreen";
import { deckHref } from "./router";

/**
 * Owns one study session. The queue is fetched once when the session
 * starts and then walked in order; answering a card badly puts it back
 * into the remainder (never as the very next card unless it is the only
 * one left). The session covers today's due prompts and the new ones
 * within the daily budget, the new spread among the due. The deck's
 * cached queue is dropped when the session ends, however it is left.
 */
export function StudyContainer({
  useCases,
  instance,
  deck,
  onExit,
  random = Math.random,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: Deck;
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

  // The session's own order of prompts, seeded from the queue once it is
  // known. Kept apart from the query so a refetch never reshuffles a
  // session in progress, and so failed prompts can be slotted back in.
  const [session, setSession] = useState<{
    prompts: Prompt[];
    position: number;
  } | null>(null);
  useEffect(() => {
    if (session !== null || queueQuery.data === undefined) return;
    const { due, newPrompts } = queueQuery.data;
    setSession({ prompts: interleave(due, newPrompts), position: 0 });
  }, [session, queueQuery.data]);

  const answerMutation = useMutation({
    mutationFn: (args: { prompt: Prompt; quality: ReviewQuality }) =>
      useCases.recordReview(
        instance.url,
        deck,
        args.prompt,
        args.quality,
        new Date(),
      ),
    onSuccess: (state, { prompt, quality }) => {
      // No refetch mid-session: keep the reviews cache warm for other
      // screens, and simply advance the session.
      queryClient.setQueryData(
        ["reviews", deck.reviewsDocumentUrl, state.cardId, state.direction],
        state,
      );
      setSession((current) => {
        const next = current!.position + 1;
        if (!repeatsInSession(quality)) {
          return { prompts: current!.prompts, position: next };
        }
        const done = current!.prompts.slice(0, next);
        const remaining = current!.prompts.slice(next);
        return {
          prompts: [...done, ...requeueCard(remaining, prompt, random)],
          position: next,
        };
      });
    },
  });

  // Whatever the way out (End session, the deck link, browser back), the
  // queue the session started from is no longer today's: drop it rather
  // than mark it stale, so no screen shows it while refetching.
  useEffect(
    () => () => {
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
    },
    [queryClient, deck.url],
  );

  async function handleExit() {
    await queryClient.invalidateQueries({
      queryKey: ["reviews", deck.reviewsDocumentUrl],
    });
    onExit();
  }

  if (queueQuery.error) {
    return <p class="error">{errorMessage(queueQuery.error)}</p>;
  }
  if (session === null) {
    return <Loading label="Preparing your study session…" />;
  }

  const { prompts, position } = session;
  const prompt = position < prompts.length ? prompts[position] : null;
  return (
    <StudyScreen
      deckName={deck.name}
      deckHref={deckHref(instance.url, deck.url)}
      prompt={prompt}
      position={position + 1}
      total={prompts.length}
      answerScale={answerScale}
      busy={answerMutation.isPending}
      error={errorMessage(answerMutation.error)}
      onAnswer={(quality) =>
        answerMutation.mutate({ prompt: prompt!, quality })
      }
      onExit={() => void handleExit()}
    />
  );
}
