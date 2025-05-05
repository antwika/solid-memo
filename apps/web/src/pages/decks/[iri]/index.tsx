import { preferFragment } from "@solid-memo/core";
import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card } from "@ui/index";
import { Database, Layers, StickyNote } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import useDecks from "src/hooks/useDecks";

export default function Page() {
  const router = useRouter();
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const { iri } = useParams();
  const { deckMap, mutate } = useDecks(iri ? [iri?.toString()] : []);
  const deck = iri ? deckMap[iri.toString()] : undefined;

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
            <div className="width: 32px" title="Instance">
              <Layers />
            </div>
            <strong>{deck.name}</strong> (Deck)
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
            <strong>• Is in instance:</strong> <Database />
            <strong>
              <span title={deck.isInSolidMemoDataInstance}>
                {preferFragment(deck.isInSolidMemoDataInstance)}
              </span>
            </strong>{" "}
            (Instance)
            <Button
              size={"sm"}
              onClick={() => {
                router.push(
                  `/instances/${encodeURIComponent(deck.isInSolidMemoDataInstance)}`
                );
              }}
            >
              View
            </Button>
          </div>
          <div>
            <strong>• Has flashcard:</strong>{" "}
            <div className="flex flex-col gap-1">
              {deck.hasCard.map((cardIri) => (
                <div key={cardIri} className="flex gap-1 items-center">
                  <StickyNote />
                  <strong>
                    <span title={cardIri}>{preferFragment(cardIri)}</span>
                  </strong>{" "}
                  (Flashcard)
                  <Button
                    size={"sm"}
                    onClick={() => {
                      router.push(`/flashcards/${encodeURIComponent(cardIri)}`);
                    }}
                  >
                    View
                  </Button>
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
              service
                .renameDeck(deck, "Renamed deck")
                .then(() => mutate())
                .catch((err) => console.error("Failed with error:", err));
            }}
          >
            Rename deck
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
                  isInDeck: deck.iri,
                })
                .then(() => mutate())
                .catch((err) => console.error("Failed with error:", err));
            }}
          >
            Create flashcard
          </Button>
        </div>
      </Card>
    </Layout>
  );
}
