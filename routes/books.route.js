const express = require('express');
const shortid = require('shortid');

const db = require('../db')
const controller = require('../controllers/books.controller')
const validate = require('../validate/book.validate')

const route = express.Router();

route.get('/', controller.index);
route.get('/update/:id', controller.update );
route.get('/delete/:id', controller.delete);
route.get('/create', controller.create) 
route.post('/create', validate.postCreate ,controller.postCreate)

module.exports = route;