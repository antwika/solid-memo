import { getSolidDataset, getThing, getUrlAll } from "@inrupt/solid-client";
import { EVENTS, getDefaultSession } from "@inrupt/solid-client-authn-browser";
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

  async logInWithOidcIssuer({
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

  async logInWithWebId({
    webId,
    redirectUrl,
    clientName,
  }: {
    webId: string;
    redirectUrl: string;
    clientName: string;
  }): Promise<void> {
    const session = getDefaultSession();
    const result = await fetch(webId);
    const text = await result.text();
    console.log("text:", text);

    const webIdDataset = await getSolidDataset(webId);

    console.log("webIdDataset:", webIdDataset);

    const webIdThing = getThing(webIdDataset, webId);

    if (!webIdThing) throw new Error("Failed to discover WebID");

    console.log("webIdThing:", webIdThing);
    const oidcIssuers = getUrlAll(
      webIdThing,
      "http://www.w3.org/ns/solid/terms#oidcIssuer"
    );
    console.log("oidcIssuers:", oidcIssuers);

    if (oidcIssuers.length > 1)
      throw new Error("Too many oidc issuers found in WebID");

    const oidcIssuer = oidcIssuers[0];

    if (!oidcIssuer) throw new Error("Failed to discover oidc issuer of WebID");

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

  async handleIncomingRedirect(restoreUrlCallback: (url: string) => void) {
    const session = getDefaultSession();

    session.events.on(EVENTS.SESSION_RESTORED, restoreUrlCallback);

    await session.handleIncomingRedirect({ restorePreviousSession: true });
  }
}
