import { GenericPage } from '../genericPage';
import { Page } from '@playwright/test';

export class TestKitReplacementPage extends GenericPage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pageTitleText = "Test Kit Replacement"
    };

};