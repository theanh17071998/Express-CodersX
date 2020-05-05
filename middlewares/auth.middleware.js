const db = require('../db')
const User = require('../models/user.model')

module.exports.requireAuth = async (req, res, next) => {
    if(!req.signedCookies.userId){
        return res.redirect('/auth/login') 
    }
    const user = await User.findOne({_id: req.signedCookies.userId})
    if(!user){
        return res.redirect('/auth/login')
    }
    res.locals.user = user;
    next();
}
module.exports.notRequireAuth = async (req, res, next) => {
    if(!req.signedCookies.userId){
      next()
    }
    const user = await User.findOne({_id: req.signedCookies.userId})
    if(!user){
       next()
    }
    res.locals.user = user;
    next();
}