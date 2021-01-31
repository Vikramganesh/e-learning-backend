const Options = require('./email');
const fs = require('fs');
const Hogan = require('hogan.js')



// send OTP
function SendOtp(e) {
    console.log('sendotp', e.email)
    console.log('otp', e.otp)
    msg = `sample sis learning portal mail-your username ${e.email} and OTP ${e.otp}
            link: http://localhost:8100/verify`
    Options(e.email,'Registration success',msg)
}
module.exports = SendOtp;