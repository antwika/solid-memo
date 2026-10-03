import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Instance } from "@solid-memo/domain/instance";
import { isCopyOf, type LibraryDeck } from "@solid-memo/domain/library";
import { LibraryDeckScreen } from "./LibraryDeckScreen";
import { libraryPreviewHref, routeToHash } from "./router";
import { useI18n } from "./i18n";

/**
 * Owns one library deck's page and its import; returns to the deck list
 * once the deck is in. The deck itself is resolved by Workspace from the
 * library index, like a pod deck is from the catalog.
 */
export function LibraryDeckContainer({
  useCases,
  instance,
  deck,
  onDone,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: LibraryDeck;
  /** Called after a successful import. */
  onDone: () => void;
}) {
  const { errorText } = useI18n();
  const queryClient = useQueryClient();

  const decksQuery = useQuery({
    queryKey: ["decks", instance.url],
    queryFn: () => useCases.listDecks(instance.url),
  });
  const imported = (decksQuery.data ?? []).some((podDeck) => isCopyOf(podDeck, deck));

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
      browseHref={routeToHash({
        screen: "libraryBrowser",
        instanceUrl: instance.url,
        libraryDeckUrl: deck.seriesUrl,
      })}
      previewHref={libraryPreviewHref(instance.url, deck.seriesUrl)}
      imported={imported}
      busy={importMutation.isPending}
      error={errorText(importMutation.error)}
      onImport={() => importMutation.mutate()}
    />
  );
}
