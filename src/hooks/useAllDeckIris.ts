import { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-browser";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { useContext, useEffect, useState } from "react";

async function fetchAllDeckIris(
  session: Session,
  queryEngine: QueryEngine,
  dataIri: string,
) {
  const bindingsStream = await queryEngine.queryBindings(
    `
    SELECT ?deckIri
    WHERE {
        ?deckIri <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#Deck> .
    } LIMIT 100`,
    {
      sources: [dataIri],
      fetch: session.fetch,
    },
  );
  const bindings = await bindingsStream.toArray();
  const deckIris = bindings.reduce<string[]>((acc, binding) => {
    const deckIri = binding.get("deckIri");
    if (!deckIri) return acc;
    acc.push(deckIri.value);
    return acc;
  }, []);

  return deckIris;
}

export function useAllDeckIris(dataIri: string) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const [deckIris, setDeckIris] = useState<string[]>([]);

  useEffect(() => {
    fetchAllDeckIris(session, queryEngine, dataIri)
      .then((deckIris) => setDeckIris(deckIris))
      .catch((err) => console.log("Failed to fetch deck iris", err));
  }, [dataIri]);

  return { deckIris };
}
