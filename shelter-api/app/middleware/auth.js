const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'your_secret_key';

const authenticateToken = (req, res, next) => {
    console.log("passToken");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.log('Access token missing'); // Log di debug
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    console.log('Token decoded:', decoded); // Aggiungi questo log
    next();
  } catch (error) {
    console.log('Invalid token'); // Log di debug
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
