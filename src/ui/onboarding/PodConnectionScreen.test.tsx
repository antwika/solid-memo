import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { PodConnectionScreen } from "./PodConnectionScreen";
import type { SolidAccount } from "../../domain/account";

const account: SolidAccount = {
  webId: "https://alice.example/profile/card#me",
  podUrl: "https://storage.elsewhere.example/alice/",
  oidcIssuer: "https://issuer.example",
};

function renderScreen(
  overrides: Partial<Parameters<typeof PodConnectionScreen>[0]> = {},
) {
  const props = {
    account: undefined,
    busy: false,
    error: null,
    onRetry: vi.fn(),
    onContinue: vi.fn(),
    onLogout: vi.fn(),
    ...overrides,
  };
  render(<PodConnectionScreen {...props} />);
  return props;
}

describe("PodConnectionScreen", () => {
  it("shows discovery in progress while busy", () => {
    renderScreen({ busy: true, account });
    expect(
      screen.getByRole("heading", { name: "Discovering your Pod…" }),
    ).toBeInTheDocument();
  });

  it("shows discovery in progress before any result exists", () => {
    renderScreen();
    expect(
      screen.getByRole("heading", { name: "Discovering your Pod…" }),
    ).toBeInTheDocument();
  });

  it("confirms the connection with the discovered account", () => {
    const { onContinue } = renderScreen({ account });
    expect(
      screen.getByRole("heading", { name: "Your Pod is connected." }),
    ).toBeInTheDocument();
    expect(screen.getByText(account.webId)).toBeInTheDocument();
    expect(screen.getByText(account.podUrl!)).toBeInTheDocument();
    expect(screen.getByText(account.oidcIssuer!)).toBeInTheDocument();
    // Every URL shown is a clickable link.
    for (const url of [account.webId, account.podUrl!, account.oidcIssuer!]) {
      expect(screen.getByRole("link", { name: url })).toHaveAttribute(
        "href",
        url,
      );
    }

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(onContinue).toHaveBeenCalledOnce();
  });

  it("omits the identity provider when it is unknown", () => {
    renderScreen({ account: { ...account, oidcIssuer: undefined } });
    expect(screen.queryByText("Identity provider")).not.toBeInTheDocument();
  });

  it("shows an error with retry and logout", () => {
    const { onRetry, onLogout } = renderScreen({
      error: "profile unreachable",
      account,
    });
    expect(screen.getByRole("alert")).toHaveTextContent("profile unreachable");

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Log out" }));
    expect(onLogout).toHaveBeenCalledOnce();
  });

  it("explains a profile without a storage link and offers ways forward", () => {
    const { onRetry, onContinue, onLogout } = renderScreen({
      account: { webId: account.webId },
    });
    expect(
      screen.getByRole("heading", { name: "No Pod found" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: account.webId })).toHaveAttribute(
      "href",
      account.webId,
    );

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Continue anyway" }));
    expect(onContinue).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Log out" }));
    expect(onLogout).toHaveBeenCalledOnce();
  });
});
