import { useState } from "preact/hooks";
import type { PodProvider } from "../../domain/podProvider";
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
  const [step, setStep] = useState<Step>(returning ? "webId" : "choose");
  const [cameFromChoice, setCameFromChoice] = useState(false);

  const signUpProviders = providers.filter(
    (provider) => provider.signUpUrl !== undefined,
  );

  if (step === "webId") {
    return (
      <section class="onboarding">
        <h2>Connect your Pod</h2>
        <WebIdForm
          busy={busy}
          autoFocus={cameFromChoice}
          onSubmit={onLogin}
          onBack={() => setStep("choose")}
        />
        <div class="provider-login">
          <h3>Or pick your provider</h3>
          <p class="hint">
            No WebID at hand? Choose where your Pod lives and log in there —
            your WebID comes back with the login.
          </p>
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
      <h2>Set up your Solid Pod</h2>
      <p>
        Your data is stored in a Solid Pod that you control. Create one with
        a Pod provider, or connect a Pod you already have.
      </p>
      <ul class="provider-list">
        {signUpProviders.map((provider) => (
          <li key={provider.id}>
            <span class="provider-name">{provider.name}</span>
            <a
              class="button primary"
              href={provider.signUpUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Create a Pod with ${provider.name} (opens in a new tab)`}
            >
              Create a Pod ↗
            </a>
          </li>
        ))}
      </ul>
      <p class="hint">
        Creating a Pod happens on the provider's site, in a new tab. When you
        are done, come back here and connect it.
      </p>
      <div class="onboarding-actions">
        <button
          onClick={() => {
            setCameFromChoice(true);
            setStep("webId");
          }}
        >
          I already have a Pod
        </button>
      </div>
    </section>
  );
}
