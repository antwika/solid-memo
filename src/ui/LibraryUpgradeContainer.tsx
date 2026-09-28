import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Deck } from "../domain/deck";
import type { Instance } from "../domain/instance";
import type { LibraryUpgradePlan } from "../domain/libraryUpgrade";
import { errorMessage } from "./errorMessage";
import { LibraryUpgradeNotice } from "./LibraryUpgradeNotice";

/**
 * Checks whether the library has a newer release of an imported deck
 * and, when it does, shows the offer. Only decks with a library source
 * are checked (the index and two releases read once, kept for the
 * session); a failed check shows nothing, since the deck works as it is.
 * Home-made decks render nothing at all.
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
        Updated to release {upgradeMutation.variables.toVersion} from the library.
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
