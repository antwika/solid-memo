import type { AppError } from "@solid-memo/domain/appError";
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { validateCardContent, type CardContent } from "@solid-memo/domain/deck";
import { CARD_FIELDS_ERROR_ID, CardContentFields, contentOf, EMPTY_DRAFT } from "./CardContentFields";
import { ErrorMessage } from "./ErrorMessage";
import { useI18n } from "./i18n";

/**
 * Card entry form: text and an optional picture for each side. The draft
 * stays until the card is added, so a failed add loses nothing; once it
 * is, the form clears, a status line says so and the front's field takes
 * the focus, ready for the next card. While it adds, the button keeps
 * the focus (aria-disabled).
 */
export function AddCardForm({
  busy,
  onAdd,
}: {
  busy: boolean;
  /** Add the card; `onAdded` once it is. */
  onAdd: (content: CardContent, onAdded: () => void) => void;
}) {
  const { t, locale, errorText } = useI18n();
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [invalid, setInvalid] = useState<AppError | null>(null);
  const [added, setAdded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  /** The card was added: the front's field takes the focus once it is no longer disabled. */
  const focusFront = useRef(false);

  useLayoutEffect(() => {
    if (!focusFront.current || busy) return;
    focusFront.current = false;
    formRef.current!.querySelector<HTMLInputElement>("#card-front")!.focus();
  });

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (busy) return;
    setAdded(false);
    const validation = validateCardContent(contentOf(draft, locale));
    if (!validation.ok) {
      setInvalid(validation.error);
      return;
    }
    setInvalid(null);
    onAdd(validation.content, () => {
      setDraft(EMPTY_DRAFT);
      setAdded(true);
      focusFront.current = true;
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <CardContentFields draft={draft} busy={busy} invalid={invalid} onChange={setDraft} />
      <ErrorMessage id={CARD_FIELDS_ERROR_ID} error={errorText(invalid)} />
      <button type="submit" aria-disabled={busy}>
        {t("addCardForm.submitButton")}
      </button>
      {/* Mounted throughout, so each add is heard: the text clears while
          the next one is under way and comes back once it is done. */}
      <p class="hint" role="status">
        {added ? t("addCardForm.added") : ""}
      </p>
    </form>
  );
}
