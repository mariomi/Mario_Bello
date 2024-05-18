// auth.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'admin';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('Access token missing'); // Log di debug
        return res.status(401).json({ message: 'Access token missing' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        console.log('Token decoded:', decoded); // Log di debug
        next();
    } catch (error) {
        console.log('Invalid token:', error.message); // Log di debug
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
