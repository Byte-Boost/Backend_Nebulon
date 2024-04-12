const controller = require('../controllers/account.controller.js')
const router = require('express').Router();

router.post('/register', controller.registerSeller);
router.post('/login', controller.loginSeller);
router.post('/delete/:id', controller.deleteSeller);
module.exports = router;