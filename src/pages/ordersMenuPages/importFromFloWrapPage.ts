import { GenericPage } from '../genericPage';
import { Page } from '@playwright/test';

export class ImportFromFloWrapPage extends GenericPage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pageTitle = this.page.getByRole('heading', { name: 'Import from FloWrap' });
        this.pageTitleText = "Import from FloWrap";
    };

};