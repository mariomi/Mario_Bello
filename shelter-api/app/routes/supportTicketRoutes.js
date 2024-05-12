// supportTicketRoutes.js

const express = require('express');
const router = express.Router();
const supportTicketController = require('../controllers/supportTicketController');

/**
 * @swagger
 * /api/supportTickets:
 *   get:
 *     tags: [Support Tickets]
 *     summary: Retrieve all support tickets
 *     responses:
 *       200:
 *         description: A list of support tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SupportTicket'
 */
router.get('/', supportTicketController.findAll);

/**
 * @swagger
 * /api/supportTickets/{id}:
 *   get:
 *     tags: [Support Tickets]
 *     summary: Retrieve a single support ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single support ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportTicket'
 */
router.get('/:id', supportTicketController.findOne);

/**
 * @swagger
 * /api/supportTickets:
 *   post:
 *     tags: [Support Tickets]
 *     summary: Create a new support ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SupportTicket'
 *     responses:
 *       201:
 *         description: Support ticket created
 */
router.post('/', supportTicketController.create);

/**
 * @swagger
 * /api/supportTickets/{id}:
 *   put:
 *     tags: [Support Tickets]
 *     summary: Update a support ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SupportTicket'
 *     responses:
 *       200:
 *         description: Support ticket updated
 */
router.put('/:id', supportTicketController.update);

/**
 * @swagger
 * /api/supportTickets/{id}:
 *   delete:
 *     tags: [Support Tickets]
 *     summary: Delete a support ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Support ticket deleted
 */
router.delete('/:id', supportTicketController.delete);

module.exports = router;
