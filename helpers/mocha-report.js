const util = require('util');
const addContext = require('mochawesome/addContext');

async function logResponse(currentTest, response) {
    addContext(currentTest, {
        title: 'Response Body',
        value: util.inspect(response.body)
    });
}

module.exports = { logResponse };
