const { test, expect } = require('@playwright/test');
const { HomePage } = require('./pages/HomePage');
const { ProductPage } = require('./pages/ProductPage');

test.describe('Shopping Flow', () => {

    test('should load the home page with mock data, navigate to a product, and see details', async ({ page }) => {
        // Arrange: Instantiate Page Objects
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);

        // Arrange: Intercept API calls and mock them with fixture data.
        await page.route('**/products', route => {
            route.fulfill({ path: 'tests/fixtures/products.json' });
        });
        await page.route('**/products/1', route => {
            route.fulfill({ path: 'tests/fixtures/product.json' });
        });

        // Act: Visit the home page.
        await homePage.visit();

        // Assert: Verify product cards are shown from our fixture.
        await expect(homePage.productCards).toHaveCount(2);

        // Act: Click the first product.
        await homePage.clickFirstProduct();

        // Assert: Verify the URL and that the product details are visible.
        await expect(page).toHaveURL(/product\.html\?id=1/);
        await expect(productPage.title).toContainText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
        await expect(productPage.price).toBeVisible();
        await expect(productPage.description).toBeVisible();
    });

    test('should display an error message if the products API call fails', async ({ page }) => {
        // Arrange: Instantiate Page Object
        const homePage = new HomePage(page);

        // Arrange: Intercept the API call and force it to fail.
        await page.route('**/products', route => {
            route.abort();
        });

        // Act: Visit the home page.
        await homePage.visit();

        // Assert: Verify the error message is shown.
        const mainContent = page.locator('main#product-list');
        await expect(mainContent).toContainText('Failed to load products');
    });

    test('should display a message when no products are returned', async ({ page }) => {
        // Arrange: Instantiate Page Object
        const homePage = new HomePage(page);

        // Arrange: Intercept the API call and return an empty array.
        await page.route('**/products', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: '[]'
            });
        });

        // Act: Visit the home page.
        await homePage.visit();

        // Assert: Verify the message is shown.
        const mainContent = page.locator('main#product-list');
        await expect(mainContent).toContainText('No products found.');
    });

    test('should load a product page directly and display its details', async ({ page }) => {
        // Arrange: Instantiate Page Object
        const productPage = new ProductPage(page);

        // Arrange: Intercept the API call for a single product.
        await page.route('**/products/1', route => {
            route.fulfill({ path: 'tests/fixtures/product.json' });
        });

        // Act: Visit the product page directly.
        await page.goto('/product.html?id=1');

        // Assert: Verify the details are visible.
        await expect(productPage.title).toContainText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
        await expect(productPage.price).toBeVisible();
        await expect(productPage.description).toBeVisible();
    });
});
