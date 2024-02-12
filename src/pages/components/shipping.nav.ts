import { expect, Locator, Page } from '@playwright/test'
import { GenericPage } from '../genericPage';
import { OutboundShippingRoutesPage } from '../ShippingMenuPages/outboundShippingRoutesPage';

export class ShippingMenu extends GenericPage {
    readonly page: Page;
    readonly menu: Locator;
    readonly outboundShippingRoutesLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.menu = page.getByRole('link', { name: 'Shipping' });
        this.outboundShippingRoutesLink = page.getByRole('link', { name: 'Outbound Shipping Routes' });
    }

    async navigateTo(navigateToPage: string) {
        await this.menu.click();
        switch (navigateToPage) {
            case "Outbound Shipping Routes":
                await this.outboundShippingRoutesLink.click();
                var page = new OutboundShippingRoutesPage(this.page);
                break;
            default:
                throw new Error(`The page ${navigateToPage} does not exist in the Shipping menu`);
        };

        this.pageTitle = page.pageTitle;
        await this.pageTitle.waitFor();
        var uiHeading = (await page.pageTitle.allTextContents()).toString();
        this.pageTitleText = page.pageTitleText;
        expect(uiHeading).toEqual(this.pageTitleText);
    };
};
