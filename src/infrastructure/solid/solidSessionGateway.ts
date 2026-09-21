import {
  handleIncomingRedirect,
  login,
  logout,
} from "@inrupt/solid-client-authn-browser";
import { getIriAll, getSolidDataset, getThing } from "@inrupt/solid-client";
import type { SessionGateway } from "../../application/ports";
import { SESSION_EXPIRED_EVENT } from "./authFetch";

const SOLID_OIDC_ISSUER = "http://www.w3.org/ns/solid/terms#oidcIssuer";

/**
 * Dereference a WebID (unauthenticated) and read the solid:oidcIssuer
 * triple from the profile so the user only needs to type their WebID.
 */
async function discoverOidcIssuer(webId: string): Promise<string> {
  const dataset = await getSolidDataset(webId);
  const profile = getThing(dataset, webId);
  if (!profile) {
    throw new Error(`No subject <${webId}> found in the WebID document.`);
  }
  const issuers = getIriAll(profile, SOLID_OIDC_ISSUER);
  if (issuers.length === 0) {
    throw new Error(
      `The WebID document does not declare a solid:oidcIssuer for <${webId}>.`,
    );
  }
  return issuers[0];
}

export function createSolidSessionGateway(clientName: string): SessionGateway {
  return {
    async restore() {
      const info = await handleIncomingRedirect({
        restorePreviousSession: true,
      });
      if (info?.isLoggedIn && info.webId) {
        return { webId: info.webId };
      }
      return null;
    },

    async login(webId) {
      const issuer = await discoverOidcIssuer(webId);
      // Redirects the browser to the identity provider; does not return.
      await login({
        oidcIssuer: issuer,
        redirectUrl: new URL(
          window.location.pathname,
          window.location.origin,
        ).toString(),
        clientName,
      });
    },

    async logout() {
      await logout();
    },

    onSessionExpired(listener) {
      window.addEventListener(SESSION_EXPIRED_EVENT, listener);
      return () => window.removeEventListener(SESSION_EXPIRED_EVENT, listener);
    },
  };
}
