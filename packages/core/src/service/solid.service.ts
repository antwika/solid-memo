import type { IService } from "../ISolidService";
import type { IRepository } from "../IRepository";
import type { DeckModel, FlashcardModel, InstanceModel } from "../domain";

export class SolidService implements IService {
  private readonly repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async discoverEverything() {
    const instanceUrls = await this.repository.findAllInstanceUrls();
    const deckUrls = await this.repository.findAllDeckUrls(instanceUrls);
    const flashcardUrls = await this.repository.findAllFlashcardUrls(deckUrls);
    return { instanceUrls, deckUrls, flashcardUrls };
  }

  async discoverInstanceUrls() {
    return this.repository.findAllInstanceUrls();
  }

  async newInstance() {
    const storageIris = await this.repository.findAllStorageIris();

    if (storageIris.length === 0) throw new Error("No storage iris found");
    if (storageIris.length > 1) throw new Error("Too many storage iris found");

    const storageIri = storageIris[0];

    if (typeof storageIri !== "string")
      throw new Error("Failed to discover storage to put instance in");

    await this.repository.createInstance(storageIri);

    const instanceUrls = await this.repository.findAllInstanceUrls();

    const instances = await this.repository.findInstances(instanceUrls);

    return { instanceUrls, instances };
  }

  async newDeck(deck: Omit<DeckModel, "iri">) {
    const decks = await this.repository.createDeck(
      deck.isInSolidMemoDataInstance,
      deck
    );
    return { decks };
  }

  async newFlashcard(
    instanceIri: string,
    flashcard: Omit<FlashcardModel, "iri">
  ) {
    await this.repository.createFlashcard(
      instanceIri,
      flashcard.isInDeck,
      flashcard
    );
    const decks = await this.repository.findDecks([flashcard.isInDeck]);
    return { decks };
  }

  async getInstance(instanceUrl: string) {
    return this.repository.findInstances([instanceUrl]);
  }

  async getDeck(deckUrl: string) {
    return this.repository.findDecks([deckUrl]);
  }

  async getFlashcard(flashcardUrl: string) {
    return this.repository.findFlashcards([flashcardUrl]);
  }

  async renameInstance(instance: InstanceModel, newName: string) {
    await this.repository.renameInstance(instance, newName);
  }

  async renameDeck(deck: DeckModel, newName: string) {
    await this.repository.renameDeck(deck, newName);
  }

  async removeInstance(instance: InstanceModel) {
    await this.repository.deleteInstance(instance);
    const instanceUrls = await this.repository.findAllInstanceUrls();
    const instances = await this.repository.findInstances(instanceUrls);
    return { instanceUrls, instances };
  }

  async removeDeck(deck: DeckModel) {
    await this.repository.deleteDeck(deck);
    const instanceUrls = await this.repository.findAllInstanceUrls();
    const instances = await this.repository.findInstances(instanceUrls);
    const deckUrls = await this.repository.findAllDeckUrls([
      deck.isInSolidMemoDataInstance,
    ]);
    const decks = await this.repository.findDecks(deckUrls);
    return { instances, deckUrls, decks };
  }

  async removeFlashcard(flashcard: FlashcardModel) {
    await this.repository.deleteFlashcard(flashcard);
    const decks = await this.repository.findDecks([flashcard.isInDeck]);
    const flashcardUrls = await this.repository.findAllFlashcardUrls([
      flashcard.isInDeck,
    ]);
    const flashcards = await this.repository.findFlashcards(flashcardUrls);

    const deck = decks[flashcard.isInDeck];

    return { deck, flashcardUrls, flashcards };
  }

  async updateInstance(instance: InstanceModel) {
    await this.repository.updateInstance(instance);
  }

  async updateDeck(deck: DeckModel) {
    await this.repository.updateDeck(deck);
  }

  async updateFlashcard(flashcard: FlashcardModel) {
    await this.repository.updateFlashcard(flashcard);
  }

  async resetFlashcard(flashcard: FlashcardModel): Promise<void> {
    await this.repository.resetFlashcard(flashcard);
  }
}
