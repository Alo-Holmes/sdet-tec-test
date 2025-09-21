import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productStock: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.v-card__title');
    this.productPrice = page.locator('.v-card__subtitle').first();
    this.productStock = page.locator('.v-card__subtitle').last();
  }

  async goto(productId: number) {
    await this.page.goto(`/products/${productId}`);
  }
}
