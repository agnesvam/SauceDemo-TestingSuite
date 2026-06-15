// @ts-check

/**
 * Page object for SauceDemo login page
 * @class LoginPage
 */
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Selector variables
    this.username_selector = '[data-test="username"]';
    this.password_selector = '[data-test="password"]';
    this.login_button_selector = '[data-test="login-button"]';
    this.error_message_selector = '[data-test="error"]';

    /** @type {import('@playwright/test').Locator} */
    this.textbox_username = page.locator(this.username_selector);
    /** @type {import('@playwright/test').Locator} */
    this.textbox_password = page.locator(this.password_selector);
    /** @type {import('@playwright/test').Locator} */
    this.button_login = page.locator(this.login_button_selector);
    /** @type {import('@playwright/test').Locator} */
    this.loginErrorMessage = page.locator(this.error_message_selector);
  }

  /**
   * Opens login page
   * @param {string} [link='/']
   * @returns {Promise<void>}
   */
  async openPage(link = "/") {
    await this.page.goto(link);
  }

  /**
   * Fill username field
   * @param {string} username
   */
  async setUserName(username) {
    await this.textbox_username.fill("");
    await this.textbox_username.fill(username);
  }

  /**
   * Fill password field
   * @param {string} password
   */
  async setPassword(password) {
    await this.textbox_password.fill("");
    await this.textbox_password.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.button_login.click();
  }

  /**
   * Log in with provided credentials
   * @param {string} username
   * @param {string} password
   */
  async loginManual(username, password) {
    await this.setUserName(username);
    await this.setPassword(password);
    await this.clickLogin();
  }

  /**
   * Submit login form without entering credentials
   */
  async submitEmpty() {
    await this.clickLogin();
  }

  /**
   * Backward-compatible alias used by existing tests
   */
  errorMessage() {
    return this.loginErrorMessage;
  }

  /**
   * Backward-compatible alias used by existing tests
   */
  usernameInput() {
    return this.textbox_username;
  }

  /**
   * Backward-compatible alias used by existing tests
   */
  passwordInput() {
    return this.textbox_password;
  }
}

module.exports = LoginPage;
