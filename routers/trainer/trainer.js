const express = require('express');
const router = express.Router();
const connection = require('../../dbconnection')

router.get('',(req,res)=>{
    query = `SELECT category_id, category_name FROM  sis_categories`
    obj = {}
    connection.query(query,(err,rows)=>{
        if(!err){
            res.send(rows)
            //console.log(rows)
            // for (i=0;i<rows.length;i++){
            //     // console.log(rows[i].category_id)
            //     // console.log(rows[i].category_name)
            //     obj['category_id'] = rows[i].category_id
            //     obj['category_name'] = rows[i].category_name
            //     // console.log({"category_id":rows[i].category_id, "category_name":rows[i].category_name,"courses":[{"course_id":,"course_name":}]})
            // }
            // console.log('OBJECT', obj)
            //res.send({"category_id":rows[i].category_id, "category_name":rows[i].category_name})
        }else{
            res.send(err)
        }
    })
})

router.get('/a',(req,res)=>{
    query = `SELECT sis_categories.category_id, sis_categories.category_name, 
             sis_courses.course_id, sis_courses.course_name
             FROM  sis_categories
             INNER JOIN sis_courses ON sis_categories.category_id = sis_courses.category_id`
    connection.query(query,(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})

router.get('/:id',(req,res)=>{
    id = req.params.id;
    query1 = `SELECT course_id, course_name FROM  sis_courses
              WHERE category_id=?`
    connection.query(query1, [id] ,(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})

module.exports = router