import { expect, Page, Locator } from "@playwright/test";
import productsPurchase from "../helpers/test-data";

export class CartPage {
  page: Page;
  proceedToCheckoutButton: Locator;
  firstStepIcon: Locator;
  secondStepIcon: Locator

  constructor(page: Page) {
    this.page = page;
    this.proceedToCheckoutButton = page.getByTestId("proceed-1");
    this.firstStepIcon = page.locator(".step-indicator").getByText("1");
     this.firstStepIcon = page.locator(".step-indicator").getByText("2");
  }

  async verifyCartContentsViaApi(): Promise<void> {
    const response = await this.page.request.get(
      "/api.practicesoftwaretesting.com/carts/01k4jsg16ezn4snnaxrnw4mmxk"
    ); 
    expect(response.ok()).toBeTruthy();

    const cartData = await response.json();
    const cartItems = cartData.cart_items;

    for (const expected of productsPurchase.productsPurchase) {
      const match = cartItems.find((item) => item.product.id === expected.id);

      expect(
        match,
        `Produkt ${expected.productName} nie znaleziony w koszyku`
      ).toBeTruthy();
      expect(
        match.quantity,
        `Niepoprawna ilość dla ${expected.productName}`
      ).toBe(expected.quantity);
      expect(match.product.name, `Nazwa produktu nie pasuje`).toBe(
        expected.productName
      );
    }
    console.log("Wszystkie produkty w koszyku są poprawne");
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
    await expect(this.proceedToCheckoutButton).toBeVisible();
    await this.proceedToCheckoutButton.click();
    await expect(this.secondStepIcon).toHaveClass(".current");
  }
}
