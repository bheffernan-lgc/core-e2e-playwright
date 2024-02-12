import { GenericPage } from '../genericPage';
import { Page } from '@playwright/test';

export class DispatchCenterReassignmentPage extends GenericPage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pageTitle = this.page.locator('h3');
        this.pageTitleText = "Dispatch Center Reassignment";
    };

};