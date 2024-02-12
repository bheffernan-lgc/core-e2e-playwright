import { GenericPage } from '../genericPage';
import { Page } from '@playwright/test';

export class DetachInboundLabelPage extends GenericPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitleText = "Detach Inbound Shipping From Kit"
  };

};
