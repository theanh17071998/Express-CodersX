// const md5 = require('md5')
require('dotenv').config();

const bcrypt = require('bcrypt')
const sgMail = require('@sendgrid/mail');

const db = require('../db');

module.exports.login = (req, res, next) => {
    res.render('auth/login')
}
module.exports.postLogin =  (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   const user = db.get('users').find({email: email}).value()
   let count = user.wrongLoginCount;
   console.log(process.env.SENDGRID_API_KEY);
   if(count === 2){
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'nguyenvandinhh1973@gmail.com',
        from: 'nguyentheanh17071998@gmail.com',
        subject: 'Notication from store TA_BOOKS',
        text: 'You have logged in more than 3 times.',
        };
        sgMail.send(msg).then(() => {
            console.log('Message sent')
        }).catch((error) => {
            console.log(error.response.body)
        })
   }
   if(count >= 3){
    return res.render('auth/login', {
        errors: [
            'You have logged in more than 4 times. Your account has been locked.'
        ],
    });
   }
   if(!user){
        count = count + 1;
        db.get('users').find(user).assign({wrongLoginCount: count}).write()
        return  res.render('auth/login', {
            errors: [
                'User does not exist.'
            ],
            values: req.body
        });
     
   }
   if(!bcrypt.compareSync(password, user.password)) {
        count = count + 1;
        db.get('users').find(user).assign({wrongLoginCount: count}).write()
        return res.render('auth/login', {
            errors: [
                'Wrong password.'
            ],
            values: req.body
    });
   } 
   db.get('users').find(user).assign({wrongLoginCount: count*0}).write()
   res.cookie('userId', user.id, {
       signed: true
   })
   res.redirect('/users')
}
