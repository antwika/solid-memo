import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { StepProgress } from "./StepProgress";

const steps = [
  { step: "one", label: "First" },
  { step: "two", label: "Second" },
] as const;

describe("StepProgress", () => {
  it("marks every step done once all the work is", () => {
    render(
      <StepProgress
        region="Working"
        steps={steps}
        current="two"
        done={2}
        total={2}
        status="Done."
        progressLabel="Progress"
        hint="Keep it open."
      />,
    );
    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual(["✓First (done)", "✓Second (done)"]);
    expect(screen.getByRole("progressbar", { name: "Progress" })).toHaveAttribute("max", "2");
  });

  it("shows a bar of one before the total is known", () => {
    render(
      <StepProgress region="Working" steps={steps} current="one" done={0} total={0} status="Starting." progressLabel="Progress" hint="" />,
    );
    expect(screen.getByRole("progressbar", { name: "Progress" })).toHaveAttribute("max", "1");
    expect(screen.getAllByRole("listitem")[0]).toHaveAttribute("aria-current", "step");
  });
});
