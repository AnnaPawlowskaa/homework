import { test, expect } from "@playwright/test";
import testData from "../helpers/test-data";

test("Bolt Cutters price update", async ({ page }) => {
  const { id, price } = testData.productsPriceChange;

  await page.route(`**/products/${id}`, async (route) => {
    const response = await page.request.fetch(route.request());
    const originalBody = await response.json();

    const modifiedBody = {
      ...originalBody,
      price: parseFloat(price),
    };

    await route.fulfill({
      response,
      body: JSON.stringify(modifiedBody),
      headers: {
        ...response.headers(),
        "content-type": "application/json",
      },
    });
  });

  await page.goto(`**/products/${id}`);

  const priceLocator = page.locator(".product-price");
  await expect(priceLocator).toBeVisible();
  const priceText = await priceLocator.textContent();

  expect(priceText?.trim()).toContain("48.42");
});
