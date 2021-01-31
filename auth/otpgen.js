const cryptoRandomString = require('crypto-random-string');


function OtpGen() {
    otp = cryptoRandomString({length: 5, type: 'alphanumeric'});
    return otp;
}

module.exports = OtpGen;
