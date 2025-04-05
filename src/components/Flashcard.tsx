import { useCard } from "@src/hooks/useCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@src/lib/utils";
import type { ClassValue } from "clsx";
import { Button } from "./ui";
import { useContext } from "react";
import { SessionContext } from "@src/providers/SessionProvider";
import { SolidMemoDataContext } from "@src/providers/SolidMemoDataProvider";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { deleteFlashcard } from "@src/services/solid.service";

type Props = {
  className?: ClassValue;
  cardIri: string;
};

export function Flashcard({ className, cardIri }: Props) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const { solidMemoData } = useContext(SolidMemoDataContext);
  const { card } = useCard(cardIri);

  if (!card) {
    return <div>Loading flashcard...</div>;
  }

  const tryDeleteFlashcard = async () => {
    if (!solidMemoData) {
      console.error("An instance must be selected");
      return;
    }

    await deleteFlashcard(session, queryEngine, solidMemoData.iri, cardIri);
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
