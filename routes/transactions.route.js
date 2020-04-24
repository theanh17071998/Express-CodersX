const express = require('express');
const shortid = require('shortid');

const db = require('../db')

const route = express.Router();

route.get('/', function (req, res) {
    res.render('transactions/index', {
        transactions: db.get("transactions").value()
    })
   });
route.get('/create', function (req, res) {
    res.render('transactions/create', {
        books: db.get('books').value(),
        users: db.get('users').value()
    });
   });
route.post('/create', function (req, res) {
   console.log(req.body)
});

module.exports = route;