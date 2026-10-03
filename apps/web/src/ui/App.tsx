import { useEffect, useRef, useState } from "preact/hooks";
import type { Locale } from "@solid-memo/domain/locale";
import { resolveTheme, type Theme, type ThemeChoice } from "@solid-memo/domain/theme";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseCases } from "@solid-memo/application/useCases";
import { POD_PROVIDERS } from "@solid-memo/domain/podProvider";
import type { Session } from "@solid-memo/domain/session";
import illustrationUrl from "../assets/illustration.svg";
import { ExternalLink } from "./ExternalLink";
import { Footer } from "./Footer";
import { GuestStudyOffer } from "./GuestStudyOffer";
import { I18nProvider, useI18n } from "./i18n";
import { LanguageSelector } from "./LanguageSelector";
import { Loading } from "./Loading";
import { OnboardingFlow } from "./onboarding/OnboardingFlow";
import { PodConnectionScreen } from "./onboarding/PodConnectionScreen";
import { applyTheme, browserTheme, DARK_QUERY, instanceThemeKey, ThemeProvider } from "./theme";
import { ThemeToggle } from "./ThemeToggle";
import { Workspace } from "./Workspace";

/**
 * The app in whichever state it is in, between the language and theme
 * choices on top and the site-wide footer, in the language the user chose
 * (else their browser's, else English) and the theme they chose (else
 * their browser's).
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

  const queryClient = useQueryClient();
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>(() => useCases.themeChoice());
  const [preferredTheme, setPreferredTheme] = useState<Theme>(browserTheme);
  const theme = resolveTheme(themeChoice, preferredTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // The browser's theme as it changes (the OS going dark at dusk), shown while the choice is "system".
  useEffect(() => {
    const query = matchMedia(DARK_QUERY);
    const follow = () => setPreferredTheme(query.matches ? "dark" : "light");
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, []);

  // The open instance, whose preferences keep the choice once it has them.
  const themeInstance = useRef<string | null>(null);
  const themeChoices = useRef(0);

  function chooseTheme(chosen: ThemeChoice) {
    setThemeChoice(chosen);
    const instanceUrl = themeInstance.current;
    const count = ++themeChoices.current;
    void useCases
      .chooseTheme(chosen, instanceUrl)
      .catch(() => undefined)
      .finally(() => {
        // Read back what the pod holds (which undoes a failed write), unless another choice is on its way.
        if (instanceUrl === null || count !== themeChoices.current) return;
        void queryClient.invalidateQueries({ queryKey: instanceThemeKey(instanceUrl) });
        void queryClient.invalidateQueries({ queryKey: ["preferences", instanceUrl] });
      });
  }

  return (
    <I18nProvider locale={locale} onChoose={chooseLocale}>
      <ThemeProvider
        choice={themeChoice}
        preferred={preferredTheme}
        onChoose={chooseTheme}
        onFollowInstance={(instanceUrl) => {
          themeInstance.current = instanceUrl;
        }}
        onAdopt={setThemeChoice}
      >
        <div class="top-bar">
          <ThemeToggle />
          <LanguageSelector />
        </div>
        <AppContent useCases={useCases} />
        <Footer />
      </ThemeProvider>
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
  // A guest on their way to logging in, to keep their study; and one about to discard it.
  const [guestLoggingIn, setGuestLoggingIn] = useState(false);
  const [confirmingDiscard, setConfirmingDiscard] = useState(false);

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

  async function handleTryAsGuest() {
    setAuthError(null);
    setBusy(true);
    try {
      setSession(await useCases.startGuest(t("guest.instanceName")));
    } catch (e) {
      setAuthError(e);
    } finally {
      setBusy(false);
    }
  }

  async function handleDiscardGuest() {
    setBusy(true);
    try {
      await useCases.discardGuest();
      setSession(null);
      setConfirmingDiscard(false);
      setAuthError(null);
      queryClient.clear();
    } catch (e) {
      setAuthError(e);
    } finally {
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

  // Signed out, or a guest logging in to keep their study: the guest's study stays where it is meanwhile.
  if (!session || (session.guest === true && guestLoggingIn)) {
    const guest = session?.guest === true;
    return (
      <main class="landing">
        <img
          class="hero"
          src={illustrationUrl}
          alt={t("app.illustrationAlt")}
          width={640}
          height={427}
        />
        <p class="tagline">{guest ? t("app.loginToKeep") : t("app.tagline")}</p>
        <OnboardingFlow
          providers={POD_PROVIDERS}
          busy={busy}
          returning={returning || guest}
          onLogin={(webId) =>
            void startLogin(() => useCases.loginWithWebId(webId))
          }
          onLoginWithProvider={(provider) =>
            void startLogin(() =>
              useCases.loginWithProvider(provider.oidcIssuer),
            )
          }
          onTryAsGuest={guest ? undefined : () => void handleTryAsGuest()}
        />
        {guest && (
          <div class="onboarding-actions">
            <button onClick={() => setGuestLoggingIn(false)} disabled={busy}>
              {t("app.backToStudy")}
            </button>
          </div>
        )}
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
          {session.guest === true ? (
            <p class="session-line guest-line">{t("app.guestLine")}</p>
          ) : (
            <p class="session-line">
              {tx("app.loggedInAs", {
                name: (
                  <ExternalLink url={session.webId}>
                    {accountQuery.data?.name}
                  </ExternalLink>
                ),
              })}
            </p>
          )}
        </div>
        {session.guest === true ? (
          <div class="masthead-actions">
            <button onClick={() => setGuestLoggingIn(true)}>{t("app.keepStudy")}</button>
            <button onClick={() => setConfirmingDiscard(true)}>{t("app.discardGuest")}</button>
          </div>
        ) : (
          <button onClick={handleLogout}>{t("app.logOut")}</button>
        )}
      </header>
      {confirmingDiscard && (
        <div class="warning" role="region" aria-label={t("app.discardRegion")}>
          <p>{t("app.discardConfirm")}</p>
          <div class="edit-actions">
            <button class="danger" onClick={() => void handleDiscardGuest()} disabled={busy}>
              {t("app.discardYes")}
            </button>
            <button onClick={() => setConfirmingDiscard(false)} disabled={busy}>
              {t("app.cancel")}
            </button>
          </div>
          {authError !== null && <p class="error">{errorText(authError)}</p>}
        </div>
      )}
      {session.guest !== true && <GuestStudyOffer useCases={useCases} session={session} />}
      <Workspace useCases={useCases} session={session} />
    </main>
  );
}
