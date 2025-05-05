import { afterEach, beforeAll, describe, expect, it, test, vi } from "vitest";
import { SolidService } from "../../../src/service/solid.service";
import { IRepository } from "../../../src/IRepository";
import { IService } from "../../../src/ISolidService";
import type { InstanceModel } from "../../../src/domain/instance.model";
import type { DeckModel } from "../../../src/domain/deck.model";
import type { FlashcardModel } from "../../../src/domain/flashcard.model";
import { when } from "vitest-when";

describe("solid.service", () => {
  const mockRepository: IRepository = {
    getSession: vi.fn(),
    isLoggedIn: vi.fn(),
    getFetch: vi.fn(),
    getWebId: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    handleIncomingRedirect: vi.fn(),
    findOidcIssuers: vi.fn(),
    findAllStorageIris: vi.fn(),
    findAllPrivateTypeIndexIrisByWebId: vi.fn(),
    findAllInstanceUrls: vi.fn(),
    findInstances: vi.fn(),
    findAllDeckUrls: vi.fn(),
    findAllFlashcardUrls: vi.fn(),
    findDecks: vi.fn(),
    findFlashcards: vi.fn(),
    createInstance: vi.fn(),
    createDeck: vi.fn(),
    createFlashcard: vi.fn(),
    renameInstance: vi.fn(),
    renameDeck: vi.fn(),
    updateInstance: vi.fn(),
    updateDeck: vi.fn(),
    updateFlashcard: vi.fn(),
    deleteInstance: vi.fn(),
    deleteDeck: vi.fn(),
    deleteFlashcard: vi.fn(),
  };

  let solidService: IService;

  beforeAll(() => {
    solidService = new SolidService(mockRepository as unknown as IRepository);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("discoverEverything", async () => {
    // Arrange
    const mockInstanceIri = "mock-instance-iri";
    const mockDeckIri = "mock-deck-iri";
    const mockFlashcardIri = "mock-flashcard-iri";

    when(mockRepository.findAllInstanceUrls, { times: 1 })
      .calledWith()
      .thenResolve([mockInstanceIri]);

    when(mockRepository.findAllDeckUrls, { times: 1 })
      .calledWith([mockInstanceIri])
      .thenResolve([mockDeckIri]);

    when(mockRepository.findAllFlashcardUrls, { times: 1 })
      .calledWith([mockDeckIri])
      .thenResolve([mockFlashcardIri]);

    // Act
    const { instanceUrls, deckUrls, flashcardUrls } =
      await solidService.discoverEverything();

    // Assert
    expect(instanceUrls).toStrictEqual([mockInstanceIri]);
    expect(deckUrls).toStrictEqual([mockDeckIri]);
    expect(flashcardUrls).toStrictEqual([mockFlashcardIri]);
  });

  test("discoverInstanceUrls", async () => {
    // Arrange
    const mockInstanceIri = "mock-iri";

    when(mockRepository.findAllInstanceUrls)
      .calledWith()
      .thenResolve([mockInstanceIri]);

    // Act
    const instanceIris = await solidService.discoverInstanceUrls();

    // Assert
    expect(instanceIris).toStrictEqual([mockInstanceIri]);
  });

  describe("newInstance", () => {
    test("when no storages are found > then throw error", async () => {
      // Arrange
      when(mockRepository.findAllStorageIris).calledWith().thenResolve([]);

      // Act & Assert
      await expect(() => solidService.newInstance()).rejects.toThrowError(
        /^No storage iris found$/
      );
    });

    test("when too many storages are found > then throw error", async () => {
      // Arrange
      when(mockRepository.findAllStorageIris)
        .calledWith()
        .thenResolve(["mock-storage-iri-1", "mock-storage-iri-2"]);

      // Act & Assert
      await expect(() => solidService.newInstance()).rejects.toThrowError(
        /^Too many storage iris found$/
      );
    });

    test("when a storage is found but it is not 'string' type > then throw error", async () => {
      // Arrange
      when(mockRepository.findAllStorageIris)
        .calledWith()
        .thenResolve([undefined]);

      // Act & Assert
      await expect(() => solidService.newInstance()).rejects.toThrowError(
        /^Failed to discover storage to put instance in$/
      );
    });

    test("success", async () => {
      // Arrange
      const mockInstanceIri = "mock-instance-iri";
      const mockStorageIri = "mock-storage-iri";
      const mockInstance = {};

      const mockInstances: Record<string, InstanceModel> = {
        [mockInstanceIri]: mockInstance,
      };

      when(mockRepository.findAllInstanceUrls)
        .calledWith()
        .thenResolve([mockInstanceIri]);

      when(mockRepository.findInstances)
        .calledWith([mockInstanceIri])
        .thenResolve(mockInstances);

      // Arrange
      when(mockRepository.findAllStorageIris)
        .calledWith()
        .thenResolve([mockStorageIri]);

      // Act
      const result = await solidService.newInstance();

      // Assert
      expect(mockRepository.createInstance).toHaveBeenCalledWith(
        mockStorageIri
      );
      expect(mockRepository.findAllInstanceUrls).toHaveBeenCalledWith();
      expect(result.instanceUrls).toStrictEqual([mockInstanceIri]);
      expect(result.instances).toBe(mockInstances);
    });
  });

  test("newDeck", async () => {
    // Arrange
    const mockInstanceIri = "mock-instance-iri";
    const mockDeckIri = "mock-deck-iri";
    const mockDeck = { isInSolidMemoDataInstance: mockInstanceIri };

    const mockDecks: Record<string, DeckModel> = {
      [mockDeckIri]: mockDeck,
    };

    when(mockRepository.createDeck)
      .calledWith(mockInstanceIri, mockDeck)
      .thenResolve(mockDecks);

    // Act
    const result = await solidService.newDeck(mockDeck);

    // Assert
    expect(result.decks).toBe(mockDecks);
  });

  test("newFlashcard", async () => {
    // Arrange
    const mockInstanceIri = "mock-instance-iri";
    const mockDeckIri = "mock-deck-iri";
    const mockDeck = {};
    const mockFlashcard = { isInDeck: mockDeckIri };

    const mockDecks: Record<string, DeckModel> = {
      [mockDeckIri]: mockDeck,
    };

    when(mockRepository.findDecks)
      .calledWith([mockFlashcard.isInDeck])
      .thenResolve(mockDecks);

    // Act
    const result = await solidService.newFlashcard(
      mockInstanceIri,
      mockFlashcard
    );

    // Assert
    expect(mockRepository.createFlashcard).toHaveBeenCalledWith(
      mockInstanceIri,
      mockFlashcard.isInDeck,
      mockFlashcard
    );
    expect(result.decks).toBe(mockDecks);
  });

  test("getInstance", async () => {
    // Arrange
    const mockInstanceIri = "mock-instance-iri";
    const mockInstance = {};

    const mockInstances: Record<string, InstanceModel> = {
      [mockInstanceIri]: mockInstance,
    };

    when(mockRepository.findInstances)
      .calledWith([mockInstanceIri])
      .thenResolve(mockInstances);

    // Act
    const instances = await solidService.getInstance(mockInstanceIri);

    // Assert
    expect(instances).toBe(mockInstances);
  });

  test("getDeck", async () => {
    // Arrange
    const mockDeckIri = "mock-deck-iri";
    const mockDeck = {};

    const mockDecks: Record<string, DeckModel> = {
      [mockDeckIri]: mockDeck,
    };

    when(mockRepository.findDecks)
      .calledWith([mockDeckIri])
      .thenResolve(mockDecks);

    // Act
    const decks = await solidService.getDeck(mockDeckIri);

    // Assert
    expect(decks).toBe(mockDecks);
  });

  test("getFlashcard", async () => {
    // Arrange
    const mockFlashcardIri = "mock-instance-iri";
    const mockFlashcard = {};

    const mockFlashcards: Record<string, FlashcardModel> = {
      [mockFlashcardIri]: mockFlashcard,
    };

    when(mockRepository.findFlashcards)
      .calledWith([mockFlashcardIri])
      .thenResolve(mockFlashcards);

    // Act
    const flashcards = await solidService.getFlashcard(mockFlashcardIri);

    // Assert
    expect(flashcards).toBe(mockFlashcards);
  });

  test("renameInstance", async () => {
    // Arrange
    const mockInstance = {};

    // Act
    await solidService.renameInstance(mockInstance, "new-instance-name");

    // Assert
    expect(mockRepository.renameInstance).toHaveBeenCalledWith(
      mockInstance,
      "new-instance-name"
    );
  });

  test("renameDeck", async () => {
    // Arrange
    const mockDeck = {};

    // Act
    await solidService.renameDeck(mockDeck, "new-deck-name");

    // Assert
    expect(mockRepository.renameDeck).toHaveBeenCalledWith(
      mockDeck,
      "new-deck-name"
    );
  });

  test("removeInstance", async () => {
    // Arrange
    const mockInstanceIri = "mock-instance-iri";
    const mockInstance = {};

    const mockInstances: Record<string, InstanceModel> = {
      [mockInstanceIri]: mockInstance,
    };

    when(mockRepository.findAllInstanceUrls)
      .calledWith()
      .thenResolve([mockInstanceIri]);

    when(mockRepository.findInstances)
      .calledWith([mockInstanceIri])
      .thenResolve(mockInstances);

    // Act
    const { instanceUrls, instances } = await solidService.removeInstance(
      mockInstance
    );

    // Assert
    expect(mockRepository.deleteInstance).toHaveBeenCalledWith(mockInstance);
    expect(instanceUrls).toStrictEqual([mockInstanceIri]);
    expect(instances).toBe(mockInstances);
  });

  test("removeDeck", async () => {
    // Arrange
    const mockInstanceIri = "mock-instance-iri";
    const mockInstance = {};
    const mockDeckIri = "mock-deck-iri";
    const mockDeck = {
      isInSolidMemoDataInstance: mockInstanceIri,
    };

    const mockInstances: Record<string, InstanceModel> = {
      [mockInstanceIri]: mockInstance,
    };

    const mockDecks: Record<string, DeckModel> = {
      [mockDeckIri]: mockDeck,
    };

    when(mockRepository.findAllInstanceUrls)
      .calledWith()
      .thenResolve([mockInstanceIri]);

    when(mockRepository.findInstances)
      .calledWith([mockInstanceIri])
      .thenResolve(mockInstances);

    when(mockRepository.findAllDeckUrls)
      .calledWith([mockDeck.isInSolidMemoDataInstance])
      .thenResolve([mockDeckIri]);

    when(mockRepository.findDecks)
      .calledWith([mockDeckIri])
      .thenResolve(mockDecks);

    // Act
    const { instances, deckUrls, decks } = await solidService.removeDeck(
      mockDeck
    );

    // Assert
    expect(mockRepository.deleteDeck).toHaveBeenCalledWith(mockDeck);
    expect(instances).toBe(mockInstances);
    expect(deckUrls).toStrictEqual([mockDeckIri]);
    expect(decks).toBe(mockDecks);
  });

  test("removeFlashcard", async () => {
    // Arrange
    const mockDeckIri = "mock-deck-iri";
    const mockDeck = {};
    const mockFlashcardIri = "mock-flashcard-iri";
    const mockFlashcard = { isInDeck: mockDeckIri };

    const mockDecks: Record<string, DeckModel> = {
      [mockDeckIri]: mockDeck,
    };

    const mockFlashcards: Record<string, FlashcardModel> = {
      [mockFlashcardIri]: mockFlashcard,
    };

    when(mockRepository.findDecks)
      .calledWith([mockFlashcard.isInDeck])
      .thenResolve(mockDecks);

    when(mockRepository.findAllFlashcardUrls)
      .calledWith([mockDeckIri])
      .thenResolve([mockFlashcardIri]);

    when(mockRepository.findFlashcards)
      .calledWith([mockFlashcardIri])
      .thenResolve(mockFlashcards);

    // Act
    const { deck, flashcardUrls, flashcards } =
      await solidService.removeFlashcard(mockFlashcard);

    // Assert
    expect(mockRepository.deleteFlashcard).toHaveBeenCalledWith(mockFlashcard);
    expect(deck).toBe(mockDeck);
    expect(flashcardUrls).toStrictEqual([mockFlashcardIri]);
    expect(flashcards).toBe(mockFlashcards);
  });

  test("updateInstance", () => {
    // Arrange
    const mockInstance = {};

    // Act
    solidService.updateInstance(mockInstance);

    // Assert
    expect(mockRepository.updateInstance).toHaveBeenCalledWith(mockInstance);
  });

  test("updateDeck", () => {
    // Arrange
    const mockDeck = {};

    // Act
    solidService.updateDeck(mockDeck);

    // Assert
    expect(mockRepository.updateDeck).toHaveBeenCalledWith(mockDeck);
  });

  test("updateFlashcard", () => {
    // Arrange
    const mockFlashcard = {};

    // Act
    solidService.updateFlashcard(mockFlashcard);

    // Assert
    expect(mockRepository.updateFlashcard).toHaveBeenCalledWith(mockFlashcard);
  });
});
