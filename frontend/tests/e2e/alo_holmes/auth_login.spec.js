/// <reference types="cypress" />

describe('Authentication Flow - Alo Holmes', () => {

  // Load fixture data once before all tests in this suite
  let users;

  before(() => {
    cy.fixture('users.json').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    // Visit the base URL before each test
    cy.visit('/login');
  });

  it('should successfully log in as admin', () => {
    const admin = users.admin;

    // Fill in login form
    cy.get('input[name="username"]').type(admin.username);
    cy.get('input[name="password"]').type(admin.password);

    // Submit form
    cy.get('button[type="submit"]').click();

    // Assert that we are redirected to dashboard/homepage
    cy.url().should('include', '/dashboard');

    // Optional: Assert that a welcome message or user-specific element appears
    cy.contains('Welcome, Admin').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    const invalidUser = { username: 'fakeuser@example.com', password: 'wrongpassword' };

    cy.get('input[name="username"]').type(invalidUser.username);
    cy.get('input[name="password"]').type(invalidUser.password);
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.get('.error-message').should('be.visible')
      .and('contain', 'Invalid username or password');
  });
});
