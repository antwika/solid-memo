import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Instance } from "@solid-memo/domain/instance";
import { isCopyOf, type LibraryDeck } from "@solid-memo/domain/library";
import { statsOf } from "@solid-memo/domain/libraryStats";
import type { Session } from "@solid-memo/domain/session";
import { LibraryDeckScreen } from "./LibraryDeckScreen";
import { libraryPreviewHref, routeToHash } from "./router";
import { useI18n } from "./i18n";

/**
 * Owns one library deck's page, its import and the user's like of it;
 * returns to the deck list once the deck is in. The deck itself is
 * resolved by Workspace from the library index, like a pod deck is from
 * the catalog.
 */
export function LibraryDeckContainer({
  useCases,
  session,
  instance,
  deck,
  onDone,
}: {
  useCases: UseCases;
  session: Session;
  instance: Instance;
  deck: LibraryDeck;
  /** Called after a successful import. */
  onDone: () => void;
}) {
  const { errorText } = useI18n();
  const queryClient = useQueryClient();
  const guest = session.guest === true;

  const decksQuery = useQuery({
    queryKey: ["decks", instance.url],
    queryFn: () => useCases.listDecks(instance.url),
  });
  const imported = (decksQuery.data ?? []).some((podDeck) => isCopyOf(podDeck, deck));

  const statsQuery = useQuery({
    queryKey: ["libraryStats"],
    queryFn: () => useCases.libraryStats(),
  });
  const countedAt = statsQuery.data?.countedAt;

  const likesQuery = useQuery({
    queryKey: ["libraryLikes", instance.url],
    queryFn: () => useCases.listLibraryLikes(instance.url),
    enabled: !guest,
  });
  const liked = (likesQuery.data ?? []).some((like) => like.deckUrl === deck.seriesUrl);

  const importMutation = useMutation({
    mutationFn: () => useCases.importLibraryDeck(session, instance.url, deck),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["decks", instance.url],
      });
      onDone();
    },
  });

  const likeMutation = useMutation({
    mutationFn: (like: boolean) =>
      like
        ? useCases.likeLibraryDeck(session, instance.url, deck)
        : useCases.unlikeLibraryDeck(session, instance.url, deck),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["libraryLikes", instance.url] }),
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
      {...(countedAt === undefined ? {} : { stats: { ...statsOf(statsQuery.data!, deck.seriesUrl), countedAt } })}
      like={
        guest
          ? "guest"
          : {
              liked,
              busy: likeMutation.isPending || likesQuery.isPending,
              error: errorText(likeMutation.error),
              onToggle: () => likeMutation.mutate(!liked),
            }
      }
    />
  );
}
