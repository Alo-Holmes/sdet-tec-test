class HeaderPage {
  getCartButton() {
    return cy.get('[data-testid="cart-button"]');
  }

  getCartCount() {
    return this.getCartButton().invoke('text');
  }

  goToCart() {
    this.getCartButton().click();
  }
}

export default HeaderPage;
