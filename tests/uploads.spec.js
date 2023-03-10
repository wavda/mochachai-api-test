const expect = require('chai').expect;
const { logResponse } = require("../helpers/mocha-report");
const { Register } = require("../suites/register");
const { Uploads } = require("../suites/uploads");
const phone_number = Math.floor(100000000 + Math.random() * 900000000);
const filepath = 'resources/card.jpg';
const register = new Register();
let uploads;
let response;
let user_id;
let access_token;

describe('Test Suite Uploads', () => {
    before(async function () {
        response = await register.getAccessToken(phone_number);
        user_id = response.user_id;
        access_token = response.access_token;
    });

    beforeEach(async function () {
        uploads = new Uploads(access_token);
    });

    it('should upload cover picture on POST /uploads/cover', async() => {
        response = await uploads.uploadCover(filepath);
        expect(response.statusCode).to.be.equal(201);
    });

    it('should upload profile picture on POST /uploads/profile', async() => {
        response = await uploads.uploadProfilePicture(filepath);
        expect(response.statusCode).to.be.equal(201);
        user_picture_id = response.body.data.user_picture.id;
    });

    it('should set default profile picture on POST /uploads/profile/default', async() => {
        response = await uploads.setDefaultProfilePicture(user_picture_id);
        expect(response.statusCode).to.be.equal(201);
    });

    it('should delete profile picture on DELETE /uploads/profile', async()  => {
        response = await uploads.deleteProfilePicture(user_picture_id);
        expect(response.statusCode).to.be.equal(204);
    });

    afterEach(function () {
        logResponse(this, response);
    });

    after(async() => {
        await register.removeAccount(phone_number);
    });
});
