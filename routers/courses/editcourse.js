const express = require('express');
const router = express.Router();
const connection = require('../../dbconnection')
const _ = require('underscore');
router.post('',(req,res)=>{
    data = req.body;
    console.log(data)       
})

module.exports = router