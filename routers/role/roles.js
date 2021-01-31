const express = require('express');
const router = express.Router();
const connection = require('../../dbconnection')
const _ = require('underscore');

router.post('',(req,res)=>{
    data = req.body;
    console.log(data);
    const date = new Date();
    query1 = `INSERT INTO sis_roles 
             SET role_name=?,description=?,create_by=?,create_date=?`
    connection.query(query1,[data.rolename, data.roledesc,'admin', date],(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            //res.send(err);
            console.log('error at insert role', err)
        }
    })     
})


router.put('',(req,res)=>{
    data = req.body;
    console.log(data);
    const date = new Date();
    query1 = `UPDATE sis_roles 
              SET role_name=?,description=?, modefy_by=?, modefy_date=?
              WHERE role_id=?`
    connection.query(query1,['admin',date,data.courid],(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            //res.send(err);
            console.log('error at update course', err)
        }
    })     
})

router.get('',(req,res)=>{
    query2 = `SELECT role_id,role_name,description FROM  sis_roles`
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
    query = `SELECT role_id,role_name,description FROM  sis_roles
              WHERE role_id=?`
    connection.query(query, [id] ,(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})
module.exports = router