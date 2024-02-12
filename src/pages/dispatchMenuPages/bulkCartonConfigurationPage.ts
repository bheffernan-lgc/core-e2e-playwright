import { GenericPage } from '../genericPage';
import { Page } from '@playwright/test';

export class BulkCartonConfigurationPage extends GenericPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitle = page.locator('h4');
    this.pageTitleText = "Bulk Carton Configuration"
  };

};
