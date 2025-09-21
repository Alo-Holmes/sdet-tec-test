/**
 * Represents the Product Detail Page for Playwright tests.
 * Encapsulates selectors and verification methods.
 */
class ProductPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.productDetailContainer = page.locator('#product-detail');
        this.title = this.productDetailContainer.locator('.info h1');
        this.price = this.productDetailContainer.locator('.info .price');
        this.description = this.productDetailContainer.locator('.info .description');
    }
}

module.exports = { ProductPage };
