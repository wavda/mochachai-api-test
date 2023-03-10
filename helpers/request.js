const supertest = require('supertest')(process.env.BASE_URL);
let token;

class Request {
    constructor(access_token) {
        token = access_token;
    }

    async getRequest(endpoint) {
        if(token === undefined) {
            return await supertest
                .get(endpoint)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .then(response => {
                    return response;
                });
        } else {
            return await supertest
                .get(endpoint)
                .set('Authorization', token)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .then(response => {
                    return response;
                });
        }
    }

    async postRequest(endpoint, request_body) {
        if(request_body === undefined) {
            if(token === undefined) {
                return await supertest
                    .post(endpoint)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .then(response => {
                        return response;
                    });
            } else {
                return await supertest
                    .post(endpoint)
                    .set('Authorization', token)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .then(response => {
                        return response;
                    });
            }
        } else {
            if(token === undefined) {
                return await supertest
                    .post(endpoint)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .send(request_body)
                    .then(response => {
                        return response;
                    });
            } else {
                return await supertest
                    .post(endpoint)
                    .set('Authorization', token)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .send(request_body)
                    .then(response => {
                        return response;
                    });
            }
        }
    }

    async postUploadRequest(endpoint, filepath) {
        if(token === undefined) {
            return await supertest
                .post(endpoint)
                .set('Content-Type', 'multipart/form-data')
                .attach('image', filepath, { contentType: 'image/jpeg' })
                .then(response => {
                    return response;
                });
        } else {
            return await supertest
                .post(endpoint)
                .set('Authorization', token)
                .set('Content-Type', 'multipart/form-data')
                .attach('image', filepath, { contentType: 'image/jpeg' })
                .then(response => {
                    return response;
                });
        }
    }
    
    async deleteRequest(endpoint, request_body) {
        if(token === undefined) {
            return await supertest
                .delete(endpoint)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(request_body)
                .then(response => {
                    return response;
                });
        } else {
            return await supertest
                .delete(endpoint)
                .set('Authorization', token)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(request_body)
                .then(response => {
                    return response;
                });
        }
    }    
};

module.exports = { Request };
