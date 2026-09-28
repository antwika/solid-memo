import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { UseCases } from "../application/useCases";
import type { Instance } from "../domain/instance";
import type { ValidationReport } from "../domain/validation";
import { DataCheckNotice } from "./DataCheckNotice";
import { RepairContainer } from "./RepairContainer";
import { makeUseCasesFake } from "../test/useCasesFake";

const instance: Instance = { url: "https://pod.example/solid-memo/a/", name: "Main" };
const CATALOG = `${instance.url}catalog.ttl`;
const report: ValidationReport = {
  instanceUrl: instance.url,
  violationCount: 3,
  conforms: false,
  documents: [],
};
const repair = (subject: string) => ({ kind: "describe-deck" as const, documentUrl: CATALOG, subjectUrl: `${CATALOG}#${subject}`, version: 3 });
const problem = { documentUrl: `${instance.url}decks/deck-1.ttl`, subjectUrl: `${instance.url}decks/deck-1.ttl#x`, messages: ["Each side of a card needs text or a picture."] };

function renderRepair(useCases: UseCases) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={queryClient}>
      <RepairContainer useCases={useCases} instance={instance} report={report} />
    </QueryClientProvider>,
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("RepairContainer", () => {
  it("repairs every problem it can with one click", async () => {
    const useCases = makeUseCasesFake({
      planRepair: vi.fn(() => ({ repairs: [repair("deck-1"), repair("deck-2")], unrepairable: [] })),
    });
    renderRepair(useCases);
    expect(screen.getAllByText("3 violations in 0 documents.")[0]).toBeVisible();
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(`Give the deck the default description: ${CATALOG}#deck-1`);
    fireEvent.click(screen.getByRole("button", { name: "Repair 2 problems" }));
    await waitFor(() => {
      expect(useCases.applyRepairs).toHaveBeenCalledWith([repair("deck-1"), repair("deck-2")]);
    });
  });

  it("removes a problem it cannot repair only when the user confirms, and shows a failure", async () => {
    const confirm = vi.fn(() => false);
    vi.stubGlobal("confirm", confirm);
    const useCases = makeUseCasesFake({
      planRepair: vi.fn(() => ({ repairs: [], unrepairable: [problem] })),
      applyRepairs: vi.fn(async () => {
        throw new Error("write refused");
      }),
    });
    renderRepair(useCases);
    expect(screen.getByText(/Each side of a card needs text or a picture\./)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(useCases.applyRepairs).not.toHaveBeenCalled();
    confirm.mockReturnValue(true);
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    await waitFor(() => {
      expect(useCases.applyRepairs).toHaveBeenCalledWith([
        { kind: "remove-subject", documentUrl: problem.documentUrl, subjectUrl: problem.subjectUrl, version: 1 },
      ]);
    });
    expect(await screen.findByText("write refused")).toBeInTheDocument();
  });

  it("shows progress while repairing", async () => {
    const useCases = makeUseCasesFake({
      planRepair: vi.fn(() => ({ repairs: [repair("deck-1")], unrepairable: [] })),
      applyRepairs: vi.fn(() => new Promise<void>(() => undefined)),
    });
    renderRepair(useCases);
    fireEvent.click(screen.getByRole("button", { name: "Repair 1 problem" }));
    expect(await screen.findByRole("button", { name: "Repairing…" })).toBeDisabled();
  });
});

describe("DataCheckNotice", () => {
  it("names the decks set aside, one or several", () => {
    const queryClient = new QueryClient();
    const notice = (setAside: string[]) =>
      render(
        <QueryClientProvider client={queryClient}>
          <DataCheckNotice useCases={makeUseCasesFake()} instance={instance} report={report} policy="block-subject" setAside={setAside} />
        </QueryClientProvider>,
      );
    notice(["Kanji", "Capitals"]);
    expect(screen.getByRole("region", { name: "Data check" })).toHaveTextContent("Kanji, Capitals are set aside until repaired");
  });
});
