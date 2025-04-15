import {
  parseDeck,
  parseFlashcard,
  parseInstance,
  type DeckModel,
  type FlashcardModel,
  type InstanceModel,
} from "@domain/index";
import {
  buildThing,
  createSolidDataset,
  createThing,
  deleteSolidDataset,
  getProfileAll,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getThingAll,
  getUrl,
  getUrlAll,
  removeThing,
  removeUrl,
  saveSolidDatasetAt,
  setThing,
  type Thing,
} from "@inrupt/solid-client";
import { v4 as uuid } from "uuid";
import type { IRepository } from "@repositories/index";
import type { IAuthService } from "@services/index";

function stripFragment(iri: string) {
  return iri.split("#")[0];
}

const thingContains = (
  privateTypeIndexThing: Thing,
  type: string,
  value: string,
) => privateTypeIndexThing.predicates[type]?.namedNodes?.includes(value);

export default class SolidRepository implements IRepository {
  readonly authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  async findAllStorageIris() {
    const webId = this.authService.getWebId();

    if (!webId) throw new Error("Session not authenticated!");

    const profiles = await getProfileAll(webId, {
      fetch: this.authService.getFetch(),
    });
    const webIdThings = [getThing(profiles.webIdProfile, webId)];

    console.log("webIdThings:", webIdThings);

    const storageIris = webIdThings
      .filter((webIdThing) => webIdThing !== null)
      .map((webIdThing) =>
        getUrlAll(webIdThing, "http://www.w3.org/ns/pim/space#storage"),
      )
      .flat();

    console.log("storageIris:", storageIris);

    return storageIris;
  }

  async findAllPrivateTypeIndexIrisByWebId(): Promise<string[]> {
    const webId = this.authService.getWebId();

    if (!webId) throw new Error("Session not authenticated!");

    const profiles = await getProfileAll(webId, {
      fetch: this.authService.getFetch(),
    });
    const webIdThings = [getThing(profiles.webIdProfile, webId)];

    console.log("webIdThings:", webIdThings);

    const seeAlsoUrls = webIdThings
      .filter((webIdThing) => webIdThing !== null)
      .map((webIdThing) =>
        getUrlAll(webIdThing, "http://www.w3.org/2000/01/rdf-schema#seeAlso"),
      )
      .flat();

    console.log("seeAlsoUrls:", seeAlsoUrls);

    const seeAlsoDatasets = await Promise.all(
      seeAlsoUrls.map((seeAlsoUrl) =>
        getSolidDataset(seeAlsoUrl, { fetch: this.authService.getFetch() }),
      ),
    );
    console.log("seeAlsoDatasets:", seeAlsoDatasets);

    const seeAlsoThings = seeAlsoDatasets
      .map((seeAlsoDataset) => getThingAll(seeAlsoDataset))
      .flat();
    console.log("seeAlsoThings:", seeAlsoThings);

    const privateTypeIndexUrls = webIdThings
      .filter((webIdThing) => webIdThing !== null)
      .map((webIdThing) =>
        getUrlAll(
          webIdThing,
          "http://www.w3.org/ns/solid/terms#privateTypeIndex",
        ),
      )
      .flat();

    const seeAlsoPrivateTypeIndexUrls = seeAlsoThings
      .map((seeAlsoThing) =>
        getUrlAll(
          seeAlsoThing,
          "http://www.w3.org/ns/solid/terms#privateTypeIndex",
        ),
      )
      .flat();
    console.log("seeAlsoPrivateTypeIndexUrls:", seeAlsoPrivateTypeIndexUrls);

    const allPrivateTypeIndexUrls = [
      ...privateTypeIndexUrls,
      ...seeAlsoPrivateTypeIndexUrls,
    ];
    console.log("allPrivateTypeIndexUrls:", allPrivateTypeIndexUrls);

    return allPrivateTypeIndexUrls;
  }

  async findAllInstanceUrls(): Promise<string[]> {
    const privateTypeIndexUrls =
      await this.findAllPrivateTypeIndexIrisByWebId();

    console.log("privateTypeIndexUrls:", privateTypeIndexUrls);

    const privateTypeIndexDatasets = await Promise.all(
      privateTypeIndexUrls.map((privateTypeIndexUrl) =>
        getSolidDataset(privateTypeIndexUrl, {
          fetch: this.authService.getFetch(),
        }),
      ),
    );
    console.log("privateTypeIndexDatasets:", privateTypeIndexDatasets);

    const privateTypeIndexThings = (
      await Promise.all(
        privateTypeIndexDatasets.map((privateTypeIndexDataset) =>
          getThingAll(privateTypeIndexDataset),
        ),
      )
    ).flat();
    console.log("privateTypeIndexThings:", privateTypeIndexThings);

    const solidMemoDataThings = privateTypeIndexThings.filter(
      (privateTypeIndexThing) =>
        thingContains(
          privateTypeIndexThing,
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "http://www.w3.org/ns/solid/terms#TypeRegistration",
        ) &&
        thingContains(
          privateTypeIndexThing,
          "http://www.w3.org/ns/solid/terms#forClass",
          "http://antwika.com/ns/solid-memo#SolidMemoData",
        ),
    );
    console.log("solidMemoDataThings:", solidMemoDataThings);

    const instanceUrls = solidMemoDataThings
      .map((solidMemoDataThing) =>
        getUrlAll(
          solidMemoDataThing,
          "http://www.w3.org/ns/solid/terms#instance",
        ),
      )
      .flat();
    console.log("instanceUrls:", instanceUrls);

    return instanceUrls;
  }

  async findInstances(
    providedInstanceUrls?: string[],
  ): Promise<Record<string, InstanceModel>> {
    const instanceUrls =
      providedInstanceUrls ?? (await this.findAllInstanceUrls());

    const instanceDatasets = await Promise.all(
      instanceUrls.map((instanceUrl) =>
        getSolidDataset(instanceUrl, { fetch: this.authService.getFetch() }),
      ),
    );
    console.log("instanceDatasets:", instanceDatasets);

    const instanceThings = instanceDatasets
      .map((instanceDataset) => getThingAll(instanceDataset))
      .flat()
      .filter((instanceThing) =>
        thingContains(
          instanceThing,
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "http://antwika.com/ns/solid-memo#SolidMemoData",
        ),
      );
    console.log("instanceThings:", instanceThings);

    const instances = instanceThings.reduce<Record<string, InstanceModel>>(
      (acc, instanceThing) => {
        const instance = parseInstance({
          iri: instanceThing.url,
          version: getStringNoLocale(
            instanceThing,
            "http://antwika.com/ns/solid-memo#version",
          ),
          name: getStringNoLocale(
            instanceThing,
            "http://antwika.com/ns/solid-memo#name",
          ),
          hasDeck: getUrlAll(
            instanceThing,
            "http://antwika.com/ns/solid-memo#hasDeck",
          ),
          isInPrivateTypeIndex: getUrl(
            instanceThing,
            "http://antwika.com/ns/solid-memo#isInPrivateTypeIndex",
          ),
        });
        acc[instance.iri] = instance;
        return acc;
      },
      {},
    );

    return instances;
  }

  async findAllDeckUrls(providedInstanceUrls?: string[]): Promise<string[]> {
    const instanceUrls =
      providedInstanceUrls ?? (await this.findAllInstanceUrls());

    const instanceDatasets = await Promise.all(
      instanceUrls.map((instanceUrl) =>
        getSolidDataset(instanceUrl, { fetch: this.authService.getFetch() }),
      ),
    );
    console.log("instanceDatasets:", instanceDatasets);

    const instanceThings = instanceDatasets
      .map((instanceDataset) => getThingAll(instanceDataset))
      .flat();
    console.log("instanceThings:", instanceThings);

    const solidMemoDataThings = instanceThings.filter((instanceThing) =>
      thingContains(
        instanceThing,
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://antwika.com/ns/solid-memo#SolidMemoData",
      ),
    );
    console.log("solidMemoDataThings:", solidMemoDataThings);

    const deckUrls = solidMemoDataThings
      .map((solidMemoDataThing) =>
        getUrlAll(
          solidMemoDataThing,
          "http://antwika.com/ns/solid-memo#hasDeck",
        ),
      )
      .flat();
    console.log("deckUrls:", deckUrls);

    return deckUrls;
  }

  async findAllFlashcardUrls(providedDeckUrls?: string[]): Promise<string[]> {
    const decks = await this.findDecks(providedDeckUrls);

    return Object.values(decks)
      .map((deck) => deck.hasCard)
      .flat();
  }

  async findDecks(
    providedDeckUrls?: string[],
  ): Promise<Record<string, DeckModel>> {
    const deckUrls = providedDeckUrls ?? (await this.findAllDeckUrls());

    const deckDatasets = await Promise.all(
      deckUrls.map((deckUrl) =>
        getSolidDataset(deckUrl, { fetch: this.authService.getFetch() }),
      ),
    );
    console.log("deckDatasets:", deckDatasets);

    const deckThings = deckDatasets
      .map((deckDataset) => getThingAll(deckDataset))
      .flat()
      .filter((deckThing) =>
        thingContains(
          deckThing,
          "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "http://antwika.com/ns/solid-memo#Deck",
        ),
      );
    console.log("deckThings:", deckThings);

    const decks = deckThings.reduce<Record<string, DeckModel>>(
      (acc, deckThing) => {
        const deck = parseDeck({
          iri: deckThing.url,
          version: getStringNoLocale(
            deckThing,
            "http://antwika.com/ns/solid-memo#version",
          ),
          name: getStringNoLocale(
            deckThing,
            "http://antwika.com/ns/solid-memo#name",
          ),
          back: getStringNoLocale(
            deckThing,
            "http://antwika.com/ns/solid-memo#back",
          ),
          isInSolidMemoDataInstance: getUrl(
            deckThing,
            "http://antwika.com/ns/solid-memo#isInSolidMemoDataInstance",
          ),
          hasCard: getUrlAll(
            deckThing,
            "http://antwika.com/ns/solid-memo#hasCard",
          ),
        });
        acc[deck.iri] = deck;
        return acc;
      },
      {},
    );

    return decks;
  }

  async findFlashcards(
    flashcardUrls: string[],
  ): Promise<Record<string, FlashcardModel>> {
    const flashcardDatasets = await Promise.all(
      flashcardUrls.map((flashcardUrl) =>
        getSolidDataset(flashcardUrl, {
          fetch: this.authService.getFetch(),
        }),
      ),
    );

    const flashcardThings = (
      await Promise.all(
        flashcardDatasets.map((flashcardDataset) =>
          getThingAll(flashcardDataset).filter((flashcardThing) =>
            thingContains(
              flashcardThing,
              "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              "http://antwika.com/ns/solid-memo#Flashcard",
            ),
          ),
        ),
      )
    ).flat();

    const flashcards = flashcardThings.reduce<Record<string, FlashcardModel>>(
      (acc, flashcardThing) => {
        const flashcard = parseFlashcard({
          iri: flashcardThing.url,
          version: getStringNoLocale(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#version",
          ),
          front: getStringNoLocale(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#front",
          ),
          back: getStringNoLocale(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#back",
          ),
          isInDeck: getUrl(
            flashcardThing,
            "http://antwika.com/ns/solid-memo#isInDeck",
          ),
        });
        acc[flashcard.iri] = flashcard;
        return acc;
      },
      {},
    );

    return flashcards;
  }

  async createInstance(podLocation: string): Promise<void> {
    console.log("podLocation:", podLocation);

    const privateTypeIndexIris =
      await this.findAllPrivateTypeIndexIrisByWebId();
    console.log("privateTypeIndexIris:", privateTypeIndexIris);

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
      fetch: this.authService.getFetch(),
    });
    console.log("privateTypeIndexDataset:", privateTypeIndexDataset);

    const typeRegistrationThing = createThing({ name: privateTypeIndexName });
    console.log("typeRegistrationThing:", typeRegistrationThing);

    if (!typeRegistrationThing)
      throw new Error("Expected typeRegistrationThing to be defined!");

    const typeRegistrationThingName = uuid().toString();
    const typeRegistrationThingIri = `${privateTypeIndexIri}#${typeRegistrationThingName}`;
    console.log("typeRegistrationThingIri:", typeRegistrationThingIri);

    const instanceName = uuid().toString();
    const instanceIri = `${podLocation}solid-memo/data-${uuid().toString()}#${instanceName}`;
    console.log("instanceIri:", instanceIri);

    const updatedTypeRegistrationThing = buildThing(typeRegistrationThing)
      .addUrl(
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://www.w3.org/ns/solid/terms#TypeRegistration",
      )
      .addUrl(
        "http://www.w3.org/ns/solid/terms#forClass",
        "http://antwika.com/ns/solid-memo#SolidMemoData",
      )
      .addUrl("http://www.w3.org/ns/solid/terms#instance", instanceIri)
      .build();
    console.log("updatedTypeRegistrationThing:", updatedTypeRegistrationThing);

    const updatedPrivateTypeIndexDataset = setThing(
      privateTypeIndexDataset,
      updatedTypeRegistrationThing,
    );
    console.log(
      "updatedPrivateTypeIndexDataset:",
      updatedPrivateTypeIndexDataset,
    );

    const savedPrivateTypeIndexDataset = await saveSolidDatasetAt(
      privateTypeIndexIri,
      updatedPrivateTypeIndexDataset,
      { fetch: this.authService.getFetch() },
    );
    console.log("savedPrivateTypeIndexDataset:", savedPrivateTypeIndexDataset);

    const instanceDataset = createSolidDataset();

    const instanceThing = createThing({ name: instanceName });

    const updatedInstanceThing = buildThing(instanceThing)
      .addUrl(
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://antwika.com/ns/solid-memo#SolidMemoData",
      )
      .addUrl(
        "http://antwika.com/ns/solid-memo#isInPrivateTypeIndex",
        privateTypeIndexIriWithName,
      )
      .addStringNoLocale("http://antwika.com/ns/solid-memo#version", "1")
      .addStringNoLocale(
        "http://antwika.com/ns/solid-memo#name",
        "My new instance",
      )
      .build();

    const updatedInstanceDataset = setThing(
      instanceDataset,
      updatedInstanceThing,
    );

    await saveSolidDatasetAt(instanceIri, updatedInstanceDataset, {
      fetch: this.authService.getFetch(),
    });
  }

  async createDeck(
    instanceIri: string,
    deck: Omit<DeckModel, "iri">,
  ): Promise<Record<string, DeckModel>> {
    const instanceDataset = await getSolidDataset(instanceIri, {
      fetch: this.authService.getFetch(),
    });

    console.log("instanceDataset:", instanceDataset);

    const instanceThing = getThing(instanceDataset, instanceIri);

    console.log("instanceThing:", instanceThing);

    if (!instanceThing)
      throw new Error("Expected instanceThing to be defined!");

    const instanceThingName = uuid().toString();
    const deckIri = `${stripFragment(instanceIri)}#${instanceThingName}`;
    console.log("deckIri:", deckIri);

    const updatedInstanceThing = buildThing(instanceThing)
      .addUrl("http://antwika.com/ns/solid-memo#hasDeck", deckIri)
      .build();
    console.log("updatedInstanceThing:", updatedInstanceThing);

    const updatedInstanceDataset = setThing(
      instanceDataset,
      updatedInstanceThing,
    );
    console.log("updatedInstanceDataset:", updatedInstanceDataset);

    const savedInstanceDataset = await saveSolidDatasetAt(
      instanceIri,
      updatedInstanceDataset,
      { fetch: this.authService.getFetch() },
    );
    console.log("savedInstanceDataset:", savedInstanceDataset);

    const instanceDataset2 = await getSolidDataset(instanceIri, {
      fetch: this.authService.getFetch(),
    });
    console.log("instanceDataset2:", instanceDataset2);

    const deckThing = buildThing({ name: instanceThingName })
      .addUrl(
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://antwika.com/ns/solid-memo#Deck",
      )
      .addStringNoLocale(
        "http://antwika.com/ns/solid-memo#version",
        deck.version,
      )
      .addStringNoLocale("http://antwika.com/ns/solid-memo#name", deck.name)
      .addUrl(
        "http://antwika.com/ns/solid-memo#isInSolidMemoDataInstance",
        deck.isInSolidMemoDataInstance,
      )
      .build();
    console.log("deckThing:", deckThing);

    const updatedInstanceDataset2 = setThing(instanceDataset2, deckThing);
    console.log("updatedInstanceDataset:", updatedInstanceDataset);

    const savedInstanceDataset2 = await saveSolidDatasetAt(
      instanceIri,
      updatedInstanceDataset2,
      { fetch: this.authService.getFetch() },
    );
    console.log("savedInstanceDataset2:", savedInstanceDataset2);

    const foundDecks = await this.findDecks([deckIri]);

    return foundDecks;
  }

  async createFlashcard(
    instanceIri: string,
    deckIri: string,
    flashcard: Omit<FlashcardModel, "iri">,
  ): Promise<void> {
    const deckDataset = await getSolidDataset(deckIri, {
      fetch: this.authService.getFetch(),
    });

    console.log("deckDataset:", deckDataset);

    const deckThing = getThing(deckDataset, deckIri);

    console.log("deckThing:", deckThing);

    if (!deckThing) throw new Error("Expected deckThing to be defined!");

    const flashcardThingName = uuid().toString();
    const flashcardIri = `${stripFragment(instanceIri)}#${flashcardThingName}`;
    console.log("flashcardIri:", flashcardIri);

    const updatedDeckThing = buildThing(deckThing)
      .addUrl("http://antwika.com/ns/solid-memo#hasCard", flashcardIri)
      .build();
    console.log("updatedDeckThing:", updatedDeckThing);

    const updatedDeckDataset = setThing(deckDataset, updatedDeckThing);
    console.log("updatedDeckDataset:", updatedDeckDataset);

    const savedDeckDataset = await saveSolidDatasetAt(
      deckIri,
      updatedDeckDataset,
      { fetch: this.authService.getFetch() },
    );
    console.log("savedDeckDataset:", savedDeckDataset);

    const instanceDataset = await getSolidDataset(instanceIri, {
      fetch: this.authService.getFetch(),
    });
    console.log("instanceDataset:", instanceDataset);

    const flashcardThing = buildThing({ name: flashcardThingName })
      .addUrl(
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://antwika.com/ns/solid-memo#Flashcard",
      )
      .addStringNoLocale(
        "http://antwika.com/ns/solid-memo#version",
        flashcard.version,
      )
      .addStringNoLocale(
        "http://antwika.com/ns/solid-memo#front",
        flashcard.front,
      )
      .addStringNoLocale(
        "http://antwika.com/ns/solid-memo#back",
        flashcard.back,
      )
      .addUrl("http://antwika.com/ns/solid-memo#isInDeck", flashcard.isInDeck)
      .build();
    console.log("flashcardThing:", flashcardThing);

    const updatedInstanceDataset = setThing(instanceDataset, flashcardThing);
    console.log("updatedInstanceDataset:", updatedInstanceDataset);

    const savedInstanceDataset = await saveSolidDatasetAt(
      instanceIri,
      updatedInstanceDataset,
      { fetch: this.authService.getFetch() },
    );
    console.log("savedInstanceDataset:", savedInstanceDataset);
  }

  async deleteInstance(instance: InstanceModel): Promise<void> {
    if (instance.hasDeck.length > 0)
      throw new Error("Clear the instance before deletion");

    const privateTypeIndexIri = instance.isInPrivateTypeIndex;
    const privateTypeIndexDataset = await getSolidDataset(privateTypeIndexIri, {
      fetch: this.authService.getFetch(),
    });

    let updatedPrivateTypeIndexDataset = removeThing(
      privateTypeIndexDataset,
      instance.iri,
    );

    const privateTypeIndexThing = getThing(
      updatedPrivateTypeIndexDataset,
      privateTypeIndexIri,
    );

    if (privateTypeIndexThing) {
      updatedPrivateTypeIndexDataset = removeThing(
        updatedPrivateTypeIndexDataset,
        privateTypeIndexIri,
      );
    }

    await saveSolidDatasetAt(
      privateTypeIndexIri,
      updatedPrivateTypeIndexDataset,
      { fetch: this.authService.getFetch() },
    );

    const instanceDataset = await getSolidDataset(instance.iri, {
      fetch: this.authService.getFetch(),
    });
    const updatedInstanceDataset = removeThing(instanceDataset, instance.iri);
    const savedInstanceDataset = await saveSolidDatasetAt(
      instance.iri,
      updatedInstanceDataset,
      { fetch: this.authService.getFetch() },
    );

    await deleteSolidDataset(savedInstanceDataset, {
      fetch: this.authService.getFetch(),
    });
  }

  async deleteDeck(deck: DeckModel): Promise<void> {
    if (deck.hasCard.length > 0)
      throw new Error("Clear the deck before deletion");

    const instanceIri = deck.isInSolidMemoDataInstance;
    const instanceDataset = await getSolidDataset(instanceIri, {
      fetch: this.authService.getFetch(),
    });

    let updatedInstanceDataset = removeThing(instanceDataset, deck.iri);

    const instanceThing = getThing(updatedInstanceDataset, instanceIri);

    if (instanceThing) {
      const updatedInstanceThing = removeUrl(
        instanceThing,
        "http://antwika.com/ns/solid-memo#hasDeck",
        deck.iri,
      );

      updatedInstanceDataset = setThing(
        updatedInstanceDataset,
        updatedInstanceThing,
      );
    }

    await saveSolidDatasetAt(instanceIri, updatedInstanceDataset, {
      fetch: this.authService.getFetch(),
    });
  }

  async deleteFlashcard(flashcard: FlashcardModel): Promise<void> {
    const deckIri = flashcard.isInDeck;
    const deckDataset = await getSolidDataset(deckIri, {
      fetch: this.authService.getFetch(),
    });

    let updatedDeckDataset = removeThing(deckDataset, flashcard.iri);

    const deckThing = getThing(updatedDeckDataset, deckIri);

    if (deckThing) {
      const updatedDeckThing = removeUrl(
        deckThing,
        "http://antwika.com/ns/solid-memo#hasCard",
        flashcard.iri,
      );

      updatedDeckDataset = setThing(updatedDeckDataset, updatedDeckThing);
    }

    await saveSolidDatasetAt(deckIri, updatedDeckDataset, {
      fetch: this.authService.getFetch(),
    });
  }
}
