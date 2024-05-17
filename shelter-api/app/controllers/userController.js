// userController.js
const jwt = require('jsonwebtoken'); 
const db = require('../config/database');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY || 'admin';
exports.findAll = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM Users');
        res.json({ message: "Users fetched successfully", data: users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const [user] = await db.query('SELECT * FROM Users WHERE UserID = ?', [id]);
        if (user.length > 0) {
            res.json({ message: "User found", data: user[0] });
        } else {
            res.status(404).json({ message: "User not found1" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query('INSERT INTO Users (Username, Email, PasswordHash, IsAdmin) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, isAdmin]);
        res.status(201).json({ message: "User added successfully", userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error adding user", error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, passwordHash, isAdmin } = req.body;
        await db.query('UPDATE Users SET Username = ?, Email = ?, PasswordHash = ?, IsAdmin = ? WHERE UserID = ?', [username, email, passwordHash, isAdmin, id]);
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Users WHERE UserID = ?', [id]);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);
        const user = results[0]; 

        if (user) {
            const passwordHash = user.PasswordHash.toString();
            const validPassword = await bcrypt.compare(password, passwordHash);
            if (validPassword) {
                const token = jwt.sign({ userId: user.UserID, isAdmin: user.IsAdmin }, secretKey, { expiresIn: '1h' });
                res.json({ message: "Login successful", token });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [userExists] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);
        if (userExists.length > 0) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error during registration", error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        res.json({ message: "PassProf"});
        const { userId } = req.user;
        const [user] = await db.query('SELECT * FROM Users WHERE UserID = ?', [userId]);
        if (user.length > 0) {
            res.json({ message: "Profile fetched successfully", data: user[0] });
        } else {
            res.status(404).json({ message: "User not found porcodio" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
};

exports.profile = async (req, res) => {
    const userId = req.user.userId;
    console.log(`Fetching profile for user ID: ${userId}`); // Log di debug
  
    try {
      const [user] = await db.query('SELECT * FROM Users WHERE UserID = ?', [userId]);
      console.log(`Database response for user ID ${userId}:`, user); // Log di debug
      if (user.length > 0) {
        res.json({ message: "User profile fetched successfully", data: user[0] });
      } else {
        console.log('User not found for ID:', userId); // Log di debug
        res.status(404).json({ message: "User not found 3" });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
  };
  




