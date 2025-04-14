import type { DeckModel } from "@domain/deck.model";
import type { FlashcardModel } from "@domain/flashcard.model";
import type { InstanceModel } from "@domain/instance.model";
import { SessionContext } from "@providers/index";
import { Button } from "@ui/button.ui";
import { Card } from "@ui/card.ui";
import { useContext, useState } from "react";
import { SolidRepository } from "src/repositories/index";
import { Database, Layers, StickyNote } from "lucide-react";

const solidRepository = new SolidRepository();

export default function TestPage() {
  const { session } = useContext(SessionContext);

  const [instanceUrls, setInstanceUrls] = useState<string[]>([]);
  const [deckUrls, setDeckUrls] = useState<string[]>([]);
  const [flashcardUrls, setFlashcardUrls] = useState<string[]>([]);
  const [instances, setInstances] = useState<Record<string, InstanceModel>>({});
  const [decks, setDecks] = useState<Record<string, DeckModel>>({});
  const [flashcards, setFlashcards] = useState<Record<string, FlashcardModel>>(
    {},
  );

  const [viewUrl, setViewUrl] = useState<string>();
  const viewInstance = instances[viewUrl!];
  const viewDeck = decks[viewUrl!];
  const viewFlashcard = flashcards[viewUrl!];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row items-center gap-2">
        <Button
          onClick={() => {
            solidRepository
              .findAllInstanceUrls(session)
              .then((instanceUrls) => {
                setInstanceUrls(instanceUrls);
                return solidRepository.findAllDeckUrls(session, instanceUrls);
              })
              .then((deckUrls) => {
                setDeckUrls(deckUrls);
                return solidRepository.findAllFlashcardUrls(session, deckUrls);
              })
              .then((flashcardUrls) => {
                setFlashcardUrls(flashcardUrls);
              })
              .catch((err) => {
                console.log("Failed with error:", err);
              });
          }}
        >
          Discover everything!
        </Button>
        <Button
          onClick={() => {
            solidRepository
              .findAllInstanceUrls(session)
              .then((instanceUrls) => setInstanceUrls(instanceUrls))
              .catch((err) => {
                console.log("Failed with error:", err);
              });
          }}
        >
          Fetch all instances
        </Button>
        <Button
          onClick={() => {
            solidRepository
              .findAllStorageIris(session)
              .then((storageIris) => {
                console.log("Storage iris:", storageIris);
                if (storageIris.length === 0)
                  throw new Error("No storage iris found");
                if (storageIris.length > 1)
                  throw new Error("Too many storage iris found");

                const storageIri = storageIris[0];

                if (!storageIri) throw new Error("Failed to pick storage iri");

                return solidRepository.createInstance(session, storageIri);
              })
              .then(() => {
                return solidRepository.findAllInstanceUrls(session);
              })
              .then((instanceUrls) => {
                setInstanceUrls(instanceUrls);
                return solidRepository.findInstances(session, instanceUrls);
              })
              .then((instances) => {
                setViewUrl(undefined);
                setInstances(instances);
              })
              .catch((err) => {
                console.log("Failed with error:", err);
              });
          }}
        >
          Create new instance
        </Button>
      </div>
      <Card className="p-2">
        <div>
          <strong>Known urls:</strong>
        </div>
        {instanceUrls.map((instanceUrl) => (
          <div key={instanceUrl} className="flex items-center gap-2">
            <Database />
            Instance: {instanceUrl}{" "}
            <Button
              size={"sm"}
              onClick={() => {
                solidRepository
                  .findInstances(session, [instanceUrl])
                  .then((instances) => {
                    console.log("Looking for instanceUrl:", instanceUrl);
                    console.log("Found instances:", instances);
                    setInstances(instances);
                    setDeckUrls(instances[instanceUrl]?.hasDeck ?? []);
                    setViewUrl(instances[instanceUrl]?.iri);
                  })
                  .catch((err) => {
                    console.log("Failed with error:", err);
                  });
              }}
            >
              View
            </Button>
          </div>
        ))}
        {deckUrls.map((deckUrl) => (
          <div key={deckUrl} className="flex items-center gap-2">
            <Layers />
            Deck: {deckUrl}{" "}
            <Button
              size={"sm"}
              onClick={() => {
                solidRepository
                  .findDecks(session, [deckUrl])
                  .then((decks) => {
                    console.log("Found decks:", decks);
                    setDecks(decks);
                    setFlashcardUrls(decks[deckUrl]?.hasCard ?? []);
                    setViewUrl(decks[deckUrl]?.iri);
                  })
                  .catch((err) => {
                    console.log("Failed with error:", err);
                  });
              }}
            >
              View
            </Button>
          </div>
        ))}
        {flashcardUrls.map((flashcardUrl) => (
          <div key={flashcardUrl} className="flex items-center gap-2">
            <StickyNote />
            Flashcard: {flashcardUrl}{" "}
            <Button
              size={"sm"}
              onClick={() => {
                solidRepository
                  .findFlashcards(session, [flashcardUrl])
                  .then((flashcards) => {
                    console.log(
                      "Find flashcards:",
                      flashcards,
                      ", view ",
                      flashcardUrl,
                    );
                    setFlashcards(flashcards);
                    setViewUrl(flashcardUrl);
                  })
                  .catch((err) => {
                    console.log("Failed with error:", err);
                  });
              }}
            >
              View
            </Button>
          </div>
        ))}
      </Card>
      {viewInstance && (
        <Card className="p-2">
          <div className="space-x-2">
            <div className="flex gap-1">
              <Database />
              <strong>Instance</strong>
            </div>
            <div>Iri: {viewInstance.iri}</div>
            <div>Version: {viewInstance.version}</div>
            <div>Name: {viewInstance.name}</div>
            <div>Has deck: {viewInstance.hasDeck}</div>
            <Button
              variant={"destructive"}
              onClick={() => {
                solidRepository
                  .deleteInstance(session, viewInstance)
                  .then(() => {
                    return solidRepository.findAllInstanceUrls(session);
                  })
                  .then((instanceUrls) => {
                    setInstanceUrls(instanceUrls);
                    return solidRepository.findInstances(session, instanceUrls);
                  })
                  .then((instances) => {
                    setViewUrl(undefined);
                    setInstances(instances);
                  })
                  .catch((err) => {
                    console.log("Failed with error:", err);
                  });
              }}
            >
              Delete instance
            </Button>
            <Button
              onClick={() => {
                solidRepository
                  .createDeck(session, viewInstance.iri, {
                    version: "1",
                    name: "New deck name",
                    isInSolidMemoDataInstance: viewInstance.iri,
                    hasCard: [],
                  })
                  .then((decks) => {
                    setDeckUrls(Object.keys(decks));
                    setDecks(decks);
                  })
                  .catch((err) => {
                    console.log("Failed with error:", err);
                  });
              }}
            >
              Create deck
            </Button>
          </div>
        </Card>
      )}
      {viewDeck && (
        <Card className="p-2">
          <div className="space-x-2">
            <div className="flex gap-1">
              <Layers />
              <strong>Deck</strong>
            </div>
            <div>Iri: {viewDeck.iri}</div>
            <div>Version: {viewDeck.version}</div>
            <div>Name: {viewDeck.name}</div>
            <div>
              Is in Solid Memo data instance:{" "}
              {viewDeck.isInSolidMemoDataInstance}
            </div>
            <div>Has card: {viewDeck.hasCard}</div>
            <Button
              variant={"destructive"}
              onClick={() => {
                solidRepository
                  .deleteDeck(session, viewDeck)
                  .then(() => {
                    return solidRepository.findAllInstanceUrls(session);
                  })
                  .then((instanceUrls) => {
                    return solidRepository.findInstances(session, instanceUrls);
                  })
                  .then((instances) => {
                    setInstances(instances);
                    return solidRepository.findAllDeckUrls(session, [
                      viewDeck.isInSolidMemoDataInstance,
                    ]);
                  })
                  .then((deckUrls) => {
                    return solidRepository.findDecks(session, deckUrls);
                  })
                  .then((decks) => {
                    setViewUrl(viewDeck.isInSolidMemoDataInstance);
                    setDeckUrls(Object.keys(decks));
                    setDecks(decks);
                  })
                  .catch((err) => {
                    console.log("Failed with error:", err);
                  });
              }}
            >
              Delete deck
            </Button>
            <Button
              onClick={() => {
                solidRepository
                  .createFlashcard(
                    session,
                    viewDeck.isInSolidMemoDataInstance,
                    viewDeck.iri,
                    {
                      version: "1",
                      front: "Front",
                      back: "Back",
                      isInDeck: viewDeck.iri,
                    },
                  )
                  .then(() => {
                    return solidRepository.findDecks(session, [viewDeck.iri]);
                  })
                  .then((decks) => {
                    setDecks(decks);
                    setFlashcardUrls(decks[viewDeck.iri]?.hasCard ?? []);
                    setViewUrl(decks[viewDeck.iri]?.iri);
                  })
                  .catch((err) => {
                    console.log("Failed with error:", err);
                  });
              }}
            >
              Create flashcard
            </Button>
          </div>
        </Card>
      )}
      {viewFlashcard && (
        <Card className="p-2">
          <div className="space-x-2">
            <div className="flex gap-1">
              <StickyNote />
              <strong>Flashcard</strong>
            </div>
            <div>Iri: {viewFlashcard.iri}</div>
            <div>Version: {viewFlashcard.version}</div>
            <div>Front: {viewFlashcard.front}</div>
            <div>Back: {viewFlashcard.back}</div>
            <div>Is in deck: {viewFlashcard.isInDeck}</div>
            <Button
              variant={"destructive"}
              onClick={() => {
                solidRepository
                  .deleteFlashcard(session, viewFlashcard)
                  .then(() => {
                    return solidRepository.findDecks(session, [
                      viewFlashcard.isInDeck,
                    ]);
                  })
                  .then((decks) => {
                    setDeckUrls(Object.keys(decks));
                    setDecks(decks);
                    return solidRepository.findAllFlashcardUrls(session, [
                      viewFlashcard.isInDeck,
                    ]);
                  })
                  .then((flashcardUrls) => {
                    return solidRepository.findFlashcards(
                      session,
                      flashcardUrls,
                    );
                  })
                  .then((flashcards) => {
                    setViewUrl(viewFlashcard.isInDeck);
                    setFlashcardUrls(Object.keys(flashcards));
                    setFlashcards(flashcards);
                  })
                  .catch((err) => {
                    console.log("Failed with error:", err);
                  });
              }}
            >
              Delete flashcard
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
