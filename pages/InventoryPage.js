// @ts-check

const { expect } = require("@playwright/test");

/**
 * Page object for SauceDemo inventory page
 * @class InventoryPage
 */
class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    /** @type {import('@playwright/test').Locator} */
    this.inventory_list = page.locator(".inventory_list");
    /** @type {import('@playwright/test').Locator} */
    this.inventory_items = page.locator(".inventory_item");
    /** @type {import('@playwright/test').Locator} */
    this.inventory_header = page.locator(".title");
    /** @type {import('@playwright/test').Locator} */
    this.shopping_cart_badge = page.locator(".shopping_cart_badge");
    /** @type {import('@playwright/test').Locator} */
    this.shopping_cart_link = page.locator(".shopping_cart_link");
    this.add_to_cart_button_selector = '[data-test*="add-to-cart"]';
    this.remove_button_selector = '[data-test*="remove"]';
    this.inventory_item_name_selector = ".inventory_item_name";
    /** @type {import('@playwright/test').Locator} */
    this.product_detail_name = page.locator(".inventory_details_name");
    /** @type {import('@playwright/test').Locator} */
    this.product_detail_description = page.locator(".inventory_details_desc");
    /** @type {import('@playwright/test').Locator} */
    this.product_detail_price = page.locator(".inventory_details_price");
    /** @type {import('@playwright/test').Locator} */
    this.product_detail_image = page.locator(".inventory_details_img");
    /** @type {import('@playwright/test').Locator} */
    this.product_detail_add_to_cart_button = page.locator(
      this.add_to_cart_button_selector,
    );
  }

  /**
   * Wait for inventory page to load
   * @returns {Promise<void>}
   */
  async waitForLoaded() {
    await expect(this.inventory_list).toBeVisible();
  }

  /**
   * Get all inventory items
   * @returns {import('@playwright/test').Locator}
   */
  getInventoryItems() {
    return this.inventory_items;
  }

  /**
   * Add product to cart by index
   * @param {number} index - Product index in inventory list
   * @returns {Promise<void>}
   */
  async addItemByIndex(index) {
    const item = this.getInventoryItems().nth(index);
    const addButton = item.locator(this.add_to_cart_button_selector);
    await addButton.click();
  }

  /**
   * Remove product from cart by index
   * @param {number} index - Product index in inventory list
   * @returns {Promise<void>}
   */
  async removeItemByIndex(index) {
    const item = this.getInventoryItems().nth(index);
    const removeButton = item.locator(this.remove_button_selector);
    await removeButton.click();
  }

  /**
   * Get remove button locator by inventory item index
   * @param {number} index - Product index in inventory list
   * @returns {import('@playwright/test').Locator}
   */
  getRemoveButtonByIndex(index) {
    return this.getInventoryItems()
      .nth(index)
      .locator(this.remove_button_selector);
  }

  /**
   * Open product detail page by index
   * @param {number} index - Product index in inventory list
   * @returns {Promise<void>}
   */
  async openItemDetailByIndex(index) {
    const item = this.getInventoryItems().nth(index);
    const itemName = item.locator(this.inventory_item_name_selector);
    await itemName.click();
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

  /**
   * Get product detail data from detail page
   * @returns {Promise<{name: string | undefined, description: string | undefined, price: string | undefined, hasImage: boolean}>}
   */
  async getProductDetailData() {
    return {
      name: (await this.product_detail_name.textContent())?.trim(),
      description: (
        await this.product_detail_description.textContent()
      )?.trim(),
      price: (await this.product_detail_price.textContent())?.trim(),
      hasImage: await this.product_detail_image.isVisible(),
    };
  }
}

module.exports = InventoryPage;
