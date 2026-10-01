import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { I18nProvider } from "./i18n";
import { LanguageSelector } from "./LanguageSelector";

describe("LanguageSelector", () => {
  it("names each language in itself and marks the one spoken", () => {
    render(
      <I18nProvider locale="sv" onChoose={() => undefined}>
        <LanguageSelector />
      </I18nProvider>,
    );
    expect(screen.getByRole("group", { name: "Språk" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Svenska" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "false");
  });

  it("shows each language's flag", () => {
    render(<LanguageSelector />);
    expect(screen.getByRole("img", { name: "Svenska" })).toHaveAttribute("src", "https://flagcdn.com/se.svg");
    expect(screen.getByRole("img", { name: "English" })).toHaveAttribute("src", "https://flagcdn.com/gb.svg");
  });

  it("chooses a language", () => {
    const onChoose = vi.fn();
    render(
      <I18nProvider locale="en" onChoose={onChoose}>
        <LanguageSelector />
      </I18nProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Svenska" }));
    expect(onChoose).toHaveBeenCalledWith("sv");
  });
});
