import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-browser";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { useContext, useEffect, useState } from "react";

export type DeckData = {
  iri: string;
  name: string;
  hasCard: string[];
};

async function fetchCardIris(
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

export function useDeck(deckIri: string) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const [deck, setDeck] = useState<DeckData>();

  useEffect(() => {
    fetchDeck(session, queryEngine, deckIri)
      .then((deck) => setDeck(deck))
      .catch((err) => console.log("Failed to fetch deck", err));
  }, [deckIri]);

  return { deck };
}
