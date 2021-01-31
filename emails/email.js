const nodemailer = require('nodemailer');

// create a transporter 465,587
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        type: 'login',
        user: 'dgaanesh3@gmail.com',
        pass: 'ganesh369'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// options
function Options(tomail,subject,message){
    const options = {
        from: 'sis learning portal',
        to: tomail,
        subject: subject,
        text: message,
    }
    send(options)
}
module.exports = Options;

// send email

send = (o) => {
    transport.sendMail(o, (err, info)=>{
        if(err){
            console.log('ERROR',err);
        }else{
            console.log('email sent');
            console.log('INFORMATION', info);
        }
    
    })
}