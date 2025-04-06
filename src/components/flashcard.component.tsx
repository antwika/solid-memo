import { cn } from "@lib/utils";
import type { ClassValue } from "clsx";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@ui/index";
import { useContext, useEffect } from "react";
import { SessionContext, QueryEngineContext } from "@providers/index";
import { deleteFlashcard } from "@services/solid.service";
import {
  deleteFlashcardThunk,
  selectFlashcardByIri,
} from "@redux/features/flashcards.slice";
import { selectInstance } from "@redux/features/instances.slice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";

type Props = {
  className?: ClassValue;
  cardIri: string;
};

export function Flashcard({ className, cardIri }: Props) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const card = useAppSelector((state) => selectFlashcardByIri(state, cardIri));
  const currentInstance = useAppSelector(selectInstance);
  const dispatch = useAppDispatch();

  if (!card) {
    return <div>Loading flashcard...</div>;
  }

  const tryDeleteFlashcard = async () => {
    if (!currentInstance) {
      console.error("An instance must be selected");
      return;
    }

    void dispatch(
      deleteFlashcardThunk({
        session,
        queryEngine,
        solidMemoDataIri: currentInstance.iri,
        deckIri: card.isInDeck,
        flashcard: card,
      }),
    );
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
          <Button
            title={cardIri}
            onClick={tryDeleteFlashcard}
            variant={"destructive"}
          >
            Delete flashcard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
