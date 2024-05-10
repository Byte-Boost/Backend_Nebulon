const controller = require('../controllers/commissions.controller.js')
const router = require('express').Router();

router.post('/', controller.createCommission);
router.get('/', controller.getCommissions);
router.get('/:id', controller.getCommissionById);
router.get('/product/:product_id', controller.getCommissionsWithProduct);
router.get('/product-class/:class', controller.getCommissionsWithProductClass);
router.get('/client/:client_cnpj', controller.getCommissionsWithClient);
router.get('/client-class/:class', controller.getCommissionsWithClientClass);
router.get('/seller/:seller_cpf', controller.getCommissionsWithSeller);
router.put('/:id', controller.updateCommission);
router.delete('/:id', controller.deleteCommission);

module.exports = router;