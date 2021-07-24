module.exports = {
    test: function(context){
        return process.env["ExpireTime"];
    },
    getJwtToken: function(context) {
        try {
            let jwt = require('jsonwebtoken');
            let issuedAt = Math.floor(Date.now() / 1000);
            let expireTime = issuedAt + parseInt(process.env["ExpireTime"]);
            let apiKey = process.env["ApiKey"];
            let payload = {
                iat : issuedAt,
                iss : process.env["Issuer"],
                exp : expireTime,
                nbf : issuedAt,
                data: { secretKey : apiKey}
            }

            let hmacKey = process.env["HmacKey"];
            let hmacEncodedKey = Buffer.from(hmacKey, 'base64');
            
            let jwttoken = '"' + jwt.sign(payload, hmacEncodedKey, { algorithm: 'HS512' }) + '"';            
            return jwttoken;
          } catch (error) {
            console.error(error);
            context.res.status(500).send(error);
        }    
    }
}