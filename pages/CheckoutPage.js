// @ts-check

/**
 * Page object for SauceDemo checkout page
 * @class CheckoutPage
 */
class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Selector variables
    this.first_name_selector = '[data-test="firstName"]';
    this.last_name_selector = '[data-test="lastName"]';
    this.postal_code_selector = '[data-test="postalCode"]';
    this.continue_button_selector = '[data-test="continue"]';
    this.cancel_button_selector = '[data-test="cancel"]';
    this.finish_button_selector = '[data-test="finish"]';
    this.error_selector = '[data-test="error"]';
    this.complete_header_selector = ".complete-header";
    this.shopping_cart_badge_selector = ".shopping_cart_badge";
    this.shopping_cart_link_selector = ".shopping_cart_link";

    // Form input locators
    /** @type {import('@playwright/test').Locator} */
    this.textbox_firstName = page.locator(this.first_name_selector);
    /** @type {import('@playwright/test').Locator} */
    this.textbox_lastName = page.locator(this.last_name_selector);
    /** @type {import('@playwright/test').Locator} */
    this.textbox_postalCode = page.locator(this.postal_code_selector);

    // Action buttons
    /** @type {import('@playwright/test').Locator} */
    this.button_continue = page.locator(this.continue_button_selector);
    /** @type {import('@playwright/test').Locator} */
    this.button_cancel = page.locator(this.cancel_button_selector);
    /** @type {import('@playwright/test').Locator} */
    this.button_finish = page.locator(this.finish_button_selector);

    // Status/message locators
    /** @type {import('@playwright/test').Locator} */
    this.checkout_error = page.locator(this.error_selector);
    /** @type {import('@playwright/test').Locator} */
    this.complete_header = page.locator(this.complete_header_selector);
    /** @type {import('@playwright/test').Locator} */
    this.shopping_cart_badge = page.locator(this.shopping_cart_badge_selector);
    /** @type {import('@playwright/test').Locator} */
    this.shopping_cart_link = page.locator(this.shopping_cart_link_selector);
  }

  /**
   * Fill customer information fields
   * @param {Object} info - Customer information
   * @param {string} [info.firstName=''] - First name
   * @param {string} [info.lastName=''] - Last name
   * @param {string} [info.postalCode=''] - Postal code
   * @returns {Promise<void>}
   */
  async fillCustomerInfo({ firstName = "", lastName = "", postalCode = "" }) {
    await this.textbox_firstName.fill(firstName);
    await this.textbox_lastName.fill(lastName);
    await this.textbox_postalCode.fill(postalCode);
  }

  /**
   * Click continue button to proceed to order review
   * @returns {Promise<void>}
   */
  async clickContinue() {
    await this.button_continue.click();
  }

  /**
   * Click cancel button to return to cart
   * @returns {Promise<void>}
   */
  async clickCancel() {
    await this.button_cancel.click();
  }

  /**
   * Click finish button to complete purchase
   * @returns {Promise<void>}
   */
  async clickFinish() {
    await this.button_finish.click();
  }

  /**
   * Get error message locator
   * @returns {import('@playwright/test').Locator}
   */
  getErrorMessage() {
    return this.checkout_error;
  }

  /**
   * Get order completion header
   * @returns {import('@playwright/test').Locator}
   */
  getCompleteHeader() {
    return this.complete_header;
  }

  /**
   * Get cart badge count
   * @returns {Promise<number>} - Number of items in cart
   */
  async getCartBadgeCount() {
    try {
      if (!(await this.shopping_cart_badge.isVisible().catch(() => false))) {
        return 0;
      }
      return Number(await this.shopping_cart_badge.textContent());
    } catch {
      return 0;
    }
  }

  /**
   * Navigate to shopping cart
   * @returns {Promise<void>}
   */
  async openCart() {
    await this.shopping_cart_link.click();
  }
}

module.exports = CheckoutPage;
