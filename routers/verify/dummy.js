const express = require('express');
const router = express.Router();
const connection = require('../../dbconnection')
const _ = require('underscore');
const app = require('express');

router.post('', (req,res) => {
    const date = new Date();
    const d = req.body;
    //console.log(d)
    query=`SELECT user_email, auth_otp, auth_status, auth_count FROM sis_user_verification 
            WHERE user_email=?`
    connection.query(query,[d.username,d.otp],(err,result)=>{  
        if(!err){
            if(_.isEmpty(result) === true){
               res.send('email not exist')
               console.log(result)
            }else{
                otpcompr = otpcompare(d.otp,result[0].auth_otp);
                console.log(otpcompr)
                if(otpcompr){
                    res.send('1')
                    querys=`UPDATE sis_user_verification SET auth_status=?`
                        connection.query(querys,[1], (err,result)=>{
                            if(!err){
                                console.log('status updated')
                                queryl = `INSERT INTO sis_login 
                                          SET user_name=?, user_password=?, user_status=?,user_create_by=?, user_create_date=?`
                                          connection.query(queryl,[d.username,'123456','1','admin',date], (err,result)=>{
                                            if(!err){
                                                console.log('record enter into the login table')
                                            }else{
                                                console.log('record not inserted into login table', err.code)
                                            }
                                          })   
                            }else{
                                console.log('error at status',err)
                            }
                        })
                }else{
                    count = result[0].auth_count
                    if(count >= 3){
                        res.send('limit e')
                    }else{
                        inccount = count+1
                        queryu=`UPDATE sis_user_verification SET auth_status=?, auth_count=?`
                        connection.query(queryu,['0', inccount], (err,result)=>{
                            if(!err){
                                console.log('count incremented')
                            }else{
                                console.log('error at count',err)
                            }
                        })
                        res.send('not verified')
                        console.log(inccount)
                    }
                }
            }
        }else{
            console.log(err)
        }
    })      
})
function otpcompare(a, b) {
    if(a == b){
        return true;
    }else{
        return false;
    }
}

module.exports = router