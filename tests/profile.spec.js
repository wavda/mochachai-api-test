const expect = require('chai').expect;
const { logResponse } = require("../helpers/mocha-report");
const { Register } = require("../suites/register");
const { Profile } = require("../suites/profile");
const phone_number = Math.floor(100000000 + Math.random() * 900000000);
const register = new Register();
let profile;
let response;
let user_id;
let access_token;

describe('Test Suite - Profile', () => {
    before(async function () {
        response = await register.getAccessToken(phone_number);
        user_id = response.user_id;
        access_token = response.access_token;
    });

    beforeEach(async function () {
        profile = new Profile(access_token);
    });

    it('should update career details on POST /profile/career', async() => {
        response = await profile.updateCareer();
        expect(response.statusCode).to.be.equal(201);
    });
    
    it('should update education details on POST /profile/education', async() => {
        response = await profile.updateEducation();
        expect(response.statusCode).to.be.equal(201);
    });

        
    it('should update profile details on POST /profile', async() => {
        response = await profile.updateProfile();
        expect(response.statusCode).to.be.equal(201);
    });

    it('should return profile details on GET /profile/me', async() => {
        response = await profile.getProfileDetails();
        expect(response.statusCode).to.be.equal(200);
    });

    afterEach(function () {
        logResponse(this, response);
    });

    after(async function () {
        await register.removeAccount(phone_number);
    });
});
