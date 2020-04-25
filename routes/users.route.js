const express = require('express');

const controller = require('../controllers/users.controller')
const validate = require('../validate/user.validate')
// const cookie = require('../cookie/cookie.count')


const router = express.Router();

// đếm số req.cookies gửi lên server đối với chỉ /users/...
// router.get('/', cookie.count, controller.index)
// router.get('/create', cookie.count, controller.create )
// router.post('/create', cookie.count, validate.postCreate, controller.postCreate)
// router.get('/delete/:id', cookie.count, controller.delete )
// router.post('/update/:id', cookie.count, controller.postUpdate)
// router.get('/update/:id', cookie.count, controller.update)
router.get('/', controller.index)
router.get('/create', controller.create )
router.post('/create', validate.postCreate, controller.postCreate)
router.get('/delete/:id', controller.delete )
router.post('/update/:id', controller.postUpdate)
router.get('/update/:id', controller.update)

module.exports = router;
