import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { InstanceBar } from "./InstanceBar";
import type { Instance } from "../domain/instance";

const instance: Instance = {
  url: "https://pod.example/solid-memo/main/",
  name: "Japanese study",
};

function renderBar() {
  const onSwitch = vi.fn();
  const onOpenPreferences = vi.fn();
  render(
    <InstanceBar
      instance={instance}
      onSwitch={onSwitch}
      onOpenPreferences={onOpenPreferences}
    />,
  );
  return { onSwitch, onOpenPreferences };
}

describe("InstanceBar", () => {
  it("shows the instance name and url", () => {
    renderBar();
    expect(screen.getByText("Japanese study")).toBeInTheDocument();
    expect(screen.getByText(instance.url)).toBeInTheDocument();
  });

  it("makes the instance URL a clickable link", () => {
    renderBar();
    expect(screen.getByRole("link", { name: instance.url })).toHaveAttribute(
      "href",
      instance.url,
    );
  });

  it("switches instance and opens preferences", () => {
    const { onSwitch, onOpenPreferences } = renderBar();
    fireEvent.click(screen.getByRole("button", { name: "Switch instance" }));
    expect(onSwitch).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Preferences" }));
    expect(onOpenPreferences).toHaveBeenCalledOnce();
  });
});
