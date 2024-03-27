const controller = require('./controller.js')
const router = require('express').Router();

router.post('/', controller.createCommission);
router.get('/', controller.getCommissions);
router.get('/:id', controller.getCommissionById);
router.put('/:id', controller.updateCommission);
router.delete('/:id', controller.deleteCommission);

module.exports = router;