'use strict';

require('../../server');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

var wd = require('wd');

chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var browser = wd.promiseChainRemote();

describe('Login', function () {
    // Sometimes default timeout is too quick for webdriver starting up
    this.timeout(6000);
    
    before(function () {
        return browser.init({browserName:'safari'});
    });
    
    beforeEach(function () {
        return browser.get('http://localhost:3000/');
    });
    
    after(function () {
        return browser.quit();
    });
    
    it('displays options to login', function () {
        return browser.elementsByCssSelector('#login-option')
            .should.eventually.have.length.above(0);
    })
})