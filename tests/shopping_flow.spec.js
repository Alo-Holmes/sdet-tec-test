const { test, expect } = require('@playwright/test');

test.describe('Shopping Flow', () => {
    test('should load the home page, navigate to a product, and see details', async ({ page }) => {
        // 1. Visit the home page
        await page.goto('http://localhost:8080/index.html');

        // 2. Verify that a list of products is displayed
        // We'll wait for the element to be visible, which implies the API call has completed
        await expect(page.locator('.product-card').first()).toBeVisible({ timeout: 10000 });
        const productCards = await page.locator('.product-card').count();
        expect(productCards).toBeGreaterThan(0);

        // 3. Click on the first product
        await page.locator('.product-card').first().click();

        // 4. Verify that the user is taken to the product.html page
        await expect(page).toHaveURL(/product\.html\?id=\d+/);

        // 5. Verify that the product details are displayed
        await expect(page.locator('#product-detail .info h1')).not.toBeEmpty();
        await expect(page.locator('#product-detail .info .price')).not.toBeEmpty();
        await expect(page.locator('#product-detail .info .description')).not.toBeEmpty();
    });
});
