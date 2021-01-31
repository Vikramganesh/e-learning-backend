const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sis_eduportaldb',
    multipleStatements:true
})

module.exports = connection

/* 

connect--> object name this can be imported by another module.
connection means connection object.

*/