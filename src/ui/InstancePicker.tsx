import { useState } from "preact/hooks";
import type {
  Instance,
  RegistrationOptions,
  RegistrationTarget,
} from "../domain/instance";
import { RegistrationTargetChooser } from "./RegistrationTargetChooser";
import { ExternalLink } from "./ExternalLink";

export function InstancePicker({
  instances,
  options,
  busy,
  error,
  onSelect,
  onNewInstance,
  onAttach,
}: {
  instances: Instance[];
  options: RegistrationOptions | null;
  busy: boolean;
  error: string | null;
  onSelect: (instance: Instance) => void;
  onNewInstance: () => void;
  onAttach: (url: string, target: RegistrationTarget) => void;
}) {
  const [attachUrl, setAttachUrl] = useState("");
  const [target, setTarget] = useState<RegistrationTarget>("private");

  function handleAttach(event: Event) {
    event.preventDefault();
    onAttach(attachUrl.trim(), target);
  }

  return (
    <section>
      <h2>Choose a Solid Memo instance</h2>
      {instances.length === 0 ? (
        <p>No instances are registered yet.</p>
      ) : (
        <ul class="instance-list">
          {instances.map((instance) => (
            <li key={instance.url}>
              <button onClick={() => onSelect(instance)} disabled={busy}>
                {instance.name}
              </button>{" "}
              <ExternalLink url={instance.url} class="hint" />
            </li>
          ))}
        </ul>
      )}
      <button onClick={onNewInstance} disabled={busy}>
        New instance…
      </button>
      <details>
        <summary>Attach an existing instance by URL</summary>
        <form onSubmit={handleAttach}>
          <label for="attach-url">Instance container URL</label>
          <input
            id="attach-url"
            type="url"
            placeholder="https://your-pod/solid-memo/my-instance/"
            value={attachUrl}
            onInput={(e) => setAttachUrl(e.currentTarget.value)}
            required
            disabled={busy}
          />
          <RegistrationTargetChooser
            options={options}
            value={target}
            onChange={setTarget}
          />
          <button type="submit" disabled={busy}>
            Attach
          </button>
        </form>
      </details>
      {error && <p class="error">{error}</p>}
    </section>
  );
}
