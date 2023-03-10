const { Request } = require('../helpers/request');
let request;

class Oauth {
    constructor(access_token) {
        this.access_token = access_token;
    }

    async getCredentials() {
        request = new Request();
        return await request.getRequest('/oauth/credentials?access_token=' + this.access_token);
    }

    async signIn(phone_number) {
        request = new Request(this.access_token);
        const payload = {
            phone: phone_number,
            password: '123',
            latlong: '1',
            device_token: '1',
            device_type: '1'
        };

        return await request.postRequest('/oauth/sign_in', payload);
    }

    async revoke(confirm) {
        request = new Request();
        const payload = {
            access_token: this.access_token,
            confirm: confirm
        };

        return await request.postRequest('/oauth/revoke', payload);
    }
}

module.exports = { Oauth };
