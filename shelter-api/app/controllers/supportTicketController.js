// supportTicketController.js

const db = require('../config/database');

exports.findAll = async (req, res) => {
    const [tickets] = await db.query('SELECT * FROM SupportTickets');
    res.json(tickets);
};

exports.findOne = async (req, res) => {
    const { id } = req.params;
    const [ticket] = await db.query('SELECT * FROM SupportTickets WHERE TicketID = ?', [id]);
    if (ticket.length > 0) {
        res.json(ticket[0]);
    } else {
        res.status(404).send('Ticket not found');
    }
};

exports.create = async (req, res) => {
    const { userId, subject, description } = req.body;
    const [result] = await db.query('INSERT INTO SupportTickets (UserID, Subject, Description) VALUES (?, ?, ?)', [userId, subject, description]);
    res.status(201).send(`Ticket created with ID: ${result.insertId}`);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { subject, description, status } = req.body;
    await db.query('UPDATE SupportTickets SET Subject = ?, Description = ?, Status = ? WHERE TicketID = ?', [subject, description, status, id]);
    res.send('Ticket updated successfully.');
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM SupportTickets WHERE TicketID = ?', [id]);
    res.send('Ticket deleted successfully.');
};
