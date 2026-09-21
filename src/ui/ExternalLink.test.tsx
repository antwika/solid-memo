import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { ExternalLink } from "./ExternalLink";

describe("ExternalLink", () => {
  it("links a URL, labelled with the URL itself, in a new tab", () => {
    render(<ExternalLink url="https://alice.example/profile/card#me" />);
    const link = screen.getByRole("link", {
      name: "https://alice.example/profile/card#me",
    });
    expect(link).toHaveAttribute("href", "https://alice.example/profile/card#me");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("accepts custom link text and a class", () => {
    render(
      <ExternalLink url="https://pod.example/" class="hint">
        my pod
      </ExternalLink>,
    );
    const link = screen.getByRole("link", { name: "my pod" });
    expect(link).toHaveAttribute("href", "https://pod.example/");
    expect(link).toHaveClass("hint");
  });

  it("renders an unsafe URL as plain text, never as a link", () => {
    render(<ExternalLink url="javascript:alert(1)" class="hint" />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("javascript:alert(1)")).toHaveClass("hint");
  });
});
