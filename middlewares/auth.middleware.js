const db = require('../db')

module.exports.requireAuth = (req, res, next) => {
    if(!req.signedCookies.userId){
        return res.redirect('/auth/login') 
    }
    const user = db.get('users').find({id: req.signedCookies.userId}).value()
    if(!user){
        return res.redirect('/auth/login')
    }
    res.locals.user = user;
    next();
}
module.exports.notRequireAuth = (req, res, next) => {
    if(!req.signedCookies.userId){
      next()
    }
    const user = db.get('users').find({id: req.signedCookies.userId}).value()
    if(!user){
       next()
    }
    res.locals.user = user;
    next();
}