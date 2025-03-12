const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  balance: { type: Number, default: 1000 },
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);
