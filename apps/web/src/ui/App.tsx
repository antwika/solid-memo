import { useEffect, useRef, useState } from "preact/hooks";
import type { Locale } from "@solid-memo/domain/locale";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import { POD_PROVIDERS } from "@solid-memo/domain/podProvider";
import type { Session } from "@solid-memo/domain/session";
import illustrationUrl from "../assets/illustration.svg";
import { ExternalLink } from "./ExternalLink";
import { Footer } from "./Footer";
import { I18nProvider, useI18n } from "./i18n";
import { LanguageSelector } from "./LanguageSelector";
import { Loading } from "./Loading";
import { OnboardingFlow } from "./onboarding/OnboardingFlow";
import { PodConnectionScreen } from "./onboarding/PodConnectionScreen";
import { Workspace } from "./Workspace";

/**
 * The app in whichever state it is in, between the language choice on
 * top and the site-wide footer, in the language the user chose (else
 * their browser's, else English).
 */
export function App({ useCases }: { useCases: UseCases }) {
  const [locale, setLocale] = useState<Locale>(() => useCases.language(navigator.languages));

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function chooseLocale(chosen: Locale) {
    useCases.chooseLanguage(chosen);
    setLocale(chosen);
  }

  return (
    <I18nProvider locale={locale} onChoose={chooseLocale}>
      <div class="top-bar">
        <LanguageSelector />
      </div>
      <AppContent useCases={useCases} />
      <Footer />
    </I18nProvider>
  );
}

function AppContent({ useCases }: { useCases: UseCases }) {
  const queryClient = useQueryClient();
  const { t, tx, errorText } = useI18n();
  // The session can expire long after the effect below subscribed, in
  // whatever language the user reads by then.
  const latestT = useRef(t);
  latestT.current = t;
  const [checkingSession, setCheckingSession] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [returning, setReturning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [authError, setAuthError] = useState<unknown>(null);

  useEffect(() => {
    void (async () => {
      try {
        const established = await useCases.restoreSession();
        if (established !== null) {
          setSession(established.session);
          setConnecting(established.origin === "login");
        }
      } catch (e) {
        setAuthError(e);
      } finally {
        setCheckingSession(false);
      }
    })();
  }, [useCases]);

  useEffect(() => {
    return useCases.onSessionExpired(() => {
      setSession(null);
      setConnecting(false);
      setReturning(true);
      setAuthError(latestT.current("app.sessionExpired"));
      queryClient.clear();
    });
  }, [useCases, queryClient]);

  const accountQuery = useQuery({
    queryKey: ["account", session?.webId],
    queryFn: () => useCases.discoverAccount(session!),
    enabled: session !== null && connecting,
    retry: false,
  });

  async function startLogin(login: () => Promise<void>) {
    setAuthError(null);
    setBusy(true);
    try {
      await login();
    } catch (e) {
      setAuthError(e);
      setBusy(false);
    }
  }

  async function handleLogout() {
    await useCases.logout();
    setSession(null);
    setConnecting(false);
    setReturning(true);
    setAuthError(null);
    queryClient.clear();
  }

  if (checkingSession) {
    return (
      <main>
        <Loading label={t("app.restoringSession")} />
      </main>
    );
  }

  if (!session) {
    return (
      <main class="landing">
        <img
          class="hero"
          src={illustrationUrl}
          alt={t("app.illustrationAlt")}
          width={640}
          height={427}
        />
        <p class="tagline">{t("app.tagline")}</p>
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
        {authError !== null && <p class="error">{errorText(authError)}</p>}
      </main>
    );
  }

  if (connecting) {
    return (
      <main class="landing">
        <img
          class="hero"
          src={illustrationUrl}
          alt={t("app.illustrationAlt")}
          width={640}
          height={427}
        />
        <PodConnectionScreen
          account={accountQuery.data}
          busy={accountQuery.isFetching}
          error={errorText(accountQuery.error)}
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
        <a class="brand" href="#/">
          <img
            class="logo"
            src={illustrationUrl}
            alt={t("app.logoAlt")}
            width={60}
            height={40}
          />
        </a>
        <div class="masthead-title">
          <h1>
            <a class="wordmark" href="#/">
              Solid Memo
            </a>
          </h1>
          <p class="session-line">
            {tx("app.loggedInAs", {
              name: (
                <ExternalLink url={session.webId}>
                  {accountQuery.data?.name}
                </ExternalLink>
              ),
            })}
          </p>
        </div>
        <button onClick={handleLogout}>{t("app.logOut")}</button>
      </header>
      <Workspace useCases={useCases} session={session} />
    </main>
  );
}
