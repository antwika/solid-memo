import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { Footer } from "./Footer";

const sha = "8faa7e1bd2e6de2b6570d692fd2865bb4b3217ad";

describe("Footer", () => {
  it("credits antwika as the creator, linking to their profile", () => {
    render(<Footer commitSha={sha} />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "Created by antwika",
    );
    const link = screen.getByRole("link", { name: "antwika" });
    expect(link).toHaveAttribute("href", "https://github.com/antwika");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows the build's commit as the version, linking to it", () => {
    render(<Footer commitSha={sha} />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "Version 8faa7e1",
    );
    const link = screen.getByRole("link", { name: "8faa7e1" });
    expect(link).toHaveAttribute(
      "href",
      `https://github.com/antwika/solid-memo/commit/${sha}`,
    );
    expect(link).toHaveAttribute("title", sha);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("leaves the version out when the build's commit is unknown", () => {
    render(<Footer commitSha={null} />);
    expect(screen.getByRole("contentinfo")).not.toHaveTextContent("Version");
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("defaults to the commit baked in at build time", () => {
    render(<Footer />);
    // Under vitest the build runs inside this checkout, so a commit is
    // always known; its short form is what shows.
    expect(screen.getByRole("contentinfo")).toHaveTextContent(/Version [0-9a-f]{7}/);
  });
});
