const express = require('express');

const controller = require('../controllers/users.controller')
const validate = require('../validate/user.validate')
const multer = require('multer')
const upload = multer({dest: './public/uploads/'})

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
router.post('/create', validate.postCreate, controller.postCreate);
router.get('/delete/:id', controller.delete )
router.post('/update/:id', controller.postUpdate)
router.get('/update/:id', controller.update)
router.get('/profile/:id', controller.updateProfile)
router.get('/profile/avatar/:id', controller.updateAvatar)
router.post('/profile/avatar/:id', upload.single('avatar'), controller.postUpdateAvatar)

module.exports = router;
