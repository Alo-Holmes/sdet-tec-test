/**
 * Represents the Product Detail Page.
 * Encapsulates all the selectors and verification methods for this page.
 */
class ProductPage {
    // Selectors
    get productDetailContainer() {
        return cy.get('#product-detail');
    }

    get title() {
        return this.productDetailContainer.find('.info h1');
    }

    get price() {
        return this.productDetailContainer.find('.info .price');
    }

    get description() {
        return this.productDetailContainer.find('.info .description');
    }

    // Actions / Verifications

    /**
     * Verifies that the product detail elements are visible and not empty.
     */
    verifyProductDetailsAreVisible() {
        this.title.should('not.be.empty');
        this.price.should('not.be.empty');
        this.description.should('not.be.empty');
    }
}

export default new ProductPage();
