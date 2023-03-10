const { Request } = require('../helpers/request');

class Message {
    constructor(access_token) {
        this.request = new Request(access_token);
    }

    async getMessage(user_id) {
        return await this.request.getRequest('/message/' + user_id);
    }

    async sendMessage(user_id) {
        let payload = {
            user_id: user_id,
            message: 'Hello'
        };

        return await this.request.postRequest('/message/send', payload);
    }
}

module.exports = { Message };
