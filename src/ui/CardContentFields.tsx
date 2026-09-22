import type { CardContent } from "../domain/deck";

/** The four fields of a card as typed; all strings, empty when unset. */
export interface CardDraft {
  front: string;
  back: string;
  frontImageUrl: string;
  backImageUrl: string;
}

export const EMPTY_DRAFT: CardDraft = {
  front: "",
  back: "",
  frontImageUrl: "",
  backImageUrl: "",
};

/** The draft to start editing an existing card from. */
export function draftOf(content: CardContent): CardDraft {
  return {
    front: content.front,
    back: content.back,
    frontImageUrl: content.frontImageUrl ?? "",
    backImageUrl: content.backImageUrl ?? "",
  };
}

/**
 * Text and picture fields for both sides of a card, shared by the card
 * creator and the card page. Nothing is `required`: a side may be a
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
    </>
  );
}
