const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const authenticateToken = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

router.get('/available', authenticateToken, animalController.findAllAvailable);

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
router.get('/', authenticateToken, animalController.findAll);

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
router.get('/:id', authenticateToken, animalController.findOne);

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
router.post('/', authenticateToken, adminOnly, animalController.create);

/**
 * @swagger
 * /api/animals/dis:
 *   get:
 *     tags: [Animals]
 *     summary: Retrieve a list of animals based on their adoption status
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [available, adopted]
 *           description: The adoption status of the animals to filter
 *     responses:
 *       200:
 *         description: A list of animals based on their adoption status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *       500:
 *         description: Error fetching animals
 */
router.get('/dis', authenticateToken, adminOnly, animalController.finddis);

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
router.put('/:id', authenticateToken, adminOnly, animalController.update);

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
router.delete('/:id', authenticateToken, adminOnly, animalController.delete);

module.exports = router;
