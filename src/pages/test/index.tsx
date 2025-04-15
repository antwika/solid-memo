import type { DeckModel } from "@domain/deck.model";
import type { FlashcardModel } from "@domain/flashcard.model";
import type { InstanceModel } from "@domain/instance.model";
import { Button } from "@ui/button.ui";
import { Card } from "@ui/card.ui";
import { useContext, useState } from "react";
import { Database, Layers, StickyNote } from "lucide-react";
import { RepositoryContext } from "@providers/repository.provider";
import { ServiceContext } from "@providers/service.provider";
import Layout from "@pages/layout";

function preferFragment(iri: string) {
  return iri.split("#")[1] ?? iri;
}

type AppState = {
  instanceUrls: string[];
  deckUrls: string[];
  flashcardUrls: string[];
  instances: Record<string, InstanceModel>;
  decks: Record<string, DeckModel>;
  flashcards: Record<string, FlashcardModel>;
};

export default function TestPage() {
  const { getRepository } = useContext(RepositoryContext);
  const { getService } = useContext(ServiceContext);

  const repository = getRepository();
  const service = getService();

  const [appState, setAppState] = useState<AppState>({
    instanceUrls: [],
    deckUrls: [],
    flashcardUrls: [],
    instances: {},
    decks: {},
    flashcards: {},
  });

  const [viewUrl, setViewUrl] = useState<string>();

  const {
    instanceUrls,
    deckUrls,
    flashcardUrls,
    instances,
    decks,
    flashcards,
  } = appState;

  const viewInstance = instances[viewUrl!];
  const viewDeck = decks[viewUrl!];
  const viewFlashcard = flashcards[viewUrl!];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => {
              service
                .discoverEverything(repository)
                .then(({ instanceUrls, deckUrls, flashcardUrls }) => {
                  setAppState({
                    ...appState,
                    instanceUrls,
                    deckUrls,
                    flashcardUrls,
                  });
                })
                .catch((err) => {
                  console.error("Failed with error:", err);
                });
            }}
          >
            Discover everything!
          </Button>
          <Button
            onClick={() => {
              service
                .discoverInstanceUrls(repository)
                .then((instanceUrls) => {
                  setAppState({ ...appState, instanceUrls });
                })
                .catch((err) => {
                  console.error("Failed with error:", err);
                });
            }}
          >
            Fetch all instances
          </Button>
          <Button
            onClick={() => {
              service
                .newInstance(repository)
                .then(({ instanceUrls, instances }) => {
                  setAppState({ ...appState, instanceUrls, instances });
                  setViewUrl(undefined);
                })
                .catch((err) => {
                  console.error("Failed with error:", err);
                });
            }}
          >
            Create new instance
          </Button>
        </div>
        <Card className="p-2">
          <div>
            <strong>Discovered:</strong>
          </div>
          {instanceUrls.map((instanceUrl) => (
            <div key={instanceUrl} className="items-center gap-2">
              <div className="flex gap-2">
                <div title="Instance">
                  <Database />
                </div>
                <div className="flex grow-1 break-all gap-1">
                  <span title={instanceUrl}>
                    <strong>{preferFragment(instanceUrl)}</strong> (Instance)
                  </span>
                </div>
                <div>
                  <Button
                    size={"sm"}
                    onClick={() => {
                      service
                        .getInstance(repository, instanceUrl)
                        .then((instances) => {
                          const updatedDeckUrls = [
                            ...new Set([
                              ...appState.deckUrls,
                              ...(instances[instanceUrl]?.hasDeck ?? []),
                            ]),
                          ];

                          const combinedInstances = {
                            ...appState.instances,
                            ...instances,
                          };

                          setAppState({
                            ...appState,
                            instances: combinedInstances,
                            deckUrls: updatedDeckUrls,
                          });
                          setViewUrl(instances[instanceUrl]?.iri);
                        })
                        .catch((err) => {
                          console.error("Failed with error:", err);
                        });
                    }}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {deckUrls.map((deckUrl) => (
            <div key={deckUrl} className="items-center gap-2">
              <div className="flex gap-2">
                <div title="Deck">
                  <Layers />
                </div>
                <div className="flex grow-1 break-all gap-1">
                  <span title={deckUrl}>
                    <strong>{preferFragment(deckUrl)}</strong> (Deck)
                  </span>
                </div>
                <div>
                  <Button
                    size={"sm"}
                    onClick={() => {
                      service
                        .getDeck(repository, deckUrl)
                        .then((decks) => {
                          const updatedFlashcardUrls = [
                            ...new Set([
                              ...appState.flashcardUrls,
                              ...(decks[deckUrl]?.hasCard ?? []),
                            ]),
                          ];

                          const combinedDecks = { ...appState.decks, ...decks };

                          setAppState({
                            ...appState,
                            decks: combinedDecks,
                            flashcardUrls: updatedFlashcardUrls,
                          });
                          setViewUrl(decks[deckUrl]?.iri);
                        })
                        .catch((err) => {
                          console.error("Failed with error:", err);
                        });
                    }}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {flashcardUrls.map((flashcardUrl) => (
            <div key={flashcardUrl} className="items-center gap-2">
              <div className="flex gap-2">
                <div title="Flashcard">
                  <StickyNote />
                </div>
                <div className="flex grow-1 break-all gap-1">
                  <span title={flashcardUrl}>
                    <strong>{preferFragment(flashcardUrl)}</strong> (Flashcard)
                  </span>
                </div>
                <div>
                  <Button
                    size={"sm"}
                    onClick={() => {
                      service
                        .getFlashcard(repository, flashcardUrl)
                        .then((flashcards) => {
                          const combinedFlashcards = {
                            ...appState.flashcards,
                            ...flashcards,
                          };

                          setAppState({
                            ...appState,
                            flashcards: combinedFlashcards,
                          });
                          setViewUrl(flashcardUrl);
                        })
                        .catch((err) => {
                          console.error("Failed with error:", err);
                        });
                    }}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Card>
        {viewInstance && (
          <Card className="p-2">
            <div className="space-x-2 space-y-1">
              <div className="mb-2 flex gap-1">
                <div className="width: 32px" title="Instance">
                  <Database />
                </div>
                <strong>{viewInstance.name}</strong> (Instance)
              </div>
              <div>
                <span title={viewInstance.iri}>
                  <strong>• Iri:</strong> {preferFragment(viewInstance.iri)}
                </span>
              </div>
              <div>
                <strong>• Version:</strong> {viewInstance.version}
              </div>
              <div>
                <strong>• Name:</strong> {viewInstance.name}
              </div>
              <div>
                <strong>• Has deck:</strong>{" "}
                <div className="flex flex-col gap-1">
                  {viewInstance.hasDeck.map((deckIri) => (
                    <span key={deckIri} title={deckIri}>
                      {preferFragment(deckIri)}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant={"destructive"}
                onClick={() => {
                  service
                    .removeInstance(repository, viewInstance)
                    .then(({ instanceUrls }) => {
                      const updatedInstanceUrlSet = new Set([
                        ...appState.instanceUrls,
                        ...instanceUrls,
                      ]);
                      updatedInstanceUrlSet.delete(viewInstance.iri);
                      const updatedInstanceUrls = [...updatedInstanceUrlSet];

                      const updatedInstances = { ...appState.instances };
                      delete updatedInstances[viewInstance.iri];

                      setAppState({
                        ...appState,
                        instanceUrls: updatedInstanceUrls,
                        instances: updatedInstances,
                      });
                      setViewUrl(undefined);
                    })
                    .catch((err) => {
                      console.error("Failed with error:", err);
                    });
                }}
              >
                Delete instance
              </Button>
              <Button
                onClick={() => {
                  service
                    .newDeck(repository, {
                      version: "1",
                      name: "New deck name",
                      isInSolidMemoDataInstance: viewInstance.iri,
                      hasCard: [],
                    })
                    .then(({ decks }) => {
                      const updatedDeckUrls = [
                        ...new Set([
                          ...appState.deckUrls,
                          ...Object.keys(decks),
                        ]),
                      ];

                      const updatedDecks = { ...appState.decks, ...decks };

                      setAppState({
                        ...appState,
                        deckUrls: updatedDeckUrls,
                        decks: updatedDecks,
                      });
                    })
                    .catch((err) => {
                      console.error("Failed with error:", err);
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
            <div className="space-x-2 space-y-1">
              <div className="mb-2 flex gap-1" title="Deck">
                <Layers />
                <strong>{viewDeck.name}</strong> (Deck)
              </div>
              <div>
                <span title={viewDeck.iri}>
                  <strong>• Iri:</strong> {preferFragment(viewDeck.iri)}
                </span>
              </div>
              <div>
                <strong>• Version:</strong> {viewDeck.version}
              </div>
              <div>
                <strong>• Name:</strong> {viewDeck.name}
              </div>
              <div>
                <span title={viewDeck.isInSolidMemoDataInstance}>
                  <strong>• Is in instance:</strong>
                  {preferFragment(viewDeck.isInSolidMemoDataInstance)}
                </span>
              </div>
              <div>
                <strong>• Has card:</strong>{" "}
                <div className="flex flex-col gap-1">
                  {viewDeck.hasCard.map((cardIri) => (
                    <span key={cardIri} title={cardIri}>
                      {preferFragment(cardIri)}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant={"destructive"}
                onClick={() => {
                  service
                    .removeDeck(repository, viewDeck)
                    .then(({ instances, deckUrls }) => {
                      const updatedInstances = { ...instances };

                      const deckIndex = updatedInstances[
                        viewDeck.isInSolidMemoDataInstance
                      ]?.hasDeck.indexOf(viewDeck.iri);

                      if (typeof deckIndex === "number" && deckIndex >= 0) {
                        updatedInstances[
                          viewDeck.isInSolidMemoDataInstance
                        ]?.hasDeck?.splice(deckIndex, 1);
                      }

                      const deckUrlSet = new Set([
                        ...appState.deckUrls,
                        ...deckUrls,
                      ]);
                      deckUrlSet.delete(viewDeck.iri);
                      const updatedDeckUrls = [...deckUrlSet];

                      const updatedDecks = { ...appState.decks };
                      delete updatedDecks[viewDeck.iri];

                      setAppState({
                        ...appState,
                        instances: updatedInstances,
                        deckUrls: updatedDeckUrls,
                        decks: updatedDecks,
                      });
                      setViewUrl(viewDeck.isInSolidMemoDataInstance);
                    })
                    .catch((err) => {
                      console.error("Failed with error:", err);
                    });
                }}
              >
                Delete deck
              </Button>
              <Button
                onClick={() => {
                  service
                    .newFlashcard(
                      repository,
                      viewDeck.isInSolidMemoDataInstance,
                      {
                        version: "1",
                        front: "Front",
                        back: "Back",
                        isInDeck: viewDeck.iri,
                      }
                    )
                    .then(({ decks }) => {
                      const updatedFlashcardUrls = [
                        ...new Set([
                          ...appState.flashcardUrls,
                          ...(decks[viewDeck.iri]?.hasCard ?? []),
                        ]),
                      ];

                      const updatedDecks = { ...appState.decks, ...decks };

                      setAppState({
                        ...appState,
                        decks: updatedDecks,
                        flashcardUrls: updatedFlashcardUrls,
                      });
                      setViewUrl(decks[viewDeck.iri]?.iri);
                    })
                    .catch((err) => {
                      console.error("Failed with error:", err);
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
            <div className="space-x-2 space-y-1">
              <div className="mb-2 flex gap-1" title="Flashcard">
                <StickyNote />
                <strong>Flashcard</strong>
              </div>
              <div>
                <span title={viewFlashcard.iri}>
                  <strong>• Iri:</strong> {preferFragment(viewFlashcard.iri)}
                </span>
              </div>
              <div>
                <strong>• Version:</strong> {viewFlashcard.version}
              </div>
              <div>
                <strong>• Front:</strong> {viewFlashcard.front}
              </div>
              <div>
                <strong>• Back:</strong> {viewFlashcard.back}
              </div>
              <div>
                <span title={viewFlashcard.iri}>
                  <strong>• Is in deck:</strong>{" "}
                  {preferFragment(viewFlashcard.isInDeck)}
                </span>
              </div>
              <Button
                variant={"destructive"}
                onClick={() => {
                  service
                    .removeFlashcard(repository, viewFlashcard)
                    .then(() => {
                      const updatedDecks = { ...decks };

                      const flashcardIndex = updatedDecks[
                        viewFlashcard.isInDeck
                      ]?.hasCard.indexOf(viewFlashcard.iri);

                      if (
                        typeof flashcardIndex === "number" &&
                        flashcardIndex >= 0
                      ) {
                        updatedDecks[viewFlashcard.isInDeck]?.hasCard?.splice(
                          flashcardIndex,
                          1
                        );
                      }

                      const updatedFlashcards = { ...appState.flashcards };
                      delete updatedFlashcards[viewFlashcard.iri];

                      setAppState({
                        ...appState,
                        deckUrls: Object.keys(updatedDecks),
                        decks: updatedDecks,
                        flashcardUrls: Object.keys(updatedFlashcards),
                        flashcards: updatedFlashcards,
                      });
                      setViewUrl(viewFlashcard.isInDeck);
                    })
                    .catch((err) => {
                      console.error("Failed with error:", err);
                    });
                }}
              >
                Delete flashcard
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
