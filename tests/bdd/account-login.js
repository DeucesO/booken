'use strict';

require('../../server');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

const Browser = require('zombie');

Browser.localhost('*.kabi.co', 3000);

describe('User visits Login page', function () {
    
    const browser = new Browser();
    
    before(function () {
        browser.visit('/account/register')
            .fill('username', 'test-login')
            .fill('password', 'test123');
        browser.pressButton('register');
        return browser.visit('/account/login');
    })
    
    describe('submits form', function () {
        
        before(function () {
            browser
                .fill('username', 'test-login')
                .fill('password', 'test123')
            return browser.pressButton('login');
        })
        
        it('should be successful', function () {
            browser.assert.success();
        })
        
        it('should redirect to homepage', function () {
            browser.assert.text('title', 'Booken');
        })
    })
})