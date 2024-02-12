import { expect, Locator, Page } from '@playwright/test'
import { AttachInboundLabelPage } from '../dispatchMenuPages/attachInboundLabelPage';
import { BulkCartonConfigurationPage } from '../dispatchMenuPages/bulkCartonConfigurationPage';
import { BulkShippingOrdersPage } from '../dispatchMenuPages/bulkShippingOrdersPage';
import { ClientsPage } from '../dispatchMenuPages/clientsPage';
import { ConsumablesPage } from '../dispatchMenuPages/consumablesPage';
import { DetachInboundLabelPage } from '../dispatchMenuPages/detachInboundLabelPage';
import { DispatchCentersPage } from '../dispatchMenuPages/dispatchCentersPage';
import { DispatchCodesPage } from '../dispatchMenuPages/dispatchCodesPage';
import { FindProductRoutePage } from '../dispatchMenuPages/findProductRoutePage';
import { FindTestkitInLotPage } from '../dispatchMenuPages/findTestkitInLotPage';
import { LotsPage } from '../dispatchMenuPages/lotsPage';
import { ResellersPage } from '../dispatchMenuPages/resellersPage';
import { GenericPage } from '../genericPage';

export class DispatchMenu extends GenericPage {
    readonly page: Page;
    readonly menu: Locator;
    readonly dispatchCentersLink: Locator;
    readonly clientsLink: Locator;
    readonly resellersLink: Locator;
    readonly lotsLink: Locator;
    readonly findTestKitLink: Locator;
    readonly consumablesLink: Locator;
    readonly dispatchCodesLink: Locator;
    readonly findProductRouteLink: Locator;
    readonly attachAnInboundlabelLink: Locator;
    readonly detachAnInboundlabelLink: Locator;
    readonly bulkCartonConfigurationLink: Locator;
    readonly bulkShippingOrdersLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page
        this.menu = page.getByRole('link', { name: 'Dispatch ' });
        this.dispatchCentersLink = page.getByRole('link', { name: 'Dispatch Centers' });
        this.clientsLink = page.getByRole('link', { name: 'Clients' });
        this.resellersLink = page.getByRole('link', { name: 'Resellers' });
        this.lotsLink = page.getByRole('link', { name: 'Lots' });
        this.findTestKitLink = page.getByRole('link', { name: 'Find a test kit' });
        this.consumablesLink = page.getByRole('link', { name: 'Consumables' });
        this.dispatchCodesLink = page.getByRole('link', { name: 'Dispatch Codes' });
        this.findProductRouteLink = page.getByRole('link', { name: 'Find a product route' });
        this.attachAnInboundlabelLink = page.getByRole('link', { name: 'Attach an Inbound label' });
        this.detachAnInboundlabelLink = page.getByRole('link', { name: 'Detach an Inbound label' });
        this.bulkCartonConfigurationLink = page.getByRole('link', { name: 'Bulk Carton Configuration' });
        this.bulkShippingOrdersLink = page.getByRole('link', { name: 'Bulk Shipping Orders' });
    };

    async navigateTo(navigateToPage: string) {
        await this.menu.click();
        switch (navigateToPage) {
            case "Dispatch Centers":
                await this.dispatchCentersLink.click();
                var page = new DispatchCentersPage(this.page!);
                break;
            case "Clients":
                await this.clientsLink.click();
                var page = new ClientsPage(this.page);
                break;
            case "Resellers":
                await this.resellersLink.click();
                var page = new ResellersPage(this.page);
                break;
            case "Lots":
                await this.lotsLink.click();
                var page = new LotsPage(this.page);
                break;
            case "Find a test kit":
                await this.findTestKitLink.click();
                var page = new FindTestkitInLotPage(this.page);
                break;
            case "Consumables":
                var page = new ConsumablesPage(this.page);
                await this.consumablesLink.click();
                break;
            case "Dispatch Codes":
                var page = new DispatchCodesPage(this.page);
                await this.dispatchCodesLink.click();
                break;
            case "Find a product route":
                var page = new FindProductRoutePage(this.page);
                await this.findProductRouteLink.click();
                break;
            case "Attach an Inbound label":
                var page = new AttachInboundLabelPage(this.page);
                await this.attachAnInboundlabelLink.click();
                break;
            case "Detach an Inbound label":
                var page = new DetachInboundLabelPage(this.page);
                await this.detachAnInboundlabelLink.click();
                break;
            case "Bulk Carton Configuration":
                await this.bulkCartonConfigurationLink.click();
                var page = new BulkCartonConfigurationPage(this.page);
                break;
            case "Bulk Shipping Orders":
                var page = new BulkShippingOrdersPage(this.page);
                await this.bulkShippingOrdersLink.click();
                break;
            default:
                throw new Error(`The page ${navigateToPage} does not exist in the Dispatch menu`);
        };

        this.pageTitle = page.pageTitle;
        await this.pageTitle.waitFor();
        var uiHeading = (await page.pageTitle.allTextContents()).toString();
        this.pageTitleText = page.pageTitleText;
        expect(uiHeading).toEqual(this.pageTitleText);
    };
};