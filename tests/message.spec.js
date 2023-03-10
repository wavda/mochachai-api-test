const expect = require('chai').expect;
const { logResponse } = require("../helpers/mocha-report");
const { Register } = require("../suites/register");
const { Message } = require("../suites/message");
const phone_number = Math.floor(100000000 + Math.random() * 900000000);
const register = new Register();
let message;
let response;
let user_id;
let access_token;

describe('Test Suite - Message', () => {
    before(async function () {
        response = await register.getAccessToken(phone_number);
        user_id = response.user_id;
        access_token = response.access_token;
    });

    beforeEach(async function () {
        message = new Message(access_token);
    });

    it('should create new message on POST /message/send', async () => {
        response = await message.sendMessage(user_id);
        expect(response.statusCode).to.be.equal(201);
    });
    
    it('should return message detail on GET /message/{user_id}', async () => {
        response = await message.getMessage(user_id);
        expect(response.statusCode).to.be.equal(200);
    });

    afterEach(function () {
        logResponse(this, response);
    });

    after(async function () {
        await register.removeAccount(phone_number);
    });
});
