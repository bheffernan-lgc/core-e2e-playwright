import { expect, Locator, Page } from '@playwright/test'
import { GenericPage } from '../genericPage';
import { BulkShippingOrdersForDispatchPage } from '../ordersMenuPages/bulkShippingOrdersForDispatchPage';
import { DispatchCenterReassignmentPage } from '../ordersMenuPages/dispatchCenterReassignmentPage';
import { DispatchDashboardPage } from '../ordersMenuPages/dispatchDashboardPage';
import { ExportToFloWrapPage } from '../ordersMenuPages/exportToFloWrapPage';
import { ExportToFulfillmentHubPage } from '../ordersMenuPages/exportToFulfillmentHubPage';
import { ExpressDispatchOrdersPage } from '../ordersMenuPages/expressDispatchOrdersPage';
import { ImportFromFloWrapPage } from '../ordersMenuPages/importFromFloWrapPage';
import { OrdersForShipmentPage } from '../ordersMenuPages/ordersForShipmentPage';
import { OrdersPage } from '../ordersMenuPages/OrdersPage';
import { TestKitReplacementPage } from '../ordersMenuPages/testKitReplacementPage';

export class OrdersMenu extends GenericPage {
    readonly page: Page;
    readonly menu: Locator;
    readonly ordersForShipmentLink: Locator;
    readonly expressDispatchOrdersLink: Locator;
    readonly testKitReplacementLink: Locator;
    readonly ordersLink: Locator;
    readonly bulkShippingOrdersForDispatchLink: Locator;
    readonly dispatchDashboardLink: Locator;
    readonly dispatchCenterReassignmentLink: Locator;
    readonly exportToFlowrapLink: Locator;
    readonly importFromFlowrapLink: Locator;
    readonly exportToFulfillmentHubLink: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.menu = page.getByRole('link', { name: 'Orders ' });
        this.ordersForShipmentLink = page.getByRole('link', { name: 'Orders for shipments' });
        this.expressDispatchOrdersLink = page.getByRole('link', { name: 'Express Dispatch Orders' });
        this.testKitReplacementLink = page.getByRole('link', { name: 'Test Kit Replacement' });
        this.ordersLink = page.getByRole('link', { name: 'Orders', exact: true });
        this.bulkShippingOrdersForDispatchLink = page.getByRole('link', { name: 'Bulk Shipping Orders For Dispatch' });
        this.dispatchDashboardLink = page.getByRole('link', { name: 'Dispatch Dashboard' });
        this.dispatchCenterReassignmentLink = page.getByRole('link', { name: 'Dispatch Center Reassignment' });
        this.exportToFlowrapLink = page.getByRole('link', { name: 'Export To Flowrap' });
        this.importFromFlowrapLink = page.getByRole('link', { name: 'Import From Flowrap' });
        this.exportToFulfillmentHubLink = page.getByRole('link', { name: 'Export to Fulfillment Hub' });
    };

    async navigateTo(navigateToPage: string) {
        await this.menu.waitFor()
        await this.menu.click();
        switch (navigateToPage) {
            case "Orders for shipments":
                await this.ordersForShipmentLink.click();
                var page = new OrdersForShipmentPage(this.page);
                break;
            case "Express Dispatch Orders":
                await this.expressDispatchOrdersLink.click();
                var page = new ExpressDispatchOrdersPage(this.page);
                break;
            case "Test Kit Replacement":
                await this.testKitReplacementLink.click();
                var page = new TestKitReplacementPage(this.page);
                break;
            case "Orders":
                await this.ordersLink.click();
                var page = new OrdersPage(this.page);
                break;
            case "Bulk Shipping Orders For Dispatch":
                await this.bulkShippingOrdersForDispatchLink.click();
                var page = new BulkShippingOrdersForDispatchPage(this.page);
                break;
            case "Dispatch Dashboard":
                await this.dispatchDashboardLink.click();
                var page = new DispatchDashboardPage(this.page);
                break;
            case "Dispatch Center Reassignment":
                await this.dispatchCenterReassignmentLink.click();
                var page = new DispatchCenterReassignmentPage(this.page);
                break;
            case "Export To Flowrap":
                await this.exportToFlowrapLink.click();
                var page = new ExportToFloWrapPage(this.page);
                break;
            case "Import From Flowrap":
                await this.importFromFlowrapLink.click();
                var page = new ImportFromFloWrapPage(this.page);
                break;
            case "Export to Fulfillment Hub":
                await this.exportToFulfillmentHubLink.click();
                var page = new ExportToFulfillmentHubPage(this.page);
                break;
            default:
                throw new Error(`The page ${navigateToPage} does not exist in the Orders menu}`);
        };

        this.pageTitle = page.pageTitle;
        await this.pageTitle.waitFor();
        var uiHeading = (await this.pageTitle.allTextContents()).toString();
        this.pageTitleText = page.pageTitleText;
        expect(uiHeading).toEqual(this.pageTitleText);
    };
};