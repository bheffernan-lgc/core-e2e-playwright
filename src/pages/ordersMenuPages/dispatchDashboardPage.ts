import { GenericPage } from '../genericPage';
import { Page } from '@playwright/test';

export class DispatchDashboardPage extends GenericPage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pageTitle = this.page.locator('h4');
        this.pageTitleText = "Dispatch Dashboard";
    };

};