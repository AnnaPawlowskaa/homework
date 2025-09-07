import { Page } from "@playwright/test";
import { MainPage } from "../pages/mainPage";
import { LoginPage } from "../pages/loginPage";
import "dotenv/config";

export async function loginUser(page: Page): Promise<void> {
  const mainPage = new MainPage(page);
  const loginPage = new LoginPage(page);

  await page.goto("/");
  await mainPage.openSignInPage();
  await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
  await mainPage.goBackToMainPage();
}
