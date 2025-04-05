import type { FlashcardData } from "@src/domain/FlashcardData";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { fetchCard } from "@src/services/solid.service";
import { useContext, useEffect, useState } from "react";

export function useCard(cardIri: string) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const [card, setCard] = useState<FlashcardData>();

  useEffect(() => {
    fetchCard(session, queryEngine, cardIri)
      .then((card) => setCard(card))
      .catch((err) => console.log("Failed to fetch card", err));
  }, [cardIri, session, queryEngine]);

  return { card };
}
