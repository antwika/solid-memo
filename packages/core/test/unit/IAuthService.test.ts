import type { IAuthService } from "../../src/IAuthService";
import { describe, expect, it, vi } from "vitest";

class MockAuthService implements IAuthService {
  isLoggedIn(): boolean {
    return true;
  }
  getWebId(): string | undefined {
    return "mock-webid";
  }
  getFetch(): typeof fetch {
    return vi.fn();
  }
  async logInWithOidcIssuer(_props: {
    oidcIssuer: string;
    redirectUrl: string;
    clientName: string;
  }): Promise<void> {
    /* NOP */
  }
  async logInWithWebId(_props: {
    webId: string;
    redirectUrl: string;
    clientName: string;
  }): Promise<void> {
    /* NOP */
  }
  async logOut(): Promise<void> {
    /* NOP */
  }
  async handleIncomingRedirect(
    _restoreUrlCallback: (url: string) => void
  ): Promise<void> {
    /* NOP */
  }
}

describe("IAuthService", () => {
  it("does something", () => {
    const mockAuthService = new MockAuthService();
    expect(mockAuthService).toBeDefined();
  });
});
