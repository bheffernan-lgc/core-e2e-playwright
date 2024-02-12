import { ICustomWorld } from '../support/custom-world';
import { Navbar } from '../pages/components/navbar';
import { Given } from '@cucumber/cucumber';


Given('user navigates to the {string} page', 
async function (this: ICustomWorld, page: string) {
    var navBar = new Navbar(this.page!);
    await navBar.navigateTo(page);
});
