import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.product-card');
  }

  async addFirstProductToCart() {
    await this.productCards.first().locator('[data-testid="add-to-cart-button"]').click();
  }

  async filterByCategory(category: string) {
    await this.page.locator('.v-select > .v-input__control > .v-input__slot').click();
    await this.page.locator('.v-menu__content .v-list-item').filter({ hasText: category }).click();
  }

  async searchForProduct(productName: string) {
    await this.page.locator('[data-testid="search-input"]').fill(productName);
  }
}
