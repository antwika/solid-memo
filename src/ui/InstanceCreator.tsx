import { useState } from "preact/hooks";
import type {
  RegistrationOptions,
  RegistrationTarget,
} from "../domain/instance";
import type { Storage } from "../domain/storage";
import { RegistrationTargetChooser } from "./RegistrationTargetChooser";

export function InstanceCreator({
  storage,
  options,
  busy,
  error,
  onCreate,
  onBack,
}: {
  storage: Storage;
  options: RegistrationOptions | null;
  busy: boolean;
  error: string | null;
  onCreate: (args: {
    containerUrl: string;
    name: string;
    registrationTarget: RegistrationTarget;
  }) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState("");
  const [containerUrl, setContainerUrl] = useState(
    `${storage.url}solid-memo/main/`,
  );
  const [target, setTarget] = useState<RegistrationTarget>("private");

  function handleSubmit(event: Event) {
    event.preventDefault();
    onCreate({
      containerUrl: containerUrl.trim(),
      name: name.trim(),
      registrationTarget: target,
    });
  }

  return (
    <section>
      <h2>New Solid Memo instance</h2>
      <form onSubmit={handleSubmit}>
        <label for="instance-name">Name</label>
        <input
          id="instance-name"
          type="text"
          placeholder="My instance"
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
          required
          disabled={busy}
        />
        <label for="instance-container">Location</label>
        <input
          id="instance-container"
          type="url"
          value={containerUrl}
          onInput={(e) => setContainerUrl(e.currentTarget.value)}
          required
          disabled={busy}
        />
        <RegistrationTargetChooser
          options={options}
          value={target}
          onChange={setTarget}
        />
        <button type="submit" disabled={busy}>
          Create instance
        </button>
        <button type="button" onClick={onBack} disabled={busy}>
          Back
        </button>
      </form>
      {error && <p class="error">{error}</p>}
    </section>
  );
}
