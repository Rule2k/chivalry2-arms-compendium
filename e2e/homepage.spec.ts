import { expect, test } from "@playwright/test";

test("renders the homepage and supports desktop comparison flow", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "ARMS COMPENDIUM" }),
  ).toBeVisible();
  await expect(page.getByTestId("count-bar")).toContainText(
    "40 Entries Catalogued",
  );

  await page.getByRole("textbox", { name: "Search weapons by name" }).fill("axe");
  await expect(page.getByTestId("count-bar")).toContainText("8 Entries Catalogued");

  await page.getByRole("button", { name: "Knight" }).click();
  await expect(page.getByRole("button", { name: "All Knight" })).toBeVisible();
  await page.getByRole("button", { name: "Crusader" }).click();

  await page.getByRole("combobox", { name: "Sort weapons" }).selectOption("avgSpeed");

  await page.getByRole("button", { name: "Set Left" }).first().click();
  await page.getByRole("button", { name: "Set Right" }).nth(1).click();

  await expect(page.getByText("Comparative Analysis")).toBeVisible();
  await expect(page.getByRole("button", { name: /clear/i }).first()).toBeVisible();
});

test("keeps the homepage usable on a narrow mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(
    page.getByRole("textbox", { name: "Search weapons by name" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Vanguard" }).click();
  await expect(page.getByRole("button", { name: "All Vanguard" })).toBeVisible();
  await expect(page.getByTestId("weapon-grid")).toBeVisible();
});
