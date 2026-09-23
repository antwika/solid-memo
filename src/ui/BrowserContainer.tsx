import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Card, Deck, DeckDirection } from "../domain/deck";
import { BrowserScreen } from "./BrowserScreen";
import { errorMessage } from "./errorMessage";
import { Loading } from "./Loading";

/** Owns the card list and the deck/card mutations for the Browser view. */
export function BrowserContainer({
  useCases,
  deck,
  deckHref,
  page,
  onAddCard,
  cardHref,
  onDeckRemoved,
  onPageChange,
}: {
  useCases: UseCases;
  deck: Deck;
  deckHref: string;
  /** 1-based Browser page, from the route. */
  page: number;
  onAddCard: () => void;
  /** URL of a card's own page. */
  cardHref: (card: Card) => string;
  /** The deck is gone; leave the Browser. */
  onDeckRemoved: () => void;
  onPageChange: (page: number) => void;
}) {
  const queryClient = useQueryClient();

  const cardsQuery = useQuery({
    queryKey: ["cards", deck.cardsDocumentUrl],
    queryFn: () => useCases.listCards(deck),
  });

  // The deck list is keyed by instance; match every ["decks", …] entry
  // rather than threading the instance through for one cache key.
  const renameDeckMutation = useMutation({
    mutationFn: (name: string) => useCases.renameDeck(deck, name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["decks"] }),
  });

  const setDirectionMutation = useMutation({
    mutationFn: (direction: DeckDirection) =>
      useCases.setDeckDirection(deck, direction),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["decks"] });
      // What is due depends on which way the deck is asked.
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
    },
  });

  const removeDeckMutation = useMutation({
    mutationFn: () => useCases.removeDeck(deck),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["decks"] });
      onDeckRemoved();
    },
  });

  const removeCardMutation = useMutation({
    mutationFn: (card: Card) => useCases.removeCard(deck, card),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cards", deck.cardsDocumentUrl],
      });
      // Removing a card also removes its review state.
      await queryClient.invalidateQueries({
        queryKey: ["reviews", deck.reviewsDocumentUrl],
      });
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
    },
  });

  if (cardsQuery.error) {
    return <p class="error">{errorMessage(cardsQuery.error)}</p>;
  }
  if (cardsQuery.data === undefined) {
    return <Loading label="Loading cards…" />;
  }

  return (
    <BrowserScreen
      deck={deck}
      deckHref={deckHref}
      cards={cardsQuery.data}
      page={page}
      busy={
        renameDeckMutation.isPending ||
        setDirectionMutation.isPending ||
        removeDeckMutation.isPending ||
        removeCardMutation.isPending
      }
      error={
        errorMessage(renameDeckMutation.error) ??
        errorMessage(setDirectionMutation.error) ??
        errorMessage(removeDeckMutation.error) ??
        errorMessage(removeCardMutation.error)
      }
      onRenameDeck={(name) => renameDeckMutation.mutate(name)}
      onChangeDirection={(direction) => setDirectionMutation.mutate(direction)}
      onRemoveDeck={() => removeDeckMutation.mutate()}
      onAddCard={onAddCard}
      cardHref={cardHref}
      onRemoveCard={(card) => removeCardMutation.mutate(card)}
      onPageChange={onPageChange}
    />
  );
}
