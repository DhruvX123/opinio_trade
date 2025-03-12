
const { getLiveEvents } = require('../services/sportsDataService');
const Event = require('../models/Event');

const fetchAndStoreLiveEvents = async () => {
  const liveEvents = await getLiveEvents();
  liveEvents.forEach(async (apiEvent) => {
    const existingEvent = await Event.findOne({ apiEventId: apiEvent.fixture.id });
    if (!existingEvent) {
      const newEvent = new Event({
        apiEventId: apiEvent.fixture.id,
        title: `${apiEvent.teams.home.name} vs ${apiEvent.teams.away.name}`,
        odds: apiEvent.bookmakers[0]?.odds || 1.5, // Example odds
        status: 'open',
      });
      await newEvent.save();
    }
  });
};

module.exports = fetchAndStoreLiveEvents;
