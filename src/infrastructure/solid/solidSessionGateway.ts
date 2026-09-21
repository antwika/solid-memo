import {
  EVENTS,
  events,
  handleIncomingRedirect,
  login,
  logout,
} from "@inrupt/solid-client-authn-browser";
import { getIriAll, getSolidDataset, getThing } from "@inrupt/solid-client";
import type { SessionGateway } from "../../application/ports";
import type { SessionOrigin } from "../../domain/session";
import { isSecureUrl } from "../../domain/webId";
import { SESSION_EXPIRED_EVENT } from "./authFetch";

const SOLID_OIDC_ISSUER = "http://www.w3.org/ns/solid/terms#oidcIssuer";

/**
 * Dereference a WebID (unauthenticated) and read the solid:oidcIssuer
 * triple from the profile so the user only needs to type their WebID.
 * The issuer is never guessed from the WebID's origin, and only an
 * https issuer is accepted: the browser is about to be sent there.
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
  const issuer = issuers.find(isSecureUrl);
  if (issuer === undefined) {
    throw new Error(
      `The solid:oidcIssuer declared for <${webId}> is not a valid https:// URL.`,
    );
  }
  return issuer;
}

export function createSolidSessionGateway(clientName: string): SessionGateway {
  /** Redirects the browser to the identity provider; does not return. */
  async function startLogin(oidcIssuer: string): Promise<void> {
    await login({
      oidcIssuer,
      redirectUrl: new URL(
        window.location.pathname,
        window.location.origin,
      ).toString(),
      clientName,
    });
  }

  return {
    async restore() {
      // The library emits LOGIN only when a login redirect completes; a
      // silently restored session emits SESSION_RESTORED instead.
      let origin: SessionOrigin = "restored";
      const onLogin = () => {
        origin = "login";
      };
      events().on(EVENTS.LOGIN, onLogin);
      try {
        const info = await handleIncomingRedirect({
          restorePreviousSession: true,
        });
        if (info?.isLoggedIn && info.webId) {
          return { session: { webId: info.webId }, origin };
        }
        return null;
      } finally {
        events().off(EVENTS.LOGIN, onLogin);
      }
    },

    discoverOidcIssuer,

    async login(webId) {
      await startLogin(await discoverOidcIssuer(webId));
    },

    loginWithIssuer: startLogin,

    async logout() {
      await logout();
    },

    onSessionExpired(listener) {
      window.addEventListener(SESSION_EXPIRED_EVENT, listener);
      return () => window.removeEventListener(SESSION_EXPIRED_EVENT, listener);
    },
  };
}
