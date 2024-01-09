import assert from 'assert';
import { test } from '@playwright/test';
import CartPage from '../CartPage';
import { credentials, Credentials } from '../interface/credentials';

// Test Case ID : TC011 - Refer to the documentation
test('Cart Page - Items added in cart', async({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.openLoginPage();
    
    for(const credential of credentials) {
        if(credential.username !== 'locked_out_user') {    
            await cartPage.logAllUsers(credential);
            const homePageItemCount = await cartPage.countArticles();
            await cartPage.redirectToCart();
            const cartItemCount = await cartPage.countCart();
            
            assert.deepEqual(homePageItemCount, cartItemCount, 'Invalid cart items- Problem matching total added/total in cart');
            await cartPage.openLoginPage();
        }
    }
});

// Test Case ID : TC012 - Refer to the documentation
test('Cart Page - Items removed from the cart', async({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.openLoginPage();

    for(const credential of credentials) {
        if(credential.username !== 'locked_out_user') {
            await cartPage.logAllUsers(credential);   
            await cartPage.countArticles();     
            const countAfterRemoval = await cartPage.removeArticles();

            assert.deepEqual(countAfterRemoval, 0, 'Invalid cart items- Unsuccessful removal');
            await cartPage.openLoginPage();
        }
    } 
})