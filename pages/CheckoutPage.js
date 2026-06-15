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
    this.finish_button_selector = '[data-test="finish"]';
    this.cancel_button_selector = '[data-test="cancel"]';
    this.error_selector = '[data-test="error"]';
    this.complete_header_selector = ".complete-header";

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
    this.button_finish = page.locator(this.finish_button_selector);
    /** @type {import('@playwright/test').Locator} */
    this.button_cancel = page.locator(this.cancel_button_selector);

    // Status/message locators
    /** @type {import('@playwright/test').Locator} */
    this.checkout_error = page.locator(this.error_selector);
    /** @type {import('@playwright/test').Locator} */
    this.complete_header = page.locator(this.complete_header_selector);
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
   * Set first name
   * @param {string} firstName
   * @returns {Promise<void>}
   */
  async setFirstName(firstName) {
    await this.textbox_firstName.fill(firstName);
  }

  /**
   * Set last name
   * @param {string} lastName
   * @returns {Promise<void>}
   */
  async setLastName(lastName) {
    await this.textbox_lastName.fill(lastName);
  }

  /**
   * Set postal code
   * @param {string} postalCode
   * @returns {Promise<void>}
   */
  async setPostalCode(postalCode) {
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
   * Click finish button to complete purchase
   * @returns {Promise<void>}
   */
  async clickFinish() {
    await this.button_finish.click();
  }

  /**
   * Click cancel button to abandon checkout
   * @returns {Promise<void>}
   */
  async clickCancel() {
    await this.button_cancel.click();
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

  // Backward-compatible aliases
  async continue() {
    return this.clickContinue();
  }

  async finish() {
    return this.clickFinish();
  }

  async cancel() {
    return this.clickCancel();
  }

  errorMessage() {
    return this.checkout_error;
  }

  completeHeader() {
    return this.complete_header;
  }
}

module.exports = CheckoutPage;
