import { Page } from 'playwright';
import { credentials, Credentials } from './interface/credentials';

class LoginPage {
    private page : Page;

    constructor(page : Page) {
        this.page = page;
    }

    async openLoginPage() {
        await this.page.goto("https://www.saucedemo.com/");
        await this.page.waitForLoadState("networkidle");
    }

    async enterCredentials(username: string, password: string) {
        // Assuming there are input fields for username and password
        await this.page.fill('#user-name', username);
        await this.page.fill('#password', password);
    }

    async enterCredentialsObject(credentials: Credentials) {
        // Assuming there are input fields for username and password
        await this.page.fill('#user-name', credentials.username);
        await this.page.fill('#password', credentials.password);
    }
    
    async sendEmptyFields() {
        await this.page.fill('#user-name', '');
        await this.page.fill('#password', '');
        await this.pressLoginWithoutNavigation();
        const indicator = await this.page.waitForSelector('h3', { timeout: 5000 });

        return !!indicator;
    }

    async waitForError() {
        const indicator = await this.page.waitForSelector('h3', { timeout: 5000 });
        return !!indicator;
    }

    async checkErrorMessage() {
        this.enterCredentials('', '');
        this.pressLoginWithoutNavigation();

        const errorBox = this.page.locator('h3');
        const errorBoxText = await errorBox.innerText();

        if(errorBoxText.trim() === '')
            return false;
        
        return true;
    }

    async pressLoginButton() {
        await this.page.click('#login-button');
        // Wait for navigation to complete
        await this.page.waitForURL('https://www.saucedemo.com/inventory.html');
    }

    async pressLoginWithoutNavigation() {
        await this.page.click('#login-button');
    }

    async isLoggedIn() {
        // We marked shopping cart SVG in the top left corner on the main page to serve
        // as the indicator that we successfully reached Home page
        const homePageIndicator = await this.page.waitForSelector('.shopping_cart_link', { timeout: 5000 });

        // If the home page indicator is found, it means login was successful
        return !!homePageIndicator;
    }
}

export default LoginPage;