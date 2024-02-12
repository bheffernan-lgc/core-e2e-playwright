import { GenericPage } from '../genericPage';
import { Page } from '@playwright/test';

export class AttachInboundLabelPage extends GenericPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitleText = "Attach Inbound shipping to kit"
  };

};
