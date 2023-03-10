const { Request } = require('../helpers/request');
let payload;

class Uploads {
    constructor(access_token) {
        this.request = new Request(access_token);
    }

    async uploadCover(filepath) {
        return await this.request.postUploadRequest('/uploads/cover', filepath);
    }


    async uploadProfilePicture(filepath) {
        return await this.request.postUploadRequest('/uploads/profile', filepath);
    }

    async setDefaultProfilePicture(user_picture_id) {
        payload = {
            id: user_picture_id
        };

        return await this.request.postRequest('/uploads/profile/default', payload);
    }

    async deleteProfilePicture(user_picture_id) {
        payload = {
            id: user_picture_id
        };

        return await this.request.deleteRequest('/uploads/profile', payload);
    }
}

module.exports = { Uploads };
