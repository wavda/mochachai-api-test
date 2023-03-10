const expect = require('chai').expect;
const { logResponse } = require("../helpers/mocha-report");
const { Notification } = require('../suites/notification');
let response;
let notification;

describe('Test Suite - Notification', () => {
    beforeEach(function () {
        notification = new Notification();
    });

    it('should return notification list on POST /notification/{group_id}/{token}', async() => {
        response = await notification.getNotification();
        expect(response.statusCode).to.be.equal(201);
    });

    afterEach(function () {
        logResponse(this, response);
    });
});
