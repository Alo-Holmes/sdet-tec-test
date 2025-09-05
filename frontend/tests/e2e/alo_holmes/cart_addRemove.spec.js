// cart_addRemove.spec.js

/// <reference types="cypress" />

describe('Cart - Add and Remove Products', () => {
  let products;

  // Load product data once before all tests
  before(() => {
    cy.fixture('products').then((data) => {
      products = data;
    });
  });

  beforeEach(() => {
    // Ensure we start from a clean state before each test
    cy.visit('/');
    cy.login('standard_user', 'secret_sauce'); // custom command (from commands.js)
  });

  it('should add a product to the cart', () => {
    const product = products.backpack;

    // Add product to cart
    cy.contains(product.name).parents('.inventory_item').within(() => {
      cy.contains('Add to cart').click();
    });

    // Verify cart badge increments to 1
    cy.get('.shopping_cart_badge').should('contain', '1');
  });

  it('should remove a product from the cart', () => {
    const product = products.bikeLight;

    // Add product first
    cy.contains(product.name).parents('.inventory_item').within(() => {
      cy.contains('Add to cart').click();
    });

    // Navigate to cart
    cy.get('.shopping_cart_link').click();

    // Remove the product from the cart
    cy.contains(product.name).parents('.cart_item').within(() => {
      cy.contains('Remove').click();
    });

    // Verify cart is empty
    cy.get('.cart_item').should('not.exist');
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});
