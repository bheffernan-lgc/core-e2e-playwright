import { ICustomWorld } from '../support/custom-world';
import { LoginPage } from '../pages/loginPage';
import { Given, When } from '@cucumber/cucumber';
import { GenericPage } from '../pages/genericPage';
import { config } from '../support/config';
import users from '../support/coreUsers/core-users.json';

let page: GenericPage;
let loginPage: LoginPage

Given('user visits Core dashboard',
  async function (this: ICustomWorld) {
    page = new GenericPage(this.page!);
    await page.open(config.baseURL);
  });

When(/^user logs in as "([^"]*)" user$/,
  async function (this: ICustomWorld, user: keyof typeof users): Promise<void> {
    loginPage = new LoginPage(this.page!);
    await loginPage.login(users[user].Username, users[user].Password)
  });
