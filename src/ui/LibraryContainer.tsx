import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Instance } from "../domain/instance";
import type { LibraryDeck } from "../domain/library";
import { errorMessage } from "./errorMessage";
import { LibraryScreen } from "./LibraryScreen";
import { Loading } from "./Loading";
import { libraryHref } from "./router";

/**
 * Owns the library listing and the import mutation for one instance;
 * returns to the deck list once every selected deck is in.
 */
export function LibraryContainer({
  useCases,
  instance,
  onDone,
}: {
  useCases: UseCases;
  instance: Instance;
  /** Called after a successful import. */
  onDone: () => void;
}) {
  const queryClient = useQueryClient();

  const libraryQuery = useQuery({
    queryKey: ["library"],
    queryFn: () => useCases.listLibraryDecks(),
  });

  // Shares the deck list's cache entry: marks decks already imported.
  const decksQuery = useQuery({
    queryKey: ["decks", instance.url],
    queryFn: () => useCases.listDecks(instance.url),
  });
  const importedUrls = new Set(
    (decksQuery.data ?? []).flatMap((deck) =>
      deck.sourceUrl === undefined ? [] : [deck.sourceUrl],
    ),
  );

  const importMutation = useMutation({
    // One at a time: each import is two pod writes, and a failure
    // part-way leaves the earlier decks imported and the rest untouched.
    mutationFn: async (decks: LibraryDeck[]) => {
      for (const deck of decks) {
        await useCases.importLibraryDeck(instance.url, deck);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["decks", instance.url],
      });
      onDone();
    },
    // The decks imported before the failure are real; show them as such.
    onError: () =>
      queryClient.invalidateQueries({ queryKey: ["decks", instance.url] }),
  });

  if (libraryQuery.error) {
    return <p class="error">{errorMessage(libraryQuery.error)}</p>;
  }
  if (libraryQuery.data === undefined) {
    return <Loading label="Loading the deck library…" />;
  }

  return (
    <LibraryScreen
      decks={libraryQuery.data}
      libraryHref={libraryHref(instance.url)}
      isImported={(deck) => importedUrls.has(deck.url)}
      busy={importMutation.isPending}
      error={errorMessage(importMutation.error)}
      onImport={(decks) => importMutation.mutate(decks)}
    />
  );
}
