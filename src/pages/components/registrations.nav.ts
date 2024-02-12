import { expect, Locator, Page } from '@playwright/test'
import { GenericPage } from '../genericPage';
import { AutoReleaseRulesPage } from '../registrationsMenuPages/autoReleaseRulesPage';
import { LabHoldsAndVerifiesPage } from '../registrationsMenuPages/labHoldsAndVerifiesPage';
import { RegistrationsPage } from '../registrationsMenuPages/registrationsPage';

export class RegistrationsMenu extends GenericPage{
    readonly page: Page;
    readonly menu: Locator;
    readonly registrationsLink: Locator;
    readonly autoReleaseRulesLink: Locator;
    readonly labHoldsAndVerifiesLink: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.menu = page.getByRole('link', { name: 'Registrations' });
        this.registrationsLink = page.getByRole('link', { name: 'Registrations', exact: true });
        this.autoReleaseRulesLink = page.getByRole('link', { name: 'Auto Release Rules' });
        this.labHoldsAndVerifiesLink = page.getByRole('link', { name: 'Lab Holds And Verifies' });
    };

    async navigateTo(navigateToPage: string) {
        await this.menu.click();
        let uipage;
        switch (navigateToPage) {
            case "Registrations":
                await this.registrationsLink.click();
                uipage = new RegistrationsPage(this.page);
                break;
            case "Auto Release Rules":
                await this.autoReleaseRulesLink.click();
                uipage = new AutoReleaseRulesPage(this.page);
                break;
            case "Lab Holds And Verifies":
                await this.labHoldsAndVerifiesLink.click();
                uipage = new LabHoldsAndVerifiesPage(this.page);
                break;
            default:
                throw new Error(`The page ${navigateToPage} does not exist in the Registrations menu`);
        };

        this.pageTitle = uipage.pageTitle;
        await this.pageTitle.waitFor();
        var uiHeading = (await uipage.pageTitle.allTextContents()).toString();
        this.pageTitleText = uipage.pageTitleText;
        expect(uiHeading).toEqual(this.pageTitleText);
    };
};