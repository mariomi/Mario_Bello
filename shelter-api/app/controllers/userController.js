// userController.js

const db = require('../config/database');

exports.findAll = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM Users');
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const [user] = await db.query('SELECT * FROM Users WHERE UserID = ?', [id]);
        if (user.length > 0) {
            res.json(user[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const { username, email, passwordHash, isAdmin } = req.body;
        const [result] = await db.query('INSERT INTO Users (Username, Email, PasswordHash, IsAdmin) VALUES (?, ?, ?, ?)', [username, email, passwordHash, isAdmin]);
        res.status(201).send(`User added with ID: ${result.insertId}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, passwordHash, isAdmin } = req.body;
        await db.query('UPDATE Users SET Username = ?, Email = ?, PasswordHash = ?, IsAdmin = ? WHERE UserID = ?', [username, email, passwordHash, isAdmin, id]);
        res.send('User updated successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Users WHERE UserID = ?', [id]);
        res.send('User deleted successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
