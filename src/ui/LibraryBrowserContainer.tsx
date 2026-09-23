import { useQuery } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { LibraryDeck } from "../domain/library";
import { errorMessage } from "./errorMessage";
import { LibraryBrowserScreen } from "./LibraryBrowserScreen";
import { Loading } from "./Loading";

/** Fetches a library deck's cards for the read-only card list. */
export function LibraryBrowserContainer({
  useCases,
  deck,
  deckHref,
  page,
  onPageChange,
}: {
  useCases: UseCases;
  deck: LibraryDeck;
  /** URL of the deck's page. */
  deckHref: string;
  /** 1-based page, from the route. */
  page: number;
  onPageChange: (page: number) => void;
}) {
  const cardsQuery = useQuery({
    queryKey: ["libraryCards", deck.url],
    queryFn: () => useCases.listLibraryCards(deck),
  });

  if (cardsQuery.error) {
    return <p class="error">{errorMessage(cardsQuery.error)}</p>;
  }
  if (cardsQuery.data === undefined) {
    return <Loading label="Loading cards…" />;
  }

  return (
    <LibraryBrowserScreen
      deck={deck}
      deckHref={deckHref}
      cards={cardsQuery.data}
      page={page}
      onPageChange={onPageChange}
    />
  );
}
