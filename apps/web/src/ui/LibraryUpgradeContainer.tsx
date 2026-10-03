import { useState } from "preact/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Deck } from "@solid-memo/domain/deck";
import type { Instance } from "@solid-memo/domain/instance";
import type { StepPart } from "@solid-memo/domain/deckUpgrade";
import type { LibraryUpgradePlan } from "@solid-memo/domain/libraryUpgrade";
import { useI18n } from "./i18n";
import { LibraryUpgradeNotice } from "./LibraryUpgradeNotice";
import { DECK_UPGRADE_SCREEN_STEPS, DeckUpgradeFailure, DeckUpgradeProgress, type DeckUpgradeScreenStep } from "./DeckUpgrade";

/**
 * Checks whether the library has a newer release of an imported deck
 * and, when it does, shows the offer. Only decks with a library source
 * are checked (the index and two releases read once, kept for the
 * session); a failed check shows nothing, since the deck works as it is.
 * Home-made decks render nothing at all. Once a session, it also gives
 * the deck the languages its own release states its title and
 * description in and the copy lacks, which upgrades made before they
 * brought the texts along left out, and tidies away what an upgrade cut
 * off half-way left in the pod. While an upgrade runs, its steps are
 * shown in place of the offer; a failed one says where it failed and
 * that the deck is as it was.
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
    // Planned for the deck as it is: once an upgrade moves it to another
    // release and documents, the plan for the deck as it was no longer applies.
    queryKey: ["libraryUpgrade", deck.url, deck.sourceUrl, deck.cardsDocumentUrl],
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

  useQuery({
    queryKey: ["deckUpgradeTidy", deck.url],
    queryFn: () => useCases.tidyInterruptedDeckUpgrade(deck),
    enabled: deck.sourceUrl !== undefined,
    staleTime: Infinity,
    retry: false,
  });

  const [progress, setProgress] = useState<{ step: DeckUpgradeScreenStep; done: number; part?: StepPart }>({
    step: "read",
    done: 0,
  });
  const upgradeMutation = useMutation({
    mutationFn: async (plan: LibraryUpgradePlan) => {
      setProgress({ step: "read", done: 0 });
      const outcome = await useCases.applyLibraryUpgrade(deck, plan, setProgress);
      if (!outcome.ok) {
        // An offer the deck no longer calls for is looked at again, with the deck as it now is.
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["decks"] }),
          queryClient.invalidateQueries({ queryKey: ["libraryUpgrade", deck.url] }),
        ]);
        return outcome;
      }
      // Everything the upgrade touched is read again at once, so the deck changes on screen in one go.
      setProgress({ step: "refresh", done: DECK_UPGRADE_SCREEN_STEPS.length - 1 });
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["decks"] }),
        queryClient.invalidateQueries({ queryKey: ["cards", deck.cardsDocumentUrl] }),
        queryClient.invalidateQueries({ queryKey: ["reviews", deck.reviewsDocumentUrl] }),
        queryClient.invalidateQueries({ queryKey: ["migration", instance.url] }),
      ]);
      return outcome;
    },
  });

  if (upgradeMutation.isPending) {
    return <DeckUpgradeProgress step={progress.step} done={progress.done} part={progress.part} />;
  }
  const outcome = upgradeMutation.data;
  const plan = planQuery.data;
  if (outcome?.ok === false) {
    return (
      <DeckUpgradeFailure
        outcome={outcome}
        onRetry={() => (plan === undefined || plan === null ? upgradeMutation.reset() : upgradeMutation.mutate(plan))}
        onDismiss={() => upgradeMutation.reset()}
      />
    );
  }
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
      busy={false}
      error={errorText(upgradeMutation.error)}
      onUpgrade={() => upgradeMutation.mutate(plan)}
    />
  );
}
