import type { DeckModel, FlashcardModel, InstanceModel } from "@domain/index";
export { default as SolidRepository } from "./solid.repository";

export interface IRepository {
  findAllStorageIris(): Promise<string[]>;

  findAllPrivateTypeIndexIrisByWebId(): Promise<string[]>;

  findAllInstanceUrls(): Promise<string[]>;

  findInstances(
    providedInstanceUrls?: string[],
  ): Promise<Record<string, InstanceModel>>;

  findAllDeckUrls(providedInstanceUrls?: string[]): Promise<string[]>;

  findAllFlashcardUrls(providedDeckUrls?: string[]): Promise<string[]>;

  findDecks(providedDeckUrls?: string[]): Promise<Record<string, DeckModel>>;

  findFlashcards(
    flashcardUrls: string[],
  ): Promise<Record<string, FlashcardModel>>;

  createInstance(podLocation: string): Promise<void>;

  createDeck(
    instanceIri: string,
    deck: Omit<DeckModel, "iri">,
  ): Promise<Record<string, DeckModel>>;

  createFlashcard(
    instanceIri: string,
    deckIri: string,
    flashcard: Omit<FlashcardModel, "iri">,
  ): Promise<void>;

  deleteInstance(instance: InstanceModel): Promise<void>;

  deleteDeck(deck: DeckModel): Promise<void>;

  deleteFlashcard(flashcard: FlashcardModel): Promise<void>;
}
