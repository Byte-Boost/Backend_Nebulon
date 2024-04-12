const controller = require('../controllers/clients.controller.js')
const router = require('express').Router();

router.post('/', controller.createClient);
router.get('/', controller.getClients);
router.get('/:id', controller.getClientById);
router.get('/cnpj/:cnpj', controller.getClientByCNPJ);
router.put('/:id', controller.updateClient);
router.delete('/:id', controller.deleteClient);

module.exports = router;