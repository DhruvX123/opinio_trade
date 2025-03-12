const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  eventId: mongoose.Schema.Types.ObjectId,
  stake: Number,
  odds: Number,
  status: { type: String, default: 'pending' },
  outcome: { type: String, default: null }
});

module.exports = mongoose.model('Trade', TradeSchema);
