const express = require('express');
const shortid = require('shortid');

const db = require('../db')

const route = express.Router();
route.get('/', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
})
route.get('/create', (req, res) => {
    res.render('users/create')
})
route.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
})
route.get('/delete/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    db.get('users').remove(user).write();
    res.redirect('/users')
})
route.post('/update/:id', (req,res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    db.get('users').find(user).assign({name: req.body.name, phone: req.body.phone }).write();
    res.redirect('/users')
})
route.get('/update/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    // db.get('users').find(user).assign({name: 'Nguyen Van A'}).write();
    var userEdit = {};
    userEdit.name = user.name
    userEdit.phone = user.phone
    res.render('users/update', {
        user: userEdit
    })
})


module.exports = route;
