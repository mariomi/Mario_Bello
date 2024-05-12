// forumPostRoutes.js

/**
 * @swagger
 * /api/forumPosts:
 *   get:
 *     tags: [Forum Posts]
 *     summary: Retrieve a list of all forum posts
 *     responses:
 *       200:
 *         description: A list of forum posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ForumPost'
 */


const express = require('express');
const router = express.Router();
const forumPostController = require('../controllers/forumPostController');

router.get('/', forumPostController.findAll);
router.get('/:id', forumPostController.findOne);
router.post('/', forumPostController.create);
router.put('/:id', forumPostController.update);
router.delete('/:id', forumPostController.delete);

module.exports = router;
