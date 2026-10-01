import { useEffect, useRef, useState } from "preact/hooks";
import { validateWebId } from "@solid-memo/domain/webId";
import { useI18n } from "../i18n";

export function WebIdForm({
  busy,
  autoFocus,
  onSubmit,
  onBack,
}: {
  busy: boolean;
  /** Move focus to the field on mount (the user just navigated here). */
  autoFocus: boolean;
  /** Receives a validated, normalized WebID. */
  onSubmit: (webId: string) => void;
  onBack: () => void;
}) {
  const { t } = useI18n();
  const [webId, setWebId] = useState("");
  const [invalid, setInvalid] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) input.current!.focus();
  }, []);

  function handleSubmit(event: Event) {
    event.preventDefault();
    const validation = validateWebId(webId);
    if (!validation.ok) {
      setInvalid(validation.error);
      return;
    }
    onSubmit(validation.webId);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label for="webid">WebID</label>
      <input
        ref={input}
        id="webid"
        name="webid"
        type="url"
        inputMode="url"
        autocomplete="url"
        autocapitalize="off"
        spellcheck={false}
        placeholder="https://you.example/profile/card#me"
        value={webId}
        onInput={(e) => {
          setWebId(e.currentTarget.value);
          setInvalid(null);
        }}
        aria-invalid={invalid !== null}
        aria-describedby="webid-help"
        disabled={busy}
      />
      {invalid && (
        <p class="error" role="alert">
          {invalid}
        </p>
      )}
      <p id="webid-help" class="hint">
        {t("webIdForm.help")}
      </p>
      <div class="onboarding-actions">
        <button type="submit" disabled={busy}>
          {busy ? t("webIdForm.redirecting") : t("webIdForm.logIn")}
        </button>
        <button type="button" onClick={onBack} disabled={busy}>
          {t("webIdForm.back")}
        </button>
      </div>
    </form>
  );
}
