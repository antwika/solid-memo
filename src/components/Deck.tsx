import { Flashcard } from "./Flashcard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@src/lib/utils";
import type { ClassValue } from "clsx";
import { Button } from "./ui";
import { createFlashcard, deleteDeck } from "@src/services/solid.service";
import { useContext } from "react";
import { SessionContext } from "@src/providers/SessionProvider";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SolidMemoDataContext } from "@src/providers/SolidMemoDataProvider";
import { selectFlashcardByDeck } from "@src/redux/features/flashcards.slice";
import { useAppSelector } from "@src/redux/hooks";
import { selectDeckByIri } from "@src/redux/features/decks.slice";

type Props = {
  className?: ClassValue;
  deckIri: string;
};

export function Deck({ className, deckIri }: Props) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const { solidMemoData } = useContext(SolidMemoDataContext);
  const deck = useAppSelector((state) => selectDeckByIri(state, deckIri));
  const flashcards = useAppSelector((state) =>
    selectFlashcardByDeck(state, deckIri),
  );

  if (!deck) {
    return <div>Loading deck...</div>;
  }

  const tryCreateFlashcard = async () => {
    if (!solidMemoData) {
      console.error("An instance must be selected");
      return;
    }

    await createFlashcard(session, queryEngine, solidMemoData.iri, deckIri, {
      version: "1",
      front: "New front",
      back: "New back",
      isInDeck: deckIri,
    });
  };

  const tryDeleteDeck = async () => {
    if (!solidMemoData) {
      console.error("An instance must be selected");
      return;
    }

    await deleteDeck(session, queryEngine, solidMemoData.iri, deckIri);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Deck: &quot;{deck.name}&quot;
          </CardTitle>
          <div>Version: {deck.version}</div>
          <div>
            <Button title={deckIri} onClick={tryDeleteDeck}>
              Delete this deck
            </Button>
          </div>
          <div>
            <Button onClick={tryCreateFlashcard}>Create new flashcard</Button>
          </div>
        </CardHeader>
        <CardContent className="xs:grid-cols-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {flashcards.map((flashcard) => (
            <Flashcard key={flashcard.iri} cardIri={flashcard.iri} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
