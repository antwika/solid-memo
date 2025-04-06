import { cn } from "@lib/utils";
import type { ClassValue } from "clsx";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@ui/index";
import { useContext } from "react";
import { SessionContext } from "@providers/SessionProvider";
import { QueryEngineContext } from "@providers/QueryEngineProvider";
import { deleteFlashcard } from "@services/solid.service";
import { useAppSelector } from "@redux/hooks";
import { selectFlashcardByIri } from "@redux/features/flashcards.slice";
import { selectInstance } from "@redux/features/instances.slice";

type Props = {
  className?: ClassValue;
  cardIri: string;
};

export function Flashcard({ className, cardIri }: Props) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const card = useAppSelector((state) => selectFlashcardByIri(state, cardIri));
  const currentInstance = useAppSelector(selectInstance);

  if (!card) {
    return <div>Loading flashcard...</div>;
  }

  const tryDeleteFlashcard = async () => {
    if (!currentInstance) {
      console.error("An instance must be selected");
      return;
    }

    await deleteFlashcard(session, queryEngine, currentInstance.iri, cardIri);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Flashcard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div>Version: {card.version}</div>
          <div>Front: {card.front}</div>
          <div>Back: {card.back}</div>
          <Button title={cardIri} onClick={tryDeleteFlashcard}>
            Delete flashcard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
