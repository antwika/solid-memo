import {
  parseDeck,
  parseFlashcard,
  parseInstance,
  type DeckModel,
  type FlashcardModel,
  type InstanceModel,
} from "@solid-memo/core";
import {
  buildThing,
  createSolidDataset,
  createThing,
  deleteSolidDataset,
  getDecimal,
  getInteger,
  getProfileAll,
  getSolidDataset,
  getStringNoLocale,
  getStringNoLocaleAll,
  getThing,
  getThingAll,
  getUrl,
  getUrlAll,
  removeStringNoLocale,
  removeThing,
  removeUrl,
  saveSolidDatasetAt,
  setStringNoLocale,
  setThing,
  type Thing,
  type ThingPersisted,
} from "@inrupt/solid-client";
import { v4 as uuid } from "uuid";
import type { IRepository } from "@solid-memo/core";
import { EVENTS, getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { stripFragment, thingContains } from "./utils";

export class InruptSolidClientRepository implements IRepository {
  getSession() {
    return getDefaultSession();
  }

  isLoggedIn() {
    return this.getSession().info.isLoggedIn;
  }

  getFetch() {
    return this.getSession().fetch;
  }

  getWebId() {
    return this.getSession().info.webId;
  }

  async login(opts: {
    oidcIssuer: string;
    redirectUrl: string;
    clientName: string;
  }) {
    return this.getSession().login(opts);
  }

  async logout() {
    return this.getSession().logout({ logoutType: "app" });
  }

  async handleIncomingRedirect(
    restoreUrlCallback: (url: string) => void
  ): Promise<void> {
    const session = this.getSession();

    session.events.removeAllListeners(EVENTS.SESSION_RESTORED);
    session.events.on(EVENTS.SESSION_RESTORED, restoreUrlCallback);

    await session.handleIncomingRedirect({ restorePreviousSession: true });
  }

  async findOidcIssuers(webId: string) {
    const webIdDataset = await getSolidDataset(webId);
    const webIdThing = getThing(webIdDataset, webId);

    if (!webIdThing) throw new Error("Failed to discover WebID");

    const oidcIssuers = getUrlAll(
      webIdThing,
      "http://www.w3.org/ns/solid/terms#oidcIssuer"
    );

    return oidcIssuers;
  }

  async findAllStorageIris() {
    const webId = this.getWebId();

    if (!webId) throw new Error("Session not authenticated!");

    const profiles = await getProfileAll(webId, {
      fetch: this.getFetch(),
    });
    const webIdThings = [getThing(profiles.webIdProfile, webId)];

    const storageIris = webIdThings
      .filter((webIdThing) => webIdThing !== null)
      .map((webIdThing) =>
        getUrlAll(webIdThing, "http://www.w3.org/ns/pim/space#storage")
      )
      .flat();

    return storageIris;
  }

  async findAllPrivateTypeIndexIrisByWebId(): Promise<string[]> {
    const webId = this.getWebId();

    if (!webId) throw new Error("Session not authenticated!");

    const profiles = await getProfileAll(webId, {
      fetch: this.getFetch(),
    });

    const webIdThings = [getThing(profiles.webIdProfile, webId)];

    const seeAlsoUrls = webIdThings
      .filter((webIdThing) => webIdThing !== null)
      .map((webIdThing) =>
        getUrlAll(webIdThing, "http://www.w3.org/2000/01/rdf-schema#seeAlso")
      )
      .flat();

    const seeAlsoDatasets = await Promise.all(
      seeAlsoUrls.map((seeAlsoUrl) =>
        getSolidDataset(seeAlsoUrl, { fetch: this.getFetch() })
      )
    );

    const seeAlsoThings = seeAlsoDatasets
      .map((seeAlsoDataset) => getThingAll(seeAlsoDataset))
      .flat();

    const privateTypeIndexUrls = webIdThings
      .filter((webIdThing) => webIdThing !== null)
      .map((webIdThing) =>
        getUrlAll(
          webIdThing,
          "http://www.w3.org/ns/solid/terms#privateTypeIndex"
        )
      )
      .flat();

    const seeAlsoPrivateTypeIndexUrls = seeAlsoThings
      .map((seeAlsoThing) =>
        getUrlAll(
          seeAlsoThing,
          "http://www.w3.org/ns/solid/terms#privateTypeIndex"
        )
      )
      .flat();

    const allPrivateTypeIndexUrls = [
      ...privateTypeIndexUrls,
      ...seeAlsoPrivateTypeIndexUrls,
    ];

    return allPrivateTypeIndexUrls;
  }

  async findAllInstanceUrls(): Promise<string[]> {
    const privateTypeIndexUrls =
      await this.findAllPrivateTypeIndexIrisByWebId();

    const privateTypeIndexDatasets = await Promise.all(
      privateTypeIndexUrls.map((privateTypeIndexUrl) =>
        getSolidDataset(privateTypeIndexUrl, {
          fetch: this.getFetch(),
        })
      )
    );

    const privateTypeIndexThings = (
      await Promise.all(
        privateTypeIndexDatasets.map((privateTypeIndexDataset) =>
          getThingAll(privateTypeIndexDataset)
        )
      )
    ).flat();

    const solidMemoDataThings = privateTypeIndexThings.filter(
      (privateTypeIndexThing) =>
        thingContains(
          privateTypeIndexThing,
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "http://www.w3.org/ns/solid/terms#TypeRegistration"
        ) &&
        thingContains(
          privateTypeIndexThing,
          "http://www.w3.org/ns/solid/terms#forClass",
          "http://antwika.com/ns/solid-memo#SolidMemoData"
        )
    );

    const instanceUrls = solidMemoDataThings
      .map((solidMemoDataThing) =>
        getUrlAll(
          solidMemoDataThing,
          "http://www.w3.org/ns/solid/terms#instance"
        )
      )
      .flat();

    return instanceUrls;
  }

  async findInstances(
    providedInstanceUrls?: string[]
  ): Promise<Record<string, InstanceModel>> {
    const instanceUrls =
      providedInstanceUrls ?? (await this.findAllInstanceUrls());

    const instanceDatasets = await Promise.all(
      instanceUrls.map((instanceUrl) =>
        getSolidDataset(instanceUrl, { fetch: this.getFetch() })
      )
    );

    const instanceThings = instanceDatasets
      .map((instanceDataset) => getThingAll(instanceDataset))
      .flat()
      .filter((instanceThing) =>
        thingContains(
          instanceThing,
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "http://antwika.com/ns/solid-memo#SolidMemoData"
        )
      );

    const instances = instanceThings.reduce<Record<string, InstanceModel>>(
      (acc, instanceThing) => {
        const instance = parseInstance({
          iri: instanceThing.url,
          version: getStringNoLocale(
            instanceThing,
            "http://antwika.com/ns/solid-memo#version"
          ),
          name: getStringNoLocale(
            instanceThing,
            "http://antwika.com/ns/solid-memo#name"
          ),
          hasDeck: getUrlAll(
            instanceThing,
            "http://antwika.com/ns/solid-memo#hasDeck"
          ),
          isInPrivateTypeIndex: getUrl(
            instanceThing,
            "http://antwika.com/ns/solid-memo#isInPrivateTypeIndex"
          ),
        });
        acc[instance.iri] = instance;
        return acc;
      },
      {}
    );

    return instances;
  }

  async findAllDeckUrls(providedInstanceUrls?: string[]): Promise<string[]> {
    const instanceUrls =
      providedInstanceUrls ?? (await this.findAllInstanceUrls());

    const instanceDatasets = await Promise.all(
      instanceUrls.map((instanceUrl) =>
        getSolidDataset(instanceUrl, { fetch: this.getFetch() })
      )
    );

    const instanceThings = instanceDatasets
      .map((instanceDataset) => getThingAll(instanceDataset))
      .flat();

    const solidMemoDataThings = instanceThings.filter((instanceThing) =>
      thingContains(
        instanceThing,
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://antwika.com/ns/solid-memo#SolidMemoData"
      )
    );

    const deckUrls = solidMemoDataThings
      .map((solidMemoDataThing) =>
        getUrlAll(
          solidMemoDataThing,
          "http://antwika.com/ns/solid-memo#hasDeck"
        )
      )
      .flat();

    return deckUrls;
  }

  async findAllFlashcardUrls(providedDeckUrls?: string[]): Promise<string[]> {
    const decks = await this.findDecks(providedDeckUrls);

    return Object.values(decks)
      .map((deck) => deck.hasCard)
      .flat();
  }

  async findDecks(
    providedDeckUrls?: string[]
  ): Promise<Record<string, DeckModel>> {
    const deckUrls = providedDeckUrls ?? (await this.findAllDeckUrls());

    const deckDatasets = await Promise.all(
      deckUrls.map((deckUrl) =>
        getSolidDataset(deckUrl, { fetch: this.getFetch() })
      )
    );

    const deckThings = deckDatasets
      .map((deckDataset) => getThingAll(deckDataset))
      .flat()
      .filter((deckThing) =>
        thingContains(
          deckThing,
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "http://antwika.com/ns/solid-memo#Deck"
        )
      );

    const decks = deckThings.reduce<Record<string, DeckModel>>(
      (acc, deckThing) => {
        const deck = parseDeck({
          iri: deckThing.url,
          version: getStringNoLocale(
            deckThing,
            "http://antwika.com/ns/solid-memo#version"
          ),
          name: getStringNoLocale(
            deckThing,
            "http://antwika.com/ns/solid-memo#name"
          ),
          back: getStringNoLocale(
            deckThing,
            "http://antwika.com/ns/solid-memo#back"
          ),
          isInSolidMemoDataInstance: getUrl(
            deckThing,
            "http://antwika.com/ns/solid-memo#isInSolidMemoDataInstance"
          ),
          hasCard: getUrlAll(
            deckThing,
            "http://antwika.com/ns/solid-memo#hasCard"
          ),
        });
        acc[deck.iri] = deck;
        return acc;
      },
      {}
    );

    return decks;
  }

  async findFlashcards(
    flashcardUrls: string[]
  ): Promise<Record<string, FlashcardModel>> {
    const flashcardDatasets = await Promise.all(
      flashcardUrls.map((flashcardUrl) =>
        getSolidDataset(flashcardUrl, {
          fetch: this.getFetch(),
        })
      )
    );

    const flashcardThings = (
      await Promise.all(
        flashcardDatasets.map((flashcardDataset) =>
          getThingAll(flashcardDataset).filter((flashcardThing) =>
            thingContains(
              flashcardThing,
              "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              "http://antwika.com/ns/solid-memo#Flashcard"
            )
          )
        )
      )
    ).flat();

    const flashcards = flashcardThings.reduce<Record<string, FlashcardModel>>(
      (acc, flashcardThing) => {
        const flashcard = parseFlashcard({
          iri: flashcardThing.url,
          version: getStringNoLocale(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#version"
          ),
          front: getStringNoLocale(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#front"
          ),
          back: getStringNoLocale(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#back"
          ),
          isInDeck: getUrl(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#isInDeck"
          ),
          interval: getInteger(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#interval"
          ),
          easeFactor: getDecimal(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#easeFactor"
          ),
          repetition: getInteger(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#repetition"
          ),
        });
        acc[flashcard.iri] = flashcard;
        return acc;
      },
      {}
    );

    return flashcards;
  }

  async createInstance(podLocation: string): Promise<void> {
    const privateTypeIndexIris =
      await this.findAllPrivateTypeIndexIrisByWebId();

    if (privateTypeIndexIris.length === 0)
      throw new Error("No private type indexes found");
    if (privateTypeIndexIris.length > 1)
      throw new Error("Too many private type indexes found");

    const privateTypeIndexName = uuid().toString();
    const privateTypeIndexIri = privateTypeIndexIris[0];
    const privateTypeIndexIriWithName = `${privateTypeIndexIri}#${privateTypeIndexName}`;

    if (!privateTypeIndexIri)
      throw new Error("Failed to pick private type indexes iri");

    const privateTypeIndexDataset = await getSolidDataset(privateTypeIndexIri, {
      fetch: this.getFetch(),
    });

    const typeRegistrationThing = createThing({ name: privateTypeIndexName });

    if (!typeRegistrationThing)
      throw new Error("Expected typeRegistrationThing to be defined!");

    const instanceName = uuid().toString();
    const instanceIri = `${podLocation}solid-memo/data-${uuid().toString()}#${instanceName}`;

    const updatedTypeRegistrationThing = buildThing(typeRegistrationThing)
      .addUrl(
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://www.w3.org/ns/solid/terms#TypeRegistration"
      )
      .addUrl(
        "http://www.w3.org/ns/solid/terms#forClass",
        "http://antwika.com/ns/solid-memo#SolidMemoData"
      )
      .addUrl("http://www.w3.org/ns/solid/terms#instance", instanceIri)
      .build();

    const updatedPrivateTypeIndexDataset = setThing(
      privateTypeIndexDataset,
      updatedTypeRegistrationThing
    );

    await saveSolidDatasetAt(
      privateTypeIndexIri,
      updatedPrivateTypeIndexDataset,
      { fetch: this.getFetch() }
    );

    const instanceDataset = createSolidDataset();

    const instanceThing = createThing({ name: instanceName });

    const updatedInstanceThing = buildThing(instanceThing)
      .addUrl(
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://antwika.com/ns/solid-memo#SolidMemoData"
      )
      .addUrl(
        "http://antwika.com/ns/solid-memo#isInPrivateTypeIndex",
        privateTypeIndexIriWithName
      )
      .addStringNoLocale("http://antwika.com/ns/solid-memo#version", "1")
      .addStringNoLocale(
        "http://antwika.com/ns/solid-memo#name",
        "New instance name"
      )
      .build();

    const updatedInstanceDataset = setThing(
      instanceDataset,
      updatedInstanceThing
    );

    await saveSolidDatasetAt(instanceIri, updatedInstanceDataset, {
      fetch: this.getFetch(),
    });
  }

  async createDeck(
    instanceIri: string,
    deck: Omit<DeckModel, "iri">
  ): Promise<Record<string, DeckModel>> {
    const instanceDataset = await getSolidDataset(instanceIri, {
      fetch: this.getFetch(),
    });

    const instanceThing = getThing(instanceDataset, instanceIri);

    if (!instanceThing)
      throw new Error("Expected instanceThing to be defined!");

    const instanceThingName = uuid().toString();
    const deckIri = `${stripFragment(instanceIri)}#${instanceThingName}`;

    const updatedInstanceThing = buildThing(instanceThing)
      .addUrl("http://antwika.com/ns/solid-memo#hasDeck", deckIri)
      .build();

    const updatedInstanceDataset = setThing(
      instanceDataset,
      updatedInstanceThing
    );

    await saveSolidDatasetAt(instanceIri, updatedInstanceDataset, {
      fetch: this.getFetch(),
    });

    const instanceDataset2 = await getSolidDataset(instanceIri, {
      fetch: this.getFetch(),
    });

    const deckThing = buildThing({ name: instanceThingName })
      .addUrl(
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://antwika.com/ns/solid-memo#Deck"
      )
      .addStringNoLocale(
        "http://antwika.com/ns/solid-memo#version",
        deck.version
      )
      .addStringNoLocale("http://antwika.com/ns/solid-memo#name", deck.name)
      .addUrl(
        "http://antwika.com/ns/solid-memo#isInSolidMemoDataInstance",
        deck.isInSolidMemoDataInstance
      )
      .build();

    const updatedInstanceDataset2 = setThing(instanceDataset2, deckThing);

    await saveSolidDatasetAt(instanceIri, updatedInstanceDataset2, {
      fetch: this.getFetch(),
    });

    const foundDecks = await this.findDecks([deckIri]);

    return foundDecks;
  }

  async createFlashcard(
    instanceIri: string,
    deckIri: string,
    flashcard: Omit<FlashcardModel, "iri">
  ): Promise<void> {
    const deckDataset = await getSolidDataset(deckIri, {
      fetch: this.getFetch(),
    });

    const deckThing = getThing(deckDataset, deckIri);

    if (!deckThing) throw new Error("Expected deckThing to be defined!");

    const flashcardThingName = uuid().toString();
    const flashcardIri = `${stripFragment(instanceIri)}#${flashcardThingName}`;

    const updatedDeckThing = buildThing(deckThing)
      .addUrl("http://antwika.com/ns/solid-memo#hasCard", flashcardIri)
      .build();

    const updatedDeckDataset = setThing(deckDataset, updatedDeckThing);

    await saveSolidDatasetAt(deckIri, updatedDeckDataset, {
      fetch: this.getFetch(),
    });

    const instanceDataset = await getSolidDataset(instanceIri, {
      fetch: this.getFetch(),
    });

    const flashcardThing = buildThing({ name: flashcardThingName })
      .addUrl(
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://antwika.com/ns/solid-memo#Flashcard"
      )
      .addStringNoLocale(
        "http://antwika.com/ns/solid-memo#version",
        flashcard.version
      )
      .addStringNoLocale(
        "http://antwika.com/ns/solid-memo#front",
        flashcard.front
      )
      .addStringNoLocale(
        "http://antwika.com/ns/solid-memo#back",
        flashcard.back
      )
      .addInteger(
        "http://antwika.com/ns/solid-memo#interval",
        flashcard.interval
      )
      .addDecimal(
        "http://antwika.com/ns/solid-memo#easeFactor",
        flashcard.easeFactor
      )
      .addInteger(
        "http://antwika.com/ns/solid-memo#repetition",
        flashcard.repetition
      )
      .addUrl("http://antwika.com/ns/solid-memo#isInDeck", flashcard.isInDeck)
      .build();

    const updatedInstanceDataset = setThing(instanceDataset, flashcardThing);

    await saveSolidDatasetAt(instanceIri, updatedInstanceDataset, {
      fetch: this.getFetch(),
    });
  }

  async renameInstance(instance: InstanceModel, newName: string) {
    const instanceDataset = await getSolidDataset(instance.iri, {
      fetch: this.getFetch(),
    });

    const instanceThing = getThing(instanceDataset, instance.iri);

    if (!instanceThing) throw new Error("Could not find instance thing");

    const names = getStringNoLocaleAll(
      instanceThing,
      "http://antwika.com/ns/solid-memo#name"
    );

    let updatedInstanceThing = instanceThing;

    for (const name of names) {
      updatedInstanceThing = removeStringNoLocale(
        instanceThing,
        "http://antwika.com/ns/solid-memo#name",
        name
      );
    }

    updatedInstanceThing = setStringNoLocale(
      updatedInstanceThing,
      "http://antwika.com/ns/solid-memo#name",
      newName
    );

    const updatedInstanceDataset = setThing(
      instanceDataset,
      updatedInstanceThing
    );

    await saveSolidDatasetAt(instance.iri, updatedInstanceDataset, {
      fetch: this.getFetch(),
    });
  }

  async renameDeck(deck: DeckModel, newName: string) {
    const deckDataset = await getSolidDataset(deck.iri, {
      fetch: this.getFetch(),
    });

    const deckThing = getThing(deckDataset, deck.iri);

    if (!deckThing) throw new Error("Could not find deck thing");

    const names = getStringNoLocaleAll(
      deckThing,
      "http://antwika.com/ns/solid-memo#name"
    );

    let updatedDeckThing = deckThing;

    for (const name of names) {
      updatedDeckThing = removeStringNoLocale(
        deckThing,
        "http://antwika.com/ns/solid-memo#name",
        name
      );
    }

    updatedDeckThing = setStringNoLocale(
      updatedDeckThing,
      "http://antwika.com/ns/solid-memo#name",
      newName
    );

    const updatedDeckDataset = setThing(deckDataset, updatedDeckThing);

    await saveSolidDatasetAt(deck.iri, updatedDeckDataset, {
      fetch: this.getFetch(),
    });
  }

  async updateInstance(instance: InstanceModel) {
    const instanceDataset = await getSolidDataset(instance.iri, {
      fetch: this.getFetch(),
    });

    const instanceThing = getThing(instanceDataset, instance.iri);

    if (!instanceThing) throw new Error("Could not find instance thing");

    let updatedInstanceThing = instanceThing;
    updatedInstanceThing = setStringNoLocale(
      updatedInstanceThing,
      "http://antwika.com/ns/solid-memo#name",
      instance.name
    );

    const updatedInstanceDataset = setThing(
      instanceDataset,
      updatedInstanceThing
    );

    await saveSolidDatasetAt(instance.iri, updatedInstanceDataset, {
      fetch: this.getFetch(),
    });
  }

  async updateDeck(deck: DeckModel) {
    const deckDataset = await getSolidDataset(deck.iri, {
      fetch: this.getFetch(),
    });

    const deckThing = getThing(deckDataset, deck.iri);

    if (!deckThing) throw new Error("Could not find deck thing");

    let updatedDeckThing = deckThing;
    updatedDeckThing = setStringNoLocale(
      updatedDeckThing,
      "http://antwika.com/ns/solid-memo#name",
      deck.name
    );

    const updatedDeckDataset = setThing(deckDataset, updatedDeckThing);

    await saveSolidDatasetAt(deck.iri, updatedDeckDataset, {
      fetch: this.getFetch(),
    });
  }

  async updateFlashcard(flashcard: FlashcardModel) {
    const flashcardDataset = await getSolidDataset(flashcard.iri, {
      fetch: this.getFetch(),
    });

    const flashcardThing = getThing(flashcardDataset, flashcard.iri);

    if (!flashcardThing) throw new Error("Could not find flashcard thing");

    let updatedFlashcardThing = flashcardThing;
    updatedFlashcardThing = setStringNoLocale(
      updatedFlashcardThing,
      "http://antwika.com/ns/solid-memo#front",
      flashcard.front
    );
    updatedFlashcardThing = setStringNoLocale(
      updatedFlashcardThing,
      "http://antwika.com/ns/solid-memo#back",
      flashcard.back
    );

    const updatedFlashcardDataset = setThing(
      flashcardDataset,
      updatedFlashcardThing
    );

    await saveSolidDatasetAt(flashcard.iri, updatedFlashcardDataset, {
      fetch: this.getFetch(),
    });
  }

  async deleteInstance(instance: InstanceModel): Promise<void> {
    if (instance.hasDeck.length > 0)
      throw new Error("Clear the instance before deletion");

    const privateTypeIndexIri = instance.isInPrivateTypeIndex;
    const privateTypeIndexDataset = await getSolidDataset(privateTypeIndexIri, {
      fetch: this.getFetch(),
    });

    let updatedPrivateTypeIndexDataset = removeThing(
      privateTypeIndexDataset,
      instance.iri
    );

    const privateTypeIndexThing = getThing(
      updatedPrivateTypeIndexDataset,
      privateTypeIndexIri
    );

    if (privateTypeIndexThing) {
      updatedPrivateTypeIndexDataset = removeThing(
        updatedPrivateTypeIndexDataset,
        privateTypeIndexIri
      );
    }

    await saveSolidDatasetAt(
      privateTypeIndexIri,
      updatedPrivateTypeIndexDataset,
      { fetch: this.getFetch() }
    );

    const instanceDataset = await getSolidDataset(instance.iri, {
      fetch: this.getFetch(),
    });
    const updatedInstanceDataset = removeThing(instanceDataset, instance.iri);
    const savedInstanceDataset = await saveSolidDatasetAt(
      instance.iri,
      updatedInstanceDataset,
      { fetch: this.getFetch() }
    );

    await deleteSolidDataset(savedInstanceDataset, {
      fetch: this.getFetch(),
    });
  }

  async deleteDeck(deck: DeckModel): Promise<void> {
    if (deck.hasCard.length > 0)
      throw new Error("Clear the deck before deletion");

    const instanceIri = deck.isInSolidMemoDataInstance;
    const instanceDataset = await getSolidDataset(instanceIri, {
      fetch: this.getFetch(),
    });

    let updatedInstanceDataset = removeThing(instanceDataset, deck.iri);

    const instanceThing = getThing(updatedInstanceDataset, instanceIri);

    if (instanceThing) {
      const updatedInstanceThing = removeUrl(
        instanceThing,
        "http://antwika.com/ns/solid-memo#hasDeck",
        deck.iri
      );

      updatedInstanceDataset = setThing(
        updatedInstanceDataset,
        updatedInstanceThing
      );
    }

    await saveSolidDatasetAt(instanceIri, updatedInstanceDataset, {
      fetch: this.getFetch(),
    });
  }

  async deleteFlashcard(flashcard: FlashcardModel): Promise<void> {
    const deckIri = flashcard.isInDeck;
    const deckDataset = await getSolidDataset(deckIri, {
      fetch: this.getFetch(),
    });

    let updatedDeckDataset = removeThing(deckDataset, flashcard.iri);

    const deckThing = getThing(updatedDeckDataset, deckIri);

    if (deckThing) {
      const updatedDeckThing = removeUrl(
        deckThing,
        "http://antwika.com/ns/solid-memo#hasCard",
        flashcard.iri
      );

      updatedDeckDataset = setThing(updatedDeckDataset, updatedDeckThing);
    }

    await saveSolidDatasetAt(deckIri, updatedDeckDataset, {
      fetch: this.getFetch(),
    });
  }
}
