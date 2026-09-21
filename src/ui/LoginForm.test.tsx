import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("submits the prefilled WebID", () => {
    const onLogin = vi.fn();
    const { container } = render(<LoginForm busy={false} onLogin={onLogin} />);

    fireEvent.submit(container.querySelector("form")!);
    expect(onLogin).toHaveBeenCalledWith(
      "https://alice.datapod.igrant.io/profile/card#me",
    );
  });

  it("submits an edited WebID", () => {
    const onLogin = vi.fn();
    const { container } = render(<LoginForm busy={false} onLogin={onLogin} />);

    fireEvent.input(screen.getByLabelText("WebID"), {
      target: { value: "https://bob.example/profile/card#me" },
    });
    fireEvent.submit(container.querySelector("form")!);
    expect(onLogin).toHaveBeenCalledWith("https://bob.example/profile/card#me");
  });

  it("disables the form and changes the button label while busy", () => {
    render(<LoginForm busy={true} onLogin={vi.fn()} />);

    expect(screen.getByLabelText("WebID")).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Redirecting…" }),
    ).toBeDisabled();
  });
});
