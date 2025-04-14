import type { DeckModel, FlashcardModel, InstanceModel } from "@domain/index";
import type { Session } from "@inrupt/solid-client-authn-browser";
export { default as SolidRepository } from "./solid.repository";

export interface IRepository {
  findAllStorageIris(session: Session): Promise<string[]>;

  findAllPrivateTypeIndexIrisByWebId(session: Session): Promise<string[]>;

  findAllInstanceUrls(session: Session): Promise<string[]>;

  findInstances(
    session: Session,
    providedInstanceUrls?: string[],
  ): Promise<Record<string, InstanceModel>>;

  findAllDeckUrls(
    session: Session,
    providedInstanceUrls?: string[],
  ): Promise<string[]>;

  findAllFlashcardUrls(
    session: Session,
    providedDeckUrls?: string[],
  ): Promise<string[]>;

  findDecks(
    session: Session,
    providedDeckUrls?: string[],
  ): Promise<Record<string, DeckModel>>;

  findFlashcards(
    session: Session,
    flashcardUrls: string[],
  ): Promise<Record<string, FlashcardModel>>;

  createInstance(session: Session, podLocation: string): Promise<void>;

  createDeck(
    session: Session,
    instanceIri: string,
    deck: Omit<DeckModel, "iri">,
  ): Promise<Record<string, DeckModel>>;

  createFlashcard(
    session: Session,
    instanceIri: string,
    deckIri: string,
    flashcard: Omit<FlashcardModel, "iri">,
  ): Promise<void>;

  deleteInstance(session: Session, instance: InstanceModel): Promise<void>;

  deleteDeck(session: Session, deck: DeckModel): Promise<void>;

  deleteFlashcard(session: Session, flashcard: FlashcardModel): Promise<void>;
}
