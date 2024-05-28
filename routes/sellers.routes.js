const controller = require('../controllers/sellers.controller.js')
const router = require('express').Router();

router.get('/', controller.getSellers);
router.get('/:id', controller.getSellerById);
router.get('/cpf/:cpf', controller.getSellerByCPF);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Sellers
 *   description: Seller management
 */

/**
 * @swagger
 * /sellers:
 *   get:
 *     tags: [Sellers]
 *     summary: Get all sellers
 *     responses:
 *       200:
 *         description: List of sellers
 *       400:
 *         description: Error occurred
 */
 
/**
 * @swagger
 * /sellers/{id}:
 *   get:
 *     tags: [Sellers]
 *     summary: Get seller by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The seller ID
 *     responses:
 *       200:
 *         description: Seller data
 *       400:
 *         description: Error occurred
 */
 
/**
 * @swagger
 * /sellers/cpf/{cpf}:
 *   get:
 *     tags: [Sellers]
 *     summary: Get seller by CPF
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         description: The seller CPF
 *     responses:
 *       200:
 *         description: Seller data
 *       400:
 *         description: Error occurred
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Seller:
 *       type: object
 *       required:
 *         - name
 *         - cpf
 *         - username
 *         - password
 *         - admin
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the seller
 *         name:
 *           type: string
 *           description: The name of the seller
 *         cpf:
 *           type: string
 *           description: The CPF of the seller
 *           pattern: '^\d{11}$'
 *         username:
 *           type: string
 *           description: The username of the seller
 *         password:
 *           type: string
 *           description: The password of the seller
 *         admin:
 *           type: boolean
 *           description: The admin status of the seller
 *       example:
 *         id: 1
 *         name: 'John Doe'
 *         cpf: '12345678901'
 *         username: 'johndoe'
 *         password: 'password'
 *         admin: false
 */
