const { test, expect } = require("../../fixtures/saucedemo.fixture");
const {
  CHECKOUT_MESSAGES,
  CHECKOUT_TEST_DATA,
} = require("../../config/constants");

test.describe("Section D - Checkout Flow", () => {
  test.beforeEach(async ({ checkoutPage }) => {
    // Shared precondition: user is logged in and has at least one item in cart.
    await expect(checkoutPage.page).toHaveURL(/checkout-step-one\.html/);
    await expect(await checkoutPage.getCartBadgeCount()).toBeGreaterThan(0);
  });

  test.describe("Scenario 13: Complete checkout - happy path", () => {
    test("Scenario 13: Complete checkout - happy path", async ({
      checkoutPage,
    }) => {
      // Journey: fill information, review and complete purchase.
      await expect(checkoutPage.page).toHaveURL(/checkout-step-one\.html/);
      await expect(checkoutPage.textbox_firstName).toBeVisible();
      await expect(checkoutPage.textbox_lastName).toBeVisible();
      await expect(checkoutPage.textbox_postalCode).toBeVisible();

      await checkoutPage.fillCustomerInfo(CHECKOUT_TEST_DATA.CUSTOMER_INFO);
      await checkoutPage.clickContinue();

      await expect(checkoutPage.page).toHaveURL(/checkout-step-two\.html/);
      await expect(checkoutPage.button_finish).toBeVisible();

      await checkoutPage.clickFinish();

      await expect(checkoutPage.page).toHaveURL(/checkout-complete\.html/);
      await expect(checkoutPage.getCompleteHeader()).toHaveText(
        CHECKOUT_MESSAGES.ORDER_SUCCESS,
      );

      // Expected: cart is emptied after purchase.
      await expect(await checkoutPage.getCartBadgeCount()).toBe(0);
      await checkoutPage.openCart();
      await expect(checkoutPage.page).toHaveURL(/cart\.html/);
      await expect(checkoutPage.page.locator(".cart_item")).toHaveCount(0);
    });
  });

  test.describe("Scenario 14: Checkout validation - missing required fields", () => {
    test.beforeEach(async ({ checkoutPage }) => {
      // Precondition: user is on checkout information page.
      await expect(checkoutPage.page).toHaveURL(/checkout-step-one\.html/);
      await expect(checkoutPage.textbox_firstName).toBeVisible();
      await expect(checkoutPage.textbox_lastName).toBeVisible();
      await expect(checkoutPage.textbox_postalCode).toBeVisible();
    });

    for (const missingFieldCase of CHECKOUT_TEST_DATA.MISSING_REQUIRED_FIELD_CASES) {
      test(`Scenario 14: Missing ${missingFieldCase.label} shows appropriate error`, async ({
        checkoutPage,
      }) => {
        await checkoutPage.fillCustomerInfo(missingFieldCase.customerInfo);
        await checkoutPage.clickContinue();

        // Expected: user stays on information step and gets field-specific error.
        await expect(checkoutPage.page).toHaveURL(/checkout-step-one\.html/);
        await expect(checkoutPage.getErrorMessage()).toContainText(
          missingFieldCase.expectedError,
        );
      });
    }
  });

  test.describe("Scenario 17: Cancel checkout returns to cart", () => {
    let initialCartCount;

    test.beforeEach(async ({ checkoutPage }) => {
      // Capture cart size before cancel action.
      initialCartCount = await checkoutPage.getCartBadgeCount();
    });

    test("Scenario 17: Cancel checkout returns to cart", async ({
      checkoutPage,
    }) => {
      await checkoutPage.clickCancel();

      await expect(checkoutPage.page).toHaveURL(/cart\.html/);

      await expect(checkoutPage.page.locator(".cart_item")).toHaveCount(
        initialCartCount,
      );
    });
  });
});
