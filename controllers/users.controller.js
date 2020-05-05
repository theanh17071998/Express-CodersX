const shortid = require('shortid');
// const md5 = require('md5')
const cloudinary = require('cloudinary').v2;

const bcrypt = require('bcrypt')

const db = require('../db')
const User = require('../models/user.model')

module.exports.index = async (req, res) => {
    let page = req.query.page || 1;
    let perPage = 8;
    let users = await User.find();
    let total = users.length;
    let start = (page - 1)*perPage
    let end = page*perPage
    let totalPage = total/perPage;
    res.render('users/index', {
        users: users.slice(start, end),
        totalPage: totalPage,
        n : 1,
        page: page
    });
}
module.exports.create = (req, res) => {
    res.render('users/create')
}
module.exports.postCreate = async (req, res) => {
    req.body.id = shortid.generate();
    req.body.isAdmin = false;
    req.body.avatar = cloudinary
    .image("http://res.cloudinary.com/nguyentheanh/image/upload/v1588119828/TA_Books/qjyhr2twdmdlvtznfxb5.png")
    .split("'")[1];
    req.body.wrongLoginCount =  0;
    var salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    await User.create(req.body);
    res.redirect('/users')
}
module.exports.delete = async (req, res) => {
    var id = req.params.id;
    await User.findOneAndDelete({_id: id});
    res.redirect('/users')
}
module.exports.postUpdate = async (req,res) => {
    var id = req.params.id;
    await User.findOneAndUpdate({_id: id}, {name: req.body.name, phone: req.body.phone })
    res.redirect('/users')
}
module.exports.update = async (req, res) => {
    var id = req.params.id;
    let user = await User.findOne({_id: id});
    var userEdit = {};
    userEdit.id = id;
    userEdit.name = user.name
    userEdit.phone = user.phone
    res.render('users/update', {
        user: userEdit
    })
}
module.exports.updateProfile = async (req, res) => {
    var id = req.params.id;
    let user = await User.findOne({_id: id});
    var userEdit = {};
    userEdit.id = id;
    userEdit.name = user.name
    userEdit.phone = user.phone
    res.render('users/update', {
        user: userEdit
    })
}
module.exports.updateAvatar = async (req, res) => {
    var id = req.params.id;
    let user = await User.findOne({_id: id});
    var userEdit = {};
    userEdit.avatar = user.avatar
    res.render('users/updateAvatar', {
        user: userEdit
    })
}
module.exports.postUpdateAvatar = async (req, res) => {
    var id = req.params.id;
    let urlAvatar = await cloudinary.uploader.upload(req.file.path, {folder: "/TA_Books", eager_async: false}, function(error, result) {
      return result.url
    });
       await User.findOneAndUpdate({_id: id}, {avatar: urlAvatar})
        res.redirect('/users')
}