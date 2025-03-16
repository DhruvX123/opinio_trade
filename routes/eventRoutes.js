const express = require('express');
const { fetchLiveEvents } = require("../services/sportsDataService");
const { createEvent, getEvents, resolveEvent } = require('../controllers/eventController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', createEvent); // Admin creates event
router.get('/', getEvents); // Fetch all events
router.get("/live", async (req, res) => {
    try {
      const events = await fetchLiveEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch live events" });
    }
  });
router.post('/:eventId/resolve', resolveEvent); // Admin resolves event

module.exports = router;
