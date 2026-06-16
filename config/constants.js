/**
 * Constants for the test suite
 */

// URLs
exports.BASE_URL = process.env.BASE_URL || "https://www.saucedemo.com";

// Test Credentials for different user types
exports.USERS = {
  STANDARD: {
    username: "standard_user",
    password: "secret_sauce",
    description: "Standard user with normal app behavior",
  },
  PROBLEM: {
    username: "problem_user",
    password: "secret_sauce",
    description: "User with performance/UI issues",
  },
  LOCKED_OUT: {
    username: "locked_out_user",
    password: "secret_sauce",
    description: "Locked out user",
  },
};

exports.TEST_DATA = {
  INVALID_PASSWORD: "wrong_password",
};

exports.AUTH_MESSAGES = {
  USERNAME_REQUIRED: "Username is required",
  INVALID_CREDENTIALS: "Username and password do not match any user",
  LOCKED_OUT: "Sorry, this user has been locked out",
};

exports.CHECKOUT_MESSAGES = {
  ORDER_SUCCESS: "Thank you for your order!",
  FIRST_NAME_REQUIRED: "Error: First Name is required",
  LAST_NAME_REQUIRED: "Error: Last Name is required",
  POSTAL_CODE_REQUIRED: "Error: Postal Code is required",
};

exports.CHECKOUT_TEST_DATA = {
  CUSTOMER_INFO: {
    firstName: "John",
    lastName: "Doe",
    postalCode: "10001",
  },
  MISSING_REQUIRED_FIELD_CASES: [
    {
      label: "first name",
      customerInfo: {
        firstName: "",
        lastName: "Doe",
        postalCode: "10001",
      },
      expectedError: "Error: First Name is required",
    },
    {
      label: "last name",
      customerInfo: {
        firstName: "John",
        lastName: "",
        postalCode: "10001",
      },
      expectedError: "Error: Last Name is required",
    },
    {
      label: "postal code",
      customerInfo: {
        firstName: "John",
        lastName: "Doe",
        postalCode: "",
      },
      expectedError: "Error: Postal Code is required",
    },
  ],
};
