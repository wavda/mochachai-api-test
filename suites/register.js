const { Request } = require('../helpers/request');
let payload;

class Register {
    constructor() {
        this.request = new Request();
    }

    async registerNewAccount(phone_number) {
        payload = {
            phone: phone_number,
            password: '123',
            country:'1',
            latlong: '1',
            device_token: '1',
            device_type: '1'
        };
        
        return await this.request.postRequest('/register', payload);
    }

    async otpRequest(phone_number) {
        payload = {
            phone: phone_number
        };

        return await this.request.postRequest('/register/otp/request', payload);
    }

    async matchOtp(user_id) {
        payload = {
            user_id: user_id,
            otp_code: 1
        };

        return await this.request.postRequest('/register/otp/match', payload); 
    }

    async removeAccount(phone_number) {
        payload = {
            phone: phone_number
        };

        return await this.request.postRequest('/register/remove', payload);
    }

    async getAccessToken(phone_number) {
        let response = await this.registerNewAccount(phone_number);
        const user_id = response.body.data.user.id;

        response = await this.matchOtp(user_id);
        const access_token = response.body.data.user.access_token;

        return {
            user_id: user_id,
            access_token: access_token
        };
    }
}

module.exports = { Register };
