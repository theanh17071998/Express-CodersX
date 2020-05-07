// const md5 = require('md5')
const bcrypt = require('bcrypt')
const sgMail = require('@sendgrid/mail');
const shortid = require('shortid');
const cloudinary = require('cloudinary').v2;

const User = require('../models/user.model')

module.exports.login = (req, res, next) => {
    res.render('auth/login')
}
module.exports.postLogin =  async (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   const user = await User.findOne({email: email})
       if(!user){
        return  res.render('auth/login', {
            errors: [
                'User does not exist.'
            ],
            values: req.body
        });
        }
       let count = user.wrongLoginCount;
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
       if(!bcrypt.compareSync(password, user.password)) {
            count = count + 1;
            await User.findOneAndUpdate({wrongLoginCount: count})
            // db.get('users').find(user).assign({wrongLoginCount: count}).write()
            return res.render('auth/login', {
                errors: [
                    'Wrong password.'
                ],
                values: req.body
        });
       } 
        await User.findOneAndUpdate({wrongLoginCount: count*0});
       res.cookie('userId', user._id, {
           signed: true
       })
       res.redirect('/transactions')
   }
   


module.exports.signUp = (req, res, next) => {
    res.render('auth/signup');
}
module.exports.postSignUp = async (req, res, next) => {
    console.log(req.signedCookies.sessionId);
    req.body.id = req.signedCookies.sessionId;
    req.body.isAdmin = false;
    req.body.avatar = cloudinary.image("http://res.cloudinary.com/nguyentheanh/image/upload/v1588119828/TA_Books/qjyhr2twdmdlvtznfxb5.png")
    .split("'")[1];
    req.body.wrongLoginCount =  0;
    var salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    req.body.cart = {length: 0};
    await User.create(req.body)
    res.redirect('/auth/login')
}