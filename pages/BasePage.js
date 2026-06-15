const { expect } = require("@playwright/test");

class BasePage {
  constructor(page) {
    this.page = page;
  }

  getLocator(selectorOrLocator) {
    if (typeof selectorOrLocator === "string") {
      return this.page.locator(selectorOrLocator);
    }
    return selectorOrLocator;
  }

  async goto(path = "/") {
    await this.page.goto(path);
  }

  async click(selectorOrLocator) {
    await this.getLocator(selectorOrLocator).click();
  }

  async fill(selectorOrLocator, value) {
    await this.getLocator(selectorOrLocator).fill(value);
  }

  async text(selectorOrLocator) {
    return this.getLocator(selectorOrLocator).textContent();
  }

  async isVisible(selectorOrLocator) {
    return this.getLocator(selectorOrLocator).isVisible();
  }

  async expectVisible(selectorOrLocator) {
    await expect(this.getLocator(selectorOrLocator)).toBeVisible();
  }

  async expectUrlContains(pathPart) {
    await expect(this.page).toHaveURL(new RegExp(pathPart));
  }
}

module.exports = BasePage;
