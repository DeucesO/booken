var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.should();

describe('Login Index route', function() {
    it('calls the render function', function() {
        var login = require('../../app/routes/login/login.controller');
        var response = {};
        response.render = sinon.stub();
        login.index({}, response);
        
        response.render.should.have.been.calledOnce;
    })
})