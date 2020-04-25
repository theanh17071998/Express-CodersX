const express = require('express');
const shortid = require('shortid');

const controller = require('../controllers/users.controller')
const validate = require('../validate/user.validate')

const route = express.Router();
route.get('/', controller.index)
route.get('/create', controller.create )
route.post('/create', validate.postCreate, controller.postCreate)
route.get('/delete/:id', controller.delete )
route.post('/update/:id', controller.postUpdate)
route.get('/update/:id', controller.update)

module.exports = route;
