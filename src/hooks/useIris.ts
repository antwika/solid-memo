import { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-browser";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { useContext, useEffect, useState } from "react";

async function fetchIris(
  session: Session,
  queryEngine: QueryEngine,
  sourceIri: string,
  rdfType: string,
) {
  const bindingsStream = await queryEngine.queryBindings(
    `
    SELECT ?iri
    WHERE {
        ?iri <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <${rdfType}> .
    } LIMIT 100`,
    {
      sources: [sourceIri],
      fetch: session.fetch,
    },
  );
  const bindings = await bindingsStream.toArray();
  const iris = bindings.reduce<string[]>((acc, binding) => {
    const iri = binding.get("iri");
    if (!iri) return acc;
    acc.push(iri.value);
    return acc;
  }, []);

  return iris;
}

export function useIris(sourceIri: string | undefined, rdfType: string) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const [iris, setIris] = useState<string[]>([]);

  useEffect(() => {
    if (!sourceIri) {
      setIris([]);
      return;
    }

    fetchIris(session, queryEngine, sourceIri, rdfType)
      .then((iris) => setIris(iris))
      .catch((err) => console.log("Failed to fetch iris", err));
  }, [sourceIri]);

  return { iris };
}
