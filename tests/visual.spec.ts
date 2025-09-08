import { test, expect } from "@playwright/test";
import productsForVisualTests from "../helpers/test-data";

test("snapshot product", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");
  await page.getByText("Claw Hammer", { exact: true }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot();
});

