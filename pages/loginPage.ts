import { Page, expect, Locator } from "@playwright/test";


export class LoginPage {
  page: Page;
  emailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  homeButton: Locator;
  pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId("email");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-submit");
    this.homeButton = page.getByTestId("nav-home");
    this.pageTitle = page.getByTestId("page-title");
  }
  async login(email: string, password: string): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL("/account");
    await expect(this.pageTitle).toHaveText("My account");
  }

  async goBackToMainPage(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.homeButton).toBeVisible();
    await this.homeButton.click();
    await expect(this.page).toHaveURL("/");
  }
}
