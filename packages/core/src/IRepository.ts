import type {
  DeckModel,
  FlashcardModel,
  InstanceModel,
  ScheduleModel,
} from "./domain";

export interface IRepository {
  getSession(): { info: { isLoggedIn: boolean } };

  isLoggedIn(): boolean;

  getFetch(): typeof fetch;

  getWebId(): string | undefined;

  login({
    oidcIssuer,
    redirectUrl,
    clientName,
  }: {
    oidcIssuer: string;
    redirectUrl: string;
    clientName: string;
  }): Promise<void>;

  logout(): Promise<void>;

  handleIncomingRedirect(
    restoreUrlCallback: (url: string) => void
  ): Promise<void>;

  findOidcIssuers(webId: string): Promise<string[]>;

  findAllStorageIris(): Promise<string[]>;

  findAllPrivateTypeIndexIrisByWebId(): Promise<string[]>;

  findAllInstanceUrls(): Promise<string[]>;

  findInstances(
    providedInstanceUrls?: string[]
  ): Promise<Record<string, InstanceModel>>;

  findAllDeckUrls(providedInstanceUrls?: string[]): Promise<string[]>;

  findAllFlashcardUrls(providedDeckUrls?: string[]): Promise<string[]>;

  findAllScheduleUrls(providedInstanceUrls?: string[]): Promise<string[]>;

  findDecks(providedDeckUrls?: string[]): Promise<Record<string, DeckModel>>;

  findFlashcards(
    flashcardUrls: string[]
  ): Promise<Record<string, FlashcardModel>>;

  findSchedules(scheduleUrls: string[]): Promise<Record<string, ScheduleModel>>;

  createInstance(podLocation: string): Promise<void>;

  createDeck(
    instanceIri: string,
    deck: Omit<DeckModel, "iri">
  ): Promise<Record<string, DeckModel>>;

  createFlashcard(
    instanceIri: string,
    deckIri: string,
    flashcard: Omit<FlashcardModel, "iri">
  ): Promise<void>;

  createSchedule(schedule: Omit<ScheduleModel, "iri">): Promise<void>;

  renameInstance(instance: InstanceModel, newName: string): Promise<void>;

  renameDeck(deck: DeckModel, newName: string): Promise<void>;

  updateInstance(instance: InstanceModel): Promise<void>;

  updateDeck(deck: DeckModel): Promise<void>;

  updateFlashcard(flashcard: FlashcardModel): Promise<void>;

  deleteInstance(instance: InstanceModel): Promise<void>;

  deleteDeck(deck: DeckModel): Promise<void>;

  deleteFlashcard(flashcard: FlashcardModel): Promise<void>;

  deleteSchedule(flashcard: ScheduleModel): Promise<void>;
}
