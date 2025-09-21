class ProductsPage {
  getProducts() {
    return cy.get('.product-card');
  }

  addFirstProductToCart() {
    this.getProducts().first().within(() => {
      cy.get('[data-testid="add-to-cart-button"]').click();
    });
  }

  filterByCategory(category) {
    cy.get('.v-select > .v-input__control > .v-input__slot').click();
    cy.get('.v-menu__content .v-list-item').contains(category).click();
  }

  searchForProduct(productName) {
    cy.get('[data-testid="search-input"]').type(productName);
  }
}

export default ProductsPage;