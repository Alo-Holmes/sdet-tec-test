describe('Shopping Flow', () => {
    it('should load the home page, navigate to a product, and see details', () => {
        // 1. Visit the home page
        cy.visit('/index.html');

        // 2. Verify that a list of products is displayed
        // We'll wait for up to 10 seconds for the API call to complete
        cy.get('.product-card', { timeout: 10000 }).should('have.length.gt', 0);

        // 3. Click on the first product
        cy.get('.product-card').first().click();

        // 4. Verify that the user is taken to the product.html page
        cy.url().should('include', '/product.html');
        cy.url().should('include', 'id=');

        // 5. Verify that the product details are displayed
        cy.get('#product-detail .info h1').should('not.be.empty');
        cy.get('#product-detail .info .price').should('not.be.empty');
        cy.get('#product-detail .info .description').should('not.be.empty');
    });
});
