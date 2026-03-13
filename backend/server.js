const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Multer for parsing multipart/form-data (uploads)
const upload = multer({ dest: 'uploads/' });

// Database Connection
mongoose.connect('mongodb://localhost:27017/energy_detector')
  .then(() => console.log('Connected to Local MongoDB (energy_detector)'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running correctly' });
});

app.use('/api/auth', require('./routes/authRoutes')); // include auth routes
app.use('/api', require('./routes/billRoutes')); // Include bill upload routes
app.use('/api', require('./routes/analyticsRoutes')); // Include analytics routes

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
