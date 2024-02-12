import { expect, Locator, Page } from '@playwright/test';
import { inject, singleton } from 'tsyringe';

@singleton()
export class GenericPage {
  pageTitle: Locator;
  pageTitleText: string
  accessDeniedMessage: Locator;

  constructor(@inject('page') public page: Page) {
    this.page = page;
    this.pageTitle = this.page.locator('h4 u');
    this.pageTitleText = "Welcome to Core";
    this.accessDeniedMessage = this.page.getByRole('heading', { name: 'Access Denied!' });
  };

  async open(baseUrl: string, path?: string) {
    path = path ?? "?zadkiel=true";
    var url = `${baseUrl}${path}`;
    await this.page.goto(url);
  };

  async IsAccessDeniedMessageDisplayed() {
    try {
      await expect(this.accessDeniedMessage).toBeVisible({ timeout: 2000 })
      return true;
    } catch (e) {
      return false;
    }
  };

};
