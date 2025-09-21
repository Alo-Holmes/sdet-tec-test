import { Page, Locator } from '@playwright/test';

export class HeaderPage {
  readonly page: Page;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('[data-testid="cart-button"]');
  }

  async getCartCount() {
    return await this.cartButton.textContent();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}
