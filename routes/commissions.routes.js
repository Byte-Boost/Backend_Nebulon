const controller = require('../controllers/commissions.controller.js')
const router = require('express').Router();

router.post('/', controller.createCommission);
router.get('/', controller.getCommissions);
router.get('/stats', controller.getCommissionStats);
router.get('/:id', controller.getCommissionById);
router.put('/:id', controller.updateCommission);
router.delete('/:id', controller.deleteCommission);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Commissions
 *   description: Commission management
 */

/**
 * @swagger
 * /commissions:
 *   post:
 *     tags: [Commissions]
 *     summary: Create a new commission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commission'
 *     responses:
 *       201:
 *         description: Commission created
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /commissions:
 *   get:
 *     tags: [Commissions]
 *     summary: Get all commissions
 *     responses:
 *       200:
 *         description: List of commissions
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /commissions/{id}:
 *   get:
 *     tags: [Commissions]
 *     summary: Get commission by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The commission ID
 *     responses:
 *       200:
 *         description: Commission data
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /commissions/stats:
 *   get:
 *     tags: [Commissions]
 *     summary: Get commission statistics
 *     responses:
 *       200:
 *         description: Commission statistics
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /commissions/{id}:
 *   put:
 *     tags: [Commissions]
 *     summary: Update a commission
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The commission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commission'
 *     responses:
 *       200:
 *         description: Commission updated
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /commissions/{id}:
 *   delete:
 *     tags: [Commissions]
 *     summary: Delete a commission
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The commission ID
 *     responses:
 *       200:
 *         description: Commission deleted
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Commission:
 *       type: object
 *       required:
 *         - date
 *         - value
 *         - paymentMethod
 *         - clientCNPJ
 *         - productId
 *         - sellerCPF
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the commission
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the commission
 *         value:
 *           type: number
 *           format: float
 *           description: The value of the commission
 *         paymentMethod:
 *           type: string
 *           description: The payment method of the commission
 *         clientCNPJ:
 *           type: string
 *           description: The CNPJ of the client
 *           pattern: '^\d{14}$'
 *         productId:
 *           type: integer
 *           description: The id of the product
 *         sellerCPF:
 *           type: string
 *           description: The CPF of the seller
 *           pattern: '^\d{11}$'
 *       example:
 *         id: 1
 *         date: '2022-01-01T00:00:00Z'
 *         value: 100.5
 *         paymentMethod: 'Credit Card'
 *         clientCNPJ: '12345678901234'
 *         productId: 1
 *         sellerCPF: '12345678901'
 */