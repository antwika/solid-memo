import { Button } from "@ui/index";
import Layout from "@pages/layout";
import { QueryEngineContext, SessionContext } from "@providers/index";
import {
  createDeckThunk,
  fetchDecksThunk,
  selectDecks,
} from "@redux/features/decks.slice";
import {
  selectInstanceByIri,
  selectInstanceIri,
} from "@redux/features/instances.slice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function InstancePage() {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const decks = useAppSelector(selectDecks);
  const currentInstanceIri = useAppSelector(selectInstanceIri);
  const currentInstance = useAppSelector((state) =>
    selectInstanceByIri(state, currentInstanceIri),
  );

  useEffect(() => {
    if (!currentInstance) return;

    void dispatch(
      fetchDecksThunk({
        session,
        queryEngine,
        solidMemoDataIri: currentInstance.iri,
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

    void dispatch(
      createDeckThunk({
        session,
        queryEngine,
        solidMemoDataIri: currentInstance.iri,
        deck: {
          version: "1",
          name: "A new deck",
          hasCard: [],
          isInSolidMemoDataInstance: currentInstance.iri,
        },
      }),
    );
  };

  return (
    <Layout>
      <div>Choose deck:</div>
      <Button onClick={tryCreateDeck}>Create new deck</Button>
      {Object.values(decks).map((deck) => (
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
