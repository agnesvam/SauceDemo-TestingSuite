const { test, expect } = require("@playwright/test");
const { USERS, TEST_DATA, AUTH_MESSAGES } = require("../../config/constants");
const LoginPage = require("../../pages/LoginPage");

test.describe("Section A - Authentication", () => {
  test("Scenario 1: Login with empty credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openPage("/");
    await loginPage.submitEmpty();

    await expect(loginPage.errorMessage()).toContainText(
      AUTH_MESSAGES.USERNAME_REQUIRED,
    );
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);

    await expect(loginPage.usernameInput()).toHaveClass(/error/);
    await expect(loginPage.passwordInput()).toHaveClass(/error/);
  });

  test("Scenario 2: Login with invalid password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPage("/");
    await loginPage.loginManual(
      USERS.STANDARD.username,
      TEST_DATA.INVALID_PASSWORD,
    );

    await expect(loginPage.errorMessage()).toContainText(
      AUTH_MESSAGES.INVALID_CREDENTIALS,
    );
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });

  test("Scenario 3: Login with locked-out user", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPage("/");
    await loginPage.loginManual(
      USERS.LOCKED_OUT.username,
      USERS.LOCKED_OUT.password,
    );

    await expect(loginPage.errorMessage()).toContainText(
      AUTH_MESSAGES.LOCKED_OUT,
    );
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
