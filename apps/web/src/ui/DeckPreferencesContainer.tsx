import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Deck } from "@solid-memo/domain/deck";
import type { DeckPace } from "@solid-memo/domain/deckPace";
import type { Instance } from "@solid-memo/domain/instance";
import { DeckPreferencesScreen } from "./DeckPreferencesScreen";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";
import { deckHref, routeToHash } from "./router";
import { useI18n } from "./i18n";

/**
 * Owns a deck's preferences: reads the instance's (which the deck falls
 * back on), saves the deck's own and returns to the deck's page. The
 * deck's cached study queue is dropped, so its counts follow the new
 * limits at once. Renaming stays on the page; removing the deck leaves it.
 */
export function DeckPreferencesContainer({
  useCases,
  instance,
  deck,
  onDeckRemoved,
  onDone,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: Deck;
  /** The deck is gone; leave its pages. */
  onDeckRemoved: () => void;
  /** Called after a successful save. */
  onDone: () => void;
}) {
  const { t } = useI18n();
  const queryClient = useQueryClient();

  const preferencesQuery = useQuery({
    queryKey: ["preferences", instance.url],
    queryFn: () => useCases.getPreferences(instance.url),
  });

  const saveMutation = useMutation({
    mutationFn: (pace: DeckPace) => useCases.setDeckPace(deck, pace),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["decks"] });
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
      onDone();
    },
  });

  const renameMutation = useMutation({
    mutationFn: (name: string) => useCases.renameDeck(deck, name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["decks"] }),
  });

  const removeMutation = useMutation({
    mutationFn: () => useCases.removeDeck(deck),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["decks"] });
      onDeckRemoved();
    },
  });

  if (preferencesQuery.error) {
    return <p class="error">{errorMessage(preferencesQuery.error)}</p>;
  }
  if (preferencesQuery.data === undefined) {
    return <Loading label={t("deckPreferences.loading")} />;
  }

  return (
    <DeckPreferencesScreen
      deck={deck}
      deckHref={deckHref(instance.url, deck.url)}
      preferences={preferencesQuery.data}
      preferencesHref={routeToHash({ screen: "preferences", instanceUrl: instance.url })}
      busy={
        saveMutation.isPending ||
        renameMutation.isPending ||
        removeMutation.isPending
      }
      error={
        errorMessage(saveMutation.error) ??
        errorMessage(renameMutation.error) ??
        errorMessage(removeMutation.error)
      }
      onSave={(pace) => saveMutation.mutate(pace)}
      onRename={(name) => renameMutation.mutate(name)}
      onRemove={() => removeMutation.mutate()}
    />
  );
}
