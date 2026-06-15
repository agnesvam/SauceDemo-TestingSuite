// @ts-check

/**
 * Page object for SauceDemo shopping cart page
 * @class CartPage
 */
class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Selector variables
    this.cart_item_selector = ".cart_item";
    this.item_quantity_selector = ".cart_quantity";
    this.item_name_selector = ".inventory_item_name";
    this.item_description_selector = ".inventory_item_desc";
    this.item_price_selector = ".inventory_item_price";
    this.checkout_button_selector = '[data-test="checkout"]';
    this.continue_shopping_button_selector = '[data-test="continue-shopping"]';

    // Cart item locators
    /** @type {import('@playwright/test').Locator} */
    this.cart_items = page.locator(this.cart_item_selector);
    /** @type {import('@playwright/test').Locator} */
    this.item_quantities = page.locator(this.item_quantity_selector);
    /** @type {import('@playwright/test').Locator} */
    this.item_names = page.locator(this.item_name_selector);
    /** @type {import('@playwright/test').Locator} */
    this.item_descriptions = page.locator(this.item_description_selector);
    /** @type {import('@playwright/test').Locator} */
    this.item_prices = page.locator(this.item_price_selector);

    // Action buttons
    /** @type {import('@playwright/test').Locator} */
    this.button_checkout = page.locator(this.checkout_button_selector);
    /** @type {import('@playwright/test').Locator} */
    this.button_continue_shopping = page.locator(
      this.continue_shopping_button_selector,
    );
  }

  /**
   * Get count of items in cart
   * @returns {Promise<number>}
   */
  async getItemCount() {
    return this.cart_items.count();
  }

  /**
   * Get all item names in cart
   * @returns {Promise<string[]>}
   */
  async getItemNames() {
    return this.item_names.allTextContents();
  }

  /**
   * Get detailed information of all items in cart
   * @returns {Promise<Array<{quantity: string | undefined, name: string | undefined, description: string | undefined, price: string | undefined}>>}
   */
  async getItemDetails() {
    const count = await this.getItemCount();
    const details = [];

    for (let i = 0; i < count; i += 1) {
      const row = this.cart_items.nth(i);
      details.push({
        quantity: (
          await row.locator(this.item_quantity_selector).textContent()
        )?.trim(),
        name: (
          await row.locator(this.item_name_selector).textContent()
        )?.trim(),
        description: (
          await row.locator(this.item_description_selector).textContent()
        )?.trim(),
        price: (
          await row.locator(this.item_price_selector).textContent()
        )?.trim(),
      });
    }

    return details;
  }

  /**
   * Click checkout button
   * @returns {Promise<void>}
   */
  async clickCheckout() {
    await this.button_checkout.click();
  }

  /**
   * Click continue shopping button
   * @returns {Promise<void>}
   */
  async clickContinueShopping() {
    await this.button_continue_shopping.click();
  }

  // Backward-compatible aliases
  async itemCount() {
    return this.getItemCount();
  }

  async itemNames() {
    return this.getItemNames();
  }

  async itemDetails() {
    return this.getItemDetails();
  }

  cartItems() {
    return this.cart_items;
  }
}

module.exports = CartPage;
