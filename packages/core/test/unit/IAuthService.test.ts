import { IAuthService } from "packages/core/src";
import { describe, it, vi } from "vitest";

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
  async logInWithOidcIssuer(props: {
    oidcIssuer: string;
    redirectUrl: string;
    clientName: string;
  }): Promise<void> {}
  async logInWithWebId(props: {
    webId: string;
    redirectUrl: string;
    clientName: string;
  }): Promise<void> {}
  async logOut(): Promise<void> {}
  async handleIncomingRedirect(
    restoreUrlCallback: (url: string) => void
  ): Promise<void> {}
}

describe("IAuthService", () => {
  it("does something", () => {
    const mockAuthService = new MockAuthService();
  });
});
