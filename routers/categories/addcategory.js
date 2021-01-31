const express = require('express');
const router = express.Router();
const connection = require('../../dbconnection')
const _ = require('underscore');
const { query } = require('express');
router.post('',(req,res)=>{
    data = req.body;
    console.log('FILE', req.files);
    console.log('DATA', data);
    file = req.files.image;
    path = '/uploads/' +file.name;
    console.log('PATH', path);
    console.log('dir',__dirname);
    file.mv(__dirname + '/uploads/' +file.name,(err,result)=>{
        if(err){
            throw err
        }
    })
    const date = new Date();
    query1 = `INSERT INTO sis_categories 
             SET category_name=?, category_description=?,category_img_path=?, category_status=?, create_by=?, create_date=?`
    connection.query(query1,[data.catename, data.desc,path, '1', 'admin', date],(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            //res.send(err);
            console.log('error at insert category', err)
        }
    })     
})

router.get('',(req,res)=>{
    query2 = `SELECT category_id, category_name, category_description FROM  sis_categories`
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
    query3 = `SELECT category_id, category_name, category_description FROM  sis_categories
              WHERE category_id=?`
    connection.query(query3, [id] ,(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})

router.put('',(req,res)=>{
    data = req.body;
    const date = new Date();
    query3 = `UPDATE sis_categories SET category_name=?, category_description=?, modefy_by=?,modefy_date=?
              WHERE category_id=?`
    connection.query(query3, [data.catename, data.catedesc,'admin',date, data.cateid] ,(err,rows)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})

module.exports = router