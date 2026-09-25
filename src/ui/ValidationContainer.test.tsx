import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ValidationContainer } from "./ValidationContainer";
import type { Instance } from "../domain/instance";
import { makeUseCasesFake } from "../test/useCasesFake";

const instance: Instance = { url: "https://pod.example/solid-memo/a/", name: "Main" };

function renderContainer(useCases = makeUseCasesFake()) {
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <ValidationContainer useCases={useCases} instance={instance} />
    </QueryClientProvider>,
  );
  return useCases;
}

describe("ValidationContainer", () => {
  it("validates the instance and shows the report, again on request", async () => {
    const useCases = renderContainer();
    expect(screen.getByRole("heading", { name: "Validation of Main" })).toBeInTheDocument();
    expect(await screen.findByText("All 0 documents conform.")).toBeInTheDocument();
    expect(useCases.validateInstance).toHaveBeenCalledExactlyOnceWith(instance.url);

    fireEvent.click(screen.getByRole("button", { name: "Validate again" }));
    expect(await screen.findByRole("button", { name: "Validate again" })).toBeEnabled();
    expect(useCases.validateInstance).toHaveBeenCalledTimes(2);
  });

  it("shows the error when the check fails", async () => {
    renderContainer(
      makeUseCasesFake({
        validateInstance: vi.fn(async () => {
          throw new Error("pod unreachable");
        }),
      }),
    );
    expect(await screen.findByText("pod unreachable")).toBeInTheDocument();
  });
});
