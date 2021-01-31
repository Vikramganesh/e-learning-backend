const Options = require('./email');
const fs = require('fs');
const Hogan = require('hogan.js')



// send OTP
function Senduspsw(e) {
    console.log('sendunpsw', e)
    msg = `Successfully verified your email please login using username ${e} and password ${123456}`
    Options(e,'Email Verification success',msg)
}
module.exports = Senduspsw;