import { Button } from "@src/components/ui";
import { useDecks } from "@src/hooks/useDecks";
import { useIris } from "@src/hooks/useIris";
import Layout from "@src/pages/layout";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { SolidMemoDataContext } from "@src/providers/SolidMemoDataProvider";
import { createDeck } from "@src/services/solid.service";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function InstancePage() {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const { solidMemoData } = useContext(SolidMemoDataContext);

  const router = useRouter();

  const { iris } = useIris(
    solidMemoData?.iri,
    "http://antwika.com/ns/solid-memo#Deck",
  );

  const { decks } = useDecks(iris);

  if (!solidMemoData) {
    return <div>No solid memo instance selected!</div>;
  }

  const tryCreateDeck = async () => {
    if (!solidMemoData) {
      console.error("An instance must be selected");
      return;
    }

    await createDeck(session, queryEngine, solidMemoData.iri, {
      version: "1",
      name: "A new deck",
      hasCard: [],
    });
  };

  return (
    <Layout>
      <div>Version: {solidMemoData.version}</div>
      <div>Choose deck:</div>
      <Button onClick={tryCreateDeck}>Create new deck</Button>
      {decks.map((deck) => (
        <div key={deck.iri}>
          <Button
            onClick={() =>
              router.push(`/decks/${encodeURIComponent(deck.iri)}`)
            }
            title={deck.iri}
          >
            Deck: {deck.name}
          </Button>
        </div>
      ))}
    </Layout>
  );
}
