import { preferFragment, type FlashcardModel } from "@solid-memo/core";
import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card } from "@ui/index";
import { Layers, StickyNote } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import useFlashcards from "src/hooks/useFlashcards";
import {
  addDays,
  formatDuration,
  intervalToDuration,
  startOfDay,
} from "date-fns";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { getService, getSpacedRepetitionAlgorithm } =
    useContext(ServiceContext);
  const service = getService();
  const spacedRepetitionAlgorithm = getSpacedRepetitionAlgorithm();

  const { iri } = useParams();
  const { flashcardMap, isLoading, mutate } = useFlashcards(
    iri ? [iri?.toString()] : []
  );
  const flashcard = iri ? flashcardMap[iri.toString()] : undefined;

  if (isLoading) {
    return (
      <Layout>
        <Card className="p-2">
          <div>Loading flashcards...</div>
        </Card>
      </Layout>
    );
  }

  if (!flashcard) {
    return (
      <Layout>
        <div>No flashcard found</div>
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
    await mutate();
  };

  const startOfToday = startOfDay(new Date());
  const nextReview = addDays(startOfToday, flashcard.interval);
  const relativeDuration = formatDuration(
    intervalToDuration({
      start: startOfToday,
      end: nextReview,
    })
  );

  return (
    <Layout>
      <Card key={flashcard.iri} className="p-2">
        <div className="space-x-2 space-y-1">
          <div className="mb-2 flex gap-1">
            <Link
              href={`/flashcards/${encodeURIComponent(flashcard.iri)}`}
              className="hover:underline"
            >
              <div className="flex gap-1" title={flashcard.iri}>
                <StickyNote />
                <strong>
                  <span>{preferFragment(flashcard.iri)}</span>
                </strong>{" "}
                (Flashcard)
              </div>
            </Link>
          </div>
          <div>
            <span title={flashcard.iri}>
              <strong>• Iri:</strong> {preferFragment(flashcard.iri)}
            </span>
          </div>
          <div>
            <strong>• Version:</strong> {flashcard.version}
          </div>
          <div>
            <strong>• Front:</strong> {flashcard.front}
          </div>
          <div>
            <strong>• Back:</strong> {flashcard.back}
          </div>
          <div className="flex gap-1 items-center">
            <strong>• Is in deck:</strong>{" "}
            <Link
              href={`/decks/${encodeURIComponent(flashcard.isInDeck)}`}
              className="hover:underline"
            >
              <div className="flex gap-1" title={flashcard.isInDeck}>
                <Layers />
                <strong>
                  <span>{preferFragment(flashcard.isInDeck)}</span>
                </strong>{" "}
                (Deck)
              </div>
            </Link>
          </div>
          <div>
            <strong>• Interval:</strong> {flashcard.interval}
          </div>
          <div>
            <strong>• Ease factor:</strong> {flashcard.easeFactor}
          </div>
          <div>
            <strong>• Repetition:</strong> {flashcard.repetition}
          </div>
          {flashcard.lastReviewed && (
            <div>
              <strong>• Last reviewed:</strong>{" "}
              {flashcard.lastReviewed.toUTCString()}
            </div>
          )}
          <div>
            <strong>• Next review:</strong> In {relativeDuration} (
            {nextReview.toUTCString()})
          </div>
          <Button
            variant={"destructive"}
            onClick={() => {
              service
                .removeFlashcard(flashcard)
                .then(() =>
                  router.push(
                    `/decks/${encodeURIComponent(flashcard.isInDeck)}`
                  )
                )
                .catch((err) => console.error("Failed with error:", err));
            }}
          >
            Delete flashcard
          </Button>
          <Button
            onClick={() => {
              router.push(
                `/flashcards/${encodeURIComponent(flashcard.iri)}/edit`
              );
            }}
          >
            Edit
          </Button>

          <div>
            <strong>Review:</strong>
          </div>
          <Button onClick={() => review(flashcard, 0)}>Again</Button>
          <Button onClick={() => review(flashcard, 2)}>Hard</Button>
          <Button onClick={() => review(flashcard, 4)}>Good</Button>
          <Button onClick={() => review(flashcard, 5)}>Easy</Button>
        </div>
      </Card>
    </Layout>
  );
}
