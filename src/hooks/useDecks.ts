import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { useContext, useEffect, useState } from "react";
import { fetchDeck, type DeckData } from "./useDeck";

export function useDecks(deckIris: string[]) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const [decks, setDecks] = useState<DeckData[]>([]);

  useEffect(() => {
    const promises = deckIris.map((deckIri) =>
      fetchDeck(session, queryEngine, deckIri),
    );
    Promise.all(promises)
      .then((result) => setDecks(result.filter((r) => r !== undefined)))
      .catch((err) => console.log("Failed to fetch all decks", err));
  }, [deckIris]);

  return { decks };
}
