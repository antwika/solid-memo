import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { useContext, useEffect, useState } from "react";
import type { FlashcardData } from "@src/domain/FlashcardData";
import { fetchCard } from "@src/services/solid.service";

export function useCards(cardIris: string[]) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const [cards, setCards] = useState<FlashcardData[]>([]);

  useEffect(() => {
    const promises = cardIris.map((cardIri) =>
      fetchCard(session, queryEngine, cardIri),
    );
    Promise.all(promises)
      .then((result) => setCards(result.filter((r) => r !== undefined)))
      .catch((err) => console.log("Failed to fetch all cards", err));
  }, [cardIris, session, queryEngine]);

  return { cards };
}
