import { useEffect, useState } from "preact/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import { POD_PROVIDERS } from "../domain/podProvider";
import type { Session } from "../domain/session";
import illustrationUrl from "../assets/illustration.svg";
import { errorMessage } from "./errorMessage";
import { ExternalLink } from "./ExternalLink";
import { Footer } from "./Footer";
import { Loading } from "./Loading";
import { OnboardingFlow } from "./onboarding/OnboardingFlow";
import { PodConnectionScreen } from "./onboarding/PodConnectionScreen";
import { Workspace } from "./Workspace";

/** The app in whichever state it is in, above the site-wide footer. */
export function App({ useCases }: { useCases: UseCases }) {
  return (
    <>
      <AppContent useCases={useCases} />
      <Footer />
    </>
  );
}

function AppContent({ useCases }: { useCases: UseCases }) {
  const queryClient = useQueryClient();
  const [checkingSession, setCheckingSession] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  // True from a completed login redirect until the user leaves the "Pod
  // connected" step. Silently restored sessions go straight to the app.
  const [connecting, setConnecting] = useState(false);
  // Someone who was logged in before skips the Pod-provider pitch.
  const [returning, setReturning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // On every page load, complete a pending OIDC redirect (or restore a
  // previous session). This is boot-time initialization, not server
  // state, so it stays an explicit effect rather than a query.
  useEffect(() => {
    void (async () => {
      try {
        const established = await useCases.restoreSession();
        if (established !== null) {
          setSession(established.session);
          setConnecting(established.origin === "login");
        }
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
      setConnecting(false);
      setReturning(true);
      setAuthError("Your session has expired. Please log in again.");
      queryClient.clear();
    });
  }, [useCases, queryClient]);

  // Pod discovery for the onboarding step. No automatic retries: the
  // step has its own "Try again".
  const accountQuery = useQuery({
    queryKey: ["account", session?.webId],
    queryFn: () => useCases.discoverAccount(session!),
    enabled: session !== null && connecting,
    retry: false,
  });

  // Either way of logging in ends in a redirect to the identity provider,
  // so the flow stays busy unless starting it fails.
  async function startLogin(login: () => Promise<void>) {
    setAuthError(null);
    setBusy(true);
    try {
      await login();
    } catch (e) {
      setAuthError(errorMessage(e));
      setBusy(false);
    }
  }

  async function handleLogout() {
    await useCases.logout();
    setSession(null);
    setConnecting(false);
    setReturning(true);
    setAuthError(null);
    // Cached Pod data belongs to the session that fetched it.
    queryClient.clear();
  }

  if (checkingSession) {
    return (
      <main>
        <Loading label="Restoring session…" />
      </main>
    );
  }

  if (!session) {
    return (
      <main class="landing">
        <img
          class="hero"
          src={illustrationUrl}
          alt="Solid Memo illustration"
          width={640}
          height={427}
        />
        <h1>
          <span class="wordmark">Solid Memo</span>
        </h1>
        <p class="tagline">
          Spaced-repetition flashcards that live in your own Solid Pod.
        </p>
        <OnboardingFlow
          providers={POD_PROVIDERS}
          busy={busy}
          returning={returning}
          onLogin={(webId) =>
            void startLogin(() => useCases.loginWithWebId(webId))
          }
          onLoginWithProvider={(provider) =>
            void startLogin(() =>
              useCases.loginWithProvider(provider.oidcIssuer),
            )
          }
        />
        {authError && <p class="error">{authError}</p>}
      </main>
    );
  }

  if (connecting) {
    return (
      <main class="landing">
        <h1>
          <span class="wordmark">Solid Memo</span>
        </h1>
        <PodConnectionScreen
          account={accountQuery.data}
          busy={accountQuery.isFetching}
          error={errorMessage(accountQuery.error)}
          onRetry={() => void accountQuery.refetch()}
          onContinue={() => setConnecting(false)}
          onLogout={handleLogout}
        />
      </main>
    );
  }

  return (
    <main>
      <header class="masthead">
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
        <div class="masthead-title">
          <h1>
            {/* Like the logo: back to the root of the app. */}
            <a class="wordmark" href="#/">
              Solid Memo
            </a>
          </h1>
          <p class="session-line">
            Logged in as <ExternalLink url={session.webId} />
          </p>
        </div>
        <button onClick={handleLogout}>Log out</button>
      </header>
      <Workspace useCases={useCases} session={session} />
    </main>
  );
}
