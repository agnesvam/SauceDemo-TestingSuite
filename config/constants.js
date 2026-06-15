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
