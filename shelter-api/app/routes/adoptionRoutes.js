// adoptionRoutes.js

const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');
const authenticateToken = require('../middleware/auth'); // Assicurati che questo file middleware esista


/**
 * @swagger
 * /api/adoptions/my-adoptions:
 *   get:
 *     tags: [Adoptions]
 *     summary: Get the logged-in user's adoptions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Adoptions fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adoption'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching adoptions
 */
router.get('/my-adoptions', authenticateToken, adoptionController.findAllByUser);


/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     tags: [Adoptions]
 *     summary: Retrieve a list of all adoptions
 *     responses:
 *       200:
 *         description: A list of adoptions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adoption'
 */
router.get('/', adoptionController.findAll);

/**
 * @swagger
 * /api/adoptions/{id}:
 *   get:
 *     tags: [Adoptions]
 *     summary: Retrieve a single adoption by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the adoption to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single adoption.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 */
router.get('/:id', adoptionController.findOne);

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     tags: [Adoptions]
 *     summary: Create a new adoption
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Adoption'
 *     responses:
 *       201:
 *         description: Adoption created successfully.
 */
router.post('/', adoptionController.create);

/**
 * @swagger
 * /api/adoptions/{id}:
 *   put:
 *     tags: [Adoptions]
 *     summary: Update an adoption by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the adoption to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Adoption'
 *     responses:
 *       200:
 *         description: Adoption updated successfully.
 */
router.put('/:id', adoptionController.update);

/**
 * @swagger
 * /api/adoptions/{id}:
 *   delete:
 *     tags: [Adoptions]
 *     summary: Delete an adoption by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the adoption to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Adoption deleted successfully.
 */
router.delete('/:id', adoptionController.delete);




module.exports = router;
