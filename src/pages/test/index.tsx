import type { DeckModel } from "@domain/deck.model";
import type { FlashcardModel } from "@domain/flashcard.model";
import type { InstanceModel } from "@domain/instance.model";
import { SessionContext } from "@providers/index";
import { Button } from "@ui/button.ui";
import { Card } from "@ui/card.ui";
import { useContext, useState } from "react";
import { Database, Layers, StickyNote } from "lucide-react";
import { RepositoryContext } from "@providers/repository.provider";
import type { IRepository } from "@repositories/index";
import type { Session } from "@inrupt/solid-client-authn-browser";

interface IService {
  discoverEverything(
    session: Session,
    repository: IRepository,
  ): Promise<{
    instanceUrls: string[];
    deckUrls: string[];
    flashcardUrls: string[];
  }>;

  discoverInstanceUrls(
    session: Session,
    repository: IRepository,
  ): Promise<string[]>;

  newInstance(
    session: Session,
    repository: IRepository,
  ): Promise<{
    instanceUrls: string[];
    instances: Record<string, InstanceModel>;
  }>;

  newDeck(
    session: Session,
    repository: IRepository,
    deck: Omit<DeckModel, "iri">,
  ): Promise<{ decks: Record<string, DeckModel> }>;

  newFlashcard(
    session: Session,
    repository: IRepository,
    instanceIri: string,
    flashcard: Omit<FlashcardModel, "iri">,
  ): Promise<{ decks: Record<string, DeckModel> }>;

  getInstance(
    session: Session,
    repository: IRepository,
    instanceUrl: string,
  ): Promise<Record<string, InstanceModel>>;

  getDeck(
    session: Session,
    repository: IRepository,
    deckUrl: string,
  ): Promise<Record<string, DeckModel>>;

  getFlashcard(
    session: Session,
    repository: IRepository,
    flashcardUrl: string,
  ): Promise<Record<string, FlashcardModel>>;

  removeInstance(
    session: Session,
    repository: IRepository,
    instance: InstanceModel,
  ): Promise<{
    instanceUrls: string[];
    instances: Record<string, InstanceModel>;
  }>;

  removeDeck(
    session: Session,
    repository: IRepository,
    deck: DeckModel,
  ): Promise<{
    instances: Record<string, InstanceModel>;
    deckUrls: string[];
    decks: Record<string, DeckModel>;
  }>;

  removeFlashcard(
    session: Session,
    repository: IRepository,
    flashcard: FlashcardModel,
  ): Promise<{
    decks: Record<string, DeckModel>;
    flashcardUrls: string[];
    flashcards: Record<string, FlashcardModel>;
  }>;
}

class SolidService implements IService {
  async discoverEverything(session: Session, repository: IRepository) {
    const instanceUrls = await repository.findAllInstanceUrls(session);
    const deckUrls = await repository.findAllDeckUrls(session, instanceUrls);
    const flashcardUrls = await repository.findAllFlashcardUrls(
      session,
      deckUrls,
    );
    return { instanceUrls, deckUrls, flashcardUrls };
  }

  async discoverInstanceUrls(session: Session, repository: IRepository) {
    return repository.findAllInstanceUrls(session);
  }

  async newInstance(session: Session, repository: IRepository) {
    const storageIris = await repository.findAllStorageIris(session);

    console.log("Storage iris:", storageIris);

    if (storageIris.length === 0) throw new Error("No storage iris found");
    if (storageIris.length > 1) throw new Error("Too many storage iris found");

    const storageIri = storageIris[0];

    if (!storageIri) throw new Error("Failed to pick storage iri");

    await repository.createInstance(session, storageIri);

    const instanceUrls = await repository.findAllInstanceUrls(session);

    const instances = await repository.findInstances(session, instanceUrls);

    return { instanceUrls, instances };
  }

  async newDeck(
    session: Session,
    repository: IRepository,
    deck: Omit<DeckModel, "iri">,
  ) {
    const decks = await repository.createDeck(
      session,
      deck.isInSolidMemoDataInstance,
      deck,
    );
    return { decks };
  }

  async newFlashcard(
    session: Session,
    repository: IRepository,
    instanceIri: string,
    flashcard: Omit<FlashcardModel, "iri">,
  ) {
    await repository.createFlashcard(
      session,
      instanceIri,
      flashcard.isInDeck,
      flashcard,
    );
    const decks = await repository.findDecks(session, [flashcard.isInDeck]);
    return { decks };
  }

  async getInstance(
    session: Session,
    repository: IRepository,
    instanceUrl: string,
  ) {
    return repository.findInstances(session, [instanceUrl]);
  }

  async getDeck(session: Session, repository: IRepository, deckUrl: string) {
    return repository.findDecks(session, [deckUrl]);
  }

  async getFlashcard(
    session: Session,
    repository: IRepository,
    flashcardUrl: string,
  ) {
    return repository.findFlashcards(session, [flashcardUrl]);
  }

  async removeInstance(
    session: Session,
    repository: IRepository,
    instance: InstanceModel,
  ) {
    await repository.deleteInstance(session, instance);
    const instanceUrls = await repository.findAllInstanceUrls(session);
    const instances = await repository.findInstances(session, instanceUrls);
    return { instanceUrls, instances };
  }

  async removeDeck(session: Session, repository: IRepository, deck: DeckModel) {
    await repository.deleteDeck(session, deck);
    const instanceUrls = await repository.findAllInstanceUrls(session);
    const instances = await repository.findInstances(session, instanceUrls);
    const deckUrls = await repository.findAllDeckUrls(session, [
      deck.isInSolidMemoDataInstance,
    ]);
    const decks = await repository.findDecks(session, deckUrls);
    return { instances, deckUrls, decks };
  }

  async removeFlashcard(
    session: Session,
    repository: IRepository,
    flashcard: FlashcardModel,
  ) {
    await repository.deleteFlashcard(session, flashcard);
    const decks = await repository.findDecks(session, [flashcard.isInDeck]);
    const flashcardUrls = await repository.findAllFlashcardUrls(session, [
      flashcard.isInDeck,
    ]);
    const flashcards = await repository.findFlashcards(session, flashcardUrls);
    return { decks, flashcardUrls, flashcards };
  }
}

const solidService = new SolidService();

export default function TestPage() {
  const { session } = useContext(SessionContext);
  const { getRepository } = useContext(RepositoryContext);
  const repository = getRepository();

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
            solidService
              .discoverEverything(session, repository)
              .then(({ instanceUrls, deckUrls, flashcardUrls }) => {
                setInstanceUrls(instanceUrls);
                setDeckUrls(deckUrls);
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
            solidService
              .discoverInstanceUrls(session, repository)
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
            solidService
              .newInstance(session, repository)
              .then(({ instanceUrls, instances }) => {
                setInstanceUrls(instanceUrls);
                setInstances(instances);
                setViewUrl(undefined);
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
                solidService
                  .getInstance(session, repository, instanceUrl)
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
                solidService
                  .getDeck(session, repository, deckUrl)
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
                solidService
                  .getFlashcard(session, repository, flashcardUrl)
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
                solidService
                  .removeInstance(session, repository, viewInstance)
                  .then(({ instanceUrls, instances }) => {
                    setInstanceUrls(instanceUrls);
                    setInstances(instances);
                    setViewUrl(undefined);
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
                solidService
                  .newDeck(session, repository, {
                    version: "1",
                    name: "New deck name",
                    isInSolidMemoDataInstance: viewInstance.iri,
                    hasCard: [],
                  })
                  .then(({ decks }) => {
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
                solidService
                  .removeDeck(session, repository, viewDeck)
                  .then(({ instances, deckUrls, decks }) => {
                    setInstances(instances);
                    setDeckUrls(deckUrls);
                    setDecks(decks);
                    setViewUrl(viewDeck.isInSolidMemoDataInstance);
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
                solidService
                  .newFlashcard(
                    session,
                    repository,
                    viewDeck.isInSolidMemoDataInstance,
                    {
                      version: "1",
                      front: "Front",
                      back: "Back",
                      isInDeck: viewDeck.iri,
                    },
                  )
                  .then(({ decks }) => {
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
                solidService
                  .removeFlashcard(session, repository, viewFlashcard)
                  .then(({ decks, flashcardUrls, flashcards }) => {
                    setDeckUrls(Object.keys(decks));
                    setDecks(decks);
                    setFlashcardUrls(flashcardUrls);
                    setFlashcards(flashcards);
                    setViewUrl(viewFlashcard.isInDeck);
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
