// privateMessageRoutes.js

const express = require('express');
const router = express.Router();
const privateMessageController = require('../controllers/privateMessageController');

/**
 * @swagger
 * /api/privateMessages:
 *   get:
 *     tags: [Private Messages]
 *     summary: Retrieve all private messages
 *     responses:
 *       200:
 *         description: A list of private messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrivateMessage'
 */
router.get('/', privateMessageController.findAll);

/**
 * @swagger
 * /api/privateMessages/{id}:
 *   get:
 *     tags: [Private Messages]
 *     summary: Retrieve a single private message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single private message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrivateMessage'
 */
router.get('/:id', privateMessageController.findOne);

/**
 * @swagger
 * /api/privateMessages:
 *   post:
 *     tags: [Private Messages]
 *     summary: Send a new private message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrivateMessage'
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post('/', privateMessageController.create);

/**
 * @swagger
 * /api/privateMessages/{id}:
 *   delete:
 *     tags: [Private Messages]
 *     summary: Delete a private message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message deleted
 */
router.delete('/:id', privateMessageController.delete);

module.exports = router;
