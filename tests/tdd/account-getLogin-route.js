var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.should();

describe('Account getLogin route', function() {
    it('calls the render function', function() {
        var account = require('../../app/routes/account/account.controller');
        var response = {};
        response.render = sinon.stub();
        account.getLogin({}, response);
        
        response.render.should.have.been.calledOnce;
    })
})