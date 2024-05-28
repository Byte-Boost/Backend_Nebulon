const controller = require('../controllers/clients.controller.js')
const router = require('express').Router();

router.post('/', controller.createClient);
router.get('/', controller.getClients);
router.get('/:id', controller.getClientById);
router.get('/cnpj/:cnpj', controller.getClientByCNPJ);
router.put('/:id', controller.updateClient);
router.delete('/:id', controller.deleteClient);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API to manage clients
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     tags: [Clients]
 *     summary: Create a new client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       201:
 *         description: Client created
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     tags: [Clients]
 *     summary: Retrieve a list of clients
 *     responses:
 *       200:
 *         description: List of clients
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     tags: [Clients]
 *     summary: Retrieve a client by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The client ID
 *     responses:
 *       200:
 *         description: Client data
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /clients/cnpj/{cnpj}:
 *   get:
 *     tags: [Clients]
 *     summary: Retrieve a client by CNPJ
 *     parameters:
 *       - in: path
 *         name: cnpj
 *         required: true
 *         schema:
 *           type: string
 *         description: The client CNPJ
 *     responses:
 *       200:
 *         description: Client data
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     tags: [Clients]
 *     summary: Update a client by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Client updated
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     tags: [Clients]
 *     summary: Delete a client by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The client ID
 *     responses:
 *       200:
 *         description: Client deleted
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - tradingName
 *         - companyName
 *         - cnpj
 *         - segment
 *         - contact
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the client
 *         tradingName:
 *           type: string
 *           description: The trading name of the client
 *         companyName:
 *           type: string
 *           description: The company name of the client
 *         cnpj:
 *           type: string
 *           description: The CNPJ of the client
 *           pattern: '^\d{14}$'
 *         segment:
 *           type: string
 *           description: The segment of the client
 *         contact:
 *           type: string
 *           description: The contact phone number of the client
 *           pattern: '^\d+$'
 *           minLength: 10
 *           maxLength: 11
 *         status:
 *           type: integer
 *           description: The status of the client
 *       example:
 *         id: 1
 *         tradingName: 'Trade Name'
 *         companyName: 'Company Name'
 *         cnpj: '12345678901234'
 *         segment: 'Segment'
 *         contact: '1234567890'
 *         status: 1
 */