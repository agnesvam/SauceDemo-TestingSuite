// @ts-check

const { test: base, expect } = require("@playwright/test");
const { USERS, BASE_URL } = require("../config/constants");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/CheckoutPage");

/**
 * SauceDemo fixture file
 * @module SauceDemo_Playwright_Fixture - fixture file to instantiate POM instances
 */

/**
 * @typedef {object} LoginPageTestArgs
 * @property {LoginPage} loginPage
 */

/**
 * @typedef {object} InventoryPageTestArgs
 * @property {InventoryPage} inventoryPage
 */

/**
 * @typedef {object} CartPageTestArgs
 * @property {CartPage} cartPage
 */

/**
 * @typedef {object} CheckoutPageTestArgs
 * @property {CheckoutPage} checkoutPage
 */

/** @type {object} */
const fixtures = {
  /**
   * LoginPage fixture - initializes login page object
   * Opens the login page and provides page object to tests
   * Logs failures if test fails
   * @param {{ page: any }} params
   * @param {Function} use
   * @param {{ status: string, expectedStatus: string, title: string, error: Error }} testInfo
   */
  loginPage: async ({ page }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPage("/");
    await use(loginPage);
    if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`FAILED: ${testInfo.title} -- ${testInfo.status}`);
      if (testInfo.error) {
        console.log(`Error: ${testInfo.error.message}`);
      }
    }
  },

  /**
   * InventoryPage fixture - initializes inventory page object
   * Logs in with standard user and navigates to inventory
   * Provides page object to tests
   * Logs failures if test fails
   * @param {{ page: any }} params
   * @param {Function} use
   * @param {{ status: string, expectedStatus: string, title: string, error: Error }} testInfo
   */
  inventoryPage: async ({ page }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.openPage("/");
    await loginPage.loginManual(
      USERS.STANDARD.username,
      USERS.STANDARD.password,
    );
    await inventoryPage.waitForLoaded();

    await use(inventoryPage);

    if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`FAILED: ${testInfo.title} -- ${testInfo.status}`);
      if (testInfo.error) {
        console.log(`Error: ${testInfo.error.message}`);
      }
    }
  },

  /**
   * CartPage fixture - initializes cart page object
   * Logs in, adds an item to cart, navigates to cart
   * Provides page object to tests
   * Logs failures if test fails
   * @param {{ page: any }} params
   * @param {Function} use
   * @param {{ status: string, expectedStatus: string, title: string, error: Error }} testInfo
   */
  cartPage: async ({ page }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.openPage("/");
    await loginPage.loginManual(
      USERS.STANDARD.username,
      USERS.STANDARD.password,
    );
    await inventoryPage.waitForLoaded();
    await inventoryPage.addItemByIndex(0);
    await inventoryPage.openCart();

    await use(cartPage);

    if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`FAILED: ${testInfo.title} -- ${testInfo.status}`);
      if (testInfo.error) {
        console.log(`Error: ${testInfo.error.message}`);
      }
    }
  },

  /**
   * CheckoutPage fixture - initializes checkout page object
   * @param {{ page: any }} params
   * @param {Function} use
   * @param {{ status: string, expectedStatus: string, title: string, error: Error }} testInfo
   * Logs in, adds items to cart, navigates to checkout
   * Provides page object to tests
   * Logs failures if test fails
   */
  checkoutPage: async ({ page }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.openPage("/");
    await loginPage.loginManual(
      USERS.STANDARD.username,
      USERS.STANDARD.password,
    );
    await inventoryPage.waitForLoaded();
    await inventoryPage.addItemByIndex(0);
    await inventoryPage.openCart();
    await cartPage.clickCheckout();

    await use(checkoutPage);

    if (testInfo.status !== testInfo.expectedStatus) {
      console.log(`FAILED: ${testInfo.title} -- ${testInfo.status}`);
      if (testInfo.error) {
        console.log(`Error: ${testInfo.error.message}`);
      }
    }
  },
};

module.exports = {
  test: base.extend(fixtures),
  expect,
};
