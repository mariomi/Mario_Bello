// forumPostController.js

const db = require('../config/database');

exports.findAll = async (req, res) => {
    const [posts] = await db.query('SELECT * FROM ForumPosts');
    res.json(posts);
};

exports.findOne = async (req, res) => {
    const { id } = req.params;
    const [post] = await db.query('SELECT * FROM ForumPosts WHERE PostID = ?', [id]);
    if (post.length > 0) {
        res.json(post[0]);
    } else {
        res.status(404).send('Post not found');
    }
};

exports.create = async (req, res) => {
    const { userId, title, content } = req.body;
    const [result] = await db.query('INSERT INTO ForumPosts (UserID, Title, Content) VALUES (?, ?, ?)', [userId, title, content]);
    res.status(201).send(`Post created with ID: ${result.insertId}`);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    await db.query('UPDATE ForumPosts SET Title = ?, Content = ? WHERE PostID = ?', [title, content, id]);
    res.send('Post updated successfully.');
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM ForumPosts WHERE PostID = ?', [id]);
    res.send('Post deleted successfully.');
};
