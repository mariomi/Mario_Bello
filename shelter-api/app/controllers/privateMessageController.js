// privateMessageController.js

const db = require('../config/database');

exports.findAll = async (req, res) => {
    const [messages] = await db.query('SELECT * FROM PrivateMessages');
    res.json(messages);
};

exports.findOne = async (req, res) => {
    const { id } = req.params;
    const [message] = await db.query('SELECT * FROM PrivateMessages WHERE MessageID = ?', [id]);
    if (message.length > 0) {
        res.json(message[0]);
    } else {
        res.status(404).send('Message not found');
    }
};

exports.create = async (req, res) => {
    const { senderId, receiverId, messageText } = req.body;
    const [result] = await db.query('INSERT INTO PrivateMessages (SenderID, ReceiverID, MessageText) VALUES (?, ?, ?)', [senderId, receiverId, messageText]);
    res.status(201).send(`Message sent with ID: ${result.insertId}`);
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM PrivateMessages WHERE MessageID = ?', [id]);
    res.send('Message deleted successfully.');
};
