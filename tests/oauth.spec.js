const expect = require('chai').expect;
const { logResponse } = require("../helpers/mocha-report");
const { Register } = require("../suites/register");
const { Oauth } = require("../suites/oauth");
const phone_number = Math.floor(100000000 + Math.random() * 900000000);
const register = new Register();
let oauth;
let response;
let user_id;
let access_token;

describe('Test Suite - Oauth', () => {
    before(async function () {
        response = await register.getAccessToken(phone_number);
        user_id = response.user_id;
        access_token = response.access_token;
    });

    beforeEach(async function () {
        oauth = new Oauth(access_token);
    });

    it('should return credentials on GET /oauth/credentials', async() => {
        response = await oauth.getCredentials();
        expect(response.statusCode).to.be.equal(200);
    });

    it('should sign user in on POST /oauth/sign_in', async() => {
        response = await oauth.signIn(phone_number);
        expect(response.statusCode).to.be.equal(201);
    });
    
    it('should revoke authentication on POST /oauth/revoke', async() => {
        response = await oauth.revoke(1);
        expect(response.statusCode).to.be.equal(201);
    });

    afterEach(function () {
        logResponse(this, response);
    });

    after(async function () {
        await register.removeAccount(phone_number);
    });
});
