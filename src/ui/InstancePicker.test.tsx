import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { InstancePicker } from "./InstancePicker";
import type { Instance } from "../domain/instance";

const instances: Instance[] = [
  { url: "https://pod.example/solid-memo/a/", name: "Deck set A" },
  { url: "https://pod.example/solid-memo/b/", name: "Deck set B" },
];

function renderPicker(
  overrides: Partial<Parameters<typeof InstancePicker>[0]> = {},
) {
  const props = {
    instances,
    options: { privateIndexExists: true, publicIndexExists: true },
    busy: false,
    error: null,
    onSelect: vi.fn(),
    onNewInstance: vi.fn(),
    onAttach: vi.fn(),
    ...overrides,
  };
  const view = render(<InstancePicker {...props} />);
  return { ...view, props };
}

describe("InstancePicker", () => {
  it("lists instances and selects one", () => {
    const { props } = renderPicker();
    fireEvent.click(screen.getByRole("button", { name: "Deck set A" }));
    expect(props.onSelect).toHaveBeenCalledWith(instances[0]);
  });

  it("shows an empty state when there are no instances", () => {
    renderPicker({ instances: [] });
    expect(
      screen.getByText("No instances are registered yet."),
    ).toBeInTheDocument();
  });

  it("makes every instance URL a clickable link", () => {
    renderPicker();
    for (const instance of instances) {
      expect(screen.getByRole("link", { name: instance.url })).toHaveAttribute(
        "href",
        instance.url,
      );
    }
  });

  it("starts the new-instance flow", () => {
    const { props } = renderPicker();
    fireEvent.click(screen.getByRole("button", { name: "New instance…" }));
    expect(props.onNewInstance).toHaveBeenCalledOnce();
  });

  it("attaches an existing instance with the chosen target", () => {
    const { props, container } = renderPicker();
    fireEvent.input(screen.getByLabelText("Instance container URL"), {
      target: { value: " https://pod.example/solid-memo/c/ " },
    });
    fireEvent.click(screen.getByLabelText("Public type index"));
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAttach).toHaveBeenCalledWith(
      "https://pod.example/solid-memo/c/",
      "public",
    );
  });

  it("disables controls while busy and shows errors", () => {
    renderPicker({ busy: true, error: "attach failed" });
    expect(screen.getByRole("button", { name: "Deck set A" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Attach" })).toBeDisabled();
    expect(screen.getByText("attach failed")).toBeInTheDocument();
  });
});
