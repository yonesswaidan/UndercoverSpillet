const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Forbindelse til MongoDB Atla
mongoose.connect('mongodb+srv://yonesswaidan:sgg59mcd@game-database.x2asuuz.mongodb.net/game-database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.error('Connection error:', error));

const db = mongoose.connection;

// Fejlhåndtering for MongoDB-forbindelse
db.on('error', console.error.bind(console, 'connection error:'));

// Skema til brugeroplysninger
const userSchema = new mongoose.Schema({
  playerName: String
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
    const newUser = new User({ playerName });
    await newUser.save();
    console.log('POST request received:', playerName); 
    res.status(201).json({ message: 'Bruger oprettet', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Der opstod en fejl', error: error.message });
  }
});

// Servér index.html, når roden af webstedet besøges
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'spillet', 'index.html'));
});

// Start serveren
app.listen(port, () => {
  console.log(`Server kører på http://localhost:${port}`);
});
