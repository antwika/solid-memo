import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { DeckData } from "@src/domain/DeckData";
import type { FlashcardData } from "@src/domain/FlashcardData";
import type { SolidMemoData } from "@src/domain/SolidMemoData";

export async function fetchSolidMemoDataInstances(
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

  console.log("solidMemoDataIris", solidMemoDataIris);

  const promises = solidMemoDataIris.map((iri) => {
    return fetchSolidMemoDataInstance(session, queryEngine, iri);
  });

  const solidMemoDataInstances = (await Promise.all(promises)).filter(
    (solidMemoDataInstance) => solidMemoDataInstance !== undefined,
  );

  return solidMemoDataInstances;
}

export async function fetchSolidMemoDataInstance(
  session: Session,
  queryEngine: QueryEngine,
  solidMemoDataInstanceIri: string,
) {
  const bindingsStream = await queryEngine.queryBindings(
    `
        SELECT ?iri ?name
        WHERE {
            <${solidMemoDataInstanceIri}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#SolidMemoData> .
            <${solidMemoDataInstanceIri}> <http://antwika.com/ns/solid-memo#name> ?name .
        } LIMIT 100`,
    {
      sources: [solidMemoDataInstanceIri],
      fetch: session.fetch,
    },
  );
  const bindings = await bindingsStream.toArray();
  const solidMemoDataInstances = bindings.reduce<SolidMemoData[]>(
    (acc, binding) => {
      const solidMemoDataInstanceName = binding.get("name");
      if (!solidMemoDataInstanceName) return acc;
      acc.push({
        iri: solidMemoDataInstanceIri,
        name: solidMemoDataInstanceName.value,
      });
      return acc;
    },
    [],
  );

  if (solidMemoDataInstances.length > 1) {
    throw new Error("Too many cards found for a single iri");
  }

  if (solidMemoDataInstances.length === 1) {
    return solidMemoDataInstances[0];
  } else {
    return undefined;
  }
}

export async function fetchCard(
  session: Session,
  queryEngine: QueryEngine,
  cardIri: string,
) {
  if (!queryEngine) return;

  const bindingsStream = await queryEngine.queryBindings(
    `
        SELECT ?front ?back
        WHERE {
            <${cardIri}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#Flashcard> .
            <${cardIri}> <http://antwika.com/ns/solid-memo#front> ?front .
            <${cardIri}> <http://antwika.com/ns/solid-memo#back> ?back .
        } LIMIT 100`,
    {
      sources: [cardIri],
      fetch: session.fetch,
    },
  );

  const bindings = await bindingsStream.toArray();
  const cards = bindings.reduce<FlashcardData[]>((acc, binding) => {
    const front = binding.get("front");
    const back = binding.get("back");
    if (!front) return acc;
    if (!back) return acc;
    acc.push({ iri: cardIri, front: front.value, back: back.value });
    return acc;
  }, []);

  if (cards.length > 1) {
    throw new Error("Too many cards found for a single iri");
  }

  if (cards.length === 1) {
    return cards[0];
  } else {
    return undefined;
  }
}

export async function fetchCardIris(
  session: Session,
  queryEngine: QueryEngine,
  deckIri: string,
) {
  const bindingsStream = await queryEngine.queryBindings(
    `
    SELECT ?hasCard
    WHERE {
        <${deckIri}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#Deck> .
        <${deckIri}> <http://antwika.com/ns/solid-memo#hasCard> ?hasCard .
    } LIMIT 100`,
    {
      sources: [deckIri],
      fetch: session.fetch,
    },
  );
  const bindings = await bindingsStream.toArray();
  const cardIris = bindings.reduce<string[]>((acc, binding) => {
    const hasCard = binding.get("hasCard");
    if (!hasCard) return acc;
    acc.push(hasCard.value);
    return acc;
  }, []);

  return cardIris;
}

export async function fetchAllDeckIris(
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

export const fetchDeck = async (
  session: Session,
  queryEngine: QueryEngine,
  deckIri: string,
) => {
  if (!queryEngine) return;

  const cardIris = await fetchCardIris(session, queryEngine, deckIri);

  const bindingsStream = await queryEngine.queryBindings(
    `
        SELECT ?name
        WHERE {
            <${deckIri}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#Deck> .
            <${deckIri}> <http://antwika.com/ns/solid-memo#name> ?name .
        } LIMIT 100`,
    {
      sources: [deckIri],
      fetch: session.fetch,
    },
  );

  const bindings = await bindingsStream.toArray();
  const decks = bindings.reduce<DeckData[]>((acc, binding) => {
    const name = binding.get("name");
    if (!name) return acc;
    acc.push({ iri: deckIri, name: name.value, hasCard: cardIris });
    return acc;
  }, []);

  if (decks.length > 1) {
    throw new Error("Too many decks found for a single iri");
  }

  if (decks.length === 1) {
    return decks[0];
  } else {
    return undefined;
  }
};

export async function fetchPrivateTypeIndexIris(
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

export async function fetchSeeAlsoIris(
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

export async function fetchAllPrivateTypeIndexIris(
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

export async function fetchAllIriOfRdfType(
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
