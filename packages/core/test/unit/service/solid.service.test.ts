import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { SolidService } from "../../../src/service/solid.service";
import type { IRepository } from "../../../src/IRepository";
import type { IService } from "../../../src/ISolidService";
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
    resetFlashcard: vi.fn(),
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

    test("success", async () => {
      // Arrange
      const mockInstanceIri = "mock-instance-iri";
      const mockStorageIri = "mock-storage-iri";
      const mockInstance = {
        iri: "mock-iri",
        version: "mock-version",
        name: "mock-name",
        hasDeck: ["mock-deck-iri"],
        isInPrivateTypeIndex: "mock-private-type-index-iri",
      };

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
    const mockDeckIri = "mock-deck-iri";
    const mockDeck = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      isInSolidMemoDataInstance: "mock-instance-iri",
      hasCard: ["mock-flashcard-iri"],
    };

    const mockDecks: Record<string, DeckModel> = {
      [mockDeckIri]: mockDeck,
    };

    when(mockRepository.createDeck)
      .calledWith("mock-instance-iri", mockDeck)
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
    const mockDeck: DeckModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      isInSolidMemoDataInstance: "mock-instance-iri",
      hasCard: ["mock-flashcard-iri"],
    };
    const mockFlashcard: FlashcardModel = {
      iri: "mock-iri",
      isInDeck: mockDeckIri,
      version: "mock-version",
      isInSolidMemoDataInstance: "mock-instance-iri",
      front: "mock-front",
      back: "mock-back",
      interval: 1,
      easeFactor: 2,
      repetition: 3,
      lastReviewed: new Date(1),
    };

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
    const mockInstance: InstanceModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      hasDeck: ["mock-deck-iri"],
      isInPrivateTypeIndex: "mock-private-type-index-iri",
    };

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
    const mockDeck: DeckModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      hasCard: ["mock-flashcard-iri"],
      isInSolidMemoDataInstance: "mock-instance-iri",
    };

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
    const mockFlashcard: FlashcardModel = {
      iri: "mock-iri",
      version: "mock-version",
      front: "mock-front",
      back: "mock-back",
      isInSolidMemoDataInstance: "mock-instance-iri",
      isInDeck: "mock-deck-iri",
      interval: 1,
      easeFactor: 2,
      repetition: 3,
      lastReviewed: new Date(1),
    };

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
    const mockInstance: InstanceModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      hasDeck: ["mock-deck-iri"],
      isInPrivateTypeIndex: "mock-private-type-index-iri",
    };

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
    const mockDeck: DeckModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      hasCard: ["mock-flashcard-iri"],
      isInSolidMemoDataInstance: "mock-instance-iri",
    };

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
    const mockInstance: InstanceModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      hasDeck: ["mock-deck-iri"],
      isInPrivateTypeIndex: "mock-private-type-index-iri",
    };

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
    const mockInstance: InstanceModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      hasDeck: ["mock-deck-iri"],
      isInPrivateTypeIndex: "mock-private-type-index-iri",
    };
    const mockDeckIri = "mock-deck-iri";
    const mockDeck: DeckModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      isInSolidMemoDataInstance: mockInstanceIri,
      hasCard: ["mock-flashcard-iri"],
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
    const mockDeck: DeckModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      hasCard: ["mock-flashcard-iri"],
      isInSolidMemoDataInstance: "mock-instance-iri",
    };
    const mockFlashcardIri = "mock-flashcard-iri";
    const mockFlashcard: FlashcardModel = {
      isInDeck: mockDeckIri,
      iri: "mock-iri",
      version: "mock-version",
      isInSolidMemoDataInstance: "mock-instance-iri",
      front: "mock-front",
      back: "mock-back",
      interval: 1,
      easeFactor: 2,
      repetition: 3,
      lastReviewed: new Date(1),
    };

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

  test("updateInstance", async () => {
    // Arrange
    const mockInstance: InstanceModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      hasDeck: ["mock-deck-iri"],
      isInPrivateTypeIndex: "mock-private-type-index-iri",
    };

    // Act
    await solidService.updateInstance(mockInstance);

    // Assert
    expect(mockRepository.updateInstance).toHaveBeenCalledWith(mockInstance);
  });

  test("updateDeck", async () => {
    // Arrange
    const mockDeck: DeckModel = {
      iri: "mock-iri",
      version: "mock-version",
      name: "mock-name",
      hasCard: ["mock-flashcard-iri"],
      isInSolidMemoDataInstance: "mock-instance-iri",
    };

    // Act
    await solidService.updateDeck(mockDeck);

    // Assert
    expect(mockRepository.updateDeck).toHaveBeenCalledWith(mockDeck);
  });

  test("updateFlashcard", async () => {
    // Arrange
    const mockFlashcard: FlashcardModel = {
      iri: "mock-iri",
      version: "mock-version",
      isInSolidMemoDataInstance: "mock-instance-iri",
      front: "mock-front",
      back: "mock-back",
      isInDeck: "mock-deck-iri",
      interval: 1,
      easeFactor: 2,
      repetition: 3,
      lastReviewed: new Date(1),
    };

    // Act
    await solidService.updateFlashcard(mockFlashcard);

    // Assert
    expect(mockRepository.updateFlashcard).toHaveBeenCalledWith(mockFlashcard);
  });

  test("resetFlashcard", async () => {
    // Arrange
    const mockFlashcard: FlashcardModel = {
      iri: "mock-iri",
      version: "mock-version",
      isInSolidMemoDataInstance: "mock-instance-iri",
      front: "mock-front",
      back: "mock-back",
      isInDeck: "mock-deck-iri",
      interval: 5,
      easeFactor: 6,
      repetition: 7,
      lastReviewed: new Date(1),
    };

    // Act
    await solidService.resetFlashcard(mockFlashcard);

    // Assert
    expect(mockRepository.resetFlashcard).toHaveBeenCalledWith(mockFlashcard);
  });
});
