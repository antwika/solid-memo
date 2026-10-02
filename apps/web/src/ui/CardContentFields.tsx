import type { CardContent } from "@solid-memo/domain/deck";
import { editedText, withEditedText, withEnglish } from "@solid-memo/domain/langText";
import { useI18n } from "./i18n";

/**
 * The fields of a card as typed; all strings, empty when unset. Each is
 * the text the app edits: the English, else (a side's text) the untagged
 * or only text.
 */
export interface CardDraft {
  front: string;
  back: string;
  frontImageUrl: string;
  frontNote: string;
  backImageUrl: string;
  backLabel: string;
  backNote: string;
}

export const EMPTY_DRAFT: CardDraft = {
  front: "",
  back: "",
  frontImageUrl: "",
  frontNote: "",
  backImageUrl: "",
  backLabel: "",
  backNote: "",
};

/** The draft to start editing an existing card from. */
export function draftOf(content: CardContent): CardDraft {
  return {
    front: editedText(content.front),
    back: editedText(content.back),
    frontImageUrl: content.frontImageUrl ?? "",
    frontNote: editedText(content.frontNote),
    backImageUrl: content.backImageUrl ?? "",
    backLabel: editedText(content.backLabel),
    backNote: editedText(content.backNote),
  };
}

/**
 * The card content a draft makes, to validate: each text with the one
 * the app edits replaced by what was typed and every other language of
 * `card` (the card edited, if any) kept; a new card's sides untagged.
 * Clearing the edited text clears the whole text, other languages too,
 * as validation leaves it out.
 */
export function contentOf(draft: CardDraft, card?: CardContent): CardContent {
  return {
    front: withEditedText(card?.front ?? {}, draft.front),
    back: withEditedText(card?.back ?? {}, draft.back),
    frontImageUrl: draft.frontImageUrl,
    backImageUrl: draft.backImageUrl,
    frontNote: withEnglish(card?.frontNote, draft.frontNote),
    backLabel: withEnglish(card?.backLabel, draft.backLabel),
    backNote: withEnglish(card?.backNote, draft.backNote),
  };
}

/**
 * Text, picture and note fields for both sides of a card and the back's
 * label, shared by the card creator and the card page. Nothing is
 * `required`: a side may be a
 * picture only, so what a side needs is checked on submit by
 * validateCardContent, and its message shown by the form.
 */
export function CardContentFields({
  draft,
  busy,
  onChange,
}: {
  draft: CardDraft;
  busy: boolean;
  onChange: (draft: CardDraft) => void;
}) {
  const { t } = useI18n();
  const field = (key: keyof CardDraft) => ({
    value: draft[key],
    onInput: (e: { currentTarget: { value: string } }) =>
      onChange({ ...draft, [key]: e.currentTarget.value }),
    disabled: busy,
  });
  return (
    <>
      <label for="card-front">{t("cardContentFields.front")}</label>
      <input
        id="card-front"
        type="text"
        placeholder={t("cardContentFields.frontPlaceholder")}
        {...field("front")}
      />
      <label for="card-front-image">{t("cardContentFields.frontImage")}</label>
      <input
        id="card-front-image"
        type="url"
        placeholder={t("cardContentFields.imagePlaceholder")}
        {...field("frontImageUrl")}
      />
      <label for="card-front-note">{t("cardContentFields.frontNote")}</label>
      <input
        id="card-front-note"
        type="text"
        placeholder={t("cardContentFields.frontNotePlaceholder")}
        {...field("frontNote")}
      />
      <label for="card-back-label">{t("cardContentFields.backLabel")}</label>
      <input
        id="card-back-label"
        type="text"
        placeholder={t("cardContentFields.backLabelPlaceholder")}
        {...field("backLabel")}
      />
      <label for="card-back">{t("cardContentFields.back")}</label>
      <input
        id="card-back"
        type="text"
        placeholder={t("cardContentFields.backPlaceholder")}
        {...field("back")}
      />
      <label for="card-back-image">{t("cardContentFields.backImage")}</label>
      <input
        id="card-back-image"
        type="url"
        placeholder={t("cardContentFields.imagePlaceholder")}
        {...field("backImageUrl")}
      />
      <label for="card-back-note">{t("cardContentFields.backNote")}</label>
      <input
        id="card-back-note"
        type="text"
        placeholder={t("cardContentFields.backNotePlaceholder")}
        {...field("backNote")}
      />
    </>
  );
}
