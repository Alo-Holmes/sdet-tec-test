/**
 * Represents the Home Page for Playwright tests.
 * Encapsulates selectors and actions for the product listing page.
 */
class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.productCards = page.locator('.product-card');
    }

    /**
     * Navigates to the home page.
     */
    async visit() {
        await this.page.goto('/index.html');
    }

    /**
     * Clicks on the first product card in the list.
     */
    async clickFirstProduct() {
        await this.productCards.first().click();
    }
}

module.exports = { HomePage };
