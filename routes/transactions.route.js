const express = require('express');

const controller = require('../controllers/transactions.controller')

const router = express.Router();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', controller.postCreate);
router.get('/:id/complete', controller.complete)
router.get('/switch/:sessionId', controller.switchTransaction)
module.exports = router;