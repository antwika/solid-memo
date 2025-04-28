import type { IService } from "@services/index";
import type { IRepository } from "@repositories/index";
import type { DeckModel, FlashcardModel, InstanceModel } from "@domain/index";

export default class SolidService implements IService {
  async discoverEverything(repository: IRepository) {
    const instanceUrls = await repository.findAllInstanceUrls();
    const deckUrls = await repository.findAllDeckUrls(instanceUrls);
    const flashcardUrls = await repository.findAllFlashcardUrls(deckUrls);
    return { instanceUrls, deckUrls, flashcardUrls };
  }

  async discoverInstanceUrls(repository: IRepository) {
    return repository.findAllInstanceUrls();
  }

  async newPrivateTypeIndex(repository: IRepository) {
    const storageIris = await repository.findAllStorageIris();

    if (storageIris.length === 0) throw new Error("No storage iris found");
    if (storageIris.length > 1) throw new Error("Too many storage iris found");

    const storageIri = storageIris[0];

    if (!storageIri) throw new Error("Failed to pick storage iri");

    await repository.createPrivateTypeIndex(storageIri);

    const privateTypeIndexIris =
      await repository.findAllPrivateTypeIndexIrisByWebId();

    return { privateTypeIndexUrls: privateTypeIndexIris };
  }

  async newInstance(repository: IRepository) {
    const storageIris = await repository.findAllStorageIris();

    if (storageIris.length === 0) throw new Error("No storage iris found");
    if (storageIris.length > 1) throw new Error("Too many storage iris found");

    const storageIri = storageIris[0];

    if (!storageIri) throw new Error("Failed to pick storage iri");

    await repository.createInstance(storageIri);

    const instanceUrls = await repository.findAllInstanceUrls();

    const instances = await repository.findInstances(instanceUrls);

    return { instanceUrls, instances };
  }

  async newDeck(repository: IRepository, deck: Omit<DeckModel, "iri">) {
    const decks = await repository.createDeck(
      deck.isInSolidMemoDataInstance,
      deck
    );
    return { decks };
  }

  async newFlashcard(
    repository: IRepository,
    instanceIri: string,
    flashcard: Omit<FlashcardModel, "iri">
  ) {
    await repository.createFlashcard(
      instanceIri,
      flashcard.isInDeck,
      flashcard
    );
    const decks = await repository.findDecks([flashcard.isInDeck]);
    return { decks };
  }

  async getInstance(repository: IRepository, instanceUrl: string) {
    return repository.findInstances([instanceUrl]);
  }

  async getDeck(repository: IRepository, deckUrl: string) {
    return repository.findDecks([deckUrl]);
  }

  async getFlashcard(repository: IRepository, flashcardUrl: string) {
    return repository.findFlashcards([flashcardUrl]);
  }

  async removeInstance(repository: IRepository, instance: InstanceModel) {
    await repository.deleteInstance(instance);
    const instanceUrls = await repository.findAllInstanceUrls();
    const instances = await repository.findInstances(instanceUrls);
    return { instanceUrls, instances };
  }

  async removeDeck(repository: IRepository, deck: DeckModel) {
    await repository.deleteDeck(deck);
    const instanceUrls = await repository.findAllInstanceUrls();
    const instances = await repository.findInstances(instanceUrls);
    const deckUrls = await repository.findAllDeckUrls([
      deck.isInSolidMemoDataInstance,
    ]);
    const decks = await repository.findDecks(deckUrls);
    return { instances, deckUrls, decks };
  }

  async removeFlashcard(repository: IRepository, flashcard: FlashcardModel) {
    await repository.deleteFlashcard(flashcard);
    const decks = await repository.findDecks([flashcard.isInDeck]);
    const flashcardUrls = await repository.findAllFlashcardUrls([
      flashcard.isInDeck,
    ]);
    const flashcards = await repository.findFlashcards(flashcardUrls);

    const deck = decks[0];

    return { deck, flashcardUrls, flashcards };
  }
}
