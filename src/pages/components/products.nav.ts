import { expect, Locator, Page } from '@playwright/test'
import { GenericPage } from '../genericPage';
import { ProductsPage } from '../productsMenuPages/productsPage';
import { TestKitsPage } from '../productsMenuPages/testKitsPage';
import { TestsPage } from '../productsMenuPages/testsPage';

export class ProductsMenu extends GenericPage{
    readonly page: Page;
    readonly menu: Locator;
    readonly productsLink: Locator;
    readonly testKitsLink: Locator;
    readonly testsLink: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.menu = page.getByRole('link', { name: 'Products' });
        this.productsLink = page.getByRole('link', { name: 'Products', exact: true });
        this.testKitsLink = page.getByRole('link', { name: 'Test kits' });
        this.testsLink = page.getByRole('link', { name: 'Tests' });

    }

    async navigateTo(navigateToPage: string) {
        await this.menu.click();
        switch (navigateToPage) {
            case "Products":
                await this.productsLink.click();
                var page = new ProductsPage(this.page);
                break;
            case "Test kits":
                await this.testKitsLink.click();
                var page = new TestKitsPage(this.page);
                break;
            case "Tests":
                await this.testsLink.click();
                var page = new TestsPage(this.page);
                break;
            default:
                throw new Error(`The page ${navigateToPage} does not exist in the Products menu`);
        };

        this.pageTitle = page.pageTitle;
        await this.pageTitle.waitFor();
        var uiHeading = (await page.pageTitle.allTextContents()).toString();
        this.pageTitleText = page.pageTitleText;
        expect(uiHeading).toEqual(this.pageTitleText);
    };
};