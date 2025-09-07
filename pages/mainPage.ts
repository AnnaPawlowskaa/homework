import { Page, expect, Locator } from "@playwright/test";

export class MainPage {
  page: Page;
  signInButton: Locator;
  // combinationPilersCard: Locator;
  // hammerCard: Locator;
  // splitJointPillersCard: Locator;
  // boltCuttersCard: Locator;
  // clawHammerCard: Locator;
  homeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByTestId("nav-sign-in");
    // this.combinationPilersCard = page.getByTestId(
    //   "product-01K4J7M9MEVC8YHVNPGJYY0A9K"
    // );
    // this.hammerCard = page.getByTestId("product-01K4J7M9MSNAFP5H9PVSFYF024");
    // this.splitJointPillersCard = page.getByTestId(
    //   "product-01K4J7M9MPY352A0795CN9EXXH"
    // );
    // this.boltCuttersCard = page.getByTestId(
    //   "product-01K4J7M9MK25D6DC493WXN63C1"
    // );
    // this.clawHammerCard = page.getByTestId(
    //   "product-01K4J7M9MTK8AJGN7EG5WE83JM"
    // );
    this.homeButton = page.getByTestId("nav-home");
  }

  async openSignInPage(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.signInButton).toBeVisible();
    await this.signInButton.click();
    await expect(this.page).toHaveURL("/auth/login");
  }

  async goToProductDetailsPage(productId: string): Promise<void> {
    const productCard = this.page.getByTestId(`product-${productId}`);
    await expect(productCard).toBeVisible({ timeout: 5000 });
    console.log("Klikam produkt:", productId);

    await productCard.click();
    await expect(this.page).toHaveURL(`/product/${productId}`);
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
