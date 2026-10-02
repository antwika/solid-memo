import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import type { Card, Deck, DeckDirection } from "@solid-memo/domain/deck";
import type { DeckAbout } from "@solid-memo/domain/deckAbout";
import { BrowserScreen } from "./BrowserScreen";
import { useI18n } from "./i18n";
import { Loading } from "./Loading";

/** Owns the card list and the deck/card mutations for the Browser view. */
export function BrowserContainer({
  useCases,
  deck,
  deckHref,
  page,
  onAddCard,
  cardHref,
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
  onPageChange: (page: number) => void;
}) {
  const { t, errorText } = useI18n();
  const queryClient = useQueryClient();

  const cardsQuery = useQuery({
    queryKey: ["cards", deck.cardsDocumentUrl],
    queryFn: () => useCases.listCards(deck),
  });

  const describeDeckMutation = useMutation({
    mutationFn: (about: DeckAbout) => useCases.describeDeck(deck, about),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["decks"] }),
  });

  const setDirectionMutation = useMutation({
    mutationFn: (direction: DeckDirection) =>
      useCases.setDeckDirection(deck, direction),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["decks"] });
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
    },
  });

  const removeCardMutation = useMutation({
    mutationFn: (card: Card) => useCases.removeCard(deck, card),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cards", deck.cardsDocumentUrl],
      });
      await queryClient.invalidateQueries({
        queryKey: ["reviews", deck.reviewsDocumentUrl],
      });
      queryClient.removeQueries({ queryKey: ["studyQueue", deck.url] });
    },
  });

  if (cardsQuery.error) {
    return <p class="error">{errorText(cardsQuery.error)}</p>;
  }
  if (cardsQuery.data === undefined) {
    return <Loading label={t("browser.loading")} />;
  }

  return (
    <BrowserScreen
      deck={deck}
      deckHref={deckHref}
      cards={cardsQuery.data}
      page={page}
      busy={
        describeDeckMutation.isPending ||
        setDirectionMutation.isPending ||
        removeCardMutation.isPending
      }
      error={
        errorText(describeDeckMutation.error) ??
        errorText(setDirectionMutation.error) ??
        errorText(removeCardMutation.error)
      }
      onDescribeDeck={(about) => describeDeckMutation.mutate(about)}
      onChangeDirection={(direction) => setDirectionMutation.mutate(direction)}
      onAddCard={onAddCard}
      cardHref={cardHref}
      onRemoveCard={(card) => removeCardMutation.mutate(card)}
      onPageChange={onPageChange}
    />
  );
}
