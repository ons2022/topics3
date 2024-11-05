const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const equipmentRoutes = require('./routes/equipment');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://ons:mAFAiazF4D5mP618@atlascluster.gskrewb.mongodb.net/safelife';

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:8100',
}));

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Medical Equipment Management API',
      version: '1.0.0',
      description: 'API documentation for managing medical equipment',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Local server',
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          in: 'header',
          description: 'Enter your JWT token',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/equipment', equipmentRoutes);

// Database Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// 404 Handling
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
