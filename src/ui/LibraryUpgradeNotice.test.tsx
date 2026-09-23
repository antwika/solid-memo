import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { LibraryUpgradeNotice } from "./LibraryUpgradeNotice";

function renderNotice(
  overrides: Partial<Parameters<typeof LibraryUpgradeNotice>[0]> = {},
) {
  const props = {
    deckName: "Capitals",
    plan: { fromVersion: 1, toVersion: 2, direction: "bidirectional" as const },
    busy: false,
    error: null,
    onUpgrade: vi.fn(),
    ...overrides,
  };
  const view = render(<LibraryUpgradeNotice {...props} />);
  return { ...view, props };
}

describe("LibraryUpgradeNotice", () => {
  it("says what the library changed and what an update would do, then waits", () => {
    const { props } = renderNotice();
    const region = screen.getByRole("region", { name: "Newer library version" });
    expect(region).toHaveTextContent(
      "Capitals came from the library, which now publishes it in deck format 2; your copy is format 1.",
    );
    expect(region).toHaveTextContent("sets its study direction to Both ways");
    expect(props.onUpgrade).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Update from the library" }));
    expect(props.onUpgrade).toHaveBeenCalledOnce();
  });

  it("shows progress and errors", () => {
    renderNotice({ busy: true, error: "write refused" });
    expect(screen.getByRole("button", { name: "Updating…" })).toBeDisabled();
    expect(screen.getByText("write refused")).toHaveClass("error");
  });
});
