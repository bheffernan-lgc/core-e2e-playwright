import { GenericPage } from '../genericPage';
import { Locator, Page } from '@playwright/test';

export class RegistrationsPage extends GenericPage {
    readonly page: Page;
    readonly barcodeInput: Locator;
    readonly searchButton: Locator;
    readonly viewMoreLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pageTitleText = "Registrations";
        this.barcodeInput = page.locator('#ContentPlaceHolder1_txtSearch');
        this.searchButton = page.getByRole('button', { name: 'Search' })
        this.viewMoreLink = page.getByRole('link', { name: 'View more' })
    };

    async seachByBarcode(barcode: string) {
        await this.barcodeInput.type(barcode);
        await this.searchButton.click();
        await this.viewMoreLink.click();
    };
};