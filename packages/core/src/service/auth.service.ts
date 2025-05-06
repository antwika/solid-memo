import type { IAuthService } from "../IAuthService";
import type { IRepository } from "../IRepository";

export class AuthService implements IAuthService {
  private readonly repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  isLoggedIn() {
    return this.repository.isLoggedIn();
  }

  getWebId() {
    return this.repository.getWebId();
  }

  getFetch() {
    return this.repository.getFetch();
  }

  async logInWithOidcIssuer({
    oidcIssuer,
    redirectUrl,
    clientName,
  }: {
    oidcIssuer: string;
    redirectUrl: string;
    clientName: string;
  }) {
    return this.repository.login({
      oidcIssuer,
      redirectUrl,
      clientName,
    });
  }

  async logInWithWebId({
    webId,
    redirectUrl,
    clientName,
  }: {
    webId: string;
    redirectUrl: string;
    clientName: string;
  }): Promise<void> {
    const oidcIssuers = await this.repository.findOidcIssuers(webId);

    if (oidcIssuers.length > 1)
      throw new Error("Too many oidc issuers found in WebID");

    const oidcIssuer = oidcIssuers[0];

    if (!oidcIssuer) throw new Error("Failed to discover oidc issuer of WebID");

    return this.repository.login({
      oidcIssuer,
      redirectUrl,
      clientName,
    });
  }

  async logOut() {
    return this.repository.logout();
  }

  async handleIncomingRedirect(restoreUrlCallback: (url: string) => void) {
    await this.repository.handleIncomingRedirect(restoreUrlCallback);
  }
}
