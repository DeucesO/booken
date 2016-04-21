'use strict';

require('../../server');

var Account = require('../../app/models/account');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const Browser = require('zombie');

Browser.localhost('booken.kabi.co', 3000);

describe('User visits Register page', function () {
    
    const browser = new Browser();
    
    before(function () {
        return browser.visit('/account/register');
    })
    
    describe('submits form', function () {
        
        before(function () {
            browser
                .fill('username', 'test-register')
                .fill('password', 'test123');
            return browser.pressButton('register');
        })
        
        after(function () {
            return Account.remove({ username: 'test-register' });
        })
        
        it('should be successful', function () {
            browser.assert.success();
        })
        
        it('should redirect to homepage', function () {
            browser.assert.text('title', 'Booken');
        })
        
        it('should create an account in db', function() {
            Account.find({ username: 'test-register' }).should.eventually.have.length(1);
        })
    })
})