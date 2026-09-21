import { useState } from "preact/hooks";

const DEFAULT_WEBID = "https://alice.datapod.igrant.io/profile/card#me";

export function LoginForm({
  busy,
  onLogin,
}: {
  busy: boolean;
  onLogin: (webId: string) => void;
}) {
  const [webId, setWebId] = useState(DEFAULT_WEBID);

  function handleSubmit(event: Event) {
    event.preventDefault();
    onLogin(webId);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label for="webid">WebID</label>
      <input
        id="webid"
        type="url"
        placeholder="https://your-pod/profile/card#me"
        value={webId}
        onInput={(e) => setWebId(e.currentTarget.value)}
        required
        disabled={busy}
      />
      <button type="submit" disabled={busy}>
        {busy ? "Redirecting…" : "Log in"}
      </button>
    </form>
  );
}
