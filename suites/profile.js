const { Request } = require('../helpers/request');
let payload;

class Profile {
    constructor(access_token) {
        this.request = new Request(access_token);
    }

    async updateCareer() {
        payload = {
            position: 'QA Engineer',
            company_name: 'Test123',
            starting_from: '2022-01-01',
            ending_in: '2027-01-01'
        };
        
        return await this.request.postRequest('/profile/career', payload);
    }

    async updateEducation() {
        payload = {
            school_name: 'QA School',
            graduation_time: '2022-01-01'
        };

        return await this.request.postRequest('/profile/education', payload);
    }

    async updateProfile() {
        payload = {
            name: 'Rihanna',
            gender: 1,
            birthday: '1990-01-01',
            hometown: 'NYC',
            bio: 'Hello World'
        };

        return await this.request.postRequest('/profile', payload); 
    }

    async getProfileDetails() {
        return await this.request.getRequest('/profile/me');
    }
}

module.exports = { Profile };
