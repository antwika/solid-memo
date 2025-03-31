import usePodUrls from "@src/hooks/usePodUrls";
import { useContext, useState } from "react";
import { SessionContext } from "@src/providers/SessionProvider";
import Layout from "@src/pages/layout";
import { Button } from "@src/components/ui";
import { QueryEngine } from "@comunica/query-sparql-solid";

const findPrivateTypeIndex = async (
  queryEngine: QueryEngine,
  webId: string,
  authenticatedFetch: typeof fetch,
) => {
  const quadStream = await queryEngine.queryQuads(
    `
      CONSTRUCT WHERE {
      ?s <http://www.w3.org/ns/solid/terms#privateTypeIndex> ?o
    } LIMIT 100`,
    {
      sources: [webId],
      fetch: authenticatedFetch,
    },
  );

  const quads = await quadStream.toArray();
  return quads.map((quad) => quad.object.value);
};

const findAllSeeAlso = async (
  queryEngine: QueryEngine,
  webId: string,
  authenticatedFetch: typeof fetch,
) => {
  const quadStream = await queryEngine.queryQuads(
    `
      CONSTRUCT WHERE {
      ?s <http://www.w3.org/2000/01/rdf-schema#seeAlso> ?o
    } LIMIT 100`,
    {
      sources: [webId],
      fetch: authenticatedFetch,
    },
  );

  const quads = await quadStream.toArray();
  return quads.map((quad) => quad.object.value);
};

const findSolidMemoDataInstance = async (
  queryEngine: QueryEngine,
  privateTypeIndex: string,
  authenticatedFetch: typeof fetch,
) => {
  const bindingsStream = await queryEngine.queryBindings(
    `
    SELECT ?solidMemoDataInstance
    WHERE {
      ?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/solid/terms#TypeRegistration> .
      ?s <http://www.w3.org/ns/solid/terms#forClass> <http://antwika.com/ns/solid-memo#SolidMemoData> .
      ?s <http://www.w3.org/ns/solid/terms#instance> ?solidMemoDataInstance
    } LIMIT 100`,
    {
      sources: [privateTypeIndex],
      fetch: authenticatedFetch,
    },
  );

  const bindings = await bindingsStream.toArray();
  return bindings.map((binding) => binding.get("solidMemoDataInstance")?.value);
};

const findAllSolidMemoDataInstances = async (
  queryEngine: QueryEngine,
  webId: string,
  authenticatedFetch: typeof fetch,
) => {
  console.log("Finding all seeAlso references in webid profile...");
  const seeAlsos = await findAllSeeAlso(queryEngine, webId, authenticatedFetch);

  console.log(
    "Following all seeAlso references found in webid profile to discover private type indices...",
  );
  const seeAlsoPrivateTypeIndices = (
    await Promise.all(
      seeAlsos.map((seeAlso) =>
        findPrivateTypeIndex(queryEngine, seeAlso, authenticatedFetch),
      ),
    )
  ).flat();

  console.log("Discover private type index in webid profile...");
  const privateTypeIndices = await findPrivateTypeIndex(
    queryEngine,
    webId,
    authenticatedFetch,
  );

  const allPrivateTypeIndices = [
    ...privateTypeIndices,
    ...seeAlsoPrivateTypeIndices,
  ];

  console.log(
    "Search all found type indices to discover Solid Memo type registrations...",
  );
  const solidMemoDataInstances = await Promise.all(
    allPrivateTypeIndices.map((privateTypeIndex) => {
      return findSolidMemoDataInstance(
        queryEngine,
        privateTypeIndex,
        authenticatedFetch,
      );
    }),
  );

  return solidMemoDataInstances.flat();
};

const findAllDecksOfSolidMemoInstance = async (
  queryEngine: QueryEngine,
  solidMemoDataInstance: string,
  authenticatedFetch: typeof fetch,
) => {
  console.log(
    `Find all decks in Solid Memo instance ${solidMemoDataInstance}...`,
  );
  const quadsStream = await queryEngine.queryQuads(
    `
      CONSTRUCT WHERE {
      ?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#Deck>
    } LIMIT 100`,
    {
      sources: [solidMemoDataInstance],
      fetch: authenticatedFetch,
    },
  );

  const quads = await quadsStream.toArray();
  return quads.map((quad) => {
    return quad.subject.value;
  });
};

const findAllCardsOfDeck = async (
  queryEngine: QueryEngine,
  deck: string,
  authenticatedFetch: typeof fetch,
) => {
  console.log(`Find all flashcards in deck ${deck}...`);
  const bindingsStream = await queryEngine.queryBindings(
    `
    SELECT ?cards
    WHERE {
      ?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://antwika.com/ns/solid-memo#Deck> .
      ?s <http://antwika.com/ns/solid-memo#hasCard> ?cards .
    } LIMIT 100`,
    {
      sources: [deck],
      fetch: authenticatedFetch,
    },
  );

  const bindings = await bindingsStream.toArray();
  return bindings.map((binding) => binding.get("cards")?.value);
};

const fetchAppStateFromPod = async (
  webId: string,
  authenticatedFetch: typeof fetch,
) => {
  const queryEngine = new QueryEngine();
  const solidMemoDataInstances = await findAllSolidMemoDataInstances(
    queryEngine,
    webId,
    authenticatedFetch,
  );
  const decks = (
    await Promise.all(
      solidMemoDataInstances
        .filter((solidMemoDataInstance) => solidMemoDataInstance !== undefined)
        .map((solidMemoDataInstance) => {
          return findAllDecksOfSolidMemoInstance(
            queryEngine,
            solidMemoDataInstance,
            authenticatedFetch,
          );
        }),
    )
  ).flat();

  const cards = (
    await Promise.all(
      decks.map((deck) => {
        return findAllCardsOfDeck(queryEngine, deck, authenticatedFetch);
      }),
    )
  )
    .flat()
    .filter((deck) => deck !== undefined);

  const appState: AppState = {
    decks,
    cards,
  };

  return appState;
};

type AppState = {
  decks: string[];
  cards: string[];
};

export default function Home() {
  const [appState, setAppState] = useState<AppState>({ decks: [], cards: [] });
  const { session, tryLogOut } = useContext(SessionContext);
  const { podUrls } = usePodUrls(session);

  const renderedPodUrls = podUrls.map((podUrl) => (
    <div key={podUrl} className="rounded-xl bg-white/10 p-4 text-white">
      Pod: <span className="text-[hsl(280,100%,70%)]">{podUrl}</span>
    </div>
  ));

  const renderedDecks = appState.decks.map((deck) => {
    return (
      <div key={deck} className="rounded-xl bg-white/10 p-4 text-white">
        Deck: <span className="text-[hsl(280,100%,70%)]">{deck}</span>
      </div>
    );
  });

  const renderedCards = appState.cards.map((card) => {
    return (
      <div key={card} className="rounded-xl bg-white/10 p-4 text-white">
        Card: <span className="text-[hsl(280,100%,70%)]">{card}</span>
      </div>
    );
  });

  return (
    <Layout>
      <Button onClick={tryLogOut}>
        Logged in as{" "}
        <span className="text-[hsl(280,100%,70%)]">{session.info.webId}</span>
      </Button>
      {renderedPodUrls}
      <Button
        onClick={() => {
          fetchAppStateFromPod(session.info.webId!, session.fetch)
            .then((appStateFromPod) => {
              console.info(
                "Successfully fetched Solid Memo state from pod, state:",
                appStateFromPod,
              );
              setAppState(appStateFromPod);
            })
            .catch((err) =>
              console.error("Failed to fetch app state from pod, error:", err),
            );
        }}
      >
        Discover all Solid Memo decks and cards via WebId
      </Button>
      {renderedDecks}
      {renderedCards}
    </Layout>
  );
}
