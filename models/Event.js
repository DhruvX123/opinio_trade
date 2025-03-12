const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: String,
  odds: Number,
  result: { type: String, default: null },
  status: { type: String, default: 'open' }
});

module.exports = mongoose.model('Event', EventSchema);
