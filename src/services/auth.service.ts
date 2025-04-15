import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import type { IAuthService } from "@services/index";

export default class AuthService implements IAuthService {
  isLoggedIn() {
    const session = getDefaultSession();
    return session.info.isLoggedIn;
  }

  getWebId() {
    const session = getDefaultSession();
    return session.info.webId;
  }

  getFetch() {
    const session = getDefaultSession();
    return session.fetch;
  }

  async logIn({
    oidcIssuer,
    redirectUrl,
    clientName,
  }: {
    oidcIssuer: string;
    redirectUrl: string;
    clientName: string;
  }) {
    const session = getDefaultSession();
    return session.login({
      oidcIssuer,
      redirectUrl,
      clientName,
    });
  }

  async logOut() {
    const session = getDefaultSession();
    return session.logout({ logoutType: "app" });
  }

  async handleIncomingRedirect() {
    const session = getDefaultSession();
    await session.handleIncomingRedirect({ restorePreviousSession: true });
  }
}
