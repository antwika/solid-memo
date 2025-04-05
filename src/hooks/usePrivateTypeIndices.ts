import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-browser";
import { fetchAllPrivateTypeIndexIris } from "@src/services/solid.service";
import { useEffect, useState } from "react";

export function usePrivateTypeIndices(
  session: Session,
  queryEngine: QueryEngine,
) {
  const [privateTypeIndexIris, setPrivateTypeIndexIris] = useState<string[]>(
    [],
  );

  useEffect(() => {
    const webId = session.info.webId;
    if (webId) {
      fetchAllPrivateTypeIndexIris(session, queryEngine, webId)
        .then((iris) => setPrivateTypeIndexIris(iris))
        .catch((err) =>
          console.log("Failed to fetch private type index iris", err),
        );
    } else {
      setPrivateTypeIndexIris([]);
    }
  }, [session.info.webId, session, queryEngine]);

  return { privateTypeIndexIris };
}
