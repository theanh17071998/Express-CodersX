const express = require('express');
const shortid = require('shortid');

const controller = require('../controllers/users.controller')
const validate = require('../validate/user.validate')
const cookie = require('../cookie/cookie.count')

const route = express.Router();
route.get('/', cookie.count, controller.index)
route.get('/create', cookie.count, controller.create )
route.post('/create', cookie.count, validate.postCreate, controller.postCreate)
route.get('/delete/:id', cookie.count, controller.delete )
route.post('/update/:id', cookie.count, controller.postUpdate)
route.get('/update/:id', cookie.count, controller.update)

module.exports = route;
