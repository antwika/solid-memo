import { Button } from "@src/ui";
import Layout from "@src/pages/layout";
import { QueryEngineContext } from "@src/providers/QueryEngineProvider";
import { SessionContext } from "@src/providers/SessionProvider";
import { fetchDecksThunk, selectDecks } from "@src/redux/features/decks.slice";
import { fetchFlashcardsThunk } from "@src/redux/features/flashcards.slice";
import { selectCurrentInstance } from "@src/redux/features/solidMemoData.slice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { createDeck } from "@src/services/solid.service";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function InstancePage() {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const decks = useAppSelector(selectDecks);
  const currentInstance = useAppSelector(selectCurrentInstance);

  useEffect(() => {
    if (!currentInstance) return;

    void dispatch(
      fetchDecksThunk({
        session,
        queryEngine,
        solidMemoDataIri: currentInstance,
      }),
    );
    void dispatch(
      fetchFlashcardsThunk({
        session,
        queryEngine,
        solidMemoDataIri: currentInstance,
      }),
    );
  }, [session, queryEngine, currentInstance, dispatch]);

  if (!currentInstance) {
    return <div>No solid memo instance selected!</div>;
  }

  const tryCreateDeck = async () => {
    if (!currentInstance) {
      console.error("An instance must be selected");
      return;
    }

    await createDeck(session, queryEngine, currentInstance, {
      version: "1",
      name: "A new deck",
      hasCard: [],
      isInSolidMemoDataInstance: currentInstance,
    });
  };

  return (
    <Layout>
      <div>Choose deck:</div>
      <div>Current instance: {currentInstance}</div>
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
