'use strict';

require('../../server');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

const Browser = require('zombie');

Browser.localhost('Booken.kabi.co', 3000);

describe('User visits Register page', function () {
    
    const browser = new Browser();
    
    before(function () {
        return browser.visit('/account/register');
    })
    
    describe('submits form', function () {
        
        before(function () {
            browser
                .fill('username', 'test-login')
                .fill('password', 'test123')
            return browser.pressButton('register');
        })
        
        it('should be successful', function () {
            browser.assert.success();
        })
        
        it('should redirect to homepage', function () {
            browser.assert.text('title', 'Booken');
        })
    })
})