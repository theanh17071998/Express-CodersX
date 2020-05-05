const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    email: String,
    isAdmin: Boolean,
    avatar: String,
    wrongLoginCount: Number,
    cart: Object
})
var User = mongoose.model('User', userSchema, 'users')

module.exports= User;
