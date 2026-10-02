import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Deck } from "@solid-memo/domain/deck";
import type { Instance } from "@solid-memo/domain/instance";
import type { LibraryUpgradePlan } from "@solid-memo/domain/libraryUpgrade";
import { useI18n } from "./i18n";
import { LibraryUpgradeNotice } from "./LibraryUpgradeNotice";

/**
 * Checks whether the library has a newer release of an imported deck
 * and, when it does, shows the offer. Only decks with a library source
 * are checked (the index and two releases read once, kept for the
 * session); a failed check shows nothing, since the deck works as it is.
 * Home-made decks render nothing at all. Once a session, it also gives
 * the deck the languages its own release states its title and
 * description in and the copy lacks, which upgrades made before they
 * brought the texts along left out.
 */
export function LibraryUpgradeContainer({
  useCases,
  instance,
  deck,
}: {
  useCases: UseCases;
  instance: Instance;
  deck: Deck;
}) {
  const { t, readerText, errorText } = useI18n();
  const queryClient = useQueryClient();

  const planQuery = useQuery({
    queryKey: ["libraryUpgrade", deck.url],
    queryFn: () => useCases.planLibraryUpgrade(deck),
    enabled: deck.sourceUrl !== undefined,
    staleTime: Infinity,
  });

  useQuery({
    queryKey: ["releaseLanguages", deck.url, deck.sourceUrl],
    queryFn: async () => {
      const updated = await useCases.addReleaseLanguages(deck);
      if (updated !== null) await queryClient.invalidateQueries({ queryKey: ["decks"] });
      return updated !== null;
    },
    enabled: deck.sourceUrl !== undefined,
    staleTime: Infinity,
    retry: false,
  });

  const upgradeMutation = useMutation({
    mutationFn: (plan: LibraryUpgradePlan) =>
      useCases.applyLibraryUpgrade(deck, plan),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
      await queryClient.invalidateQueries({ queryKey: ["decks"] });
      await queryClient.invalidateQueries({ queryKey: ["cards", deck.cardsDocumentUrl] });
      await queryClient.invalidateQueries({ queryKey: ["reviews", deck.reviewsDocumentUrl] });
      await queryClient.invalidateQueries({
        queryKey: ["migration", instance.url],
      });
      await queryClient.invalidateQueries({
        queryKey: ["libraryUpgrade", deck.url],
      });
    },
  });

  const plan = planQuery.data;
  if (plan === undefined || plan === null) {
    return upgradeMutation.isSuccess ? (
      <p class="hint" role="status">
        {t("libraryUpgrade.updated", { version: upgradeMutation.variables.toVersion })}
      </p>
    ) : null;
  }
  return (
    <LibraryUpgradeNotice
      deckName={readerText(deck.title)}
      plan={plan}
      busy={upgradeMutation.isPending}
      error={errorText(upgradeMutation.error)}
      onUpgrade={() => upgradeMutation.mutate(plan)}
    />
  );
}
