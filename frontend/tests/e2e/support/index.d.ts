// index.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in to MiniMart.
     * @param username - The username to use for login
     * @param password - The password to use for login
     */
    login(username: string, password: string): Chainable<void>;
  }
}
