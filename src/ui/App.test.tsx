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
import type { UseCases } from "../application/useCases";
import type { Session } from "../domain/session";
import type { WebIdDocument } from "../domain/webIdDocument";
import { makeUseCasesFake } from "../test/useCasesFake";

const session: Session = { webId: "https://alice.example/profile/card#me" };
const document: WebIdDocument = {
  url: "https://alice.example/profile/card",
  subjects: [
    {
      url: session.webId,
      properties: [
        {
          predicate: "http://xmlns.com/foaf/0.1/name",
          values: [
            {
              type: "literal",
              value: "Alice",
              dataType: "http://www.w3.org/2001/XMLSchema#string",
            },
          ],
        },
      ],
    },
  ],
};

function makeUseCases(overrides: Partial<UseCases> = {}): UseCases {
  return makeUseCasesFake({
    viewWebIdDocument: vi.fn(async () => document),
    ...overrides,
  });
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
  it("shows a restoring indicator while the session check is pending", () => {
    renderApp(
      makeUseCases({
        restoreSession: vi.fn(() => new Promise<Session | null>(() => {})),
      }),
    );
    expect(screen.getByText("Restoring session…")).toBeInTheDocument();
  });

  it("shows the login form when no session is restored", async () => {
    renderApp(makeUseCases());
    expect(
      await screen.findByRole("button", { name: "Log in" }),
    ).toBeInTheDocument();
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
    const loginWithWebId = vi.fn(() => new Promise<void>(() => {}));
    const useCases = makeUseCases({ loginWithWebId });
    renderApp(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Log in" }));

    expect(loginWithWebId).toHaveBeenCalledWith(
      "https://alice.datapod.igrant.io/profile/card#me",
    );
    expect(
      await screen.findByRole("button", { name: "Redirecting…" }),
    ).toBeInTheDocument();
  });

  it("shows a login error (Error instance) and re-enables the form", async () => {
    renderApp(
      makeUseCases({
        loginWithWebId: vi.fn(async () => {
          throw new Error("issuer discovery failed");
        }),
      }),
    );

    fireEvent.click(await screen.findByRole("button", { name: "Log in" }));
    expect(
      await screen.findByText("issuer discovery failed"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeEnabled();
  });

  it("shows a login error (non-Error rejection)", async () => {
    renderApp(
      makeUseCases({
        loginWithWebId: vi.fn(async () => {
          throw "login broke";
        }),
      }),
    );

    fireEvent.click(await screen.findByRole("button", { name: "Log in" }));
    expect(await screen.findByText("login broke")).toBeInTheDocument();
  });

  it("shows the WebID document when a session is restored", async () => {
    const { container } = renderApp(
      makeUseCases({ restoreSession: vi.fn(async () => session) }),
    );

    expect(
      await screen.findByRole("link", { name: session.webId }),
    ).toBeInTheDocument();
    expect(container.querySelector("header img.logo")).toBeInTheDocument();
    // The logotype is a link back to the start of the app.
    expect(
      screen.getByRole("link", { name: "Solid Memo — back to start" }),
    ).toHaveAttribute("href", "#/");
    expect(
      await screen.findByText('"Alice" (http://www.w3.org/2001/XMLSchema#string)'),
    ).toBeInTheDocument();
  });

  it("shows a loading indicator while the document is being fetched", async () => {
    renderApp(
      makeUseCases({
        restoreSession: vi.fn(async () => session),
        viewWebIdDocument: vi.fn(() => new Promise<WebIdDocument>(() => {})),
      }),
    );
    expect(await screen.findByText("Loading profile…")).toBeInTheDocument();
  });

  it("shows a document error (Error instance)", async () => {
    renderApp(
      makeUseCases({
        restoreSession: vi.fn(async () => session),
        viewWebIdDocument: vi.fn(async () => {
          throw new Error("profile fetch failed");
        }),
      }),
    );
    expect(await screen.findByText("profile fetch failed")).toBeInTheDocument();
  });

  it("shows a document error (non-Error rejection)", async () => {
    renderApp(
      makeUseCases({
        restoreSession: vi.fn(async () => session),
        viewWebIdDocument: vi.fn(async () => {
          throw "document broke";
        }),
      }),
    );
    expect(await screen.findByText("document broke")).toBeInTheDocument();
  });

  it("drops to the login screen when the session expires", async () => {
    let expire: (() => void) | undefined;
    const useCases = makeUseCases({
      restoreSession: vi.fn(async () => session),
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
      screen.getByRole("button", { name: "Log in" }),
    ).toBeInTheDocument();
  });

  it("logs out and returns to the login form", async () => {
    const useCases = makeUseCases({
      restoreSession: vi.fn(async () => session),
    });
    renderApp(useCases);

    fireEvent.click(await screen.findByRole("button", { name: "Log out" }));

    await waitFor(() => {
      expect(useCases.logout).toHaveBeenCalledOnce();
    });
    expect(
      await screen.findByRole("button", { name: "Log in" }),
    ).toBeInTheDocument();
  });
});
