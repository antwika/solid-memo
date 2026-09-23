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

  it("links an author named with an address", () => {
    render(<DeckProvenance authors={["Anton Wiklund <anton@example.com>"]} />);
    expect(screen.getByRole("link", { name: "Anton Wiklund" })).toHaveAttribute(
      "href",
      "mailto:anton@example.com",
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

  it("shows the description under the byline, with its URLs as links", () => {
    const { container } = render(
      <DeckProvenance
        authors={["Anton Wiklund"]}
        description="Flags from https://flagcdn.com, listed at https://flagpedia.net/index. Enjoy!"
      />,
    );
    expect(container.textContent).toBe(
      "By Anton WiklundFlags from https://flagcdn.com, listed at https://flagpedia.net/index. Enjoy!",
    );
    expect(
      screen.getAllByRole("link").map((link) => link.getAttribute("href")),
    ).toEqual(["https://flagcdn.com", "https://flagpedia.net/index"]);
    expect(screen.getByRole("link", { name: "https://flagcdn.com" })).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("shows a description alone, as plain text when it has no URL", () => {
    const { container } = render(
      <DeckProvenance authors={[]} description="Just a deck." />,
    );
    expect(container.querySelector(".deck-description")).toHaveTextContent(
      "Just a deck.",
    );
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("renders nothing when nothing is stated", () => {
    const { container } = render(<DeckProvenance authors={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
