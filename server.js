const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const ipAddress = '192.168.87.167'; // Indsæt din ønskede IP-adresse her

// Import User model
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Connection error:', error));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from 'spillet' directory
app.use(express.static(path.join(__dirname, 'Spillet')));

// POST endpoint to save user information
app.post('/api/users', async (req, res) => {
  try {
    const { playerName } = req.body;
    const newUser = new User({ playerName });
    await newUser.save();
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// Serve redirect.html when the root of the site is visited
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'redirect.html'));
});

// Start the server
app.listen(port, ipAddress, () => {
  console.log(`Server running at http://${ipAddress}:${port}`);
});
