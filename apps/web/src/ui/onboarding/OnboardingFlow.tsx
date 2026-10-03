import { useState } from "preact/hooks";
import type { PodProvider } from "@solid-memo/domain/podProvider";
import { useI18n } from "../i18n";
import { WebIdForm } from "./WebIdForm";

type Step = "choose" | "webId";

/**
 * Signed-out onboarding: get a Pod from a provider, or connect an
 * existing one — by typing a WebID, or by picking the provider to log in
 * at — or try the app as a guest first (docs/guest-mode.md). Login itself
 * happens on the identity provider's page; this flow only finds out which
 * provider that is.
 */
export function OnboardingFlow({
  providers,
  busy,
  returning,
  onLogin,
  onLoginWithProvider,
  onTryAsGuest,
}: {
  providers: readonly PodProvider[];
  busy: boolean;
  returning: boolean;
  onLogin: (webId: string) => void;
  onLoginWithProvider: (provider: PodProvider) => void;
  /** Offered on the first step when given: study as a guest, without logging in. */
  onTryAsGuest?: () => void;
}) {
  const { t } = useI18n();
  const [step, setStep] = useState<Step>(returning ? "webId" : "choose");
  const [cameFromChoice, setCameFromChoice] = useState(false);

  const signUpProviders = providers.filter(
    (provider) => provider.signUpUrl !== undefined,
  );

  if (step === "webId") {
    return (
      <section class="onboarding">
        <h2>{t("onboardingFlow.connectHeading")}</h2>
        <WebIdForm
          busy={busy}
          autoFocus={cameFromChoice}
          onSubmit={onLogin}
          onBack={() => setStep("choose")}
        />
        <div class="provider-login">
          <h3>{t("onboardingFlow.providerHeading")}</h3>
          <p class="hint">{t("onboardingFlow.providerHint")}</p>
          <div class="onboarding-actions">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => onLoginWithProvider(provider)}
                disabled={busy}
              >
                {provider.name}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const pod = (
    <section class="onboarding">
      <h2>{t("onboardingFlow.setUpHeading")}</h2>
      <p>{t("onboardingFlow.intro")}</p>
      <ul class="provider-list">
        {signUpProviders.map((provider) => (
          <li key={provider.id}>
            <span class="provider-name">{provider.name}</span>
            <a
              // Trying the app is the first thing offered; creating a Pod comes second.
              class={onTryAsGuest === undefined ? "button primary" : "button"}
              href={provider.signUpUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("onboardingFlow.createPodLabel", { provider: provider.name })}
            >
              {t("onboardingFlow.createPod")}
            </a>
          </li>
        ))}
      </ul>
      <p class="hint">{t("onboardingFlow.createPodHint")}</p>
      <div class="onboarding-actions">
        <button
          onClick={() => {
            setCameFromChoice(true);
            setStep("webId");
          }}
        >
          {t("onboardingFlow.havePod")}
        </button>
      </div>
    </section>
  );

  if (onTryAsGuest === undefined) return pod;
  return (
    <>
      <section class="onboarding guest-start">
        <h2>{t("onboardingFlow.tryHeading")}</h2>
        <p>{t("onboardingFlow.tryAsGuestHint")}</p>
        <button class="primary" onClick={onTryAsGuest} disabled={busy}>
          {t("onboardingFlow.tryAsGuest")}
        </button>
      </section>
      {pod}
    </>
  );
}
