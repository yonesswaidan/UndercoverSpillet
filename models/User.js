const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  playerName: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
