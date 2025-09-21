/**
 * Represents the Home Page (product listing page).
 * Encapsulates all the selectors and actions that can be performed on this page.
 */
class HomePage {
    // Selectors
    get productCards() {
        return cy.get('.product-card');
    }

    // Actions

    /**
     * Navigates to the home page.
     */
    visit() {
        cy.visit('/index.html');
    }

    /**
     * Clicks on the first product card in the list.
     */
    clickFirstProduct() {
        this.productCards.first().click();
    }
}

export default new HomePage();
