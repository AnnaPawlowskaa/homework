import { Page, expect, Locator } from "@playwright/test";

export class MainPage {
  page: Page;
  signInButton: Locator;
  combinationPilersCard: Locator;
  hammerCard: Locator;
  splitJointPillersCard: Locator;
  boltCuttersCard: Locator;
  clawHammerCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByTestId("nav-sign-in");
    this.combinationPilersCard = page.getByTestId(
      "product-01K4J7M9MEVC8YHVNPGJYY0A9K"
    );
    this.hammerCard = page.getByTestId("product-01K4J7M9MSNAFP5H9PVSFYF024");
    this.splitJointPillersCard = page.getByTestId(
      "product-01K4J7M9MPY352A0795CN9EXXH"
    );
    this.boltCuttersCard = page.getByTestId(
      "product-01K4J7M9MK25D6DC493WXN63C1"
    );
    this.clawHammerCard = page.getByTestId(
      "product-01K4J7M9MTK8AJGN7EG5WE83JM"
    );
  }

    async openSignInPage(): Promise<void> {
    await this.signInButton.waitFor();
    await this.signInButton.click();
    await expect(this.page).toHaveURL("/auth/login");
  }
  

  
}
