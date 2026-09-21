import type { SolidAccount } from "../../domain/account";
import { ExternalLink } from "../ExternalLink";
import { Loading } from "../Loading";

/**
 * Post-login onboarding step: shows Pod discovery in progress, then the
 * connected account (or why there is none) before entering the app.
 */
export function PodConnectionScreen({
  account,
  busy,
  error,
  onRetry,
  onContinue,
  onLogout,
}: {
  account: SolidAccount | undefined;
  busy: boolean;
  error: string | null;
  onRetry: () => void;
  onContinue: () => void;
  onLogout: () => void;
}) {
  const discovering = (
    <section class="onboarding" aria-busy="true">
      <h2>Discovering your Pod…</h2>
      <Loading label="Reading your WebID profile to find where your data lives." />
    </section>
  );

  if (busy) return discovering;

  if (error !== null) {
    return (
      <section class="onboarding">
        <h2>Could not discover your Pod</h2>
        <p class="error" role="alert">
          {error}
        </p>
        <div class="onboarding-actions">
          <button class="primary" onClick={onRetry}>
            Try again
          </button>
          <button onClick={onLogout}>Log out</button>
        </div>
      </section>
    );
  }

  if (account === undefined) return discovering;

  if (account.podUrl === undefined) {
    return (
      <section class="onboarding">
        <h2>No Pod found</h2>
        <p class="warning">
          You are logged in as <ExternalLink url={account.webId} />, but your
          WebID profile does not link to a Pod storage, so Solid Memo cannot
          tell where to keep your data.
        </p>
        <p class="hint">
          Your Pod provider can add the storage link to your profile. You can
          also continue and point Solid Memo at a storage yourself.
        </p>
        <div class="onboarding-actions">
          <button class="primary" onClick={onRetry}>
            Try again
          </button>
          <button onClick={onContinue}>Continue anyway</button>
          <button onClick={onLogout}>Log out</button>
        </div>
      </section>
    );
  }

  return (
    <section class="onboarding">
      <h2>Your Pod is connected.</h2>
      <dl class="account">
        <dt>WebID</dt>
        <dd>
          <ExternalLink url={account.webId} />
        </dd>
        <dt>Pod</dt>
        <dd>
          <ExternalLink url={account.podUrl} />
        </dd>
        {account.oidcIssuer !== undefined && (
          <>
            <dt>Identity provider</dt>
            <dd>
              <ExternalLink url={account.oidcIssuer} />
            </dd>
          </>
        )}
      </dl>
      <div class="onboarding-actions">
        <button class="primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </section>
  );
}
