import { test, expect } from "@playwright/test";

test("has Solid Memo title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Solid Memo/);

  await expect(
    page.getByRole("button", { name: "Go to Login page" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Go to non-existant page" })
  ).not.toBeVisible();
});

test.skip("go to login page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Go to Login page" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText("Welcome to Solid Memo")).toBeVisible();
  await expect(page.getByText("Choose your Solid WebID")).toBeVisible();
  await expect(page.getByText("Or continue with")).toBeVisible();
  await expect(
    page.getByText("Your Solid WebID", { exact: true })
  ).toBeVisible();
  await expect(page.getByText("Don't have a WebID?")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Find a WebID provider" })
  ).toBeVisible();
});
