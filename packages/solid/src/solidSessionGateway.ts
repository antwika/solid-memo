import {
  EVENTS,
  events,
  handleIncomingRedirect,
  login,
  logout,
} from "@inrupt/solid-client-authn-browser";
import { getIriAll, getSolidDataset, getThing } from "@inrupt/solid-client";
import type { SessionGateway } from "@solid-memo/application/ports";
import type { SessionOrigin } from "@solid-memo/domain/session";
import { isSecureUrl } from "@solid-memo/domain/webId";
import { SESSION_EXPIRED_EVENT } from "./authFetch";

const SOLID_OIDC_ISSUER = "http://www.w3.org/ns/solid/terms#oidcIssuer";

/** Where an interactive login started, kept for the trip to the identity provider. */
const LOGIN_STARTED_AT_KEY = "solid-memo:loginStartedAt";

/**
 * Take the user back to the view they were on before a trip to the
 * identity provider. Redirect URLs cannot carry a fragment, so the trip
 * always returns to the bare page and the view — the URL hash
 * (docs/routing.md) — is put back here, when the URL is this same page.
 */
function returnTo(url: string): void {
  const target = new URL(url, window.location.href);
  if (
    target.origin === window.location.origin &&
    target.pathname === window.location.pathname &&
    target.hash !== ""
  ) {
    window.history.replaceState(null, "", target.hash);
  }
}

/** The URL an interactive login started at, once; null when none was kept. */
function takeLoginStartedAt(): string | null {
  try {
    const url = window.sessionStorage.getItem(LOGIN_STARTED_AT_KEY);
    window.sessionStorage.removeItem(LOGIN_STARTED_AT_KEY);
    return url;
  } catch {
    return null;
  }
}

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
    try {
      window.sessionStorage.setItem(LOGIN_STARTED_AT_KEY, window.location.href);
    } catch {
      // Without session storage the login still works; it lands on the default view.
    }
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
      // What the library announces while it handles the redirect: a
      // completed login, or a silent restore (a reload) and the URL it left.
      const seen: { origin: SessionOrigin; restoredFrom: string | null } = {
        origin: "restored",
        restoredFrom: null,
      };
      const onLogin = () => {
        seen.origin = "login";
      };
      const onSessionRestored = (url: string) => {
        seen.restoredFrom = url;
      };
      events().on(EVENTS.LOGIN, onLogin);
      events().on(EVENTS.SESSION_RESTORED, onSessionRestored);
      try {
        const info = await handleIncomingRedirect({
          restorePreviousSession: true,
        });
        if (info?.isLoggedIn && info.webId) {
          const startedAt =
            seen.origin === "login" ? takeLoginStartedAt() : seen.restoredFrom;
          if (startedAt !== null) returnTo(startedAt);
          return { session: { webId: info.webId }, origin: seen.origin };
        }
        return null;
      } finally {
        events().off(EVENTS.LOGIN, onLogin);
        events().off(EVENTS.SESSION_RESTORED, onSessionRestored);
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
