const express = require('express');
const router = express.Router();
const connection = require('../../dbconnection')
const _ = require('underscore');
router.post('',(req,res)=>{
    data = req.body;
    console.log(data)
    query = `SELECT  role_id FROM sis_login
             WHERE user_name = ? AND user_password = ?`
    connection.query(query,[data.email,data.password],(err,rows)=>{
        if(!err){
            if(_.isEmpty(rows) === true){
                res.send('user-not-exist')
            }else{
                res.send(rows[0])
            }
        }else{
            console.log('Error',err)
        }
    })         
})

module.exports = router