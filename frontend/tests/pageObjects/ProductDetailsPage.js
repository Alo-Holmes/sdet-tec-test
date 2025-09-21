class ProductDetailsPage {
  getProductName() {
    return cy.get('.v-card__title');
  }

  getProductPrice() {
    return cy.get('.v-card__subtitle').first();
  }

  getProductStock() {
    return cy.get('.v-card__subtitle').last();
  }
}

export default ProductDetailsPage;
