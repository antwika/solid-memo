import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card } from "@ui/index";
import { useParams } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import useDecks from "src/hooks/useDecks";
import { preferFragment, type FlashcardModel } from "@solid-memo/core";
import useFlashcards from "@hooks/useFlashcards";
import { addDays, isAfter, startOfDay } from "date-fns";

export default function Page() {
  const { getService, getSpacedRepetitionAlgorithm } =
    useContext(ServiceContext);
  const service = getService();

  const { iri } = useParams();
  const { deckMap, isLoading } = useDecks(iri ? [iri?.toString()] : []);
  const deck = iri ? deckMap[iri.toString()] : undefined;

  const { flashcardMap, mutate: mutateFlashcards } = useFlashcards(
    deck?.hasCard ?? []
  );
  const spacedRepetitionAlgorithm = getSpacedRepetitionAlgorithm();
  const [displayAnswer, setDisplayAnswer] = useState<boolean>(false);

  const dueFlashcards = useMemo(() => {
    const filtered = Object.keys(flashcardMap)
      .filter((flashcardIri) => {
        const flashcard = flashcardMap[flashcardIri];
        if (!flashcard) return false;

        const startOfLastReviewDate = startOfDay(
          flashcard.lastReviewed ?? new Date()
        );

        const interval = flashcard.lastReviewed ? flashcard.interval : 0;

        const nextReview = startOfDay(addDays(startOfLastReviewDate, interval));
        const startOfToday = startOfDay(new Date());
        return !isAfter(nextReview, startOfToday);
      })
      .map((flashcardIri) => flashcardMap[flashcardIri])
      .filter((flashcard) => flashcard !== undefined);

    return filtered.sort((a, b) => {
      const aDate = a.lastReviewed ? new Date(a.lastReviewed).getTime() : 0;
      const bDate = b.lastReviewed ? new Date(b.lastReviewed).getTime() : 0;
      return aDate - bDate;
    });
  }, [flashcardMap]);

  if (isLoading) {
    return (
      <Layout>
        <Card className="p-2">
          <div>Loading deck...</div>
        </Card>
      </Layout>
    );
  }

  if (!deck) {
    return (
      <Layout>
        <div>No deck found</div>
      </Layout>
    );
  }

  const dueFlashcard = dueFlashcards[0];

  if (!dueFlashcard) {
    return (
      <Layout>
        <div>There are no more flashcards to study in this deck!</div>
      </Layout>
    );
  }

  const review = async (flashcard: FlashcardModel, quality: number) => {
    console.log(
      "Reviewed flashcard",
      preferFragment(flashcard.iri),
      ", answer quality",
      quality
    );

    const reviewedFlashcards = spacedRepetitionAlgorithm.compute([
      { ...flashcard, q: quality },
    ]);

    await Promise.all(
      reviewedFlashcards.map((reviewedFlashcard) =>
        service.updateFlashcard(reviewedFlashcard)
      )
    );
    await mutateFlashcards();
    setDisplayAnswer(false);
  };

  return (
    <Layout>
      <Card key={deck.iri} className="p-2">
        <div className="space-x-2 space-y-1">
          <div>Reviews remaining: {dueFlashcards.length}</div>
          {!displayAnswer && <Card className="p-2">{dueFlashcard.front}</Card>}
          {displayAnswer && <Card className="p-2">{dueFlashcard.back}</Card>}
          {!displayAnswer && (
            <Button onClick={() => setDisplayAnswer(true)}>
              Display answer
            </Button>
          )}
          {displayAnswer && (
            <Button onClick={() => review(dueFlashcard, 0)}>Again</Button>
          )}
          {displayAnswer && (
            <Button onClick={() => review(dueFlashcard, 2)}>Hard</Button>
          )}
          {displayAnswer && (
            <Button onClick={() => review(dueFlashcard, 4)}>Good</Button>
          )}
          {displayAnswer && (
            <Button onClick={() => review(dueFlashcard, 5)}>Easy</Button>
          )}
        </div>
      </Card>
    </Layout>
  );
}
