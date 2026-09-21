import { useEffect, useState } from "preact/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Session } from "../domain/session";
import illustrationUrl from "../assets/illustration.svg";
import { errorMessage } from "./errorMessage";
import { LoginForm } from "./LoginForm";
import { WebIdDocumentView } from "./WebIdDocumentView";
import { Workspace } from "./Workspace";

export function App({ useCases }: { useCases: UseCases }) {
  const queryClient = useQueryClient();
  const [checkingSession, setCheckingSession] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [busy, setBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // On every page load, complete a pending OIDC redirect (or restore a
  // previous session). This is boot-time initialization, not server
  // state, so it stays an explicit effect rather than a query.
  useEffect(() => {
    void (async () => {
      try {
        setSession(await useCases.restoreSession());
      } catch (e) {
        setAuthError(errorMessage(e));
      } finally {
        setCheckingSession(false);
      }
    })();
  }, [useCases]);

  // A 401 from the pod means the tokens are dead: drop to the login
  // screen and clear any cached pod data.
  useEffect(() => {
    return useCases.onSessionExpired(() => {
      setSession(null);
      setAuthError("Your session has expired. Please log in again.");
      queryClient.clear();
    });
  }, [useCases, queryClient]);

  const documentQuery = useQuery({
    queryKey: ["webIdDocument", session?.webId],
    // enabled guarantees session is non-null when the queryFn runs.
    queryFn: () => useCases.viewWebIdDocument(session!),
    enabled: session !== null,
  });

  async function handleLogin(webId: string) {
    setAuthError(null);
    setBusy(true);
    try {
      await useCases.loginWithWebId(webId);
    } catch (e) {
      setAuthError(errorMessage(e));
      setBusy(false);
    }
  }

  async function handleLogout() {
    await useCases.logout();
    setSession(null);
    setAuthError(null);
    // Cached Pod data belongs to the session that fetched it.
    queryClient.clear();
  }

  if (checkingSession) {
    return <main>Restoring session…</main>;
  }

  if (!session) {
    return (
      <main>
        <h1>Solid Memo</h1>
        <img
          class="hero"
          src={illustrationUrl}
          alt="Solid Memo illustration"
          width={640}
          height={427}
        />
        <LoginForm busy={busy} onLogin={handleLogin} />
        {authError && <p class="error">{authError}</p>}
      </main>
    );
  }

  return (
    <main>
      <header>
        {/* An empty route: Workspace's default-route logic takes the
            user back to the start (deck list, or a picker). */}
        <a class="brand" href="#/">
          <img
            class="logo"
            src={illustrationUrl}
            alt="Solid Memo — back to start"
            width={60}
            height={40}
          />
        </a>
        <h1>Solid Memo</h1>
        <button onClick={handleLogout}>Log out</button>
      </header>
      <p>
        Logged in as <a href={session.webId}>{session.webId}</a>
      </p>
      <Workspace useCases={useCases} session={session} />
      <details>
        <summary>WebID document</summary>
        {documentQuery.isPending && <p>Loading profile…</p>}
        {documentQuery.error && (
          <p class="error">{errorMessage(documentQuery.error)}</p>
        )}
        {documentQuery.data && (
          <WebIdDocumentView document={documentQuery.data} />
        )}
      </details>
    </main>
  );
}
