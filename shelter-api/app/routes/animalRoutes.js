const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');



router.get('/available', authenticateToken, animalsController.findAllAvailable);

/**
 * @swagger
 * /api/animals:
 *   get:
 *     tags: [Animals]
 *     summary: Retrieves a list of all animals
 *     description: Retrieves a complete list of all animals with their details.
 *     responses:
 *       200:
 *         description: A list of animals.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 */
router.get('/', animalController.findAll);


/**
 * @swagger
 * /api/animals/{id}:
 *   get:
 *     tags: [Animals]
 *     summary: Retrieves an animal by id
 *     description: Retrieves details of an animal by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the animal to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: An animal object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       404:
 *         description: Animal not found.
 */
router.get('/:id', animalController.findOne);

/**
 * @swagger
 * /api/animals:
 *   post:
 *     tags: [Animals]
 *     summary: Adds a new animal
 *     description: Adds a new animal to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: Animal added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 */
router.post('/', animalController.create);

/**
 * @swagger
 * /api/animals/{id}:
 *   put:
 *     tags: [Animals]
 *     summary: Updates an animal by id
 *     description: Updates details of an existing animal by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the animal to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: Animal updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 */
router.put('/:id', animalController.update);

/**
 * @swagger
 * /api/animals/{id}:
 *   delete:
 *     tags: [Animals]
 *     summary: Deletes an animal by id
 *     description: Deletes an animal from the database by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the animal to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Animal deleted successfully.
 *       404:
 *         description: Animal not found.
 */
router.delete('/:id', animalController.delete);

module.exports = router;
