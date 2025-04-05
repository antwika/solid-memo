import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { fetchAllIriOfRdfType } from "@src/services/solid.service";
import { useContext, useEffect, useState } from "react";

export function useIris(sourceIri: string | undefined, rdfType: string) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const [iris, setIris] = useState<string[]>([]);

  useEffect(() => {
    if (!sourceIri) {
      setIris([]);
      return;
    }

    fetchAllIriOfRdfType(session, queryEngine, sourceIri, rdfType)
      .then((iris) => setIris(iris))
      .catch((err) => console.log("Failed to fetch iris", err));
  }, [sourceIri, session, queryEngine, rdfType]);

  return { iris };
}
