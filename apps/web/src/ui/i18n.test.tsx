import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { AppError, ERROR_TEMPLATES } from "@solid-memo/domain/appError";
import { createI18n, I18nProvider, useI18n, type MessageKey } from "./i18n";
import en from "../i18n/en.json";
import sv from "../i18n/sv.json";

/** Every message's key, and its placeholders, in a message file. */
function shape(messages: object, prefix = ""): Record<string, string[]> {
  const found: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(messages)) {
    const path = `${prefix}${key}`;
    if (typeof value === "string") {
      found[path] = [...value.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
    } else if (typeof value.other === "string") {
      found[path] = [
        ...new Set(
          Object.values(value as Record<string, string>).flatMap((form) =>
            [...form.matchAll(/\{(\w+)\}/g)].map((m) => m[1]),
          ),
        ),
      ].sort();
    } else {
      Object.assign(found, shape(value, `${path}.`));
    }
  }
  return found;
}

describe("the message files", () => {
  it("say the same things in Swedish as in English, with the same placeholders", () => {
    expect(shape(sv)).toEqual(shape(en));
  });
});

/** Every message key the app's source asks for (keys are literals by rule). */
function keysUsed(dir: string): Set<string> {
  const used = new Set<string>();
  for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (!/\.tsx?$/.test(entry.name) || /\.test\.tsx?$/.test(entry.name)) continue;
    const source = readFileSync(join(entry.parentPath, entry.name), "utf8");
    for (const match of source.matchAll(/\btx?\(\s*"([^"]+)"/g)) used.add(match[1]);
  }
  return used;
}

describe("the source", () => {
  it("asks only for messages English has", () => {
    const known = new Set(Object.keys(shape(en)));
    const missing = [...keysUsed(join(import.meta.dirname, ".."))].filter((key) => !known.has(key));
    expect(missing).toEqual([]);
  });
});

describe("createI18n", () => {
  it("fills placeholders", () => {
    expect(createI18n("en").t("footer.version", { version: "abc" })).toBe("Version abc");
    expect(createI18n("en").t("footer.version")).toBe("Version {version}");
  });

  it("picks a plural form by count", () => {
    expect(createI18n("en").t("common.cardCount", { count: 1 })).toBe("1 card");
    expect(createI18n("en").t("common.cardCount", { count: 3 })).toBe("3 cards");
    expect(createI18n("sv").t("common.cardCount", { count: 3 })).toBe("3 kort");
    expect(createI18n("en").t("common.cardCount")).toBe("{count} cards");
  });

  it("speaks Swedish when asked", () => {
    expect(createI18n("sv").t("language.label")).toBe("Språk");
  });

  it("names a missing message by its key", () => {
    expect(createI18n("sv").t("no.such.message" as MessageKey)).toBe("no.such.message");
    expect(createI18n("en").t("common" as MessageKey)).toBe("common");
    expect(createI18n("en").t("common.cardCount.one.deeper" as MessageKey)).toBe("common.cardCount.one.deeper");
  });

  it("fills placeholders with markup", () => {
    render(
      <p data-testid="p">
        {createI18n("en").tx("footer.createdBy", { author: <a href="#a">antwika</a> })}
        {createI18n("en").tx("footer.version", {})}
      </p>,
    );
    expect(screen.getByTestId("p")).toHaveTextContent("Created by antwikaVersion {version}");
    expect(screen.getByRole("link", { name: "antwika" })).toBeInTheDocument();
  });

  it("shows deck text in the spoken language first", () => {
    const text = { en: "Capitals", sv: "Huvudstäder" };
    expect(createI18n("sv").readerText(text)).toBe("Huvudstäder");
    expect(createI18n("en").readerText(text)).toBe("Capitals");
  });

  it("writes out a day in the spoken language", () => {
    expect(createI18n("en").formatDate("2026-09-22T00:00:00.000Z")).toBe("September 22, 2026");
    expect(createI18n("sv").formatDate("2026-09-22T00:00:00.000Z")).toBe("22 september 2026");
  });

  it("names every study direction", () => {
    const sv = createI18n("sv");
    expect(sv.directionLabel("front-to-back")).toBe("Framsida → baksida");
    expect(sv.directionLabel("back-to-front")).toBe("Baksida → framsida");
    expect(sv.directionLabel("bidirectional")).toBe("Åt båda hållen");
  });
});

function Spoken() {
  const { locale, chooseLocale } = useI18n();
  return (
    <button type="button" onClick={() => chooseLocale("sv")}>
      {locale}
    </button>
  );
}

describe("errorText", () => {
  it("says an app error in the spoken language, its values filled in", () => {
    const gone = new AppError("deckGone", { deck: "Capitals" });
    expect(createI18n("en").errorText(gone)).toBe("The deck <Capitals> no longer exists.");
    expect(createI18n("sv").errorText(gone)).toBe("Kortleken <Capitals> finns inte längre.");
    const invalid = new AppError("updatedCopyInvalid", { count: 1 });
    expect(createI18n("sv").errorText(invalid)).toBe(
      "Den uppdaterade kopian uppfyller inte Solid Memos former (1 avvikelse); dina data lämnas som de var.",
    );
  });

  it("shows any other error as its own message, and no error as none", () => {
    const { errorText } = createI18n("sv");
    expect(errorText(new Error("broken"))).toBe("broken");
    expect(errorText("plain")).toBe("plain");
    expect(errorText(42)).toBe("42");
    expect(errorText(null)).toBeNull();
    expect(errorText(undefined)).toBeNull();
  });

  it("has every error's English exactly as the domain writes it", () => {
    expect(en.errors).toEqual(ERROR_TEMPLATES);
  });
});

describe("useI18n", () => {
  it("speaks English outside a provider", () => {
    render(<Spoken />);
    screen.getByRole("button").click();
    expect(screen.getByRole("button")).toHaveTextContent("en");
  });

  it("speaks the provider's language", () => {
    render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <Spoken />
      </I18nProvider>,
    );
    expect(screen.getByRole("button")).toHaveTextContent("sv");
  });
});
