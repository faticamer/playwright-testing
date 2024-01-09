import assert from 'assert';
import { test } from "@playwright/test";
import HomePage from "../HomePage";
import { credentials, Credentials } from '../interface/credentials';

// Test Case ID : TC005 - Refer to the documentation
test("Home Page Test - Card images", async({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openLoginPage();

    for (const credential of credentials) {
        await homePage.logAllUsers(credential);
        const count = await homePage.findDuplicateImageSources(".inventory_item_img");                   
        assert(count.length == 1, "Found cards with the same source");

        // Navigate back to the login page for the next user    
        await homePage.openLoginPage();
    }
})

// Test Case ID : TC006 - Refer to the documentation
test("Home Page Test - visual_user Cards", async({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openLoginPage();

    const isMatching = await homePage.compareSources();
    assert.strictEqual(isMatching, false, 'Invalid card image');
});

// Test Case ID : TC007 - Refer to the documentation
test("Home Page Test - Item Names Validity", async({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openLoginPage();    

    for (const credential of credentials) {

        // This test would fail since it wouldn't be able to reach inventory 
        // because of locked_out_user's account, therefore we need to bypass it
        // to check other accounts
        if(credential.username !== 'locked_out_user') {    
            await homePage.logAllUsers(credential);                          
            
            const isValid = await homePage.checkItemHeaders();

            assert.strictEqual(isValid, false, 'Invalid Item Header');

            // Navigate back to the login page for the next user 
            await homePage.openLoginPage();
        }
    }
})

// Test Case ID : TC008 - Refer to the documentation
test("Home Page Test - Item Description Validity", async({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openLoginPage();    

    for (const credential of credentials) {

        // This test would fail since it wouldn't be able to reach inventory 
        // because of locked_out_user's account, therefore we need to bypass it
        // to check other accounts
        if(credential.username !== 'locked_out_user') {    
            await homePage.logAllUsers(credential);                          
            
            const isValid = await homePage.checkItemDescription();            

            assert.strictEqual(isValid, false, 'Invalid Item Description');

            // Navigate back to the login page for the next user    
            await homePage.openLoginPage();
        }
    }
})

// Test Case : TC009 - Refer to the documentation
test("Home Page Test - Validate About Redirection", async ({ page }) => {
    const homePage = new HomePage(page);
    const expectedURL = "https://saucelabs.com/";

    for(const credential of credentials) {
        if(credential.username !== "locked_out_user") {
            const receivedURL = await homePage.validateAboutPage(credential.username, credential.password);
            assert.deepEqual(receivedURL, expectedURL, "About page redirection failed.");
        }
    }
});

// Test Case : TC010 - Refer to the documentation
test("Home Page Test - Validate Logout", async({ page }) => {
    const homePage = new HomePage(page);
    const expectedURL = "https://www.saucedemo.com/";
    await homePage.openLoginPage();

    for(const credential of credentials) {
        if(credential.username !== "locked_out_user") {
            const receivedURL = await homePage.validateLogout(credential.username, credential.password);
            assert.deepEqual(receivedURL, expectedURL, "Lougout page redirection failed.");
        }
    }
})