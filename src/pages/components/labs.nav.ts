import { expect, Locator, Page } from '@playwright/test'
import { GenericPage } from '../genericPage';
import { LabsPage } from '../labsMenuPages/labsPage';
import { MessagesPage } from '../labsMenuPages/messagesPage';

export class LabsMenu extends GenericPage {
    readonly page: Page;
    readonly menu: Locator;
    labsLink: Locator;
    messagesLink: Locator;
    narrativesLink: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.menu = page.getByRole('link', { name: 'Labs' });
        this.labsLink = page.getByRole('link', { name: 'Labs', exact: true });
        this.messagesLink = page.getByRole('link', { name: 'Messages' });
        this.narrativesLink = page.getByRole('link', { name: 'Narratives' });

    };

    async navigateTo(navigateToPage: string) {
        await this.menu.click();
        switch (navigateToPage) {
            case "Labs":
                await this.labsLink.click();
                var page = new LabsPage(this.page!);
                break;
            case "Messages":
                await this.messagesLink.click();
                var page = new MessagesPage(this.page!);
                break;
            case "Narratives":
                await this.narrativesLink.click();
                return; // narratives page has no page heading
            default:
                throw new Error(`The page ${navigateToPage} does not exist in the Labs menu`);
        };

        this.pageTitle = page.pageTitle;
        await this.pageTitle.waitFor();
        var uiHeading = (await this.pageTitle.allTextContents()).toString();
        this.pageTitleText = page.pageTitleText;
        expect(uiHeading).toEqual(this.pageTitleText);
    };
};