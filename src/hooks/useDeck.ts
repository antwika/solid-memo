import type { DeckData } from "@src/domain/DeckData";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { fetchDeck } from "@src/services/solid.service";
import { useContext, useEffect, useState } from "react";

export function useDeck(deckIri: string) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const [deck, setDeck] = useState<DeckData>();

  useEffect(() => {
    fetchDeck(session, queryEngine, deckIri)
      .then((deck) => setDeck(deck))
      .catch((err) => console.log("Failed to fetch deck", err));
  }, [deckIri, session, queryEngine]);

  return { deck };
}
