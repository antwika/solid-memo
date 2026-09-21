import { useState } from "preact/hooks";
import type { PodProvider } from "../../domain/podProvider";
import { WebIdForm } from "./WebIdForm";

type Step = "choose" | "webId";

/**
 * Signed-out onboarding: get a Pod from a provider, or connect an
 * existing one by WebID. Login itself happens on the identity provider's
 * page; this flow only collects the WebID.
 */
export function OnboardingFlow({
  providers,
  busy,
  returning,
  onLogin,
}: {
  providers: readonly PodProvider[];
  busy: boolean;
  /** The user was logged in before: skip straight to the WebID step. */
  returning: boolean;
  onLogin: (webId: string) => void;
}) {
  const [step, setStep] = useState<Step>(returning ? "webId" : "choose");
  // Only steal focus when the user navigated to the form themselves.
  const [cameFromChoice, setCameFromChoice] = useState(false);

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
        {providers.map((provider) => (
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
