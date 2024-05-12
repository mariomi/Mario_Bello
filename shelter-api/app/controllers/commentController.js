// commentController.js

const db = require('../config/database');

exports.findAll = async (req, res) => {
    const [comments] = await db.query('SELECT * FROM Comments');
    res.json(comments);
};

exports.findOne = async (req, res) => {
    const { id } = req.params;
    const [comment] = await db.query('SELECT * FROM Comments WHERE CommentID = ?', [id]);
    if (comment.length > 0) {
        res.json(comment[0]);
    } else {
        res.status(404).send('Comment not found');
    }
};

exports.create = async (req, res) => {
    const { postId, userId, commentText } = req.body;
    const [result] = await db.query('INSERT INTO Comments (PostID, UserID, CommentText) VALUES (?, ?, ?)', [postId, userId, commentText]);
    res.status(201).send(`Comment created with ID: ${result.insertId}`);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { commentText } = req.body;
    await db.query('UPDATE Comments SET CommentText = ? WHERE CommentID = ?', [commentText, id]);
    res.send('Comment updated successfully.');
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM Comments WHERE CommentID = ?', [id]);
    res.send('Comment deleted successfully.');
};
