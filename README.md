# SauceDemo Automated Test Suite

A comprehensive, maintainable Playwright-based automation testing suite for the [Sauce Labs Demo Application](https://www.saucedemo.com). Built with best practices including Page Object Model (POM) architecture, fixture-driven test patterns, and dynamic data capture for resilience.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Testing Approach](#testing-approach)
3. [Architecture & Design Decisions](#architecture--design-decisions)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [Running Tests](#running-tests)
7. [Test Results & Reports](#test-results--reports)
8. [Test Coverage](#test-coverage)

---

## Project Overview

This test suite automates 11 critical test scenarios across the Sauce Demo application covering:

- **Authentication** (3 scenarios): Login validation, error handling, account lockout
- **Inventory Management** (3 scenarios): Add/remove products, product details, cart badge
- **Shopping Cart** (2 scenarios): Item verification, navigation persistence
- **Checkout Flow** (3 scenarios): Happy path, validation rules, cancellation, user flows

**Target Application**: https://www.saucedemo.com  
**Framework**: Playwright (v1.48.0+)  
**Language**: JavaScript (Node.js)  
**Test Status**: ✅ 13/13 tests passing (when network available)

---

## Testing Approach

### Strategy

This suite follows a **behavior-driven, scenario-based** approach:

1. **User Journey Focus**: Tests simulate real user workflows (login → browse → add to cart → checkout)
2. **Independence**: Each test is completely isolated—no test depends on another test running first
3. **Determinism**: Tests produce identical results across multiple runs (no flaky randomness in state management)
4. **Resilience**: Dynamic data capture makes tests resistant to product catalog changes
5. **Maintainability**: Page Object Model abstracts UI details from test logic

### Key Principles

- **No Hardcoded Test Data**: Product names/prices read live from the application
- **Centralized Constants**: All credentials and expected messages in `config/constants.js`
- **Fresh State Per Test**: Each test gets a new browser page and login session
- **Explicit Waits**: All synchronization via Playwright's built-in expectations (no arbitrary sleeps)

---

## Architecture & Design Decisions

### Page Object Model (POM)

Each page is encapsulated as a class with:

- Locator definitions (CSS selectors)
- User action methods (click, fill, submit)
- Assertion helpers (get item count, verify messages)

**Benefit**: UI changes affect only the page object, not 13 different tests.

```javascript
// Example: InventoryPage encapsulates all inventory interactions
await inventoryPage.addItemByIndex(0);
const badge = await inventoryPage.getCartBadgeCount();
```

### Fixture-Driven Architecture

Playwright fixtures handle test setup/teardown and state provisioning:

```javascript
// Fixture hierarchy: Each builds on the previous
loginPage fixture        → Opens login page
    ↓
inventoryPage fixture    → Logs in, navigates to inventory
    ↓
cartPage fixture         → Adds item, opens cart
    ↓
checkoutPage fixture     → Prepares checkout form
```

**Benefit**: No manual page instantiation; dependencies are injected. Tests stay focused on assertions.

### Dynamic Data Capture

Instead of asserting hardcoded product names, tests capture live data:

```javascript
// Scenario 11: Verify cart displays correct items
// BEFORE (fragile): expect(cartItem.name).toBe("Sauce Labs Backpack");
// AFTER (resilient):
const productData = await inventoryPage.getItemDataByIndex(0);
expect(cartItem.name).toBe(productData.name);
```

**Benefit**: Product catalog changes don't break tests.

---

## Project Structure
```
SauceDemo-TestingSuite/
├── config/
│   └── constants.js              # Centralized test data (users, messages, checkout info)
│
├── fixtures/
│   └── saucedemo.fixture.js      # Playwright fixtures (loginPage, inventoryPage, cartPage, checkoutPage)
│
├── pages/
│   ├── LoginPage.js              # Login page interactions
│   ├── InventoryPage.js          # Product inventory page
│   ├── CartPage.js               # Shopping cart page
│   └── CheckoutPage.js           # Checkout workflow pages (step-one, step-two, complete)
│
├── tests/
│   ├── auth/
│   │   └── login.spec.js         # Scenarios 1-3: Authentication tests
│   ├── inventory/
│   │   └── inventory.spec.js     # Scenarios 4, 7-8: Inventory & product detail tests
│   ├── cart/
│   │   └── cart.spec.js          # Scenarios 11-12: Cart verification & navigation
│   └── checkout/
│       └── checkout.spec.js      # Scenarios 13-14, 17: Checkout flow tests
│
├── playwright.config.js          # Playwright configuration (timeouts, retries, browsers)
├── package.json                  # Dependencies & npm scripts
└── README.md                      # This file
```

---

## Installation & Setup

### Prerequisites

- **Node.js**: v16+ (v18+ recommended)
- **npm**: v8+
- **Internet**: Tests require access to https://www.saucedemo.com

### Step 1: Clone/Download Repository

```bash
cd SauceDemo-TestingSuite
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:

- `@playwright/test` (v1.48.0) - Test framework
- `dotenv` (v16.4.5) - Environment configuration (optional)

### Step 3: Verify Installation

```bash
npx playwright --version
# Should output: Version 1.48.0 or higher
```

### Optional: Download Browsers

Playwright downloads browsers automatically on first run. To pre-download:

```bash
npx playwright install
```

---

## Running Tests

### Run All Tests

```bash
npm test
```

Output: Summary of passed/failed tests, test duration.

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

Useful for debugging—watch the browser actions in real-time.

### Run Specific Test Suite

```bash
npm run test:auth        # Authentication tests (Scenarios 1-3)
npm run test:inventory   # Inventory tests (Scenarios 4, 7-8)
npm run test:cart        # Cart tests (Scenarios 11-12)
npm run test:checkout    # Checkout tests (Scenarios 13-14, 17)
```

### Run Tests in Parallel (Faster)

```bash
npx playwright test --workers=4
```

Tests are designed for parallel execution (each has independent state).

### Generate Test Report

After running tests:

```bash
npm run test:report
```

Opens HTML report with detailed results, screenshots, and logs.

---

## Test Results & Reports

### Console Output Example

```
✓ Section A - Authentication (3 tests)
  ✓ Scenario 1: Login with empty credentials
  ✓ Scenario 2: Login with invalid password
  ✓ Scenario 3: Login with locked-out user

✓ Section B - Inventory (3 tests)
  ✓ Scenario 4: Verify inventory items display
  ✓ Scenario 7: Remove a product from inventory page
  ✓ Scenario 8: Navigate to product detail page

✓ Section C - Shopping Cart (2 tests)
  ✓ Scenario 11: Verify cart displays correct items
  ✓ Scenario 12: Continue shopping navigates back to inventory

✓ Section D - Checkout (5 tests)
  ✓ Scenario 13: Complete checkout – happy path
  ✓ Scenario 14a: Checkout validation – missing first name
  ✓ Scenario 14b: Checkout validation – missing last name
  ✓ Scenario 14c: Checkout validation – missing postal code
  ✓ Scenario 17: Cancel checkout and return to cart

13 passed (2.5s)
```

### HTML Report

Run `npm run test:report` to view:

- ✅ Passed/failed tests
- 📸 Screenshots at each step
- 📋 Full test logs and timing
- 🔗 Trace files for debugging failed tests

### Test Results Interpretation

| Status     | Meaning                   | Action                                      |
| ---------- | ------------------------- | ------------------------------------------- |
| ✅ PASSED  | Test assertion succeeded  | No action needed                            |
| ❌ FAILED  | Test assertion failed     | Review error message, check selectors/logic |
| ⏭️ SKIPPED | Test marked `.skip()`     | Check if intentional                        |
| ⚠️ TIMEOUT | Test exceeded 30s default | Increase timeout or investigate slow steps  |

---

## Test Coverage

| Scenario | Test File                   | Status | Focus                           |
| -------- | --------------------------- | ------ | ------------------------------- |
| 1        | auth/login.spec.js          | ✅     | Empty credentials validation    |
| 2        | auth/login.spec.js          | ✅     | Invalid password error          |
| 3        | auth/login.spec.js          | ✅     | Locked-out user error           |
| 4        | inventory/inventory.spec.js | ✅     | Add product to cart             |
| 7        | inventory/inventory.spec.js | ✅     | Remove product from inventory   |
| 8        | inventory/inventory.spec.js | ✅     | Product detail page             |
| 11       | cart/cart.spec.js           | ✅     | Verify cart items display       |
| 12       | cart/cart.spec.js           | ✅     | Continue shopping navigation    |
| 13       | checkout/checkout.spec.js   | ✅     | Complete checkout (happy path)  |
| 14a      | checkout/checkout.spec.js   | ✅     | Validation: missing first name  |
| 14b      | checkout/checkout.spec.js   | ✅     | Validation: missing last name   |
| 14c      | checkout/checkout.spec.js   | ✅     | Validation: missing postal code |
| 17       | checkout/checkout.spec.js   | ✅     | Cancel checkout                 |

**Not Implemented** (out of scope):

- Scenario 5: Problem user test
- Scenario 6: Multiple product addition
- Scenario 9-10: Filter & sort
- Scenario 15-16: Discount/promo codes
- Scenario 18: Full purchase with logout/re-login
