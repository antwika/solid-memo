import type { AppError } from "@solid-memo/domain/appError";
import type { CardContent } from "@solid-memo/domain/deck";
import type { LangText } from "@solid-memo/domain/langText";
import { editedText, typedText, withEditedText, withTyped, withTypedTagged } from "@solid-memo/domain/langText";
import { useI18n } from "./i18n";

/**
 * The fields of a card as typed; all strings, empty when unset. A side's
 * text is the one the app edits (editedText: the English, else the
 * untagged or only text); a note, label or picture description is the
 * user's own, in the page's language when it has it (typedText).
 */
export interface CardDraft {
  front: string;
  back: string;
  frontImageUrl: string;
  frontImageDescription: string;
  frontNote: string;
  backImageUrl: string;
  backImageDescription: string;
  backLabel: string;
  backNote: string;
}

export const EMPTY_DRAFT: CardDraft = {
  front: "",
  back: "",
  frontImageUrl: "",
  frontImageDescription: "",
  frontNote: "",
  backImageUrl: "",
  backImageDescription: "",
  backLabel: "",
  backNote: "",
};

/** The id of the form's validation error, shown under the fields. */
export const CARD_FIELDS_ERROR_ID = "card-fields-error";

/** The field each of validateCardContent's errors is about. */
const FIELD_OF_ERROR: Partial<Record<string, string>> = {
  cardFrontImageNotWebUrl: "card-front-image",
  cardBackImageNotWebUrl: "card-back-image",
  cardFrontEmpty: "card-front",
  cardBackEmpty: "card-back",
};

/** The draft to start editing an existing card from, on a page in `locale`. */
export function draftOf(content: CardContent, locale: string): CardDraft {
  return {
    front: editedText(content.front),
    back: editedText(content.back),
    frontImageUrl: content.frontImageUrl ?? "",
    frontImageDescription: typedText(content.frontImageDescription, locale),
    frontNote: typedText(content.frontNote, locale),
    backImageUrl: content.backImageUrl ?? "",
    backImageDescription: typedText(content.backImageDescription, locale),
    backLabel: typedText(content.backLabel, locale),
    backNote: typedText(content.backNote, locale),
  };
}

/**
 * The card content a draft typed on a page in `locale` makes, to
 * validate: each text with the one the app edits replaced by what was
 * typed and every other language of `card` (the card edited, if any)
 * kept; a new card's sides untagged, its notes, label and picture
 * descriptions in the page's language (withTyped). Clearing the edited
 * text clears the whole text, other languages too, as validation leaves
 * it out.
 */
export function contentOf(draft: CardDraft, locale: string, card?: CardContent): CardContent {
  return {
    front: withEditedText(card?.front ?? {}, draft.front),
    back: withEditedText(card?.back ?? {}, draft.back),
    frontImageUrl: draft.frontImageUrl,
    backImageUrl: draft.backImageUrl,
    frontImageDescription: withTypedTagged(card?.frontImageDescription, draft.frontImageDescription, locale),
    backImageDescription: withTypedTagged(card?.backImageDescription, draft.backImageDescription, locale),
    frontNote: withTyped(card?.frontNote, draft.frontNote, locale),
    backLabel: withTyped(card?.backLabel, draft.backLabel, locale),
    backNote: withTyped(card?.backNote, draft.backNote, locale),
  };
}

/**
 * Text, picture, picture description and note fields for both sides of
 * a card and the back's label, shared by the card creator and the card page. Nothing is
 * `required`: a side may be a picture only, so a hint ahead of the fields
 * says what a side needs, and it is checked on submit by
 * validateCardContent, its message shown by the form under
 * CARD_FIELDS_ERROR_ID, which describes the field it is about.
 */
export function CardContentFields({
  draft,
  card,
  busy,
  invalid = null,
  onChange,
}: {
  draft: CardDraft;
  /** The card edited, if any: its texts' languages mark the fields. */
  card?: CardContent;
  busy: boolean;
  /** The form's validation error, if any: its field is marked invalid and described by it. */
  invalid?: AppError | null;
  onChange: (draft: CardDraft) => void;
}) {
  const { t, editedPart, typedPart } = useI18n();
  const field = (key: keyof CardDraft) => ({
    value: draft[key],
    onInput: (e: { currentTarget: { value: string } }) =>
      onChange({ ...draft, [key]: e.currentTarget.value }),
    disabled: busy,
  });
  const invalidField = invalid === null ? undefined : FIELD_OF_ERROR[invalid.code];
  /** A field's validity, and the error as its description when it is the one in error. */
  const validity = (id: string) =>
    id === invalidField ? { invalid: true, errorId: CARD_FIELDS_ERROR_ID } : { invalid: false, errorId: undefined };
  /**
   * A text field's language: the field marked with the language edited
   * (`part`: editedPart for a side, typedPart for the user's own text),
   * described by its own hints (`hintIds`) and by one saying which
   * language is edited when the reader sees the text in another.
   */
  const languageOf = (part: typeof editedPart) => (id: string, stored: LangText | undefined, ...hintIds: (string | undefined)[]) => {
    const { lang, hint } = part(stored);
    const languageId = `${id}-language`;
    const describedBy = [...hintIds, hint === null ? undefined : languageId].filter((x) => x !== undefined).join(" ");
    return {
      props: {
        id,
        lang,
        "aria-invalid": validity(id).invalid,
        "aria-describedby": describedBy,
      },
      hint: hint !== null && (
        <p id={languageId} class="hint field-hint">
          {hint}
        </p>
      ),
    };
  };
  const text = languageOf(editedPart);
  const own = languageOf(typedPart);
  const image = (id: string) => ({
    id,
    "aria-invalid": validity(id).invalid,
    "aria-describedby": validity(id).errorId,
  });
  const front = text("card-front", card?.front, validity("card-front").errorId, "card-sides-hint");
  const frontImageDescription = own(
    "card-front-image-description",
    card?.frontImageDescription,
    "card-front-image-description-hint",
  );
  const frontNote = own("card-front-note", card?.frontNote, "card-front-note-hint");
  const backLabel = own("card-back-label", card?.backLabel, "card-back-label-hint");
  const back = text("card-back", card?.back, validity("card-back").errorId, "card-sides-hint");
  const backImageDescription = own(
    "card-back-image-description",
    card?.backImageDescription,
    "card-back-image-description-hint",
  );
  const backNote = own("card-back-note", card?.backNote, "card-back-note-hint");
  return (
    <>
      <p id="card-sides-hint" class="hint">
        {t("cardContentFields.sidesHint")}
      </p>
      <label for="card-front">{t("cardContentFields.front")}</label>
      <input
        {...front.props}
        type="text"
        placeholder={t("cardContentFields.frontPlaceholder")}
        {...field("front")}
      />
      {front.hint}
      <label for="card-front-image">{t("cardContentFields.frontImage")}</label>
      <input
        {...image("card-front-image")}
        type="url"
        placeholder={t("cardContentFields.imagePlaceholder")}
        {...field("frontImageUrl")}
      />
      <label for="card-front-image-description">{t("cardContentFields.frontImageDescription")}</label>
      <input {...frontImageDescription.props} type="text" {...field("frontImageDescription")} />
      <p id="card-front-image-description-hint" class="hint field-hint">
        {t("cardContentFields.imageDescriptionHint")}
      </p>
      {frontImageDescription.hint}
      <label for="card-front-note">{t("cardContentFields.frontNote")}</label>
      <input {...frontNote.props} type="text" {...field("frontNote")} />
      <p id="card-front-note-hint" class="hint field-hint">
        {t("cardContentFields.frontNoteHint")}
      </p>
      {frontNote.hint}
      <label for="card-back-label">{t("cardContentFields.backLabel")}</label>
      <input {...backLabel.props} type="text" {...field("backLabel")} />
      <p id="card-back-label-hint" class="hint field-hint">
        {t("cardContentFields.backLabelHint")}
      </p>
      {backLabel.hint}
      <label for="card-back">{t("cardContentFields.back")}</label>
      <input
        {...back.props}
        type="text"
        placeholder={t("cardContentFields.backPlaceholder")}
        {...field("back")}
      />
      {back.hint}
      <label for="card-back-image">{t("cardContentFields.backImage")}</label>
      <input
        {...image("card-back-image")}
        type="url"
        placeholder={t("cardContentFields.imagePlaceholder")}
        {...field("backImageUrl")}
      />
      <label for="card-back-image-description">{t("cardContentFields.backImageDescription")}</label>
      <input {...backImageDescription.props} type="text" {...field("backImageDescription")} />
      <p id="card-back-image-description-hint" class="hint field-hint">
        {t("cardContentFields.imageDescriptionHint")}
      </p>
      {backImageDescription.hint}
      <label for="card-back-note">{t("cardContentFields.backNote")}</label>
      <input {...backNote.props} type="text" {...field("backNote")} />
      <p id="card-back-note-hint" class="hint field-hint">
        {t("cardContentFields.backNoteHint")}
      </p>
      {backNote.hint}
    </>
  );
}
