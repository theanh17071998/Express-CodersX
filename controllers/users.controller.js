const shortid = require('shortid');
const md5 = require('md5')

const db = require('../db')

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
}
module.exports.create = (req, res) => {
    res.render('users/create')
}
module.exports.postCreate =  (req, res) => {
    req.body.id = shortid.generate();
    req.body.isAdmin = false;
    req.body.password = md5(req.body.password);
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
    console.log(id)
    var user = db.get('users').find({id: id}).value();
    db.get('users').find(user).assign({name: req.body.name, phone: req.body.phone }).write();
    res.redirect('/users')
}
module.exports.update = (req, res) => {
    var id = req.params.id;
    console.log(id)
    var user = db.get('users').find({id: id}).value();
    var userEdit = {};
    userEdit.id = id;
    userEdit.name = user.name
    userEdit.phone = user.phone
    res.render('users/update', {
        user: userEdit
    })
}
