import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { StoragePicker } from "./StoragePicker";
import type { Storage } from "../domain/storage";

const storages: Storage[] = [
  { url: "https://alice.example/", source: "profile" },
  { url: "https://backup.example/", source: "linkHeader" },
];

function renderPicker(
  overrides: Partial<Parameters<typeof StoragePicker>[0]> = {},
) {
  const props = {
    storages,
    busy: false,
    error: null,
    onSelect: vi.fn(),
    onAddManual: vi.fn(),
    ...overrides,
  };
  const view = render(<StoragePicker {...props} />);
  return { ...view, props };
}

describe("StoragePicker", () => {
  it("lists discovered storages with their source", () => {
    renderPicker();
    expect(
      screen.getByRole("button", { name: "https://alice.example/" }),
    ).toBeInTheDocument();
    expect(screen.getByText("(from your profile)")).toBeInTheDocument();
    expect(
      screen.getByText("(discovered from your pod server)"),
    ).toBeInTheDocument();
  });

  it("selects a storage on click", () => {
    const { props } = renderPicker();
    fireEvent.click(
      screen.getByRole("button", { name: "https://alice.example/" }),
    );
    expect(props.onSelect).toHaveBeenCalledWith(storages[0]);
  });

  it("shows an explanation when no storage was discovered", () => {
    renderPicker({ storages: [] });
    expect(
      screen.getByText(/No storage was found for your WebID/),
    ).toBeInTheDocument();
  });

  it("submits a trimmed manual URL", () => {
    const { props, container } = renderPicker();
    fireEvent.input(screen.getByLabelText("Storage URL"), {
      target: { value: "  https://pod.example/ " },
    });
    fireEvent.submit(container.querySelector("form")!);
    expect(props.onAddManual).toHaveBeenCalledWith("https://pod.example/");
  });

  it("disables all controls while busy", () => {
    renderPicker({ busy: true });
    expect(
      screen.getByRole("button", { name: "https://alice.example/" }),
    ).toBeDisabled();
    expect(screen.getByLabelText("Storage URL")).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Use this storage" }),
    ).toBeDisabled();
  });

  it("shows an error message when given one", () => {
    renderPicker({ error: "Cannot access storage" });
    expect(screen.getByText("Cannot access storage")).toBeInTheDocument();
  });
});
