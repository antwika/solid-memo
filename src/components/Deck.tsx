import { useDeck } from "@src/hooks/useDeck";
import { Flashcard } from "./Flashcard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@src/lib/utils";
import type { ClassValue } from "clsx";

type Props = {
  className?: ClassValue;
  deckIri: string;
};

export function Deck({ className, deckIri }: Props) {
  const { deck } = useDeck(deckIri);

  if (!deck) {
    return <div>Loading deck...</div>;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Deck: &quot;{deck.name}&quot;
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {deck.hasCard.map((hasCardIri) => (
            <Flashcard key={hasCardIri} cardIri={hasCardIri} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
