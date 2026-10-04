import { useLayoutEffect } from "preact/hooks";
import { AppError } from "@solid-memo/domain/appError";
import { validateCardContent, type CardContent, type CardTextPart } from "@solid-memo/domain/deck";
import type { DeckLanguages } from "@solid-memo/domain/deckLanguages";
import type { LangText } from "@solid-memo/domain/langText";
import { ErrorMessage } from "./ErrorMessage";
import { useI18n, type MessageKey } from "./i18n";
import {
  draftOf as textDraftOf,
  LangTextField,
  languageButtonId,
  rememberLanguages,
  textOfDraft,
  type DraftEntry,
  type LangTextDraft,
} from "./LangTextField";
import type { LanguageRole } from "./LanguagePicker";
import { recentLanguages } from "./remembered";

/**
 * The fields of a card as typed: each text as LangTextField edits it, in
 * the languages the user states, and each picture's URL (empty when
 * unset). `touched` lists the texts the user changed, their words or
 * their language.
 */
export interface CardDraft {
  front: LangTextDraft;
  back: LangTextDraft;
  frontImageUrl: string;
  frontImageDescription: LangTextDraft;
  frontNote: LangTextDraft;
  backImageUrl: string;
  backImageDescription: LangTextDraft;
  backLabel: LangTextDraft;
  backNote: LangTextDraft;
  touched: readonly CardTextPart[];
}

/**
 * Texts that take their language from the same evidence: the fronts, the
 * backs, and the user's own text (notes, the label, the pictures'
 * descriptions), which is in one language however many fields it fills.
 */
export type LanguageGroup = "front" | "back" | "own";

/** The language each group's new text starts in, where there is evidence of one. */
export type CardLanguageDefaults = Partial<Record<LanguageGroup, string>>;

/** What the forms offer of a deck's languages: a default per group, and the languages its pickers suggest first. */
export interface CardLanguageHints {
  defaults: CardLanguageDefaults;
  suggestions: Record<LanguageGroup, string[]>;
}

/** The card's texts, as the form shows them. */
const TEXT_PARTS: readonly CardTextPart[] = [
  "front",
  "frontImageDescription",
  "frontNote",
  "backLabel",
  "back",
  "backImageDescription",
  "backNote",
];

function groupOf(part: CardTextPart): LanguageGroup {
  return part === "front" || part === "back" ? part : "own";
}

const FIELD_IDS: Record<CardTextPart, string> = {
  front: "card-front",
  back: "card-back",
  frontImageDescription: "card-front-image-description",
  frontNote: "card-front-note",
  backImageDescription: "card-back-image-description",
  backLabel: "card-back-label",
  backNote: "card-back-note",
};

const ROLES: Record<CardTextPart, LanguageRole> = {
  front: "front",
  back: "back",
  frontImageDescription: "pictureDescription",
  frontNote: "frontNote",
  backImageDescription: "pictureDescription",
  backLabel: "backLabel",
  backNote: "backNote",
};

/** How an error names each text ("Choose the language of {field}."). */
const FIELD_NOUNS: Record<CardTextPart, MessageKey> = {
  front: "language.field.front",
  back: "language.field.back",
  frontImageDescription: "language.field.frontImageDescription",
  frontNote: "language.field.frontNote",
  backImageDescription: "language.field.backImageDescription",
  backLabel: "language.field.backLabel",
  backNote: "language.field.backNote",
};

/** The id of the form's validation error, shown under the fields. */
export const CARD_FIELDS_ERROR_ID = "card-fields-error";

/** The field each of validateCardContent's errors about no text of the card is about. */
const FIELD_OF_ERROR: Partial<Record<string, string>> = {
  cardFrontImageNotWebUrl: "card-front-image",
  cardBackImageNotWebUrl: "card-back-image",
  cardFrontEmpty: "card-front",
  cardBackEmpty: "card-back",
};

/**
 * Why a card's draft is refused: the error, the text it is about, if
 * any, and the entry of that text whose language is asked for, if it is.
 */
export interface CardFieldsError {
  error: AppError;
  part?: CardTextPart;
  entry?: DraftEntry;
}

/** The field an error is about: the text it names, else the field its code is about. */
function fieldOf(invalid: CardFieldsError): string | undefined {
  return invalid.part === undefined ? FIELD_OF_ERROR[invalid.error.code] : FIELD_IDS[invalid.part];
}

/**
 * What a deck's cards say of their languages (deckLanguages), as the
 * forms use it: the language new text of each group starts in — the one
 * the deck's cards usually have, and for the user's own text, failing
 * that, the one last chosen for it on this device — and the languages
 * each group's pickers suggest first: that one, then the deck name's.
 */
export function cardLanguageHints(languages: DeckLanguages, title: LangText): CardLanguageHints {
  const defaults: CardLanguageDefaults = {
    front: languages.front,
    back: languages.back,
    own: languages.own ?? recentLanguages("own")[0],
  };
  const suggest = (group: LanguageGroup) => [...(defaults[group] === undefined ? [] : [defaults[group]]), ...Object.keys(title)];
  return { defaults, suggestions: { front: suggest("front"), back: suggest("back"), own: suggest("own") } };
}

/** An empty draft whose texts each start in the language `tagOf` gives, if any. */
function emptyDraft(tagOf: (part: CardTextPart) => string | undefined): CardDraft {
  const texts = Object.fromEntries(TEXT_PARTS.map((part) => [part, textDraftOf(undefined, [], { tag: tagOf(part) ?? null })]));
  return { ...(texts as Record<CardTextPart, LangTextDraft>), frontImageUrl: "", backImageUrl: "", touched: [] };
}

/** A new card's draft: empty, each text in its group's default language, else in none yet. */
export function newDraft(defaults: CardLanguageDefaults): CardDraft {
  return emptyDraft((part) => defaults[groupOf(part)]);
}

/**
 * The next card's draft once one is added: empty, each text in the
 * language the added card's had (or was to have), so a run of cards
 * takes no choosing; else in its group's default.
 */
export function nextDraft(draft: CardDraft, defaults: CardLanguageDefaults): CardDraft {
  return emptyDraft((part) => {
    const { tag } = draft[part][0]!;
    return tag === null || tag === "" ? defaults[groupOf(part)] : tag;
  });
}

/** Whether a text is empty and alone: no words, no translations. */
function isBlank(text: LangTextDraft): boolean {
  return text.length === 1 && text[0]!.value === "";
}

/**
 * The draft with each text the user has not touched, empty and in no
 * language yet or in its group's `previous` default, in its group's
 * default: the defaults may come once the deck's cards are read, and
 * what they say outranks the device's recent choice they stood on
 * before. The same draft when nothing changes.
 */
export function withDefaults(
  draft: CardDraft,
  defaults: CardLanguageDefaults,
  previous: CardLanguageDefaults = {},
): CardDraft {
  let next = draft;
  for (const part of TEXT_PARTS) {
    const group = groupOf(part);
    const tag = defaults[group];
    const current = draft[part][0]!.tag;
    const replaceable = current === null || current === previous[group];
    if (tag !== undefined && tag !== current && !draft.touched.includes(part) && isBlank(draft[part]) && replaceable) {
      next = { ...next, [part]: textDraftOf(undefined, [], { tag }) };
    }
  }
  return next;
}

/**
 * The draft to start editing an existing card from, for a reader who
 * prefers `readerLanguages`: each text as LangTextField shows it, an
 * empty one in its group's default language.
 */
export function draftOf(
  content: CardContent,
  readerLanguages: readonly string[],
  { defaults = {} }: { defaults?: CardLanguageDefaults } = {},
): CardDraft {
  const texts = Object.fromEntries(
    TEXT_PARTS.map((part) => [
      part,
      textDraftOf(content[part], readerLanguages, { tag: defaults[groupOf(part)] ?? null }),
    ]),
  );
  return {
    ...(texts as Record<CardTextPart, LangTextDraft>),
    frontImageUrl: content.frontImageUrl ?? "",
    backImageUrl: content.backImageUrl ?? "",
    touched: [],
  };
}

/** Outcome of checking a card's draft: its content, validated, or why it is refused. */
export type CardDraftCheck = { ok: true; content: CardContent } | { ok: false; invalid: CardFieldsError };

/**
 * The card content a draft says, validated (validateCardContent; `saved`
 * the card edited, if any, whose untagged sides may stay untouched).
 * Text with no language chosen is refused first, at the entry that needs
 * one: the app asks rather than guess. A picture's description counts
 * only with a picture to describe.
 */
export function checkDraft(draft: CardDraft, saved?: CardContent): CardDraftCheck {
  const texts: Partial<Record<CardTextPart, LangText>> = {};
  for (const part of TEXT_PARTS) {
    if (part === "frontImageDescription" && draft.frontImageUrl.trim() === "") continue;
    if (part === "backImageDescription" && draft.backImageUrl.trim() === "") continue;
    const result = textOfDraft(draft[part]);
    if ("missing" in result) {
      return { ok: false, invalid: { error: new AppError("textNeedsLanguage", { field: part }), part, entry: result.missing } };
    }
    texts[part] = result.text;
  }
  const validation = validateCardContent(
    { ...texts, front: texts.front!, back: texts.back!, frontImageUrl: draft.frontImageUrl, backImageUrl: draft.backImageUrl },
    saved,
  );
  if (validation.ok) return validation;
  const { error, part } = validation;
  if (part === undefined) return { ok: false, invalid: { error } };
  return { ok: false, invalid: { error, part, entry: draft[part].find((entry) => entry.tag === "") } };
}

/** Notes the languages of the user's own text a saved card states, as this device's latest choices for it. */
export function rememberCardLanguages(content: CardContent, draft: CardDraft): void {
  for (const part of TEXT_PARTS) {
    if (groupOf(part) === "own") rememberLanguages("own", content[part] ?? {}, draft[part]);
  }
}

/** The form's message for an error in its draft, under CARD_FIELDS_ERROR_ID; the text it names named in this language. */
export function CardFieldsErrorMessage({ invalid }: { invalid: CardFieldsError | null }) {
  const { t, errorText } = useI18n();
  const error =
    invalid?.part !== undefined && invalid.error.code === "textNeedsLanguage"
      ? new AppError("textNeedsLanguage", { field: t(FIELD_NOUNS[invalid.part]) })
      : invalid?.error;
  return <ErrorMessage id={CARD_FIELDS_ERROR_ID} error={errorText(error)} />;
}

/**
 * Text, picture, picture description and note fields for both sides of
 * a card and the back's label, shared by the card creator and the card
 * page, each text in the languages the user states (LangTextField).
 * Nothing is `required`: a side may be a picture only, so a hint ahead of
 * the fields says what a side needs, and it is checked on submit
 * (checkDraft), its message shown by the form under CARD_FIELDS_ERROR_ID,
 * which describes the field it is about; for a language still to choose,
 * that text's picker, which takes the focus.
 *
 * Choosing the language of an empty text chooses it for the empty texts
 * of its group the user has not touched: a card's notes and label are
 * mostly in one language.
 */
export function CardContentFields({
  draft,
  busy,
  invalid = null,
  suggestions,
  onChange,
}: {
  draft: CardDraft;
  busy: boolean;
  /** Why the draft was refused, if it was: its field is marked invalid and described by it. */
  invalid?: CardFieldsError | null;
  suggestions: Record<LanguageGroup, string[]>;
  onChange: (draft: CardDraft) => void;
}) {
  const { t } = useI18n();
  const invalidField = invalid === null ? undefined : fieldOf(invalid);
  const languageError = invalid?.entry !== undefined;

  // A language asked for: its picker takes the focus, saying so.
  useLayoutEffect(() => {
    if (invalid?.part === undefined || invalid.entry === undefined) return;
    document.getElementById(languageButtonId(FIELD_IDS[invalid.part], invalid.entry))?.focus();
  }, [invalid]);

  function changeText(part: CardTextPart, text: LangTextDraft) {
    const touched = draft.touched.includes(part) ? draft.touched : [...draft.touched, part];
    let next: CardDraft = { ...draft, [part]: text, touched };
    const { tag } = text[0]!;
    if (isBlank(draft[part]) && isBlank(text) && tag !== null && tag !== draft[part][0]!.tag) {
      for (const other of TEXT_PARTS) {
        if (other !== part && groupOf(other) === groupOf(part) && !touched.includes(other) && isBlank(next[other])) {
          next = { ...next, [other]: textDraftOf(undefined, [], { tag }) };
        }
      }
    }
    onChange(next);
  }

  /**
   * A text's field, described by its hints, and by the form's message
   * when that is about its text; `hint` (its id and text) is shown under
   * its text.
   */
  const textField = (part: CardTextPart, label: string, hintIds: string[], hint?: { id: string; text: string }) => {
    const id = FIELD_IDS[part];
    const textInvalid = id === invalidField && !languageError;
    return (
      <LangTextField
        id={id}
        label={label}
        role={ROLES[part]}
        draft={draft[part]}
        suggestions={suggestions[groupOf(part)]}
        placeholder={
          part === "front"
            ? t("cardContentFields.frontPlaceholder")
            : part === "back"
              ? t("cardContentFields.backPlaceholder")
              : undefined
        }
        disabled={busy}
        invalid={textInvalid}
        describedBy={[...(textInvalid ? [CARD_FIELDS_ERROR_ID] : []), ...hintIds, ...(hint ? [hint.id] : [])].join(
          " ",
        )}
        hint={
          hint && (
            <p id={hint.id} class="hint field-hint">
              {hint.text}
            </p>
          )
        }
        missing={invalid?.part === part ? invalid.entry : undefined}
        errorId={CARD_FIELDS_ERROR_ID}
        onChange={(text) => changeText(part, text)}
      />
    );
  };
  const image = (id: string, key: "frontImageUrl" | "backImageUrl") => ({
    id,
    type: "url" as const,
    placeholder: t("cardContentFields.imagePlaceholder"),
    value: draft[key],
    onInput: (e: { currentTarget: { value: string } }) => onChange({ ...draft, [key]: e.currentTarget.value }),
    disabled: busy,
    "aria-invalid": id === invalidField,
    "aria-describedby": id === invalidField ? CARD_FIELDS_ERROR_ID : undefined,
  });
  return (
    <>
      <p id="card-sides-hint" class="hint">
        {t("cardContentFields.sidesHint")}
      </p>
      {textField("front", t("cardContentFields.front"), ["card-sides-hint"])}
      <label for="card-front-image">{t("cardContentFields.frontImage")}</label>
      <input {...image("card-front-image", "frontImageUrl")} />
      {textField("frontImageDescription", t("cardContentFields.frontImageDescription"), [], {
        id: "card-front-image-description-hint",
        text: t("cardContentFields.imageDescriptionHint"),
      })}
      {textField("frontNote", t("cardContentFields.frontNote"), [], {
        id: "card-front-note-hint",
        text: t("cardContentFields.frontNoteHint"),
      })}
      {textField("backLabel", t("cardContentFields.backLabel"), [], {
        id: "card-back-label-hint",
        text: t("cardContentFields.backLabelHint"),
      })}
      {textField("back", t("cardContentFields.back"), ["card-sides-hint"])}
      <label for="card-back-image">{t("cardContentFields.backImage")}</label>
      <input {...image("card-back-image", "backImageUrl")} />
      {textField("backImageDescription", t("cardContentFields.backImageDescription"), [], {
        id: "card-back-image-description-hint",
        text: t("cardContentFields.imageDescriptionHint"),
      })}
      {textField("backNote", t("cardContentFields.backNote"), [], {
        id: "card-back-note-hint",
        text: t("cardContentFields.backNoteHint"),
      })}
    </>
  );
}
