import { Button } from "@src/components/ui";
import Layout from "@src/pages/layout";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { SolidMemoDataContext } from "@src/providers/SolidMemoDataProvider";
import { fetchDecksThunk, selectDecks } from "@src/redux/features/decks.slice";
import { fetchFlashcardsThunk } from "@src/redux/features/flashcards.slice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { createDeck } from "@src/services/solid.service";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function InstancePage() {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const { solidMemoData } = useContext(SolidMemoDataContext);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const decks = useAppSelector(selectDecks);

  //const deps = [session, queryEngine, solidMemoData!.iri, dispatch];

  useEffect(() => {
    void dispatch(
      fetchDecksThunk({
        session,
        queryEngine,
        solidMemoDataIri: solidMemoData!.iri,
      }),
    );
    void dispatch(
      fetchFlashcardsThunk({
        session,
        queryEngine,
        solidMemoDataIri: solidMemoData!.iri,
      }),
    );
  }, [session, queryEngine, solidMemoData, dispatch]);

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
            Deck: {deck.name} ({deck.hasCard.length} cards)
          </Button>
        </div>
      ))}
    </Layout>
  );
}
