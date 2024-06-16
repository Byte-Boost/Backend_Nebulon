const controller = require('../controllers/sellers.controller.js')
const router = require('express').Router();

router.get('/scoreboard', controller.getScoreBoard);

module.exports = router;