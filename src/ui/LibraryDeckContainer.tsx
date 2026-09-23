import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Instance } from "../domain/instance";
import type { LibraryDeck } from "../domain/library";
import { errorMessage } from "./errorMessage";
import { LibraryDeckScreen } from "./LibraryDeckScreen";
import { libraryDeckHref } from "./router";

/**
 * Owns one library deck's page and its import; returns to the deck list
 * once the deck is in. The deck itself is resolved by Workspace from the
 * library index, like a pod deck is from the catalog.
 */
export function LibraryDeckContainer({
  useCases,
  instance,
  deck,
  onBrowse,
  onDone,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: LibraryDeck;
  /** Open the deck's card list. */
  onBrowse: () => void;
  /** Called after a successful import. */
  onDone: () => void;
}) {
  const queryClient = useQueryClient();

  // Shares the deck list's cache entry: says whether this deck is in.
  const decksQuery = useQuery({
    queryKey: ["decks", instance.url],
    queryFn: () => useCases.listDecks(instance.url),
  });
  const imported = (decksQuery.data ?? []).some(
    (podDeck) => podDeck.sourceUrl === deck.url,
  );

  const importMutation = useMutation({
    mutationFn: () => useCases.importLibraryDeck(instance.url, deck),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["decks", instance.url],
      });
      onDone();
    },
  });

  return (
    <LibraryDeckScreen
      deck={deck}
      deckHref={libraryDeckHref(instance.url, deck.url)}
      imported={imported}
      busy={importMutation.isPending}
      error={errorMessage(importMutation.error)}
      onBrowse={onBrowse}
      onImport={() => importMutation.mutate()}
    />
  );
}
