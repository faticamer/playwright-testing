import assert from 'assert';
import { test } from '@playwright/test';
import CheckoutPage from '../CheckoutPage';
import { credentials, Credentials } from '../interface/credentials';

// Test Case ID : TC013 - Refer to the documentation
test('Checkout Page - Sending empty information', async({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.openLoginPage();

    for(const credential of credentials) {
        if((credential.username !== 'locked_out_user') &&         
        (credential.username !== 'performance_glitch_user')) {
            if(credential.username === 'error_user' || credential.username === 'visual_user' || credential.username !== 'problem_user') {
                await checkoutPage.logAllUsers(credential);
                await checkoutPage.redirectToCart();
                await checkoutPage.redirectToCheckout();
                const flag = await checkoutPage.confirmPayment();

                assert.deepEqual(flag, true, 'Error preventing checkout');
                await checkoutPage.openLoginPage();
            } else {
                await checkoutPage.logAllUsers(credential);
                await checkoutPage.addArticles();
                await checkoutPage.redirectToCart();
                await checkoutPage.redirectToCheckout();
                const flag = await checkoutPage.confirmPayment();

                assert.deepEqual(flag, true, 'Error preventing checkout');
                await checkoutPage.openLoginPage();
            }            
        }
    }
})