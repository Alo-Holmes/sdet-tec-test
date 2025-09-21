import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';

describe('Shopping Flow', () => {

    beforeEach(() => {
        // Arrange: Intercept API calls and mock them with fixture data.
        // This makes the test faster and more reliable by removing network dependency.
        cy.intercept('GET', 'https://fakestoreapi.com/products', { fixture: 'products.json' }).as('getProducts');
        cy.intercept('GET', 'https://fakestoreapi.com/products/1', { fixture: 'product.json' }).as('getProduct');
    });

    it('should load the home page with mock data, navigate to a product, and see details', () => {
        // Act: Visit the home page.
        HomePage.visit();

        // Assert: Wait for the mocked API call to complete and verify product cards are shown.
        cy.wait('@getProducts');
        HomePage.productCards.should('have.length', 2); // From our fixture

        // Act: Click the first product.
        HomePage.clickFirstProduct();

        // Assert: Verify the URL and that the product details are visible.
        cy.url().should('include', '/product.html?id=1');
        cy.wait('@getProduct');
        ProductPage.verifyProductDetailsAreVisible();

        // Assert: Verify the content of the product details from the fixture
        ProductPage.title.should('contain.text', 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    });

    it('should display an error message if the products API call fails', () => {
        // Arrange: Intercept the API call and force it to fail with a 500 error.
        cy.intercept('GET', 'https://fakestoreapi.com/products', { statusCode: 500, body: 'Server Error' }).as('getProductsFail');

        // Act: Visit the home page.
        HomePage.visit();

        // Assert: Wait for the failed API call and verify the error message is shown.
        cy.wait('@getProductsFail');
        cy.get('main#product-list').should('contain.text', 'Failed to load products');
    });

    it('should display a message when no products are returned', () => {
        // Arrange: Intercept the API call and return an empty array.
        cy.intercept('GET', 'https://fakestoreapi.com/products', { body: [] }).as('getEmptyProducts');

        // Act: Visit the home page.
        HomePage.visit();

        // Assert: Wait for the API call and verify the message is shown.
        cy.wait('@getEmptyProducts');
        cy.get('main#product-list').should('contain.text', 'No products found.');
    });

    it('should load a product page directly and display its details', () => {
        // Arrange: Intercept the API call for a single product.
        cy.intercept('GET', 'https://fakestoreapi.com/products/1', { fixture: 'product.json' }).as('getProduct');

        // Act: Visit the product page directly.
        cy.visit('/product.html?id=1');

        // Assert: Wait for the API call and verify the details are visible.
        cy.wait('@getProduct');
        ProductPage.verifyProductDetailsAreVisible();
        ProductPage.title.should('contain.text', 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    });
});
