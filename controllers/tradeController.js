const Trade = require('../models/Trade');
const User = require('../models/User');
const Event = require('../models/Event');

exports.placeTrade = async (req, res) => {
  const { userId, eventId, stake } = req.body;
  const event = await Event.findById(eventId);

  const trade = await Trade.create({
    userId,
    eventId,
    stake,
    odds: event.odds
  });

  req.io.emit('new-trade', trade);
  res.status(201).json(trade);
};

exports.settleTrades = async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);

  const trades = await Trade.find({ eventId });
  for (let trade of trades) {
    if (trade.status !== 'pending') continue;

    if (event.result === 'win') {
      trade.status = 'won';
      const user = await User.findById(trade.userId);
      user.balance += trade.stake * trade.odds;
      await user.save();
    } else {
      trade.status = 'lost';
    }

    await trade.save();
  }

  res.status(200).json({ message: 'Trades settled' });
};
