const express = require('express');
const router = express.Router();
const OtpGen = require('../../auth/otpgen')
const connection = require('../../dbconnection')
const SendOtp  = require('../../emails/sendotp')
/* trainer and learner registration */

router.post('', (req,res) => {
    const d = req.body;
    const date = new Date();
    otp = OtpGen();
    //console.log(d)
    query1 = `INSERT INTO sis_users 
             SET role_id=?, user_name=?, user_email=?, user_dob=?, user_status=?,
             user_create_by=?, user_create_date=?`
    connection.query(query1,[d.role,d.name,d.email,d.dob,'1',d.name,date], (err, result) =>{
        if(!err){
            query2 = `INSERT INTO sis_user_verification
             SET user_email=?, auth_otp=?,
             auth_create_by=?, auth_create_date=?`
            connection.query(query2,[d.email,otp,d.name,date], (err, result) =>{
            if(!err){
                res.send(result);
                SendOtp({'email':d.email,'otp':otp});
            }else{
                res.send('error in query2', err);  
            }
            })    
        }else{
            res.send('error in query1',err);
        }
    })
    // send mail with EMAIL and OTP.
    
})

module.exports = router