import type { DeckModel, FlashcardModel, InstanceModel } from "./domain";

export interface IService {
  discoverEverything(): Promise<{
    instanceUrls: string[];
    deckUrls: string[];
    flashcardUrls: string[];
  }>;

  discoverInstanceUrls(): Promise<string[]>;

  newInstance(): Promise<{
    instanceUrls: string[];
    instances: Record<string, InstanceModel>;
  }>;

  newDeck(
    deck: Omit<DeckModel, "iri">
  ): Promise<{ decks: Record<string, DeckModel> }>;

  newFlashcard(
    instanceIri: string,
    flashcard: Omit<FlashcardModel, "iri">
  ): Promise<{ decks: Record<string, DeckModel> }>;

  getInstance(instanceUrl: string): Promise<Record<string, InstanceModel>>;

  getDeck(deckUrl: string): Promise<Record<string, DeckModel>>;

  getFlashcard(flashcardUrl: string): Promise<Record<string, FlashcardModel>>;

  renameInstance(instance: InstanceModel, newName: string): Promise<void>;

  renameDeck(deck: DeckModel, newName: string): Promise<void>;

  updateInstance(instance: InstanceModel): Promise<void>;

  updateDeck(deck: DeckModel): Promise<void>;

  updateFlashcard(flashcard: FlashcardModel): Promise<void>;

  resetFlashcard(flashcard: FlashcardModel): Promise<void>;

  removeInstance(instance: InstanceModel): Promise<{
    instanceUrls: string[];
    instances: Record<string, InstanceModel>;
  }>;

  removeDeck(deck: DeckModel): Promise<{
    instances: Record<string, InstanceModel>;
    deckUrls: string[];
    decks: Record<string, DeckModel>;
  }>;

  removeFlashcard(flashcard: FlashcardModel): Promise<{
    deck: DeckModel | undefined;
    flashcardUrls: string[];
    flashcards: Record<string, FlashcardModel>;
  }>;
}
