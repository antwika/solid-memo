import type { QueryEngine } from "@comunica/query-sparql-solid";
import type { Session } from "@inrupt/solid-client-authn-browser";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { useContext, useEffect, useState } from "react";

export type CardData = {
  front: string;
  back: string;
};

export const fetchCard = async (
  session: Session,
  queryEngine: QueryEngine,
  cardIri: string,
) => {
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
  const cards = bindings.reduce<CardData[]>((acc, binding) => {
    const front = binding.get("front");
    const back = binding.get("back");
    if (!front) return acc;
    if (!back) return acc;
    acc.push({ front: front.value, back: back.value });
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
};

export function useCard(cardIri: string) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const [card, setCard] = useState<CardData>();

  useEffect(() => {
    fetchCard(session, queryEngine, cardIri)
      .then((card) => setCard(card))
      .catch((err) => console.log("Failed to fetch card", err));
  }, [cardIri, session, queryEngine]);

  return { card };
}
