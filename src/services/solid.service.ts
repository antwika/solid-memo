import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-browser";
import type { DeckModel, FlashcardModel, InstanceModel } from "@domain/index";
import { v4 as uuid } from "uuid";

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
      SELECT ?subject ?version ?name ?hasDeck
      WHERE {
        ?subject <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#SolidMemoData> .
        ?subject <http://antwika.com/ns/solid-memo#version> ?version .
        ?subject <http://antwika.com/ns/solid-memo#name> ?name .
        OPTIONAL {
          ?subject <http://antwika.com/ns/solid-memo#hasDeck> ?hasDeck .
        }
      }
      LIMIT 100`,
    {
      sources: [solidMemoDataInstanceIri],
      fetch: session.fetch,
    },
  );
  const bindings = await bindingsStream.toArray();

  const instances = bindings.reduce<Record<string, InstanceModel>>(
    (acc, binding) => {
      const subject = binding.get("subject");
      const version = binding.get("version");
      const name = binding.get("name");
      const hasDeck = binding.get("hasDeck");

      if (!subject) return acc;
      if (!version) return acc;
      if (!name) return acc;
      if (!hasDeck) return acc;

      acc[subject.value] ??= {
        iri: solidMemoDataInstanceIri,
        version: version.value,
        name: name.value,
        hasDeck: [],
      };

      const entry = acc[subject.value];

      if (entry) {
        if (!entry.hasDeck.includes(hasDeck.value)) {
          entry.hasDeck.push(hasDeck.value);
        }
      }

      return acc;
    },
    {},
  );

  return instances;
}

export async function createFlashcard(
  session: Session,
  queryEngine: QueryEngine,
  solidMemoDataIri: string,
  deckIri: string,
  flashcard: Omit<FlashcardModel, "iri">,
) {
  if (!queryEngine) return;

  const iri = `${solidMemoDataIri}#${uuid().toString()}`;

  const query = `
    INSERT DATA
    { 
      <${deckIri}> <http://antwika.com/ns/solid-memo#hasCard> <${iri}> .
      <${iri}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#Flashcard> .
      <${iri}> <http://antwika.com/ns/solid-memo#version> '${flashcard.version}' .
      <${iri}> <http://antwika.com/ns/solid-memo#isInDeck> <${deckIri}> .
      <${iri}> <http://antwika.com/ns/solid-memo#front> '${flashcard.front}' .
      <${iri}> <http://antwika.com/ns/solid-memo#back> '${flashcard.back}' .
    }
  `;

  await queryEngine.queryVoid(query, {
    sources: [solidMemoDataIri],
    fetch: session.fetch,
  });

  const createdFlashcard: FlashcardModel = {
    iri,
    version: flashcard.version,
    front: flashcard.front,
    back: flashcard.back,
    isInDeck: flashcard.isInDeck,
  };

  return createdFlashcard;
}

export async function deleteFlashcard(
  session: Session,
  queryEngine: QueryEngine,
  solidMemoDataIri: string,
  cardIri: string,
) {
  if (!queryEngine) return;

  const query = `
    DELETE {
      ?s <http://antwika.com/ns/solid-memo#hasCard> <${cardIri}> .
      <${cardIri}> ?p ?o .
    }
    WHERE {
      ?s <http://antwika.com/ns/solid-memo#hasCard> <${cardIri}> .
      <${cardIri}> ?p ?o .
    }
  `;

  await queryEngine.queryVoid(query, {
    sources: [solidMemoDataIri],
    fetch: session.fetch,
  });

  return;
}

export async function fetchCard(
  session: Session,
  queryEngine: QueryEngine,
  cardIri: string,
) {
  if (!queryEngine) return;

  const bindingsStream = await queryEngine.queryBindings(
    `
        SELECT ?version ?front ?back ?isInDeck
        WHERE {
            <${cardIri}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#Flashcard> .
            <${cardIri}> <http://antwika.com/ns/solid-memo#version> ?version .
            <${cardIri}> <http://antwika.com/ns/solid-memo#front> ?front .
            <${cardIri}> <http://antwika.com/ns/solid-memo#back> ?back .
            <${cardIri}> <http://antwika.com/ns/solid-memo#isInDeck> ?isInDeck .
        } LIMIT 100`,
    {
      sources: [cardIri],
      fetch: session.fetch,
    },
  );

  const bindings = await bindingsStream.toArray();
  const cards = bindings.reduce<FlashcardModel[]>((acc, binding) => {
    const version = binding.get("version");
    const front = binding.get("front");
    const back = binding.get("back");
    const isInDeck = binding.get("isInDeck");
    if (!version) return acc;
    if (!front) return acc;
    if (!back) return acc;
    if (!isInDeck) return acc;
    acc.push({
      iri: cardIri,
      version: version.value,
      front: front.value,
      back: back.value,
      isInDeck: isInDeck.value,
    });
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

export async function createDeck(
  session: Session,
  queryEngine: QueryEngine,
  solidMemoDataIri: string,
  deck: Omit<DeckModel, "iri">,
) {
  if (!queryEngine) return;

  const iri = `${solidMemoDataIri}#${uuid().toString()}`;

  const query = `
    INSERT DATA
    {
      <${iri}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#Deck> .
      <${iri}> <http://antwika.com/ns/solid-memo#version> '${deck.version}' .
      <${iri}> <http://antwika.com/ns/solid-memo#name> '${deck.name}' .
    }
  `;

  await queryEngine.queryVoid(query, {
    sources: [solidMemoDataIri],
    fetch: session.fetch,
  });

  const createdDeck: DeckModel = {
    iri,
    version: deck.version,
    name: deck.name,
    hasCard: [],
    isInSolidMemoDataInstance: solidMemoDataIri,
  };

  return createdDeck;
}

export async function deleteDeck(
  session: Session,
  queryEngine: QueryEngine,
  solidMemoDataIri: string,
  deckIri: string,
) {
  if (!queryEngine) return;

  const query = `
    DELETE {
      <${deckIri}> ?p ?o .
    }
    WHERE {
      <${deckIri}> ?p ?o .
    }
  `;

  await queryEngine.queryVoid(query, {
    sources: [solidMemoDataIri],
    fetch: session.fetch,
  });

  return;
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
        SELECT ?version ?name ?isInSolidMemoDataInstance
        WHERE {
            <${deckIri}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#Deck> .
            <${deckIri}> <http://antwika.com/ns/solid-memo#version> ?version .
            <${deckIri}> <http://antwika.com/ns/solid-memo#name> ?name .
            <${deckIri}> <http://antwika.com/ns/solid-memo#isInSolidMemoDataInstance> ?isInSolidMemoDataInstance .
        } LIMIT 100`,
    {
      sources: [deckIri],
      fetch: session.fetch,
    },
  );

  const bindings = await bindingsStream.toArray();
  const decks = bindings.reduce<DeckModel[]>((acc, binding) => {
    const version = binding.get("version");
    const name = binding.get("name");
    const isInSolidMemoDataInstance = binding.get("isInSolidMemoDataInstance");

    if (!version) return acc;
    if (!name) return acc;
    if (!isInSolidMemoDataInstance) return acc;

    acc.push({
      iri: deckIri,
      version: version.value,
      name: name.value,
      hasCard: cardIris,
      isInSolidMemoDataInstance: isInSolidMemoDataInstance.value,
    });
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
