const controller = require('./controller.js')
const express = require('express');
const router = express.Router();

router.get('/', controller.getCommissions);
router.get('/error', controller.dummyFunction);

module.exports = router;