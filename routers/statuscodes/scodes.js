const express = require('express');
const router = express.Router();
const connection = require('../../dbconnection')
const _ = require('underscore');

router.post('',(req,res)=>{
    data = req.body;
    console.log(data);
    const date = new Date();
    query = `INSERT INTO sis_status_codes
             SET status_desc=?,create_by=?,create_date=?`
    connection.query(query,[data.codedesc,'admin', date],(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            //res.send(err);
            console.log('error at insert code', err)
        }
    })     
})


router.put('',(req,res)=>{
    data = req.body;
    console.log(data);
    const date = new Date();
    query1 = `UPDATE sis_status_codes 
             SET status_desc=?, modefy_by=?, modefy_date=?
            WHERE status_code=?`
    connection.query(query1,[],(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            //res.send(err);
            console.log('error at update course', err)
        }
    })     
})

router.get('',(req,res)=>{
    query2 = `SELECT status_code,status_desc FROM  sis_status_codes`
    connection.query(query2,(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})

router.get('/:id',(req,res)=>{
    id = req.params.id;
    query = `SELECT status_code,status_desc FROM  sis_status_codes
              WHERE status_code=?`
    connection.query(query, [id] ,(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})
module.exports = router