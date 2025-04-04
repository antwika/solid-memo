import { useCard } from "@src/hooks/useCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@src/lib/utils";
import type { ClassValue } from "clsx";

type Props = {
  className?: ClassValue;
  cardIri: string;
};

export function Flashcard({ className, cardIri }: Props) {
  const { card } = useCard(cardIri);

  if (!card) {
    return <div>Loading flashcard...</div>;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Flashcard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div>Front: {card.front}</div>
          <div>Back: {card.back}</div>
        </CardContent>
      </Card>
    </div>
  );
}
