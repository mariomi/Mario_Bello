// Import necessary modules
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Import Swagger configuration
const swaggerSpec = require('./swaggerConfig');

const app = express();
const port = process.env.PORT || 3000;

// Use middleware
app.use(cors());
app.use(express.json()); // Since bodyParser is now included in Express
app.use(express.urlencoded({ extended: true }));

// Import routes
const animalRoutes = require('./app/routes/animalRoutes');
const userRoutes = require('./app/routes/userRoutes');
const adoptionRoutes = require('./app/routes/adoptionRoutes');
const forumPostRoutes = require('./app/routes/forumPostRoutes');
const commentRoutes = require('./app/routes/commentRoutes');
const privateMessageRoutes = require('./app/routes/privateMessageRoutes');
const supportTicketRoutes = require('./app/routes/supportTicketRoutes');

// Route handlers
app.use('/api/animals', animalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/forumPosts', forumPostRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/privateMessages', privateMessageRoutes);
app.use('/api/supportTickets', supportTicketRoutes);

// Swagger UI setup
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Animal Shelter API!');
});

// Error handling middleware (should be after all route handlers)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen on a port
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
  console.log(`Swagger docs are available on http://localhost:${port}/docs`);
});
