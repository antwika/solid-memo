import { useState } from "preact/hooks";
import type {
  Instance,
  RegistrationOptions,
  RegistrationTarget,
} from "@solid-memo/domain/instance";
import { RegistrationTargetChooser } from "./RegistrationTargetChooser";
import { ExternalLink } from "./ExternalLink";
import { useI18n } from "./i18n";

export function InstancePicker({
  instances,
  options,
  busy,
  error,
  onSelect,
  onNewInstance,
  onAttach,
  onDelete,
}: {
  instances: Instance[];
  options: RegistrationOptions | null;
  busy: boolean;
  error: string | null;
  onSelect: (instance: Instance) => void;
  onNewInstance: () => void;
  onAttach: (url: string, target: RegistrationTarget) => void;
  onDelete: (instance: Instance) => void;
}) {
  const { t } = useI18n();
  const [attachUrl, setAttachUrl] = useState("");
  const [target, setTarget] = useState<RegistrationTarget>("private");

  function handleAttach(event: Event) {
    event.preventDefault();
    onAttach(attachUrl.trim(), target);
  }

  function handleDelete(instance: Instance) {
    if (
      window.confirm(t("instancePicker.deleteConfirm", { name: instance.name }))
    ) {
      onDelete(instance);
    }
  }

  return (
    <section>
      <h2>{t("instancePicker.heading")}</h2>
      {instances.length === 0 ? (
        <p>{t("instancePicker.empty")}</p>
      ) : (
        <ul class="instance-list">
          {instances.map((instance) => (
            <li key={instance.url}>
              <button onClick={() => onSelect(instance)} disabled={busy}>
                {instance.name}
              </button>{" "}
              <ExternalLink url={instance.url} class="hint" />{" "}
              <button
                class="danger"
                onClick={() => handleDelete(instance)}
                disabled={busy}
                aria-label={t("instancePicker.deleteLabel", { name: instance.name })}
              >
                {t("instancePicker.delete")}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onNewInstance} disabled={busy}>
        {t("instancePicker.newInstance")}
      </button>
      <details>
        <summary>{t("instancePicker.attachSummary")}</summary>
        <form onSubmit={handleAttach}>
          <label for="attach-url">{t("instancePicker.attachUrl")}</label>
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
            {t("instancePicker.attach")}
          </button>
        </form>
      </details>
      {error && <p class="error">{error}</p>}
    </section>
  );
}
