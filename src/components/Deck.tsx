import { useDeck } from "@src/hooks/useDeck";
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

type Props = {
  className?: ClassValue;
  deckIri: string;
};

export function Deck({ className, deckIri }: Props) {
  const { deck } = useDeck(deckIri);
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const { solidMemoData } = useContext(SolidMemoDataContext);

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
          {deck.hasCard.map((hasCardIri) => (
            <Flashcard key={hasCardIri} cardIri={hasCardIri} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
