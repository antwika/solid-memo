import { describe, expect, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import type { UseCases } from "@solid-memo/application/useCases";
import type { SolidAccount } from "@solid-memo/domain/account";
import type { EstablishedSession, Session } from "@solid-memo/domain/session";
import { makeUseCasesFake } from "../test/useCasesFake";

const session: Session = { webId: "https://alice.example/profile/card#me" };
const restored: EstablishedSession = { session, origin: "restored" };
const loggedIn: EstablishedSession = { session, origin: "login" };
function makeUseCases(overrides: Partial<UseCases> = {}): UseCases {
  return makeUseCasesFake(overrides);
}

/** Walk the signed-out onboarding to the WebID step and submit it. */
async function submitWebId(webId: string) {
  fireEvent.click(
    await screen.findByRole("button", { name: "I already have a Pod" }),
  );
  fireEvent.input(screen.getByLabelText("WebID"), { target: { value: webId } });
  fireEvent.click(screen.getByRole("button", { name: "Log in with Solid" }));
}

function renderApp(useCases: UseCases) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <App useCases={useCases} />
    </QueryClientProvider>,
  );
}

describe("App", () => {
  it("speaks the language the use cases pick from the browser's", async () => {
    const useCases = makeUseCases({ language: vi.fn(() => "sv" as const) });
    renderApp(useCases);
    expect(useCases.language).toHaveBeenCalledWith(navigator.languages);
    expect(await screen.findByText(/Skapad av/)).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("sv");
  });

  it("switches language, and keeps the choice", async () => {
    const useCases = makeUseCases();
    renderApp(useCases);
    fireEvent.click(await screen.findByRole("button", { name: "Svenska" }));
    expect(useCases.chooseLanguage).toHaveBeenCalledWith("sv");
    expect(await screen.findByText(/Skapad av/)).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("sv");
    fireEvent.click(screen.getByRole("button", { name: "English" }));
    expect(await screen.findByText(/Created by/)).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
  });

  it("shows a restoring indicator while the session check is pending", () => {
    renderApp(
      makeUseCases({
        restoreSession: vi.fn(() => new Promise<null>(() => { })),
      }),
    );
    expect(screen.getByText("Restoring session…")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "Created by antwika",
    );
  });

  it("starts the Pod onboarding when no session is restored", async () => {
    renderApp(makeUseCases());
    expect(
      await screen.findByRole("heading", { name: "Set up your Solid Pod" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /iGrant\.io Data Pod/ }),
    ).toHaveAttribute("href", "https://igrant.io/datapod.html");
    expect(
      screen.getByRole("img", { name: "Solid Memo illustration" }),
    ).toBeInTheDocument();
  });

  it("shows a session-restore error (Error instance)", async () => {
    renderApp(
      makeUseCases({
        restoreSession: vi.fn(async () => {
          throw new Error("restore failed");
        }),
      }),
    );
    expect(await screen.findByText("restore failed")).toBeInTheDocument();
  });

  it("shows a session-restore error (non-Error rejection)", async () => {
    renderApp(
      makeUseCases({
        restoreSession: vi.fn(async () => {
          throw "plain failure";
        }),
      }),
    );
    expect(await screen.findByText("plain failure")).toBeInTheDocument();
  });

  it("logs in with the entered WebID and stays busy while redirecting", async () => {
    const loginWithWebId = vi.fn(() => new Promise<void>(() => { }));
    const useCases = makeUseCases({ loginWithWebId });
    renderApp(useCases);

    await submitWebId(session.webId);

    expect(loginWithWebId).toHaveBeenCalledWith(session.webId);
    expect(
      await screen.findByRole("button", { name: "Redirecting…" }),
    ).toBeInTheDocument();
  });

  it("logs in at a suggested provider without a WebID", async () => {
    const loginWithProvider = vi.fn(() => new Promise<void>(() => { }));
    const useCases = makeUseCases({ loginWithProvider });
    renderApp(useCases);

    fireEvent.click(
      await screen.findByRole("button", { name: "I already have a Pod" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Inrupt PodSpaces" }));

    expect(loginWithProvider).toHaveBeenCalledWith("https://login.inrupt.com");
    expect(useCases.loginWithWebId).not.toHaveBeenCalled();
    expect(
      await screen.findByRole("button", { name: "Redirecting…" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Inrupt PodSpaces" }),
    ).toBeDisabled();
  });

  it("shows an error when a provider login cannot start", async () => {
    renderApp(
      makeUseCases({
        loginWithProvider: vi.fn(async () => {
          throw new Error("provider unreachable");
        }),
      }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "I already have a Pod" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "solidweb.me" }));

    expect(await screen.findByText("provider unreachable")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "solidweb.me" })).toBeEnabled();
  });

  it("shows a login error (Error instance) and re-enables the form", async () => {
    renderApp(
      makeUseCases({
        loginWithWebId: vi.fn(async () => {
          throw new Error("issuer discovery failed");
        }),
      }),
    );

    await submitWebId(session.webId);
    expect(
      await screen.findByText("issuer discovery failed"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Log in with Solid" }),
    ).toBeEnabled();
  });

  it("shows a login error (non-Error rejection)", async () => {
    renderApp(
      makeUseCases({
        loginWithWebId: vi.fn(async () => {
          throw "login broke";
        }),
      }),
    );

    await submitWebId(session.webId);
    expect(await screen.findByText("login broke")).toBeInTheDocument();
  });

  it("skips onboarding and shows the app when a session is restored", async () => {
    const useCases = makeUseCases({
      restoreSession: vi.fn(async () => restored),
    });
    const { container } = renderApp(useCases);

    expect(
      await screen.findByRole("link", { name: session.webId }),
    ).toBeInTheDocument();
    expect(container.querySelector("header img.logo")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Solid Memo — back to start" }),
    ).toHaveAttribute("href", "#/");
    expect(screen.getByRole("link", { name: "Solid Memo" })).toHaveAttribute(
      "href",
      "#/",
    );
    expect(useCases.discoverAccount).not.toHaveBeenCalled();
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "Created by antwika",
    );
    expect(screen.queryByText("WebID document")).toBeNull();
    expect(useCases.viewWebIdDocument).not.toHaveBeenCalled();
  });

  describe("after a completed login", () => {
    it("discovers the Pod, confirms the connection, then enters the app", async () => {
      let resolveAccount: (account: SolidAccount) => void = () => undefined;
      const useCases = makeUseCases({
        restoreSession: vi.fn(async () => loggedIn),
        discoverAccount: vi.fn(
          () => new Promise<SolidAccount>((resolve) => (resolveAccount = resolve)),
        ),
      });
      renderApp(useCases);

      expect(
        await screen.findByRole("heading", { name: "Discovering your Pod…" }),
      ).toBeInTheDocument();
      await waitFor(() => {
        expect(useCases.discoverAccount).toHaveBeenCalledWith(session);
      });
      expect(useCases.listInstances).not.toHaveBeenCalled();

      await act(async () =>
        resolveAccount({
          webId: session.webId,
          name: "Alice",
          podUrl: "https://alice.example/",
          oidcIssuer: "https://issuer.example",
        }),
      );
      expect(
        await screen.findByRole("heading", { name: "Your Pod is connected." }),
      ).toBeInTheDocument();
      expect(screen.getByText("https://alice.example/")).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Continue" }));
      expect(
        await screen.findByRole("button", { name: "Log out" }),
      ).toBeInTheDocument();
      expect(screen.getByText(/Logged in as/)).toHaveTextContent(
        "Logged in as Alice",
      );
      expect(screen.getByRole("link", { name: "Alice" })).toHaveAttribute(
        "href",
        session.webId,
      );
      await waitFor(() => {
        expect(useCases.listInstances).toHaveBeenCalled();
      });
    });

    it("shows a discovery error and retries on request", async () => {
      const discoverAccount = vi
        .fn<UseCases["discoverAccount"]>()
        .mockRejectedValueOnce(new Error("profile unreachable"))
        .mockResolvedValueOnce({
          webId: session.webId,
          podUrl: "https://alice.example/",
        });
      renderApp(
        makeUseCases({
          restoreSession: vi.fn(async () => loggedIn),
          discoverAccount,
        }),
      );

      expect(await screen.findByText("profile unreachable")).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Try again" }));

      expect(
        await screen.findByRole("heading", { name: "Your Pod is connected." }),
      ).toBeInTheDocument();
      expect(discoverAccount).toHaveBeenCalledTimes(2);
    });

    it("logs out from a failed discovery", async () => {
      const useCases = makeUseCases({
        restoreSession: vi.fn(async () => loggedIn),
        discoverAccount: vi.fn(async () => {
          throw new Error("profile unreachable");
        }),
      });
      renderApp(useCases);

      fireEvent.click(await screen.findByRole("button", { name: "Log out" }));
      await waitFor(() => {
        expect(useCases.logout).toHaveBeenCalledOnce();
      });
      expect(
        await screen.findByRole("button", { name: "Log in with Solid" }),
      ).toBeInTheDocument();
    });
  });

  it("drops to the login screen when the session expires", async () => {
    let expire: (() => void) | undefined;
    const useCases = makeUseCases({
      restoreSession: vi.fn(async () => restored),
      onSessionExpired: vi.fn((listener: () => void) => {
        expire = listener;
        return () => undefined;
      }),
    });
    renderApp(useCases);

    await screen.findByRole("link", { name: session.webId });
    act(() => expire!());

    expect(
      await screen.findByText("Your session has expired. Please log in again."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Log in with Solid" }),
    ).toBeInTheDocument();
  });

  it("logs out and returns to the WebID form", async () => {
    const useCases = makeUseCases({
      restoreSession: vi.fn(async () => restored),
    });
    renderApp(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Log out" }));

    await waitFor(() => {
      expect(useCases.logout).toHaveBeenCalledOnce();
    });
    expect(
      await screen.findByRole("button", { name: "Log in with Solid" }),
    ).toBeInTheDocument();
  });

  describe("as a guest", () => {
    const guest: Session = { webId: "https://guest.solid-memo.invalid/profile/card#me", guest: true };

    it("starts studying without logging in, in an instance named in the reader's language", async () => {
      const useCases = makeUseCases();
      renderApp(useCases);
      fireEvent.click(await screen.findByRole("button", { name: "Try it without logging in" }));
      expect(await screen.findByText(/You are trying Solid Memo as a guest/)).toBeInTheDocument();
      expect(useCases.startGuest).toHaveBeenCalledWith("My study");
      expect(screen.queryByRole("button", { name: "Log out" })).toBeNull();
      expect(useCases.findGuestStudy).not.toHaveBeenCalled();
    });

    it("shows why a guest's study could not start", async () => {
      const useCases = makeUseCases({ startGuest: vi.fn(async () => Promise.reject(new Error("no storage"))) });
      renderApp(useCases);
      fireEvent.click(await screen.findByRole("button", { name: "Try it without logging in" }));
      expect(await screen.findByText("no storage")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Try it without logging in" })).toBeEnabled();
    });

    it("goes on with a guest's study restored, and logs in from it to keep it", async () => {
      const loginWithWebId = vi.fn(() => new Promise<void>(() => {}));
      const useCases = makeUseCases({
        restoreSession: vi.fn(async () => ({ session: guest, origin: "restored" as const })),
        loginWithWebId,
      });
      renderApp(useCases);
      fireEvent.click(await screen.findByRole("button", { name: "Keep my study: log in" }));
      expect(screen.getByText(/Log in to keep your study/)).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Try it without logging in" })).toBeNull();
      fireEvent.click(screen.getByRole("button", { name: "Back to my study" }));
      expect(await screen.findByText(/You are trying Solid Memo as a guest/)).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Keep my study: log in" }));
      fireEvent.input(screen.getByLabelText("WebID"), { target: { value: session.webId } });
      fireEvent.click(screen.getByRole("button", { name: "Log in with Solid" }));
      expect(loginWithWebId).toHaveBeenCalledWith(session.webId);
    });

    it("discards a guest's study once the guest confirms it", async () => {
      const useCases = makeUseCases({
        restoreSession: vi.fn(async () => ({ session: guest, origin: "restored" as const })),
      });
      renderApp(useCases);
      fireEvent.click(await screen.findByRole("button", { name: "Discard" }));
      const region = screen.getByRole("region", { name: "Discard your study as a guest" });
      expect(region).toHaveTextContent("This cannot be undone.");
      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
      expect(screen.queryByRole("region", { name: "Discard your study as a guest" })).toBeNull();
      expect(useCases.discardGuest).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole("button", { name: "Discard" }));
      fireEvent.click(screen.getByRole("button", { name: "Delete it" }));
      expect(await screen.findByRole("heading", { name: "Set up your Solid Pod" })).toBeInTheDocument();
      expect(useCases.discardGuest).toHaveBeenCalledOnce();
    });

    it("says why a guest's study could not be discarded", async () => {
      const useCases = makeUseCases({
        restoreSession: vi.fn(async () => ({ session: guest, origin: "restored" as const })),
        discardGuest: vi.fn(async () => Promise.reject(new Error("storage refused"))),
      });
      renderApp(useCases);
      fireEvent.click(await screen.findByRole("button", { name: "Discard" }));
      fireEvent.click(screen.getByRole("button", { name: "Delete it" }));
      expect(await screen.findByText("storage refused")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Delete it" })).toBeEnabled();
    });

    it("offers a user who logged in the study a guest left in this browser", async () => {
      const useCases = makeUseCases({
        restoreSession: vi.fn(async () => restored),
        findGuestStudy: vi.fn(async () => ({
          instances: [{ instance: { url: "https://guest.solid-memo.invalid/solid-memo/", name: "My study" }, deckCount: 2 }],
        })),
      });
      renderApp(useCases);
      expect(await screen.findByText(/My study has 2 decks/)).toBeInTheDocument();
    });
  });
});
