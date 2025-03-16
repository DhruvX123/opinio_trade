const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { title, odds } = req.body;
  const event = await Event.create({ title, odds });
  res.status(201).json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
};

exports.resolveEvent = async (req, res) => {
  const { eventId } = req.body;
  const event = await Event.findById(eventId);
  //event.result = String;
  event.status = 'closed';
  await event.save();
  
  // Emit WebSocket Event
  req.io.emit('event-resolved', event);
  
  res.status(200).json(event);
};
