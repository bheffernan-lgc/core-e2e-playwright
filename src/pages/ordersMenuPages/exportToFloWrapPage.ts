import { GenericPage } from '../genericPage';
import { Page } from '@playwright/test';

export class ExportToFloWrapPage extends GenericPage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pageTitle = this.page.getByRole('heading', { name: 'Export to FloWrap' });
        this.pageTitleText = "Export to FloWrap";
    };

};