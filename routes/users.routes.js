const controller = require('../controllers/users.controller.js')
const router = require('express').Router();

router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);

module.exports = router;