import type { CardContent } from "@solid-memo/domain/deck";
import { editedText, withEnglish } from "@solid-memo/domain/langText";

/**
 * The fields of a card as typed; all strings, empty when unset. The notes
 * and the label are their English text: the one the app edits.
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
    front: content.front,
    back: content.back,
    frontImageUrl: content.frontImageUrl ?? "",
    frontNote: editedText(content.frontNote),
    backImageUrl: content.backImageUrl ?? "",
    backLabel: editedText(content.backLabel),
    backNote: editedText(content.backNote),
  };
}

/**
 * The card content a draft makes, to validate: the notes and the label
 * with their English replaced by what was typed and every other language
 * of `card` (the card edited, if any) kept. Clearing the English clears
 * the whole text, other languages too, as validation leaves it out.
 */
export function contentOf(draft: CardDraft, card?: CardContent): CardContent {
  return {
    front: draft.front,
    back: draft.back,
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
  const field = (key: keyof CardDraft) => ({
    value: draft[key],
    onInput: (e: { currentTarget: { value: string } }) =>
      onChange({ ...draft, [key]: e.currentTarget.value }),
    disabled: busy,
  });
  return (
    <>
      <label for="card-front">Front</label>
      <input
        id="card-front"
        type="text"
        placeholder="Question or prompt"
        {...field("front")}
      />
      <label for="card-front-image">Front picture (URL)</label>
      <input
        id="card-front-image"
        type="url"
        placeholder="https://… (optional)"
        {...field("frontImageUrl")}
      />
      <label for="card-front-note">Front note</label>
      <input
        id="card-front-note"
        type="text"
        placeholder="Shown under the front once the answer is revealed (optional)"
        {...field("frontNote")}
      />
      <label for="card-back-label">Label</label>
      <input
        id="card-back-label"
        type="text"
        placeholder="Shown above the back, e.g. what kind of answer it is (optional)"
        {...field("backLabel")}
      />
      <label for="card-back">Back</label>
      <input
        id="card-back"
        type="text"
        placeholder="Answer"
        {...field("back")}
      />
      <label for="card-back-image">Back picture (URL)</label>
      <input
        id="card-back-image"
        type="url"
        placeholder="https://… (optional)"
        {...field("backImageUrl")}
      />
      <label for="card-back-note">Back note</label>
      <input
        id="card-back-note"
        type="text"
        placeholder="Shown under the back once the answer is revealed (optional)"
        {...field("backNote")}
      />
    </>
  );
}
