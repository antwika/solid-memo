import { createContext, Fragment, type ComponentChildren } from "preact";
import { useContext } from "preact/hooks";
import type { DeckDirection } from "@solid-memo/domain/deck";
import { AppError } from "@solid-memo/domain/appError";
import { shown, type LangText } from "@solid-memo/domain/langText";
import { DEFAULT_LOCALE, type Locale } from "@solid-memo/domain/locale";
import en from "../i18n/en.json";
import sv from "../i18n/sv.json";

/** A message with a form per plural category: English and Swedish have two. */
type Plural = { one: string; other: string };
type Message = string | Plural;
interface Messages {
  [key: string]: Message | Messages;
}

/** Values for a message's `{name}` placeholders. */
export type Vars = Record<string, string | number>;

/**
 * The key of every message in English, the language every other is
 * checked against: "deckList.heading", a plural message's included.
 */
type KeysOf<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string | { other: string }
    ? `${Prefix}${K}`
    : KeysOf<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type MessageKey = KeysOf<typeof en>;

const CATALOGS: Record<Locale, Messages> = { en, sv };

function isPlural(node: Message | Messages): node is Plural {
  return typeof node === "object" && typeof node.other === "string";
}

/** The message at a dotted key; undefined when there is none. */
function lookup(messages: Messages, key: string): Message | undefined {
  let node: Message | Messages | undefined = messages;
  for (const part of key.split(".")) {
    if (node === undefined || typeof node === "string" || isPlural(node)) return undefined;
    node = node[part];
  }
  return node === undefined || typeof node === "string" || isPlural(node) ? node : undefined;
}

const PLACEHOLDER = /\{(\w+)\}/g;

/** The app's own text in one language, and the language-dependent formatting. */
export interface I18n {
  locale: Locale;
  /**
   * The message at `key`, its `{name}` placeholders filled from `vars`.
   * A plural message picks its form by `vars.count`. Every language has
   * every message (a test holds them to English); a key that names none
   * is shown as itself.
   */
  t(key: MessageKey, vars?: Vars): string;
  /** As `t`, with placeholders filled by markup (a link, emphasis). */
  tx(key: MessageKey, vars: Record<string, ComponentChildren>): ComponentChildren;
  /** Deck text in this language when the deck has it, else in the browser's, else English. */
  readerText(text: LangText): string;
  /** A day, written out ("September 22, 2026" / "22 september 2026"). */
  formatDate(iso: string): string;
  /** How a study direction is named. */
  directionLabel(direction: DeckDirection): string;
  /**
   * What went wrong, for the user: an AppError in this language
   * (`errors.<code>`, its values filled in), any other error as its own
   * message; null when there is no error.
   */
  errorText(error: unknown): string | null;
}

export function createI18n(locale: Locale): I18n {
  const plurals = new Intl.PluralRules(locale);

  function template(key: string, count: unknown): string {
    const message = lookup(CATALOGS[locale], key) ?? key;
    if (typeof message === "string") return message;
    return typeof count === "number" && plurals.select(count) === "one" ? message.one : message.other;
  }

  const t: I18n["t"] = (key, vars = {}) =>
    template(key, vars.count).replace(PLACEHOLDER, (whole, name: string) =>
      name in vars ? String(vars[name]) : whole,
    );

  return {
    locale,
    t,
    tx(key, vars) {
      const pieces = template(key, vars.count).split(PLACEHOLDER);
      // split() puts each placeholder's name at the odd indexes.
      return pieces.map((piece, index) =>
        index % 2 === 0 ? piece : <Fragment key={index}>{piece in vars ? vars[piece] : `{${piece}}`}</Fragment>,
      );
    },
    readerText(text) {
      return shown(text, [locale, ...navigator.languages]);
    },
    formatDate(iso) {
      return new Date(iso).toLocaleDateString(locale, { dateStyle: "long", timeZone: "UTC" });
    },
    errorText(error) {
      if (error === null || error === undefined) return null;
      if (error instanceof AppError) return t(`errors.${error.code}`, error.vars);
      return error instanceof Error ? error.message : String(error);
    },
    directionLabel(direction) {
      switch (direction) {
        case "front-to-back":
          return t("common.direction.frontToBack");
        case "back-to-front":
          return t("common.direction.backToFront");
        case "bidirectional":
          return t("common.direction.bidirectional");
      }
    },
  };
}

interface I18nState extends I18n {
  /** Speak another language from now on. */
  chooseLocale(locale: Locale): void;
}

const I18nContext = createContext<I18nState>({
  ...createI18n(DEFAULT_LOCALE),
  chooseLocale: () => undefined,
});

/** The language the screens below speak, and how to choose another. */
export function I18nProvider({
  locale,
  onChoose,
  children,
}: {
  locale: Locale;
  onChoose: (locale: Locale) => void;
  children: ComponentChildren;
}) {
  return (
    <I18nContext.Provider value={{ ...createI18n(locale), chooseLocale: onChoose }}>
      {children}
    </I18nContext.Provider>
  );
}

/** The app's text in the language the user reads; English outside a provider. */
export function useI18n(): I18nState {
  return useContext(I18nContext);
}
