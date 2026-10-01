import { useState } from "preact/hooks";
import type { PodProvider } from "@solid-memo/domain/podProvider";
import { useI18n } from "../i18n";
import { WebIdForm } from "./WebIdForm";

type Step = "choose" | "webId";

/**
 * Signed-out onboarding: get a Pod from a provider, or connect an
 * existing one — by typing a WebID, or by picking the provider to log in
 * at. Login itself happens on the identity provider's page; this flow
 * only finds out which provider that is.
 */
export function OnboardingFlow({
  providers,
  busy,
  returning,
  onLogin,
  onLoginWithProvider,
}: {
  providers: readonly PodProvider[];
  busy: boolean;
  returning: boolean;
  onLogin: (webId: string) => void;
  onLoginWithProvider: (provider: PodProvider) => void;
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

  return (
    <section class="onboarding">
      <h2>{t("onboardingFlow.setUpHeading")}</h2>
      <p>{t("onboardingFlow.intro")}</p>
      <ul class="provider-list">
        {signUpProviders.map((provider) => (
          <li key={provider.id}>
            <span class="provider-name">{provider.name}</span>
            <a
              class="button primary"
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
}
