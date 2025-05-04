import type { DeckModel, FlashcardModel, InstanceModel } from "@domain/index";
import type { IRepository } from "@repositories/index";

export interface IService {
  discoverEverything(repository: IRepository): Promise<{
    instanceUrls: string[];
    deckUrls: string[];
    flashcardUrls: string[];
  }>;

  discoverInstanceUrls(repository: IRepository): Promise<string[]>;

  newInstance(repository: IRepository): Promise<{
    instanceUrls: string[];
    instances: Record<string, InstanceModel>;
  }>;

  newDeck(
    repository: IRepository,
    deck: Omit<DeckModel, "iri">
  ): Promise<{ decks: Record<string, DeckModel> }>;

  newFlashcard(
    repository: IRepository,
    instanceIri: string,
    flashcard: Omit<FlashcardModel, "iri">
  ): Promise<{ decks: Record<string, DeckModel> }>;

  getInstance(
    repository: IRepository,
    instanceUrl: string
  ): Promise<Record<string, InstanceModel>>;

  getDeck(
    repository: IRepository,
    deckUrl: string
  ): Promise<Record<string, DeckModel>>;

  getFlashcard(
    repository: IRepository,
    flashcardUrl: string
  ): Promise<Record<string, FlashcardModel>>;

  renameInstance(
    repository: IRepository,
    instance: InstanceModel,
    newName: string
  ): Promise<void>;

  renameDeck(
    repository: IRepository,
    deck: DeckModel,
    newName: string
  ): Promise<void>;

  removeInstance(
    repository: IRepository,
    instance: InstanceModel
  ): Promise<{
    instanceUrls: string[];
    instances: Record<string, InstanceModel>;
  }>;

  removeDeck(
    repository: IRepository,
    deck: DeckModel
  ): Promise<{
    instances: Record<string, InstanceModel>;
    deckUrls: string[];
    decks: Record<string, DeckModel>;
  }>;

  removeFlashcard(
    repository: IRepository,
    flashcard: FlashcardModel
  ): Promise<{
    deck: DeckModel | undefined;
    flashcardUrls: string[];
    flashcards: Record<string, FlashcardModel>;
  }>;
}
