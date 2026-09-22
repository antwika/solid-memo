import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { DeckProvenance } from "./DeckProvenance";

const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";

describe("DeckProvenance", () => {
  it("names the authors and links the licence", () => {
    const { container } = render(
      <DeckProvenance authors={["Anton Wiklund", "A friend"]} license={CC0} />,
    );
    expect(container.textContent).toBe("By Anton Wiklund, A friend · CC0 1.0");
    expect(screen.getByRole("link", { name: "CC0 1.0" })).toHaveAttribute(
      "href",
      CC0,
    );
  });

  it("shows authors alone or the licence alone", () => {
    const { container, rerender } = render(
      <DeckProvenance authors={["Anton Wiklund"]} />,
    );
    expect(container.textContent).toBe("By Anton Wiklund");
    rerender(<DeckProvenance authors={[]} license={CC0} />);
    expect(container.textContent).toBe("CC0 1.0");
  });

  it("renders nothing when neither is stated", () => {
    const { container } = render(<DeckProvenance authors={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
