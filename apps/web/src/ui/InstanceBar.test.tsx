import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { InstanceBar } from "./InstanceBar";
import type { Instance } from "@solid-memo/domain/instance";

const instance: Instance = {
  url: "https://pod.example/solid-memo/main/",
  name: "Japanese study",
};

function renderBar(shown: Instance = instance) {
  const onSwitch = vi.fn();
  const onOpenPreferences = vi.fn();
  const onOpenStatistics = vi.fn();
  render(
    <InstanceBar
      instance={shown}
      onSwitch={onSwitch}
      onOpenPreferences={onOpenPreferences}
      onOpenStatistics={onOpenStatistics}
    />,
  );
  return { onSwitch, onOpenPreferences };
}

describe("InstanceBar", () => {
  it("says a guest's instance is kept in this browser, and links nowhere", () => {
    renderBar({ url: "https://guest.solid-memo.invalid/solid-memo/", name: "My study" });
    expect(screen.getByText("Kept in this browser")).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
  });

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
