// adoptionController.js

const db = require('../config/database');

exports.findAll = async (req, res) => {
    try {
        const [adoptions] = await db.query('SELECT * FROM Adoptions');
        res.json(adoptions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const [adoption] = await db.query('SELECT * FROM Adoptions WHERE AdoptionID = ?', [id]);
        if (adoption.length > 0) {
            res.json(adoption[0]);
        } else {
            res.status(404).send('Adoption not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const { userId, animalId, status } = req.body;
        const [result] = await db.query('INSERT INTO Adoptions (UserID, AnimalID, Status) VALUES (?, ?, ?)', [userId, animalId, status]);
        res.status(201).send(`Adoption created with ID: ${result.insertId}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, animalId, status } = req.body;
        await db.query('UPDATE Adoptions SET UserID = ?, AnimalID = ?, Status = ? WHERE AdoptionID = ?', [userId, animalId, status, id]);
        res.send('Adoption updated successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Adoptions WHERE AdoptionID = ?', [id]);
        res.send('Adoption deleted successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
