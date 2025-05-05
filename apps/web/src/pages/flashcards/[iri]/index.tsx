import { preferFragment } from "@lib/utils";
import Layout from "@pages/layout";
import { ServiceContext } from "@providers/service.provider";
import { Button, Card } from "@ui/index";
import { Layers, StickyNote } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";
import useFlashcards from "src/hooks/useFlashcards";

export default function Page() {
  const router = useRouter();
  const { getService } = useContext(ServiceContext);
  const service = getService();

  const { iri } = useParams();
  const { flashcardMap } = useFlashcards(iri ? [iri?.toString()] : []);
  const flashcard = iri ? flashcardMap[iri.toString()] : undefined;

  if (!flashcard) {
    return (
      <Layout>
        <div>No flashcard found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Card key={flashcard.iri} className="p-2">
        <div className="space-x-2 space-y-1">
          <div className="mb-2 flex gap-1">
            <div className="width: 32px" title="Instance">
              <StickyNote />
            </div>
            <strong>{preferFragment(flashcard.iri)}</strong> (Flashcard)
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
            <strong>• Is in deck:</strong> <Layers />
            <strong>
              <span title={flashcard.isInDeck}>
                {preferFragment(flashcard.isInDeck)}
              </span>
            </strong>{" "}
            (Deck)
            <Button
              size={"sm"}
              onClick={() => {
                router.push(`/decks/${encodeURIComponent(flashcard.isInDeck)}`);
              }}
            >
              View
            </Button>
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
        </div>
      </Card>
    </Layout>
  );
}
