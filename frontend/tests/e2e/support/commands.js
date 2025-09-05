// Custom Cypress commands for MiniMart testing

// Prevent Cypress from failing on uncaught exceptions that might occur in the app
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

/**
 * Logs in using provided username and password.
 * This makes tests cleaner by reusing login logic.
 */
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})
