const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Forbindelse til MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.error('Connection error:', error));

const db = mongoose.connection;

// Fejlhåndtering for MongoDB-forbindelse
db.on('error', console.error.bind(console, 'connection error:'));

// Skema til brugeroplysninger
const userSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

// Middleware for at parse JSON-anmodninger
app.use(bodyParser.json());

// Servér statiske filer fra 'spillet' mappen
app.use(express.static(path.join(__dirname, 'spillet')));

// POST-endpunkt til at gemme brugeroplysninger
app.post('/api/users', async (req, res) => {
  try {
    const { playerName } = req.body;
    if (!playerName) {
      return res.status(400).json({ message: 'playerName is required' });
    }

    const newUser = new User({ playerName });
    await newUser.save();
    console.log('POST request received:', playerName);
    res.status(201).json({ message: 'Bruger oprettet', user: newUser });
  } catch (error) {
    console.error('Error during POST /api/users:', error);
    res.status(500).json({ message: 'Der opstod en fejl', error: error.message });
  }
});

// Servér redirect.html, når roden af webstedet besøges
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'redirect.html'));
});

// Start serveren
app.listen(port, () => {
  console.log(`Server kører på http://localhost:${port}`);
});
