const tokenService = require('../services/token');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let token = tokenService.getJwtToken(context);        
    context.res = {
        status: 200,
        body: token
    };
};