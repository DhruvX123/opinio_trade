
const { getEventResult } = require('../services/sportsDataService');
const Event = require('../models/Event');
const Trade = require('../models/Trade');
const User = require('../models/User');

const settleTradesForEvent = async (event) => {
  const eventResult = await getEventResult(event.apiEventId);
  if (eventResult.fixture.status.short === 'FT') {
    event.result = eventResult.teams.home.winner ? 'home' : 'away';
    event.status = 'closed';
    await event.save();

    const trades = await Trade.find({ eventId: event._id, status: 'pending' });
    for (const trade of trades) {
      const user = await User.findById(trade.userId);
      if (trade.prediction === event.result) {
        trade.status = 'won';
        user.balance += trade.stake * trade.odds;
      } else {
        trade.status = 'lost';
      }
      await trade.save();
      await user.save();
    }
  }
};

const settleAllTrades = async () => {
  const openEvents = await Event.find({ status: 'open' });
  for (const event of openEvents) {
    await settleTradesForEvent(event);
  }
};

module.exports = settleAllTrades;
