const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  balance: { type: Number, default: 1000 },
  role: { type: String,enum: ['user', 'admin'], default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);
