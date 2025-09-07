import { Page, Locator, expect } from "@playwright/test";

export class ProductDetailsPage {
  page: Page;
  quantityInput: Locator;
  addToCartButton: Locator;
  productTitle: Locator;
  cartQuantity: Locator;
  cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.quantityInput = page.getByTestId("quantity");
    this.addToCartButton = page.getByTestId("add-to-cart");
    this.productTitle = page.getByTestId("product-name");
    this.cartQuantity = page.getByTestId("cart-quantity");
    this.cartIcon = page.getByTestId("nav-cart");
  }

  async addProductToCart(productName, quantity): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
    await expect(this.productTitle).toHaveText(productName);
    await this.quantityInput.fill(quantity);
    await expect(this.quantityInput).toHaveValue(quantity);
    await this.addToCartButton.click();
    await expect(this.cartQuantity).toBeVisible();
    await this.cartIcon.click();
    await expect(this.page).toHaveURL("/checkout");
  }
}
