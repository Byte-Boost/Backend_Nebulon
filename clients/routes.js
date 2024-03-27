const controller = require('./controller.js')
const router = require('express').Router();

router.post('/', controller.createClient);
router.get('/', controller.getClients);
router.get('/:id', controller.getClientById);
router.put('/:id', controller.updateClient);
router.delete('/:id', controller.deleteClient);

module.exports = router;