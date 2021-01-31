const express = require('express');
const router = express.Router();
const connection = require('../../dbconnection')
const _ = require('underscore');
router.post('',(req,res)=>{
    data = req.body;
    console.log(req.files.image.data);
    console.log(data);
    const date = new Date();
    query1 = `INSERT INTO sis_courses 
             SET category_id=?,course_name=?,course_description=?,course_img_path=?, course_status=?, create_by=?, create_date=?`
    connection.query(query1,[data.c_id, data.c_name, data.des, req.files.image.data , '1', 'admin', date],(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            //res.send(err);
            console.log('error at insert course', err)
        }
    }) 
    // const date = new Date();
    // query1 = `INSERT INTO sis_courses 
    //          SET category_id=?,course_name=?,course_description=?, course_status=?, create_by=?, create_date=?`
    // connection.query(query1,[data.c_id, data.c_name, data.des, '1', 'admin', date],(err,rows)=>{
    //     if(!err){
    //         res.send(rows)
    //     }else{
    //         //res.send(err);
    //         console.log('error at insert course', err)
    //     }
    // })     
})

router.put('',(req,res)=>{
    data = req.body;
    console.log(data);
    const date = new Date();
    query1 = `UPDATE sis_courses 
             SET course_name=?,course_description=?, modefy_by=?, modefy_date=?
            WHERE course_id=?`
    connection.query(query1,[data.courname, data.courdesc, 'admin',date,data.courid],(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            //res.send(err);
            console.log('error at update course', err)
        }
    })     
})

router.get('',(req,res)=>{
    query2 = `SELECT course_id, course_name, course_description, course_img_path FROM  sis_courses`
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
    query = `SELECT course_id, course_name, course_description,course_img_path FROM  sis_courses
              WHERE course_id=?`
    connection.query(query, [id] ,(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})

module.exports = router