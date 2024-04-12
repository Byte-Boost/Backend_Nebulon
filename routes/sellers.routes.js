const controller = require('../controllers/sellers.controller.js')
const router = require('express').Router();

router.get('/', controller.getSellers);
router.get('/:id', controller.getSellerById);
router.get('/cpf/:cpf', controller.getSellerByCPF);

module.exports = router;