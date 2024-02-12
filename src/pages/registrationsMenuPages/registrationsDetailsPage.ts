import { GenericPage } from '../genericPage';
import { Locator, Page } from '@playwright/test';

export class RegistrationsDetailsPage extends GenericPage {
    readonly page: Page;
    readonly setLabInput: Locator;
    readonly setLabButton: Locator;
    readonly pushLabOrderInput: Locator;
    readonly pushLabOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        //this.pageTitleText = "Registrations";
        this.setLabInput = page.locator("[name='ctl00$ContentPlaceHolder1$ddlRegistrationLaboratory']");
        this.setLabButton = page.getByRole('button', { name: 'Set Lab' });
        this.pushLabOrderInput = page.locator("[name='ctl00$ContentPlaceHolder1$ddlPushLaboratoryOrder']");
        this.pushLabOrderButton = page.getByRole('button', { name: 'Push Laboratory Order' });
    };

    async setLab(lab: string) {
        await this.setLabInput.selectOption(lab);
        await this.setLabButton.click();
    };

    async pushLabOrder(lab: string) {
        await this.pushLabOrderInput.selectOption(lab);
        await this.pushLabOrderButton.click();
        await this.page.waitForTimeout(1000);
    };
};