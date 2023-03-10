const { Request } = require('../helpers/request');

class Notification {
    constructor() {
        this.request = new Request();
    }

    async getNotification() {
        return await this.request.postRequest('/notification/1/1');
    }
}

module.exports = { Notification };
