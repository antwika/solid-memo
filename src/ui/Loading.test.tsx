import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { Loading } from "./Loading";

describe("Loading", () => {
  it("announces what is loading", () => {
    render(<Loading label="Loading decks…" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading decks…");
    // Plain text queries still find it, dots or not.
    expect(screen.getByText("Loading decks…")).toBeInTheDocument();
  });

  it("keeps the bouncing dots out of the accessibility tree", () => {
    const { container } = render(<Loading label="Loading decks…" />);
    const dots = container.querySelector(".loading-dots")!;
    expect(dots).toHaveAttribute("aria-hidden", "true");
    expect(dots.querySelectorAll("i")).toHaveLength(4);
  });
});
