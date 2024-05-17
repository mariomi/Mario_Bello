const db = require('../config/database');

exports.findAllAvailable = async (req, res) => {
  try {
      const [animals] = await db.query('SELECT * FROM Animals WHERE Status = "available"');
      res.json(animals);
  } catch (error) {
      console.error('Error fetching available animals:', error);
      res.status(500).json({ message: 'Error fetching available animals', error: error.message });
  }
};


exports.findAll = async (req, res) => {
  try {
    const [animals, _] = await db.query('SELECT * FROM Animals');
    res.json(animals);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const [animal, _] = await db.query('SELECT * FROM Animals WHERE AnimalID = ?', [req.params.id]);
    res.json(animal[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, species, breed, age, gender, description, adoptionStatus } = req.body;
    await db.query('INSERT INTO Animals (Name, Species, Breed, Age, Gender, Description, AdoptionStatus) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, species, breed, age, gender, description, adoptionStatus]);
    res.status(201).send({ message: 'Animal created successfully.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, species, breed, age, gender, description, adoptionStatus } = req.body;
    await db.query('UPDATE Animals SET Name = ?, Species = ?, Breed = ?, Age = ?, Gender = ?, Description = ?, AdoptionStatus = ? WHERE AnimalID = ?',
      [name, species, breed, age, gender, description, adoptionStatus, req.params.id]);
    res.send({ message: 'Animal updated successfully.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM Animals WHERE AnimalID = ?', [req.params.id]);
    res.send({ message: 'Animal deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
