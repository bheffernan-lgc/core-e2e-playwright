import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.submitButton = page.getByRole('button', { name: 'Sign in' });
        this.errorMessage = page.locator(".alert-danger");
    };

    async login(username: string, password: string) {
        await this.usernameInput.type(username);
        await this.passwordInput.type(password);
        await this.submitButton.click();
    };

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText(
            "The username and/or password is incorrect. After five attempts the system will lock you out and you must contact HelpDesk.");
    };
};