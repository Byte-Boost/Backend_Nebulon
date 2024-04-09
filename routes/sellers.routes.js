const controller = require('../controllers/sellers.controller.js')
const router = require('express').Router();

router.post('/', controller.createSeller);
router.get('/', controller.getSellers);
router.get('/:id', controller.getSellerById);
router.get('/cpf/:cpf', controller.getSellerByCPF);
router.put('/:id', controller.updateSeller);
router.delete('/:id', controller.deleteSeller);

module.exports = router;