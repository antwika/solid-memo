import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card } from "@ui/index";
import { useParams } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import useDecks from "src/hooks/useDecks";
import { preferFragment, type FlashcardModel } from "@solid-memo/core";
import useFlashcards from "@hooks/useFlashcards";
import { addDays, isAfter, startOfDay } from "date-fns";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

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

  const navBar = (
    <div className="flex text-foreground font-semibold">
      <span>
        <Link
          className="flex items-center"
          href={`/instances/${encodeURIComponent(deck.isInSolidMemoDataInstance)}`}
        >
          <ChevronLeft /> Back
        </Link>
      </span>
      <div className="grow" />
      <span>{dueFlashcards.length} remaining</span>
    </div>
  );

  const dueFlashcard = dueFlashcards[0];

  if (!dueFlashcard) {
    return (
      <Layout>
        {navBar}
        <h1>{deck.name}</h1>
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
      {navBar}
      <h1>{deck.name}</h1>
      <div className="flex flex-col gap-2">
        <Card className="items-center">
          {!displayAnswer && <h3>{dueFlashcard.front}</h3>}
          {displayAnswer && <h3>{dueFlashcard.back}</h3>}
        </Card>
        <div className="flex sm:flex-row flex-col justify-center gap-2 flex-col-reverse">
          {!displayAnswer && (
            <Button onClick={() => setDisplayAnswer(true)}>
              Display answer
            </Button>
          )}
          {displayAnswer && (
            <Button
              size={"lg"}
              className="bg-red-500/60 font-bold"
              onClick={() => review(dueFlashcard, 0)}
            >
              Again
            </Button>
          )}
          {displayAnswer && (
            <Button
              size={"lg"}
              className="bg-orange-500/60 font-bold"
              onClick={() => review(dueFlashcard, 2)}
            >
              Hard
            </Button>
          )}
          {displayAnswer && (
            <Button
              size={"lg"}
              className="bg-yellow-500/60 font-bold"
              onClick={() => review(dueFlashcard, 4)}
            >
              Good
            </Button>
          )}
          {displayAnswer && (
            <Button
              size={"lg"}
              className="bg-green-500/60 font-bold"
              onClick={() => review(dueFlashcard, 5)}
            >
              Easy
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
