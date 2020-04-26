// const md5 = require('md5')
const bcrypt = require('bcrypt')

const db = require('../db');

module.exports.login = (req, res, next) => {
    res.render('auth/login')
}
module.exports.postLogin =  (req, res, next) => {
   const email = req.body.email;
   const password = req.body.password;
   const user = db.get('users').find({email: email}).value()
   let count = user.wrongLoginCount;
   console.log(count)

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
    
   res.cookie('userId', user.id)
   res.redirect('/users')
}
