import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { config } from '../support/config';
import { Navbar } from '../pages/components/navbar';
import { GenericPage } from '../pages/genericPage';
import userdata from '../support/coreUsers/user-access-control.json';
import { ICustomWorld } from '../support/custom-world';

let coreRestrictedAreas: string[] = [];
let page: GenericPage;

When('{string} navigates to a restricted area',
    async function (this: ICustomWorld, user) {
        const coreUser: keyof typeof userdata = user;
        page = new GenericPage(this.page!);
        const areas = userdata[coreUser].restrictedAreas;
        for (let i = 0; i < areas.length; i++) {
            await page.open(config.baseURL,`${areas[i]}`);
            if (!await page.IsAccessDeniedMessageDisplayed()) {
                coreRestrictedAreas.push(`${areas[i]}`)
            };
        };
    });

Then('user can navigate to all the {string} users pages',
    async function (allowed) {
        const coreUser: keyof typeof userdata = allowed;
        const areas = userdata[coreUser].allowedAreas;
        const navBar = new Navbar(this.page!);
        for (let i = 0; i < areas.length; i++) {
            await navBar.navigateTo(areas[i]);
        };
    });

Then('user is presented with an Access Denied message', async () => {
    expect(coreRestrictedAreas).toHaveLength(0);
});