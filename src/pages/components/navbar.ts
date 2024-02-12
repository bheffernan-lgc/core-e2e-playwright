import { Locator, Page } from '@playwright/test'
import { GenericPage } from '../genericPage';
import { DispatchMenu } from './dispatch.nav';
import { LabsMenu } from './labs.nav';
import { OrdersMenu } from './orders.nav';
import { PatientsMenu } from './patients.nav';
import { ProductsMenu } from './products.nav';
import { RegistrationsMenu } from './registrations.nav';
import { ShippingMenu } from './shipping.nav';

export class Navbar extends GenericPage {
    readonly page: Page;
    readonly physiciansLink: Locator;
    readonly areasLink: Locator;

    readonly patientsMenu: string[];
    readonly ordersMenu: string[];
    readonly registrationsMenu: string[];
    readonly productsMenu: string[];
    readonly labsMenu: string[];
    readonly dispatchMenu: string[];
    readonly shippingMenu: string[];

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.physiciansLink = page.getByRole('link', { name: 'Physicians' });
        this.areasLink = page.getByRole('link', { name: 'Areas' });

        this.patientsMenu = ["Patients"];
        this.ordersMenu = ["Orders for shipments", "Express Dispatch Orders", "Test Kit Replacement", "Orders", "Bulk Shipping Orders For Dispatch",
            "Dispatch Dashboard", "Dispatch Center Reassignment", "Export To Flowrap", "Import From Flowrap", "Export to Fulfillment Hub"];
        this.registrationsMenu = ["Registrations", "Auto Release Rules", "Lab Holds And Verifies"];
        this.productsMenu = ["Products", "Test kits", "Tests"];
        this.labsMenu = ["Labs", "Messages", "Narratives"];
        this.dispatchMenu = ["Dispatch Centers", "Clients", "Resellers", "Lots", "Find a test kit", "Consumables", "Dispatch Codes",
            "Find a product route", "Attach an Inbound label", "Detach an Inbound label", "Bulk Carton Configuration", "Bulk Shipping Orders"];
        this.shippingMenu = ["Outbound Shipping Routes"];
    }

    async navigateTo(navigateToPage: string) {
        let menu;
        switch (true) {
            case this.patientsMenu.includes(navigateToPage):
                menu = new PatientsMenu(this.page!);
                break;
            case this.ordersMenu.includes(navigateToPage):
                menu = new OrdersMenu(this.page!);
                break;
            case this.registrationsMenu.includes(navigateToPage):
                menu = new RegistrationsMenu(this.page!);
                break;
            case this.productsMenu.includes(navigateToPage):
                menu = new ProductsMenu(this.page!);
                break;
            case this.labsMenu.includes(navigateToPage):
                menu = new LabsMenu(this.page!);
                break;
            case this.dispatchMenu.includes(navigateToPage):
                menu = new DispatchMenu(this.page!);
                break;
            case this.shippingMenu.includes(navigateToPage):
                menu = new ShippingMenu(this.page!);
                break;
            case navigateToPage === "Physicians":
                await this.physiciansLink.click();
                return;
            case navigateToPage === "Areas":
                await this.areasLink.click();
                return;
            default:
                throw new Error(`The page ${navigateToPage} does not exist in any menu!`);
        };
        if (typeof menu !== 'undefined')
            await menu.navigateTo(navigateToPage)
        else
            throw new Error();
    };
};