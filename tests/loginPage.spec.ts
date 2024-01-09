import assert from 'assert';
import { test } from '@playwright/test';
import LoginPage from '../LoginPage';
import { credentials, Credentials } from '../interface/credentials';

// Test Case ID : TC001 - Refer to the documentation
test('Login Page Test - Send Empty fields', async({ page }) => {    
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    const flag = await loginPage.sendEmptyFields();

    assert.deepEqual(flag, true, "Error blocking the login");
});

// Test Case ID : TC002 - Refer to the documentation
test("Login Page - Send faulty password", async({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    const locatorsMap = new Map<string, string>([
        ['element1', 'standard_user'],
        ['element2', 'locked_out_user'],
        ['element3', 'problem_user'],
        ['element4', 'performance_glitch_user'],
        ['element5', 'error_user'],
        ['element6', 'visual_user'],
    ]);

    for (const [elementName, locator] of locatorsMap) {
        await loginPage.enterCredentials(locator, 'password12345');
        await loginPage.pressLoginWithoutNavigation();
        const indicator = await loginPage.waitForError();

        assert.deepEqual(indicator, true, 'Did not prevent logging in');
    }
})

// Test Case ID : TC003 - Refer to the documentation
test('Login Page - Send faulty username', async({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    const locatorsMap = new Map<string, string>([
        ['element1', 'user1'],
        ['element2', 'user2'],
        ['element3', 'user3'],
        ['element4', 'user4'],
        ['element5', 'user5'],
        ['element6', 'user6'],
    ]);

    for (const [elementName, locator] of locatorsMap) {
        await loginPage.enterCredentials(locator, 'secret_sauce');
        await loginPage.pressLoginWithoutNavigation();
        const indicator = await loginPage.waitForError();

        assert.deepEqual(indicator, true, 'Did not prevent logging in');
    }
});

// Test Case ID : TC004 - Refer to the documentation
test("Login Page Test - Send valid credentials", async({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    for(const credential of credentials) {
        await loginPage.enterCredentialsObject(credential);
        await loginPage.pressLoginButton();
        await loginPage.openLoginPage();
    }
})