import { when } from "vitest-when";
import {
  AuthService,
  type IAuthService,
  type IRepository,
} from "../../../src/index";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";

describe("auth.service", () => {
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
    deleteInstance: vi.fn(),
    deleteDeck: vi.fn(),
    deleteFlashcard: vi.fn(),
  };

  let authService: IAuthService;

  beforeAll(() => {
    authService = new AuthService(mockRepository as unknown as IRepository);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("isLoggedIn", () => {
    // Arrange
    const mockLoggedIn = true;

    when(mockRepository.isLoggedIn).calledWith().thenReturn(mockLoggedIn);

    // Act & Assert
    expect(authService.isLoggedIn()).toBe(mockLoggedIn);
  });

  test("getWebId", () => {
    // Arrange
    const mockWebId = "mock-web-id";

    when(mockRepository.getWebId).calledWith().thenReturn(mockWebId);

    // Act & Assert
    expect(authService.getWebId()).toBe(mockWebId);
  });

  test("getFetch", () => {
    // Arrange
    const mockFetch = vi.fn();

    when(mockRepository.getFetch).calledWith().thenReturn(mockFetch);

    // Act & Assert
    expect(authService.getFetch()).toBe(mockFetch);
  });

  test("logInWithOidcIssuer", async () => {
    // Arrange
    const mockOidcIssuer = "mock-oidc-issuer";
    const mockRedirectUrl = "mock-redirect-url";
    const mockClientName = "mock-client-name";

    // Act
    await authService.logInWithOidcIssuer({
      oidcIssuer: mockOidcIssuer,
      redirectUrl: mockRedirectUrl,
      clientName: mockClientName,
    });

    // Assert
    expect(mockRepository.login).toHaveBeenCalledWith({
      oidcIssuer: mockOidcIssuer,
      redirectUrl: mockRedirectUrl,
      clientName: mockClientName,
    });
  });

  describe("logInWithWebId", () => {
    test("when too many oidc issuers are found in WebID > then throw error", async () => {
      // Arrange
      const mockWebId = "mock-web-id";
      const mockOidcIssuer1 = "mock-oidc-issuer-1";
      const mockOidcIssuer2 = "mock-oidc-issuer-2";
      const mockRedirectUrl = "mock-redirect-url";
      const mockClientName = "mock-client-name";

      when(mockRepository.findOidcIssuers)
        .calledWith(mockWebId)
        .thenResolve([mockOidcIssuer1, mockOidcIssuer2]);

      // Act & Assert
      await expect(() =>
        authService.logInWithWebId({
          webId: mockWebId,
          redirectUrl: mockRedirectUrl,
          clientName: mockClientName,
        })
      ).rejects.toThrowError(/^Too many oidc issuers found in WebID$/);
    });

    test("when no oidc issuers are found in WebID > then throw error", async () => {
      // Arrange
      const mockWebId = "mock-web-id";
      const mockRedirectUrl = "mock-redirect-url";
      const mockClientName = "mock-client-name";

      when(mockRepository.findOidcIssuers)
        .calledWith(mockWebId)
        .thenResolve([]);

      // Act & Assert
      await expect(() =>
        authService.logInWithWebId({
          webId: mockWebId,
          redirectUrl: mockRedirectUrl,
          clientName: mockClientName,
        })
      ).rejects.toThrowError(/^Failed to discover oidc issuer of WebID$/);
    });

    test("success", async () => {
      // Arrange
      const mockWebId = "mock-web-id";
      const mockOidcIssuer = "mock-oidc-issuer";
      const mockRedirectUrl = "mock-redirect-url";
      const mockClientName = "mock-client-name";

      when(mockRepository.findOidcIssuers)
        .calledWith(mockWebId)
        .thenResolve([mockOidcIssuer]);

      // Act & Assert
      await authService.logInWithWebId({
        webId: mockWebId,
        redirectUrl: mockRedirectUrl,
        clientName: mockClientName,
      });

      // Assert
      expect(mockRepository.login).toHaveBeenCalledWith({
        oidcIssuer: mockOidcIssuer,
        redirectUrl: mockRedirectUrl,
        clientName: mockClientName,
      });
    });
  });

  test("logout", async () => {
    // Act
    await authService.logOut();

    // Assert
    expect(mockRepository.logout).toHaveBeenCalled();
  });

  test("handleIncomingRedirect", async () => {
    // Arrange
    const mockRestoreUrlCallback = vi.fn();

    // Act
    await authService.handleIncomingRedirect(mockRestoreUrlCallback);

    // Assert
    expect(mockRepository.handleIncomingRedirect).toHaveBeenCalledWith(
      mockRestoreUrlCallback
    );
  });
});
