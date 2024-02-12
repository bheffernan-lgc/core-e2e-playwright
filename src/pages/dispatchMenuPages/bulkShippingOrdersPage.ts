import { GenericPage } from '../genericPage';
import { Page } from '@playwright/test';

export class BulkShippingOrdersPage extends GenericPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitleText = "Bulk Shipping Orders"
  };

};
