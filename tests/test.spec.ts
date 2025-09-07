import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/mainPage";
import { LoginPage } from "../pages/loginPage";
import "dotenv/config";

test("Loging user", async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPage = new LoginPage(page);

  await test.step("Open main page and click sign in button", async (): Promise<void> => {
    await page.goto("/");
    await mainPage.openSignInPage();
  });

  await test.step("Login user", async (): Promise<void> => {
    await loginPage.login(
      process.env.USER_NAME as string,
      process.env.PASSWORD as string
    );
  });

  await test.step("Go back to main page", async (): Promise<void> => {
    await loginPage.goBackToMainPage();
  });
});
