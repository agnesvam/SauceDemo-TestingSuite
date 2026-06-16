const { test, expect } = require("../../fixtures/saucedemo.fixture");

test.describe("Section C - Shopping Cart", () => {
  let expectedProducts;

  test.beforeEach(async ({ inventoryPage }) => {
    expectedProducts = [];
    const selectedIndexes = [0, 1];

    // Shared preconditions for cart scenarios:
    // 1) Starts on inventory page (logged-in via fixture).
    // 2) Picks product 1 and product 2 by index.
    // 3) Reads each product's live name, description, and price from inventory.
    // 4) Adds each to cart.
    await expect(inventoryPage.page).toHaveURL(/inventory\.html/);

    for (const index of selectedIndexes) {
      const { name, description, price } =
        await inventoryPage.getItemDataByIndex(index);

      expect(name).toBeTruthy();
      expect(description).toBeTruthy();
      expect(price).toBeTruthy();

      expectedProducts.push({
        name,
        description,
        price,
        quantity: "1",
      });

      await inventoryPage.addItemByIndex(index);
    }
  });

  test.describe("Scenario 11: Verify cart displays correct items", () => {
    test("Scenario 11: Verify cart displays correct items", async ({
      inventoryPage,
    }) => {
      await inventoryPage.openCart();

      await expect(inventoryPage.page).toHaveURL(/cart\.html/);
      const cartItems = inventoryPage.page.locator(".cart_item");
      await expect(cartItems.first()).toBeVisible();

      const itemCount = await cartItems.count();
      expect(itemCount).toBe(2);

      const itemNames = await inventoryPage.page
        .locator(".inventory_item_name")
        .allTextContents();
      expect(itemNames.sort()).toEqual(
        expectedProducts.map((product) => product.name).sort(),
      );

      const itemDetails = [];
      for (let i = 0; i < itemCount; i += 1) {
        const row = cartItems.nth(i);
        itemDetails.push({
          quantity: (await row.locator(".cart_quantity").textContent())?.trim(),
          name: (
            await row.locator(".inventory_item_name").textContent()
          )?.trim(),
          description: (
            await row.locator(".inventory_item_desc").textContent()
          )?.trim(),
          price: (
            await row.locator(".inventory_item_price").textContent()
          )?.trim(),
        });
      }
      expect(itemDetails).toHaveLength(2);

      for (const expectedProduct of expectedProducts) {
        const actualProduct = itemDetails.find(
          (item) => item.name === expectedProduct.name,
        );

        expect(actualProduct).toBeTruthy();
        expect(actualProduct.quantity).toBe(expectedProduct.quantity);
        expect(actualProduct.description).toBe(expectedProduct.description);
        expect(actualProduct.price).toBe(expectedProduct.price);
      }
    });
  });

  test.describe("Scenario 12: Continue shopping navigates back to inventory", () => {
    test("Scenario 12: Continue shopping navigates back to inventory", async ({
      inventoryPage,
    }) => {
      const expectedProductNames = expectedProducts.map(
        (product) => product.name,
      );
      const expectedCartCount = expectedProducts.length;

      await inventoryPage.openCart();
      await expect(inventoryPage.page).toHaveURL(/cart\.html/);
      await expect(inventoryPage.page.locator(".cart_item")).toHaveCount(
        expectedCartCount,
      );

      await inventoryPage.page
        .locator('[data-test="continue-shopping"]')
        .click();

      await expect(inventoryPage.page).toHaveURL(/inventory\.html/);
      await expect(inventoryPage.inventory_header).toHaveText("Products");

      await expect(await inventoryPage.getCartBadgeCount()).toBe(
        expectedCartCount,
      );
      await inventoryPage.openCart();
    });
  });
});
