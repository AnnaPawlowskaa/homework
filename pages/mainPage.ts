import { Page, expect, Locator } from "@playwright/test";

export class MainPage {
  page: Page;
  signInButton: Locator;
  homeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByTestId("nav-sign-in");
    this.homeButton = page.getByTestId("nav-home");
  }

  async openSignInPage(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.signInButton).toBeVisible();
    await this.signInButton.click();
    await expect(this.page).toHaveURL("/auth/login");
  }

  // async goToProductDetailsPage(productId: string): Promise<void> {
  //   const productCard = this.page.getByTestId(`product-${productId}`);
  //   await expect(productCard).toBeVisible({ timeout: 5000 });
  //   console.log("Klikam produkt:", productId);

  //   await productCard.click();
  //   await expect(this.page).toHaveURL(`/product/${productId}`);
  // }

async goToProductDetailsPage(productName: string): Promise<void> {
  const productCard = this.page.locator('.product-name').filter({
    hasText: productName,
  });

  await expect(productCard).toBeVisible({ timeout: 5000 });
  console.log("Klikam produkt:", productName);
  await productCard.click();

  await expect(this.page).toHaveURL(/\/product\/.+/);
}


  async goBackToMainPage(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    console.log("gobacktomain");
    await this.page.waitForSelector('[data-test="nav-home"]', {
      state: "visible",
      timeout: 5000,
    });
    console.log("gobacktomain2");
    await this.homeButton.click();
    await expect(this.page).toHaveURL("/");
  }
}
