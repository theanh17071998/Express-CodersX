const shortid = require('shortid');
// const md5 = require('md5')
const cloudinary = require('cloudinary').v2;

const bcrypt = require('bcrypt')

const db = require('../db')

module.exports.index = (req, res) => {
    let page = req.query.page || 1;
    let perPage = 8;
    let drop = (page-1)*perPage;
    let total = db.get("users").value().length;
    let totalPage = total/perPage;
    res.render('users/index', {
        users: db.get('users').drop(drop).take(perPage).value(),
        totalPage: totalPage,
        n : 1,
        page: page
    })
}
module.exports.create = (req, res) => {
    res.render('users/create')
}
module.exports.postCreate =  (req, res) => {
    req.body.id = shortid.generate();
    req.body.isAdmin = false;
    req.body.avatar = cloudinary
    .image("http://res.cloudinary.com/nguyentheanh/image/upload/v1588119828/TA_Books/qjyhr2twdmdlvtznfxb5.png")
    .split("'")[1];
    req.body.wrongLoginCount =  0;
    var salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    db.get('users').push(req.body).write();
    res.redirect('/users')
}
module.exports.delete = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    db.get('users').remove(user).write();
    res.redirect('/users')
}
module.exports.postUpdate =  (req,res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    db.get('users').find(user).assign({name: req.body.name, phone: req.body.phone }).write();
    res.redirect('/users')
}
module.exports.update = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    var userEdit = {};
    userEdit.id = id;
    userEdit.name = user.name
    userEdit.phone = user.phone
    res.render('users/update', {
        user: userEdit
    })
}
module.exports.updateProfile = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    var userEdit = {};
    userEdit.id = id;
    userEdit.name = user.name
    userEdit.phone = user.phone
    res.render('users/update', {
        user: userEdit
    })
}
module.exports.updateAvatar = (req, res) => {
    var id = req.params.id;
    console.log(id);
    var user = db.get('users').find({id: id}).value();
    console.log(user)
    var userEdit = {};
    userEdit.avatar = user.avatar
    res.render('users/updateAvatar', {
        user: userEdit
    })
}
module.exports.postUpdateAvatar = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    let urlAvatar = 'huhu';
    cloudinary.uploader.upload(req.file.path, {folder: "/TA_Books", eager_async: false}, function(error, result) {
        urlAvatar = result.url;
        console.log(result.url, error)
    });
    setTimeout(() => {
        db.get('users').find(user).assign({avatar: urlAvatar}).write();
        res.redirect('/users')
    }, 25000)

}