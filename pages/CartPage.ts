import { Page } from 'playwright';
import { credentials, Credentials } from '../interface/credentials';

class CartPage {
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

    async redirectToCart() {
        await this.page.locator('#shopping_cart_container > a').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async countArticles() {
        let count = 0;
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
            count++;
          }

        return count;
    }

    async removeArticles() {        
        let count = -1;
        const locatorsMap = new Map<string, string>([
            ['element1', '#remove-sauce-labs-backpack'],
            ['element2', '#remove-sauce-labs-bike-light'],
            ['element3', '#remove-sauce-labs-bolt-t-shirt'],
            ['element4', '#remove-sauce-labs-fleece-jacket'],
            ['element5', '#remove-sauce-labs-onesie'],
            ['element6', '#remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)'],
        ]);

        for(const [elementName, locator] of locatorsMap) {
            const element = await this.page.locator(locator).first().click();            
        }
                
        const parentElementSelector = '#shopping_cart_container > a';        
        const hasChildren = await this.page.$(`${parentElementSelector} > *`) !== null;
        if(!hasChildren)
            count = 0;

        return count;
    }

    async countCart() {        
        const textContent = await this.page.$eval('#shopping_cart_container > a > span', (element) => element.textContent);
        const integerValue = textContent !== null ? parseInt(textContent, 10) : null;
                
        return integerValue;
    }
}

export default CartPage;