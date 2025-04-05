import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { fetchAllDeckIris } from "@src/services/solid.service";
import { useContext, useEffect, useState } from "react";

export function useAllDeckIris(dataIri: string) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const [deckIris, setDeckIris] = useState<string[]>([]);

  useEffect(() => {
    fetchAllDeckIris(session, queryEngine, dataIri)
      .then((deckIris) => setDeckIris(deckIris))
      .catch((err) => console.log("Failed to fetch deck iris", err));
  }, [dataIri, session, queryEngine]);

  return { deckIris };
}
