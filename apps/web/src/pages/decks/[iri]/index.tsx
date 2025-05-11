import { preferFragment } from "@solid-memo/core";
import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card } from "@ui/index";
import { Database, Layers, StickyNote } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import useDecks from "src/hooks/useDecks";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const { iri } = useParams();
  const { deckMap, mutate, isLoading } = useDecks(iri ? [iri?.toString()] : []);
  const deck = iri ? deckMap[iri.toString()] : undefined;

  if (isLoading) {
    return (
      <Layout>
        <Card className="p-2">
          <div>Loading decks...</div>
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

  return (
    <Layout>
      <Card key={deck.iri} className="p-2">
        <div className="space-x-2 space-y-1">
          <div className="mb-2 flex gap-1">
            <Link
              href={`/decks/${encodeURIComponent(deck.iri)}`}
              className="hover:underline"
            >
              <div className="flex gap-1" title={deck.iri}>
                <Layers />
                <strong>
                  <span>{deck.name ?? preferFragment(deck.iri)}</span>
                </strong>{" "}
                (Deck)
              </div>
            </Link>
          </div>
          <div>
            <span title={deck.iri}>
              <strong>• Iri:</strong> {preferFragment(deck.iri)}
            </span>
          </div>
          <div>
            <strong>• Version:</strong> {deck.version}
          </div>
          <div>
            <strong>• Name:</strong> {deck.name}
          </div>
          <div className="flex gap-1 items-center">
            <strong>• Is in instance:</strong>
            <Link
              href={`/instances/${encodeURIComponent(deck.isInSolidMemoDataInstance)}`}
              className="hover:underline"
            >
              <div
                className="flex gap-1"
                title={deck.isInSolidMemoDataInstance}
              >
                <Database />
                <strong>
                  <span>{preferFragment(deck.isInSolidMemoDataInstance)}</span>
                </strong>{" "}
                (Instance)
              </div>
            </Link>
          </div>
          <div>
            <strong>• Has flashcard:</strong>{" "}
            <div className="flex flex-col gap-1">
              {deck.hasCard.map((cardIri) => (
                <div key={cardIri} className="flex gap-1 items-center">
                  <Link
                    href={`/flashcards/${encodeURIComponent(cardIri)}`}
                    className="hover:underline"
                  >
                    <div className="flex gap-1" title={cardIri}>
                      <StickyNote />
                      <strong>
                        <span>{preferFragment(cardIri)}</span>
                      </strong>{" "}
                      (Flashcard)
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant={"destructive"}
            onClick={() => {
              service
                .removeDeck(deck)
                .then(() =>
                  router.push(
                    `/instances/${encodeURIComponent(deck.isInSolidMemoDataInstance)}`
                  )
                )
                .catch((err) => console.error("Failed with error:", err));
            }}
          >
            Delete deck
          </Button>
          <Button
            onClick={() => {
              router.push(`/decks/${encodeURIComponent(deck.iri)}/edit`);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              service
                .newFlashcard(deck.isInSolidMemoDataInstance, {
                  version: "1",
                  front: "Front",
                  back: "Back",
                  isInSolidMemoDataInstance: deck.isInSolidMemoDataInstance,
                  isInDeck: deck.iri,
                  interval: 1,
                  easeFactor: 2.5,
                  repetition: 1,
                })
                .then(() => mutate())
                .catch((err) => console.error("Failed with error:", err));
            }}
          >
            Create flashcard
          </Button>
          <Button
            onClick={() => {
              const schedules = deck.hasCard.map((flashcardIri) => {
                return {
                  version: "1",
                  isInSolidMemoDataInstance: deck.isInSolidMemoDataInstance,
                  forFlashcard: flashcardIri,
                  nextReview: new Date(),
                };
              });

              service
                .newSchedules(schedules)
                .then(() => mutate())
                .then(() => {
                  console.log("Scheduled all flashcards of deck");
                })
                .catch((err) => {
                  console.error("Failed to schedule flashcards, error:", err);
                });
            }}
          >
            Schedule all flashcards
          </Button>
          <Button
            onClick={() => {
              router.push(`/decks/${encodeURIComponent(deck.iri)}/study`);
            }}
          >
            Study
          </Button>
        </div>
      </Card>
    </Layout>
  );
}
