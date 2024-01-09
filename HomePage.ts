import { Page, chromium } from 'playwright';
import { credentials, Credentials } from './interface/credentials';

class HomePage {
    private page : Page;    
        
    constructor(page : Page) {        
        this.page = page;
    }

    async openLoginPage() {        
        await this.page.goto("https://www.saucedemo.com/");
        await this.page.waitForLoadState("networkidle");
    }

    async openInventoryPage() {
        await this.page.goto("https://www.saucedemo.com/inventory.html");
        await this.page.waitForLoadState("networkidle");
    }

    async logAllUsers(credentials: Credentials) {        
        await this.page.fill("#user-name", credentials.username);
        await this.page.fill("#password", credentials.password);
        await this.page.click("#login-button");
        await this.page.waitForURL("https://www.saucedemo.com/inventory.html");
    }
    
    async logSpecificUser(username : string, password : string) {
        await this.page.fill("#user-name", username);
        await this.page.fill("#password", password);
        await this.page.click("#login-button");
        await this.page.waitForURL("https://www.saucedemo.com/inventory.html");
    }

    async findDuplicateImageSources(selector: string) {
        // use $$eval when selector returns multiple elements
        const srcAttributes = await this.page.$$eval(selector, (images) => {
            return images.map((img) => (img as HTMLImageElement).src);
        });
        
            // Filter the array to include only entries with count > 1
        const duplicateImageSources = srcAttributes.filter((src, index, array) => array.indexOf(src) !== index);

        return duplicateImageSources;
    }
    
    async compareSources() {
        this.logSpecificUser('visual_user', 'secret_sauce');
        const imgLocator = '#item_4_img_link > img';
        const actualSrc = await this.page.locator(imgLocator).getAttribute('src');
        const srcToCheck = '/static/media/sl-404.168b1cce.jpg';
        
        const isSrcMatched = actualSrc === srcToCheck;

        return isSrcMatched;
    }

    async checkItemHeaders() {        
        const headerTextArray = await this.page.$$('.inventory_item_name');
        const textContentsArray = await Promise.all(headerTextArray.map((element) => element.textContent()));
        const hasDot = textContentsArray.some((text) => text?.includes('.'));

        return hasDot;
    }
    
    async checkItemDescription() {
        const descriptionTextArray = await this.page.$$('.inventory_item_desc');
        const textContentsArray = await Promise.all(descriptionTextArray.map((element) => element.textContent()));
        
        const hasParenthesesAfterDot = textContentsArray.some((text) => {
            const match = /\.\s*([^.\s]+)\s/.exec(text ?? '');
            return match && /\(|\)/.test(match[1]);
        });

        return hasParenthesesAfterDot;
    }

    async validateAboutPage(username : string, password : string) {        
        this.openLoginPage();
        this.logSpecificUser(username, password);    
        await this.page.locator("#react-burger-menu-btn").click();
        await this.page.locator("#about_sidebar_link").click();
        await this.page.waitForLoadState('domcontentloaded');
        const receivedURL = this.page.url();

        return receivedURL;
    }

    async validateLogout(username : string, password : string) {
        this.logSpecificUser(username, password);
        await this.page.locator("#react-burger-menu-btn").click();
        await this.page.locator("#logout_sidebar_link").click();
        await this.page.waitForLoadState('domcontentloaded');
        const receivedURL = this.page.url();

        return receivedURL;
    }
}

export default HomePage;