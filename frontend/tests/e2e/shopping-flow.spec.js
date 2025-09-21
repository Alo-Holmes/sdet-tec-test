import LoginPage from '../pageObjects/LoginPage';
import ProductsPage from '../pageObjects/ProductsPage';
import HeaderPage from '../pageObjects/HeaderPage';
import ProductDetailsPage from '../pageObjects/ProductDetailsPage';
import RegistrationPage from '../pageObjects/RegistrationPage';

describe('Shopping Flow E2E Tests', () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const headerPage = new HeaderPage();
  const productDetailsPage = new ProductDetailsPage();
  const registrationPage = new RegistrationPage();

  beforeEach(() => {
    cy.visit('http://localhost:8082');
  });

  it('should allow a user to login', () => {
    loginPage.login('test@example.com', 'password');
    cy.url().should('include', '/products');
  });

  it('should allow user to browse and add a product to the cart', () => {
    loginPage.login('test@example.com', 'password');
    cy.visit('/products');
    productsPage.addFirstProductToCart();
    headerPage.getCartButton().should('contain', '1');
  });

  it('should complete the checkout process', () => {
    loginPage.login('test@example.com', 'password');
    cy.visit('/products');
    productsPage.addFirstProductToCart();
    headerPage.goToCart();
    cy.get('[data-testid="checkout-button"]').click();
    cy.url().should('include', '/orders');
  });

  it('should show correct product details', () => {
    cy.visit('/products/1');
    productDetailsPage.getProductName().should('contain', 'Wireless Headphones');
    productDetailsPage.getProductPrice().should('contain', '$199.99');
    productDetailsPage.getProductStock().should('contain', '50');
  });

  it('should filter products by category', () => {
    cy.visit('/products');
    productsPage.filterByCategory('Electronics');
    productsPage.getProducts().should('exist');
  });

  it('should handle user registration', () => {
    const email = `john_${Date.now()}@test.com`;
    registrationPage.register('John', 'Doe', email, 'password123');
    cy.url().should('include', '/login');
  });

  it('should search for products', () => {
    cy.visit('/products');
    productsPage.searchForProduct('laptop');
    cy.wait(500); // wait for search to complete
    productsPage.getProducts().should('contain', 'Laptop');
  });
});