const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Set Mongoose strictQuery option
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Connection error:', error));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from 'Spillet' directory
app.use(express.static(path.join(__dirname, 'Spillet')));

// Serve redirect.html when the root of the site is visited
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'redirect.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
