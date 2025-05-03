export interface IAuthService {
  isLoggedIn(): boolean;
  getWebId(): string | undefined;
  getFetch(): typeof fetch;
  logInWithOidcIssuer(props: {
    oidcIssuer: string;
    redirectUrl: string;
    clientName: string;
  }): Promise<void>;
  logInWithWebId(props: {
    webId: string;
    redirectUrl: string;
    clientName: string;
  }): Promise<void>;
  logOut(): Promise<void>;
  handleIncomingRedirect(
    restoreUrlCallback: (url: string) => void
  ): Promise<void>;
}
