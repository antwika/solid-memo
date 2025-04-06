import { Flashcard } from "@components/index";
import { cn } from "@lib/utils";
import type { ClassValue } from "clsx";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@ui/index";
import { useContext, useEffect } from "react";
import { SessionContext, QueryEngineContext } from "@providers/index";
import {
  createFlashcardThunk,
  fetchFlashcardsThunk,
  selectFlashcardsByIris,
} from "@redux/features/flashcards.slice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { deleteDeckThunk, selectDeckByIri } from "@redux/features/decks.slice";
import {
  selectInstanceByIri,
  selectInstanceIri,
} from "@redux/features/instances.slice";
import { useRouter } from "next/router";

type Props = {
  className?: ClassValue;
  deckIri: string;
};

export function Deck({ className, deckIri }: Props) {
  const { session } = useContext(SessionContext);
  const { queryEngine } = useContext(QueryEngineContext);
  const deck = useAppSelector((state) => selectDeckByIri(state, deckIri));
  const flashcards = useAppSelector((state) =>
    selectFlashcardsByIris(state, deck?.hasCard ?? []),
  );
  const currentInstanceIri = useAppSelector(selectInstanceIri);
  const currentInstance = useAppSelector((state) =>
    selectInstanceByIri(state, currentInstanceIri),
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!currentInstance) {
      return;
    }

    if (!deck) {
      return;
    }

    void dispatch(
      fetchFlashcardsThunk({
        session,
        queryEngine,
        flashcardIris: deck.hasCard,
      }),
    );
  }, [currentInstance, dispatch, session, queryEngine, deck]);

  if (!deck) {
    return <div>Loading deck...</div>;
  }

  const tryCreateFlashcard = async () => {
    if (!currentInstance) {
      console.error("An instance must be selected");
      return;
    }

    await dispatch(
      createFlashcardThunk({
        session,
        queryEngine,
        solidMemoDataIri: currentInstance.iri,
        deckIri,
        flashcard: {
          version: "1",
          front: "New front",
          back: "New back",
          isInDeck: deckIri,
        },
      }),
    );
  };

  const tryDeleteDeck = async () => {
    if (!currentInstance) {
      console.error("An instance must be selected");
      return;
    }

    await dispatch(
      deleteDeckThunk({
        session,
        queryEngine,
        solidMemoDataIri: currentInstance.iri,
        deck,
      }),
    );
    await router.push(`/instances/${encodeURIComponent(currentInstance.iri)}`);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Deck: &quot;{deck.name}&quot;
          </CardTitle>
          <div>Version: {deck.version}</div>
          <div>
            <Button
              title={deckIri}
              onClick={tryDeleteDeck}
              variant={"destructive"}
            >
              Delete this deck
            </Button>
          </div>
          <div>
            <Button onClick={tryCreateFlashcard}>Create new flashcard</Button>
          </div>
        </CardHeader>
        <CardContent className="xs:grid-cols-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.values(flashcards).map((flashcard) => (
            <Flashcard key={flashcard.iri} cardIri={flashcard.iri} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
