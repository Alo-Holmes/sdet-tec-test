import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { ProductsPage } from '../pageObjects/ProductsPage';
import { HeaderPage } from '../pageObjects/HeaderPage';
import { ProductDetailsPage } from '../pageObjects/ProductDetailsPage';
import { RegistrationPage } from '../pageObjects/RegistrationPage';

test.describe('Shopping Flow', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let headerPage: HeaderPage;
  let productDetailsPage: ProductDetailsPage;
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    headerPage = new HeaderPage(page);
    productDetailsPage = new ProductDetailsPage(page);
    registrationPage = new RegistrationPage(page);
    await page.goto('http://localhost:8082/');
  });

  test('should allow a user to login', async ({ page }) => {
    await loginPage.login('test@example.com', 'password');
    await expect(page).toHaveURL('http://localhost:8082/products');
  });

  test('should allow user to browse and add a product to the cart', async () => {
    await loginPage.login('test@example.com', 'password');
    await productsPage.addFirstProductToCart();
    await expect(headerPage.cartButton).toContainText('1');
  });

  test('should complete the checkout process', async ({ page }) => {
    await loginPage.login('test@example.com', 'password');
    await productsPage.addFirstProductToCart();
    await headerPage.goToCart();
    await page.locator('[data-testid="checkout-button"]').click();
    await expect(page).toHaveURL('http://localhost:8082/orders');
  });

  test('should show correct product details', async () => {
    await productDetailsPage.goto(1);
    await expect(productDetailsPage.productName).toContainText('Wireless Headphones');
    await expect(productDetailsPage.productPrice).toContainText('$199.99');
    await expect(productDetailsPage.productStock).toContainText('50');
  });

  test('should filter products by category', async ({ page }) => {
    await page.goto('http://localhost:8082/products');
    await productsPage.filterByCategory('Electronics');
    await expect(productsPage.productCards).not.toHaveCount(0);
  });

  test('should handle user registration', async ({ page }) => {
    const email = `john_${Date.now()}@test.com`;
    await registrationPage.register('John', 'Doe', email, 'password123');
    await expect(page).toHaveURL('http://localhost:8082/login');
  });

  test('should search for products', async ({ page }) => {
    await page.goto('http://localhost:8082/products');
    await productsPage.searchForProduct('laptop');
    await page.waitForTimeout(500); // wait for search to complete
    await expect(productsPage.productCards.first()).toContainText('Laptop');
  });
});