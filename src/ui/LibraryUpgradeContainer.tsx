import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { LibraryUpgradePlan } from "../domain/libraryUpgrade";
import { DIRECTION_LABELS } from "./direction";
import { errorMessage } from "./errorMessage";
import { LibraryUpgradeNotice } from "./LibraryUpgradeNotice";

/**
 * Checks whether the library now publishes an imported deck in a newer
 * format the app can apply and, when it does, shows the offer. Only decks
 * with a library source are checked (one read of the library document,
 * kept for the session); a failed check shows nothing, since the deck
 * works as it is. Home-made decks render nothing at all.
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
  const queryClient = useQueryClient();

  const planQuery = useQuery({
    queryKey: ["libraryUpgrade", deck.url],
    queryFn: () => useCases.planLibraryUpgrade(deck),
    enabled: deck.sourceUrl !== undefined,
    staleTime: Infinity,
  });

  const upgradeMutation = useMutation({
    mutationFn: (plan: LibraryUpgradePlan) =>
      useCases.applyLibraryUpgrade(deck, plan),
    onSuccess: async () => {
      // The deck's direction (and format) changed: every view of the deck
      // and of what is due today, and the format-migration plan, follow.
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
      await queryClient.invalidateQueries({ queryKey: ["decks"] });
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
        Updated from the library: now studied{" "}
        {DIRECTION_LABELS[upgradeMutation.data.direction].toLowerCase()}.
      </p>
    ) : null;
  }
  return (
    <LibraryUpgradeNotice
      deckName={deck.name}
      plan={plan}
      busy={upgradeMutation.isPending}
      error={errorMessage(upgradeMutation.error)}
      onUpgrade={() => upgradeMutation.mutate(plan)}
    />
  );
}
