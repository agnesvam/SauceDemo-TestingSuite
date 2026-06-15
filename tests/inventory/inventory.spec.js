const { test, expect } = require("../../fixtures/saucedemo.fixture");

test.describe("Section B - Inventory", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await expect(inventoryPage.inventory_header).toHaveText("Products");
  });

  test("Scenario 4: Verify inventory items display", async ({
    inventoryPage,
  }) => {
    const inventoryItems = inventoryPage.getInventoryItems();
    const totalItems = await inventoryItems.count();
    expect(totalItems).toBeGreaterThan(0);

    const itemIndexToAdd = Math.floor(Math.random() * totalItems);
    await inventoryPage.addItemByIndex(itemIndexToAdd);
    await expect(
      inventoryPage.getRemoveButtonByIndex(itemIndexToAdd),
    ).toBeVisible();
    await expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  });

  test.describe("Scenario 7: Remove a product from inventory page", () => {
    const itemIndexToRemove = 0;

    test.beforeEach(async ({ inventoryPage }) => {
      // Precondition: user has at least one product in the cart before test starts.
      await inventoryPage.addItemByIndex(itemIndexToRemove);
    });

    test("Scenario 7: Remove a product from inventory page", async ({
      inventoryPage,
    }) => {
      // Main assertions before removal
      await expect(
        inventoryPage.getRemoveButtonByIndex(itemIndexToRemove),
      ).toBeVisible();
      const cartCountBeforeRemoval = await inventoryPage.getCartBadgeCount();
      expect(cartCountBeforeRemoval).toBeGreaterThan(0);

      // Remove item from cart
      await inventoryPage.getRemoveButtonByIndex(itemIndexToRemove).click();

      // Main assertions after removal
      await expect(
        inventoryPage.getRemoveButtonByIndex(itemIndexToRemove),
      ).not.toBeVisible();
      await expect(await inventoryPage.getCartBadgeCount()).toBe(
        cartCountBeforeRemoval - 1,
      );
    });
  });

  test.describe("Scenario 8: Navigate to product detail page", () => {
    test.beforeEach(async ({ inventoryPage }) => {
      // Precondition: user is logged in and on inventory page before test starts.
      await expect(inventoryPage.inventory_header).toHaveText("Products");
      await expect(inventoryPage.page).toHaveURL(/inventory\.html/);
    });

    test("Scenario 8: Navigate to product detail page", async ({
      inventoryPage,
    }) => {
      const totalItems = await inventoryPage.getInventoryItems().count();
      expect(totalItems).toBeGreaterThan(0);

      const itemIndexToOpen = Math.floor(Math.random() * totalItems);
      await inventoryPage.openItemDetailByIndex(itemIndexToOpen);

      const productData = await inventoryPage.getProductDetailData();
      expect(productData.name).toBeTruthy();
      expect(productData.description).toBeTruthy();
      expect(productData.price).toBeTruthy();
      expect(productData.hasImage).toBe(true);
      await expect(
        inventoryPage.product_detail_add_to_cart_button,
      ).toBeVisible();
    });
  });
});
