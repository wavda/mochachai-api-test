const expect = require('chai').expect;
const { logResponse } = require("../helpers/mocha-report");
const { Register } = require('../suites/register');
const phone_number = Math.floor(100000000 + Math.random() * 900000000);
const register = new Register();
let user_id;
let response;

describe('Test Suite - Register', () => {
    it('should create new account on POST /register', async() => {
        response = await register.registerNewAccount(phone_number);
        expect(response.statusCode).to.be.equal(201);
        expect(response.body.data.user.phone).to.have.string(phone_number);
        user_id = response.body.data.user.id;
    });
    
    it('should create OTP request on POST /register/otp/request', async() => {
        response = await register.otpRequest(phone_number);
        expect(response.statusCode).to.be.equal(201);
    });

    it('should verify OTP on POST /register/otp/match', async() => {
        response = await register.matchOtp(user_id);
        expect(response.statusCode).to.be.equal(201);
    });

    it('should remove account on POST /register/remove', async() => {
        response = await register.removeAccount(phone_number);
        expect(response.statusCode).to.be.equal(201);
    });

    afterEach(function () {
        logResponse(this, response);
    });
});
