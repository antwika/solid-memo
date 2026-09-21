import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("credits antwika as the creator, linking to their profile", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "Created by antwika",
    );
    const link = screen.getByRole("link", { name: "antwika" });
    expect(link).toHaveAttribute("href", "https://github.com/antwika");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
