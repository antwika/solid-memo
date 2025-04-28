import type { DeckModel, FlashcardModel, InstanceModel } from "@domain/index";
import type { IRepository } from "@repositories/index";
export { default as AuthService } from "./auth.service";
export { default as SolidService } from "./solid.service";

export interface IAuthService {
  isLoggedIn(): boolean;
  getWebId(): string | undefined;
  getFetch(): typeof fetch;
  logIn(props: {
    oidcIssuer: string;
    redirectUrl: string;
    clientName: string;
  }): Promise<void>;
  logOut(): Promise<void>;
  handleIncomingRedirect(): Promise<void>;
}

export interface IService {
  discoverEverything(repository: IRepository): Promise<{
    instanceUrls: string[];
    deckUrls: string[];
    flashcardUrls: string[];
  }>;

  discoverInstanceUrls(repository: IRepository): Promise<string[]>;

  newPrivateTypeIndex(repository: IRepository): Promise<{
    privateTypeIndexUrls: string[];
  }>;

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
