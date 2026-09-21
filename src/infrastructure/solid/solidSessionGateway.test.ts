import { beforeEach, describe, expect, it, vi } from "vitest";
import {
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

describe("createSolidSessionGateway", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("restore", () => {
    it("returns a session when the redirect yields a logged-in WebID", async () => {
      vi.mocked(handleIncomingRedirect).mockResolvedValue({
        isLoggedIn: true,
        webId: WEBID,
        sessionId: "s",
      });
      const gateway = createSolidSessionGateway("Test App");
      await expect(gateway.restore()).resolves.toEqual({ webId: WEBID });
      expect(handleIncomingRedirect).toHaveBeenCalledWith({
        restorePreviousSession: true,
      });
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
