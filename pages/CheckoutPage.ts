import { Page } from 'playwright';
import CartPage from './CartPage';
import { credentials, Credentials } from '../interface/credentials';

class CheckoutPage {
    private page : Page;

    constructor(page : Page) {
        this.page = page;
    }

    async openLoginPage() {        
        await this.page.goto('https://www.saucedemo.com/');
        await this.page.waitForLoadState('networkidle');
    }

    async logAllUsers(credentials: Credentials) {        
        await this.page.fill('#user-name', credentials.username);
        await this.page.fill('#password', credentials.password);
        await this.page.click('#login-button');
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
    }

    async logSpecificUser(username : string, password : string) {
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
        await this.page.click('#login-button');
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
    }

    async addArticles() {
        const locatorsMap = new Map<string, string>([
            ['element1', '#add-to-cart-sauce-labs-backpack'],
            ['element2', '#add-to-cart-sauce-labs-bike-light'],
            ['element3', '#add-to-cart-sauce-labs-bolt-t-shirt'],
            ['element4', '#add-to-cart-sauce-labs-fleece-jacket'],
            ['element5', '#add-to-cart-sauce-labs-onesie'],
            ['element6', '#add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)'],
          ]);
    
        // Iterate through the map and click on each element
        for (const [elementName, locator] of locatorsMap) {
            const element = await this.page.locator(locator).first().click();            
        }
    }

    async redirectToCart() {
        await this.page.locator('#shopping_cart_container > a').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async redirectToCheckout() {
        await this.page.locator('#checkout').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async confirmPayment() {
        await this.page.locator('#continue').click();
        const text = await this.page.$eval('#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3', (element) => element.textContent);
        const containsError = text !== null && text.includes('Error');

        return containsError;
    }
}

export default CheckoutPage;