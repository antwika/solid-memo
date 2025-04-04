import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-browser";
import { useEffect, useState } from "react";

async function fetchSeeAlsoIris(
  session: Session,
  queryEngine: QueryEngine,
  webId: string,
) {
  const bindingsStream = await queryEngine.queryBindings(
    `
          SELECT ?seeAlsoIri
          WHERE {
              <${webId}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://xmlns.com/foaf/0.1/Agent> .
              <${webId}> <http://www.w3.org/2000/01/rdf-schema#seeAlso> ?seeAlsoIri .
          } LIMIT 100`,
    {
      sources: [webId],
      fetch: session.fetch,
    },
  );
  const bindings = await bindingsStream.toArray();
  const seeAlsoIris = bindings.reduce<string[]>((acc, binding) => {
    const seeAlsoIri = binding.get("seeAlsoIri");
    if (!seeAlsoIri) return acc;
    acc.push(seeAlsoIri.value);
    return acc;
  }, []);

  return seeAlsoIris;
}

async function fetchPrivateTypeIndexIris(
  session: Session,
  queryEngine: QueryEngine,
  webId: string,
) {
  const bindingsStream = await queryEngine.queryBindings(
    `
      SELECT ?privateTypeIndexIri
      WHERE {
          <${webId}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?o .
          <${webId}> <http://www.w3.org/ns/solid/terms#privateTypeIndex> ?privateTypeIndexIri .
      } LIMIT 100`,
    {
      sources: [webId],
      fetch: session.fetch,
    },
  );
  const bindings = await bindingsStream.toArray();
  const privateTypeIndexIris = bindings.reduce<string[]>((acc, binding) => {
    const privateTypeIndexIri = binding.get("privateTypeIndexIri");
    if (!privateTypeIndexIri) return acc;
    acc.push(privateTypeIndexIri.value);
    return acc;
  }, []);

  return privateTypeIndexIris;
}

async function fetchAllPrivateTypeIndexIris(
  session: Session,
  queryEngine: QueryEngine,
  webId: string,
) {
  const seeAlsoIris = await fetchSeeAlsoIris(session, queryEngine, webId);

  const promises = [
    fetchPrivateTypeIndexIris(session, queryEngine, webId),
    ...seeAlsoIris.map((seeAlsoIri) =>
      fetchPrivateTypeIndexIris(session, queryEngine, seeAlsoIri),
    ),
  ];

  const fetchAllPrivateTypeIndexIris = (await Promise.all(promises)).flat();

  return fetchAllPrivateTypeIndexIris;
}

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
