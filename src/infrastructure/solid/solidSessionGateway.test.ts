import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  EVENTS,
  events,
  handleIncomingRedirect,
  login as authnLogin,
  logout as authnLogout,
} from "@inrupt/solid-client-authn-browser";
import { getIriAll, getSolidDataset, getThing } from "@inrupt/solid-client";
import { createSolidSessionGateway } from "./solidSessionGateway";
import { SESSION_EXPIRED_EVENT } from "./authFetch";

vi.mock("@inrupt/solid-client-authn-browser");
vi.mock("@inrupt/solid-client");

const WEBID = "https://alice.example/profile/card#me";

/** Minimal stand-in for the default session's event emitter. */
function makeEmitter() {
  const listeners = new Map<string, Set<() => void>>();
  return {
    on: vi.fn((event: string, listener: () => void) => {
      listeners.set(event, (listeners.get(event) ?? new Set()).add(listener));
    }),
    off: vi.fn((event: string, listener: () => void) => {
      listeners.get(event)?.delete(listener);
    }),
    emit(event: string) {
      listeners.get(event)?.forEach((listener) => listener());
    },
    count: (event: string) => listeners.get(event)?.size ?? 0,
  };
}

describe("createSolidSessionGateway", () => {
  let emitter: ReturnType<typeof makeEmitter>;

  beforeEach(() => {
    vi.resetAllMocks();
    emitter = makeEmitter();
    vi.mocked(events).mockReturnValue(emitter as never);
  });

  describe("restore", () => {
    it("returns a restored session when no login redirect completed", async () => {
      vi.mocked(handleIncomingRedirect).mockResolvedValue({
        isLoggedIn: true,
        webId: WEBID,
        sessionId: "s",
      });
      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.restore()).resolves.toEqual({
        session: { webId: WEBID },
        origin: "restored",
      });
      expect(handleIncomingRedirect).toHaveBeenCalledWith({
        restorePreviousSession: true,
      });
    });

    it("reports a login when the library announces one", async () => {
      vi.mocked(handleIncomingRedirect).mockImplementation(async () => {
        emitter.emit(EVENTS.LOGIN);
        return { isLoggedIn: true, webId: WEBID, sessionId: "s" };
      });
      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.restore()).resolves.toEqual({
        session: { webId: WEBID },
        origin: "login",
      });
    });

    it("stops listening for logins afterwards, even on failure", async () => {
      vi.mocked(handleIncomingRedirect).mockRejectedValue(new Error("boom"));
      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.restore()).rejects.toThrow("boom");
      expect(emitter.count(EVENTS.LOGIN)).toBe(0);
    });

    it("returns null when there is no session info", async () => {
      vi.mocked(handleIncomingRedirect).mockResolvedValue(undefined);
      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.restore()).resolves.toBeNull();
    });

    it("returns null when not logged in", async () => {
      vi.mocked(handleIncomingRedirect).mockResolvedValue({
        isLoggedIn: false,
        sessionId: "s",
      });
      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.restore()).resolves.toBeNull();
    });

    it("returns null when logged in but without a WebID", async () => {
      vi.mocked(handleIncomingRedirect).mockResolvedValue({
        isLoggedIn: true,
        sessionId: "s",
      });
      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.restore()).resolves.toBeNull();
    });
  });

  describe("login", () => {
    it("discovers the OIDC issuer from the WebID document and starts login", async () => {
      vi.mocked(getSolidDataset).mockResolvedValue({} as never);
      vi.mocked(getThing).mockReturnValue({} as never);
      vi.mocked(getIriAll).mockReturnValue(["https://issuer.example"]);

      const gateway = createSolidSessionGateway("Test App");
      await gateway.login(WEBID);

      expect(getThing).toHaveBeenCalledWith(expect.anything(), WEBID);
      expect(getIriAll).toHaveBeenCalledWith(
        expect.anything(),
        "http://www.w3.org/ns/solid/terms#oidcIssuer",
      );
      expect(authnLogin).toHaveBeenCalledWith({
        oidcIssuer: "https://issuer.example",
        redirectUrl: new URL(
          window.location.pathname,
          window.location.origin,
        ).toString(),
        clientName: "Test App",
      });
    });

    it("rejects when the WebID document has no subject for the WebID", async () => {
      vi.mocked(getSolidDataset).mockResolvedValue({} as never);
      vi.mocked(getThing).mockReturnValue(null);

      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.login(WEBID)).rejects.toThrow(
        `No subject <${WEBID}> found`,
      );
      expect(authnLogin).not.toHaveBeenCalled();
    });

    it("rejects when the profile declares no solid:oidcIssuer", async () => {
      vi.mocked(getSolidDataset).mockResolvedValue({} as never);
      vi.mocked(getThing).mockReturnValue({} as never);
      vi.mocked(getIriAll).mockReturnValue([]);

      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.login(WEBID)).rejects.toThrow(
        "does not declare a solid:oidcIssuer",
      );
      expect(authnLogin).not.toHaveBeenCalled();
    });
  });

  describe("discoverOidcIssuer", () => {
    it("returns the issuer declared in the profile, not the WebID origin", async () => {
      vi.mocked(getSolidDataset).mockResolvedValue({} as never);
      vi.mocked(getThing).mockReturnValue({} as never);
      vi.mocked(getIriAll).mockReturnValue(["https://idp.elsewhere.example"]);

      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.discoverOidcIssuer(WEBID)).resolves.toBe(
        "https://idp.elsewhere.example",
      );
    });

    it("skips issuers that are not https URLs", async () => {
      vi.mocked(getSolidDataset).mockResolvedValue({} as never);
      vi.mocked(getThing).mockReturnValue({} as never);
      vi.mocked(getIriAll).mockReturnValue([
        "http://insecure.example",
        "https://issuer.example",
      ]);

      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.discoverOidcIssuer(WEBID)).resolves.toBe(
        "https://issuer.example",
      );
    });

    it("rejects when no declared issuer is an https URL", async () => {
      vi.mocked(getSolidDataset).mockResolvedValue({} as never);
      vi.mocked(getThing).mockReturnValue({} as never);
      vi.mocked(getIriAll).mockReturnValue(["javascript:alert(1)"]);

      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.login(WEBID)).rejects.toThrow(
        "is not a valid https:// URL",
      );
      expect(authnLogin).not.toHaveBeenCalled();
    });
  });

  describe("logout", () => {
    it("delegates to the authn library", async () => {
      const gateway = createSolidSessionGateway("Test App");
      await gateway.logout();
      expect(authnLogout).toHaveBeenCalledOnce();
    });
  });

  describe("onSessionExpired", () => {
    it("notifies while subscribed and stops after unsubscribe", () => {
      const gateway = createSolidSessionGateway("Test App");
      const listener = vi.fn();
      const unsubscribe = gateway.onSessionExpired(listener);

      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
      expect(listener).toHaveBeenCalledOnce();

      unsubscribe();
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
      expect(listener).toHaveBeenCalledOnce();
    });
  });
});
