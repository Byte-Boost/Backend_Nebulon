const controller = require('../controllers/products.controller.js')
const router = require('express').Router();

router.post('/', controller.createProduct);
router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);
router.get('/class/:class', controller.getProductsWithClass);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;