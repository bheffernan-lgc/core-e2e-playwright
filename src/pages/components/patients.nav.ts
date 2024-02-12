import { expect, Locator, Page } from '@playwright/test'
import { GenericPage } from '../genericPage';
import { PatientsPage } from '../patientsMenuPages/patientsPage';

export class PatientsMenu extends GenericPage {
    readonly page: Page;
    readonly menu: Locator;
    readonly patientsLink: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.menu = page.getByRole('link', { name: 'Patients' });
        this.patientsLink = page.getByRole('link', { name: 'Patients', exact: true });
    }

    async navigateTo(navigateToPage: string) {
        await this.menu.click();
        switch (navigateToPage) {
            case "Patients":
                await this.patientsLink.click();
                var page = new PatientsPage(this.page);
                break;
            default:
                throw new Error(`The page ${navigateToPage} does not exist in the Patients menu`);
        };

        this.pageTitle = page.pageTitle;
        await this.pageTitle.waitFor();
        var uiHeading = (await page.pageTitle.allTextContents()).toString();
        this.pageTitleText = page.pageTitleText;
        expect(uiHeading).toEqual(this.pageTitleText);
    };
};
