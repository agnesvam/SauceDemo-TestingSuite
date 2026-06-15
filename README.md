# Sauce Demo Test Suite

Test automation with Playwright for https://www.saucedemo.com

## Scope Decision

The assessment allows selecting a subset of scenarios. I focused on core user journeys that validate authentication, inventory behavior, cart integrity, and checkout reliability.

### Scenarios Included

- Section A - Authentication: Scenarios 1, 2, 3
- Section B - Product Inventory: Scenario 4
- Section B - Product Inventory: Scenario 7
- Section B - Product Inventory: Scenario 8
- Section C - Shopping Cart: Scenario 11
- Section D - Checkout Flow: Scenario 13
- Section D - Checkout Flow: Scenario 14

### Scenarios Excluded (for now)

- Section B - Product Inventory: Scenario 6 (add multiple products and verify cart badge)
- Section C - Shopping Cart: Scenario 12 (continue shopping button)
- Section F - End-to-End Composite Journey: Scenario 18

### Trade-off Rationale

- Prioritized breadth across critical flows instead of implementing every scenario.
- Included high-value validations that prove state transitions: login errors, add/remove behavior, cart accuracy, and checkout success/validation.
- Deferred composite and overlapping scenarios to keep the suite focused, deterministic, and fast for the first submission iteration.

<!-- ## Scenario-to-Test Mapping

Planned file organization for the selected scope:

- tests/auth/login.spec.js
  - Scenario 1: Login with empty credentials
  - Scenario 2: Login with invalid password
  - Scenario 3: Login with locked-out user

- tests/inventory/inventory.spec.js
  - Scenario 4: Add a product to the cart from inventory
  - Scenario 7: Remove a product from inventory page
  - Scenario 8: Navigate to product detail page

- tests/cart/cart.spec.js
  - Scenario 11: Verify cart displays correct items

- tests/checkout/checkout.spec.js
  - Scenario 13: Complete checkout - happy path
  - Scenario 14: Checkout validation - missing required fields

Supporting structure:

- config/constants.js: URL, users, selectors, and shared constants
- fixtures/test-data.js: checkout and product fixture data
- utils/auth-helper.js: reusable login/logout helpers
- utils/inventory-helper.js: reusable add/remove/navigation actions
- utils/cart-helper.js: cart badge/count/item helper methods -->

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
npm test
```
