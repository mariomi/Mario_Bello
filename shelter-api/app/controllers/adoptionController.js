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

exports.adopt = async (req, res) => {
    const userId = req.user.userId;
    const { animalID } = req.body;

    try {
        const [animal] = await db.query('SELECT * FROM Animals WHERE AnimalID = ? AND Status = "available"', [animalID]);

        if (animal.length === 0) {
            return res.status(404).json({ message: 'Animal not found or already adopted' });
        }

        await db.query('INSERT INTO Adoptions (UserID, AnimalID, AdoptionDate) VALUES (?, ?, NOW())', [userId, animalID]);
        await db.query('UPDATE Animals SET Status = "adopted" WHERE AnimalID = ?', [animalID]);

        res.json({ message: 'Adoption successful' });
    } catch (error) {
        console.error('Error during adoption:', error);
        res.status(500).json({ message: 'Error during adoption', error: error.message });
    }
};

exports.findAllByUser = async (req, res) => {
    const userId = req.user.userId;
    console.log(`Fetching adoptions for user ID: ${userId}`); // Log di debug
  
    try {
      const [adoptions] = await db.query('SELECT Adoptions.*, Animals.AnimalID, Animals.Name, Animals.Species, Animals.PhotoUrl FROM Adoptions JOIN Animals ON Adoptions.AnimalID = Animals.AnimalID WHERE UserID = ?', [userId]);
      res.json({ message: "Adoptions fetched successfully", data: adoptions });
    } catch (error) {
      console.error('Error fetching adoptions:', error);
      res.status(500).json({ message: "Error fetching adoptions", error: error.message });
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
        const { userId, animalId } = req.body;
        const [result] = await db.query('INSERT INTO Adoptions (UserID, AnimalID, Status, AdoptionDate) VALUES (?, ?, ?, NOW())', [userId, animalId, 'Pending']);
        res.status(201).json({ message: `Adoption created with ID: ${result.insertId}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, animalId, status } = req.body;
        await db.query('UPDATE Adoptions SET UserID = ?, AnimalID = ?, Status = ? WHERE AdoptionID = ?', [userId, animalId, status, id]);
        res.json({ message: 'Adoption updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Adoptions WHERE AdoptionID = ?', [id]);
        res.json({ message: 'Adoption deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
