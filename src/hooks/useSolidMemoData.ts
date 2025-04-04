import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-browser";
import { usePrivateTypeIndices } from "./usePrivateTypeIndices";
import { useEffect, useState } from "react";

async function fetchSolidMemoDataIris(
  session: Session,
  queryEngine: QueryEngine,
  privateTypeIndex: string,
) {
  const bindingsStream = await queryEngine.queryBindings(
    `
        SELECT ?solidMemoDataIri
        WHERE {
            ?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/solid/terms#TypeRegistration> .
            ?s <http://www.w3.org/ns/solid/terms#forClass> <http://antwika.com/ns/solid-memo#SolidMemoData> .
            ?s <http://www.w3.org/ns/solid/terms#instance> ?solidMemoDataIri .
        } LIMIT 100`,
    {
      sources: [privateTypeIndex],
      fetch: session.fetch,
    },
  );
  const bindings = await bindingsStream.toArray();
  const solidMemoDataIris = bindings.reduce<string[]>((acc, binding) => {
    const solidMemoDataIri = binding.get("solidMemoDataIri");
    if (!solidMemoDataIri) return acc;
    acc.push(solidMemoDataIri.value);
    return acc;
  }, []);

  return solidMemoDataIris;
}

export function useSolidMemoData(session: Session, queryEngine: QueryEngine) {
  const { privateTypeIndexIris } = usePrivateTypeIndices(session, queryEngine);
  const [solidMemoDataIris, setSolidMemoDataIris] = useState<string[]>([]);

  useEffect(() => {
    const promises = privateTypeIndexIris.map((privateTypeIndex) => {
      return fetchSolidMemoDataIris(session, queryEngine, privateTypeIndex);
    });
    Promise.all(promises)
      .then((solidMemoDataIris) => {
        setSolidMemoDataIris(solidMemoDataIris.flat());
      })
      .catch((err) => console.log("Failed to fetch solid memo data iris", err));
  }, [privateTypeIndexIris]);

  return { solidMemoDataIris };
}
