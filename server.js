const  connection  = require('./dbconnection');
const logger = require('./logmessage');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const admin = require('./routers/admin/admin')
const learner = require('./routers/learner/learner')
const trainer = require('./routers/trainer/trainer')
const users = require('./routers/users/users')
const verify = require('./routers/verify/verify');
const addcate = require('./routers/categories/addcategory');
const editcate = require('./routers/categories/editcategory');
const addcourse = require('./routers/courses/addcourse');
const editcourse = require('./routers/courses/editcourse');
const roles = require('./routers/role/roles');
const codes = require('./routers/statuscodes/scodes');
const morgan = require('morgan');
const fileuload = require('express-fileupload');
const fileUpload = require('express-fileupload');
connection.connect((err)=>{
    if(!err){
        //console.log('Connection Success...');
        logger.info('Connection Success...')
       
    }else{
         //console.log('Connection failed \n Error : '+JSON.stringify(err,undefined,2));
         logger.error('Connection failed \n Error : '+JSON.stringify(err,undefined,2));
    }

});

app.use(cors());
app.use(fileUpload({tempFileDir : '/tmp/'}));
app.use(express.json()) // for parsing application/json
app.use('/admin',admin);
app.use('/learner',learner);
app.use('/trainer',trainer);
app.use('/users',users);
app.use('/verify',verify);
app.use('/addcategory',addcate)
app.use('/editcategory',editcate)
app.use('/addcourse',addcourse)
app.use('/editcourse',editcourse)
app.use('/roles',roles)
app.use('/statuscodes',codes)
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.post('/uload',(req,res)=>{
    console.log(req.files);
    console.log('uyu', req.body);
    file = req.files.image;
    res.send(req.files.image)
    console.log(__dirname)
    path = '/uploads/' +file.name;
    console.log('PATH', path);
    file.mv(__dirname + '/uploads/' +file.name,(err,result)=>{
        if(err){
            throw err
        }
    })
})


// app.get('/dload',(req,res)=>{
//     path = '/uploads/express-logo.png'
//     fpath = __dirname + '/uploads/express-logo.png';
//     console.log(fpath);
//     res.send(fpath);
// })


app.listen(3000, () => logger.info(`Server running on port ${3000}`))
