const controller = require('../controllers/account.controller.js')
const adminMiddleware = require('../middleware/admin.middleware');
const router = require('express').Router();

router.post('/register', adminMiddleware, controller.registerSeller);
router.post('/login', controller.loginSeller);
router.post('/delete/:id', adminMiddleware, controller.deleteSeller);
module.exports = router;