import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/mainPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { productsPurchase } from "../helpers/test-data";
import { CartPage } from "../pages/cartPage";
import { loginUser } from "../helpers/auth";


test.beforeEach(async ({ page }) => {
  await loginUser(page);
});


test("Buy products", async ({ page }) => {
  const mainPage = new MainPage(page);
  const productDetailsPage = new ProductDetailsPage(page);
  const cartPage = new CartPage(page);

  await test.step("Add products to the cart", async (): Promise<void> => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    for (const { id, productName, quantity } of productsPurchase) {
      await mainPage.goToProductDetailsPage(id);
      await productDetailsPage.addProductToCart(productName, quantity);
    }
  });

  await test.step("Verify products in the cart", async (): Promise<void> => {
   await cartPage.verifyCartContentsViaApi();
});

    await test.step("Proceed to checkout", async (): Promise<void> => { 
    await cartPage.proceedToCheckout();
  }) 
})