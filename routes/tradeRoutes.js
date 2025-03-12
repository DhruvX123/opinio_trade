const express = require('express');
const { placeTrade, settleTrades } = require('../controllers/tradeController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, placeTrade); // User places a trade
router.post('/:eventId/settle', authenticate, settleTrades); // Settle trades after event result

module.exports = router;
