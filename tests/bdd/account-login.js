'use strict';

var Account = require('../../app/models/account');

const Browser = require('zombie');

Browser.localhost('booken.kabi.co', 3000);

before(function () {
    return Account.register(new Account({ username: 'test-login'}), 'test123', function (err, account) {
        if (err)
        {
            process.stderr(err);
        }
    });
})

describe('User visits Login page', function () {
    const browser = new Browser();
    
    before(function () {
        return browser.visit('/account/login')
    })
    
    describe('submits form', function () {
        
        before(function () {
            browser
                .fill('username', 'test-login')
                .fill('password', 'test123');
            return browser.pressButton('login');
        })
        
        after(function () {
            return Account.remove({ username: 'test-login' });
        })
        
        it('should be successful', function () {
            browser.assert.success();
        })
        
        it('should redirect to homepage', function () {
            browser.assert.text('title', 'Booken');
        })
    })
})